/**
 * A2ASentinel
 *
 * Supply-chain assurance for third-party A2A agents consumed by ServiceNow.
 * AI Control Tower inventories agents, but for agents ServiceNow *consumes*
 * it never stores their live Agent Card, never re-checks it, and never
 * retires assets whose agent was deleted. This class closes those gaps:
 *
 *   syncFromAgentStudio()  import consumed external agents + their registered card
 *   checkAgent()           probe the live card, snapshot changes, detect drift
 *   reconcileOrphans()     flag AI assets whose source agent no longer exists
 *   retireOrphan()         governed clean-up of an orphaned AI asset + CI
 *   runCycle()             all of the above (scheduled job / "Run watch cycle")
 */
var A2ASentinel = Class.create();
A2ASentinel.prototype = {
    T_AGENT: 'x_snc_a2a_sentinel_agent',
    T_SNAPSHOT: 'x_snc_a2a_sentinel_snapshot',
    T_PROBE: 'x_snc_a2a_sentinel_probe',
    T_FINDING: 'x_snc_a2a_sentinel_finding',
    LOG: '[A2ASentinel] ',

    SEVERITY_RANK: { none: 0, info: 1, low: 2, medium: 3, high: 4, critical: 5 },
    SEVERITY_PRIORITY: { critical: 1, high: 2, medium: 3, low: 4, info: 5 },
    AUTH_STRENGTH: { none: 0, basic: 1, apiKey: 2, http: 3, oauth2: 4, openIdConnect: 4, mutualTLS: 5 },
    DESTRUCTIVE: /\b(delete|remove|purge|drop|destroy|wipe|terminate|disable|revoke|grant|reset|transfer|pay|payment|refund|approve)\b/i,

    RECOMMENDATIONS: {
        auth_removed: 'Suspend use of this agent in agentic workflows until the provider restores authentication, then confirm with the vendor why it was removed.',
        auth_downgraded: 'Confirm the change with the provider and re-assess the integration risk before continuing to send data to this agent.',
        auth_changed: 'Update the Connection & Credential alias for this agent to match the new authentication scheme.',
        scope_expanded: 'Review whether the newly requested OAuth scopes are justified and approve or reject them explicitly.',
        skill_added: 'Review the new skill. If it can change or delete data, restrict which workflows may invoke this agent before it is used.',
        skill_removed: 'Identify ServiceNow workflows that depend on the removed skill; they will fail or degrade.',
        skill_modified: 'Review the changed skill description for altered behaviour.',
        endpoint_changed: 'Verify with the provider that the new runtime endpoint is legitimate before any further invocation (possible hijack or unannounced migration).',
        insecure_transport: 'Block invocation until the agent is served over HTTPS.',
        protocol_changed: 'Check compatibility of the new A2A protocol version with ServiceNow AI Agent Fabric.',
        capability_changed: 'Review whether workflows rely on the changed capability (streaming / push notifications).',
        unversioned_change: 'Ask the provider to version card changes; unversioned changes defeat change control.',
        unreachable: 'Agent card is unreachable. Workflows that delegate to this agent will fail; contact the provider or disable the agent.',
        invalid_card: 'The endpoint no longer returns a valid A2A Agent Card; treat the agent as unavailable.',
        no_auth_declared: 'Agent declares no authentication. Do not send non-public data to it.',
        legacy_card_path: 'Card is published at the pre-0.3 path /.well-known/agent.json; ask the provider to also publish /.well-known/agent-card.json.',
        orphan_ai_asset: 'Retire the orphaned AI asset and its CI so AI inventory, governance and licensing counts stay accurate.',
    },

    initialize: function () {
        this.degradedMs = parseInt(gs.getProperty('x_snc_a2a_sentinel.latency_degraded_ms', '3000'), 10);
        this.failureThreshold = parseInt(gs.getProperty('x_snc_a2a_sentinel.failure_threshold', '2'), 10);
        this.llmEnabled = gs.getProperty('x_snc_a2a_sentinel.llm_enabled', 'true') === 'true';
    },

    /* ------------------------------------------------------------------ */
    /* Orchestration                                                       */
    /* ------------------------------------------------------------------ */

    runCycle: function () {
        const stats = { imported: 0, checked: 0, changed: 0, findings: 0, orphans: 0 };
        stats.imported = this.syncFromAgentStudio();

        const w = new GlideRecord(this.T_AGENT);
        w.addActiveQuery();
        w.query();
        while (w.next()) {
            const result = this.checkAgent(w);
            stats.checked++;
            if (result.changed) stats.changed++;
            stats.findings += result.findings;
        }
        stats.orphans = this.reconcileOrphans();
        gs.info(this.LOG + 'Watch cycle: ' + JSON.stringify(stats));
        return stats;
    },

    /* ------------------------------------------------------------------ */
    /* 1. Import agents consumed via AI Agent Studio                       */
    /* ------------------------------------------------------------------ */

    syncFromAgentStudio: function () {
        if (!this._tableExists('sn_aia_agent') || !this._tableExists('sn_aia_external_agent_card')) {
            gs.info(this.LOG + 'AI Agent Studio (sn_aia) not installed: skipping import of consumed agents.');
            return 0;
        }
        let imported = 0;
        let seen = 0;
        const skipped = [];
        const ag = new GlideRecord('sn_aia_agent');
        ag.addQuery('agent_type', 'external');
        ag.query();
        while (ag.next()) {
            seen++;
            const cardUrl = this._providerCardUrl(ag);
            if (!cardUrl) {
                skipped.push(ag.getValue('name'));
                continue;
            }

            const w = new GlideRecord(this.T_AGENT);
            w.addQuery('sn_agent', ag.getUniqueValue());
            w.query();
            const isNew = !w.next();
            if (isNew) {
                w.initialize();
                w.setValue('sn_agent', ag.getUniqueValue());
                w.setValue('source', 'servicenow_external');
                w.setValue('active', true);
            }
            w.setValue('name', ag.getValue('name'));
            w.setValue('card_url', cardUrl);
            const ci = this._findAiCi(ag.getUniqueValue());
            if (ci) w.setValue('ai_ci', ci);

            if (isNew) {
                w.insert();
                imported++;
                this._importRegistrationCard(w, ag.getUniqueValue());
            } else {
                w.update();
            }
        }
        gs.info(this.LOG + 'AI Agent Studio sync: ' + seen + ' external agent(s) found, ' + imported + ' newly watched' +
            (skipped.length ? ', no Agent Card URL for: ' + skipped.join(', ') : ''));
        return imported;
    },

    /**
     * ServiceNow models A2A with two providers: a *discovery* provider that holds the
     * Agent Card URL (card -> discovery record -> provider) and a *runtime* provider
     * that holds the connection alias (agent -> configuration -> provider).
     */
    _providerCardUrl: function (agentGR) {
        const reg = new GlideRecord('sn_aia_external_agent_card');
        reg.addQuery('agent', agentGR.getUniqueValue());
        reg.setLimit(1);
        reg.query();
        if (reg.next()) {
            const discovery = reg.discovery_provider.getRefRecord();
            if (discovery && discovery.isValidRecord()) {
                const discoveryProvider = discovery.provider.getRefRecord();
                if (discoveryProvider && discoveryProvider.isValidRecord() && discoveryProvider.getValue('agent_card_url')) {
                    return discoveryProvider.getValue('agent_card_url');
                }
            }
        }
        const cfg = agentGR.external_agent_configuration.getRefRecord();
        if (!cfg || !cfg.isValidRecord()) return '';
        const provider = cfg.external_agent_provider.getRefRecord();
        if (!provider || !provider.isValidRecord()) return '';
        return provider.getValue('agent_card_url') || '';
    },

    /**
     * AI Control Tower links agent -> AI asset (servicenow_ref_id) -> CI (asset).
     * Fallback: the AI Function CI's object_id ("<agent sys_id>:<instance>"), a field that
     * exists only on the cmdb_ci_vm_object subclasses, never on the cmdb_ci base table.
     */
    _findAiCi: function (agentSysId) {
        if (this._tableExists('alm_ai_system_digital_asset')) {
            const asset = new GlideRecord('alm_ai_system_digital_asset');
            asset.addQuery('servicenow_ref_id', agentSysId);
            asset.setLimit(1);
            asset.query();
            if (asset.next()) {
                const ci = this._ciForAsset(asset.getUniqueValue());
                if (ci) return ci.getUniqueValue();
            }
        }
        if (this._tableExists('cmdb_ci_function_ai')) {
            const ci = new GlideRecord('cmdb_ci_function_ai');
            ci.addQuery('object_id', 'STARTSWITH', agentSysId + ':');
            ci.setLimit(1);
            ci.query();
            if (ci.next()) return ci.getUniqueValue();
        }
        return '';
    },

    /** The card ServiceNow captured at registration becomes the baseline. */
    _importRegistrationCard: function (w, agentSysId) {
        const reg = new GlideRecord('sn_aia_external_agent_card');
        reg.addQuery('agent', agentSysId);
        reg.setLimit(1);
        reg.query();
        if (!reg.next()) return;

        let card;
        try {
            card = JSON.parse(reg.getValue('details') || '{}');
        } catch (e) {
            return;
        }
        // ServiceNow stores these attributes as columns, not inside 'details'.
        card.name = reg.getValue('name');
        card.description = reg.getValue('description');
        card.url = reg.getValue('url');
        card.version = reg.getValue('version');
        delete card.discoveryProviderSysId;

        const hash = this._hash(card);
        const snapId = this._createSnapshot(w, card, hash, 'registration', reg.getValue('sys_created_on'));
        this._applyCardSummary(w, card, hash, snapId);
        w.update();
        this._assessBaseline(w, card, snapId);
    },

    /* ------------------------------------------------------------------ */
    /* 2. Probe live card, snapshot, detect drift                          */
    /* ------------------------------------------------------------------ */

    checkAgent: function (w) {
        const result = { changed: false, findings: 0, message: '' };
        const url = w.getValue('card_url');
        const res = this._fetch(url);

        let outcome = 'ok';
        let error = '';
        let card = null;
        if (res.status === 0) {
            outcome = 'unreachable';
            error = res.error || 'No response';
        } else if (res.status !== 200) {
            outcome = 'http_error';
            error = 'HTTP ' + res.status;
        } else {
            try {
                card = JSON.parse(res.body);
                const missing = this._missingFields(card);
                if (missing.length) {
                    outcome = 'invalid_card';
                    error = 'Missing required Agent Card fields: ' + missing.join(', ');
                    card = null;
                }
            } catch (e) {
                outcome = 'invalid_json';
                error = 'Response is not JSON';
            }
        }

        const probe = new GlideRecord(this.T_PROBE);
        probe.initialize();
        probe.setValue('agent', w.getUniqueValue());
        probe.setValue('probed_on', new GlideDateTime().getValue());
        probe.setValue('http_status', res.status);
        probe.setValue('latency_ms', res.latency);
        probe.setValue('outcome', outcome);
        probe.setValue('error', error);

        w.setValue('last_checked', new GlideDateTime().getValue());
        w.setValue('last_http_status', res.status);
        w.setValue('last_latency_ms', res.latency);

        if (outcome === 'ok') {
            w.setValue('consecutive_failures', 0);
            w.setValue('health', res.latency > this.degradedMs ? 'degraded' : 'healthy');
            this._resolveOpen(w, ['unreachable', 'invalid_card'], 'Recovered: live card fetched successfully (HTTP 200, ' + res.latency + ' ms).');

            const hash = this._hash(card);
            probe.setValue('card_hash', hash);
            if (hash !== w.getValue('current_hash')) {
                const prevSnapId = w.getValue('last_snapshot');
                const prevCard = prevSnapId ? this._snapshotCard(prevSnapId) : null;
                const snapId = this._createSnapshot(w, card, hash, 'live');
                this._applyCardSummary(w, card, hash, snapId);
                probe.setValue('changed', true);
                result.changed = true;
                if (prevCard) {
                    result.findings += this._evaluateDrift(w, prevCard, card, prevSnapId, snapId);
                } else {
                    result.findings += this._assessBaseline(w, card, snapId);
                }
            }
        } else {
            const failures = parseInt(w.getValue('consecutive_failures') || '0', 10) + 1;
            w.setValue('consecutive_failures', failures);
            w.setValue('health', failures >= this.failureThreshold ? 'down' : 'degraded');
            if (failures >= this.failureThreshold) {
                const type = outcome === 'invalid_card' || outcome === 'invalid_json' ? 'invalid_card' : 'unreachable';
                result.findings += this._raise(w, {
                    type: type,
                    severity: 'high',
                    key: type,
                    title: type === 'unreachable' ? 'Agent card unreachable' : 'Endpoint no longer returns a valid Agent Card',
                    detail: error + ' (' + failures + ' consecutive failed checks of ' + url + ')',
                    evidence: { url: url, http_status: res.status, error: error, consecutive_failures: failures },
                });
            }
        }

        probe.insert();
        w.update();
        this._recomputeRisk(w);

        result.message = w.getValue('name') + ': ' + outcome + ' (HTTP ' + res.status + ', ' + res.latency + ' ms)' +
            (result.changed ? ', card changed' : ', no change') + ', ' + result.findings + ' new finding(s)';
        return result;
    },

    _fetch: function (url) {
        const out = { status: 0, body: '', latency: 0, error: '' };
        try {
            const rm = new sn_ws.RESTMessageV2();
            rm.setEndpoint(url);
            rm.setHttpMethod('get');
            rm.setRequestHeader('Accept', 'application/json');
            rm.setHttpTimeout(15000);
            const start = new Date().getTime();
            const resp = rm.execute();
            out.latency = new Date().getTime() - start;
            out.status = resp.getStatusCode();
            out.body = resp.getBody();
            if (resp.haveError()) out.error = resp.getErrorMessage();
        } catch (e) {
            out.error = String(e);
        }
        return out;
    },

    _missingFields: function (card) {
        const missing = [];
        if (!card || typeof card !== 'object') return ['card'];
        if (!card.name) missing.push('name');
        if (!card.url) missing.push('url');
        if (!Array.isArray(card.skills)) missing.push('skills');
        return missing;
    },

    /* ------------------------------------------------------------------ */
    /* Drift rules                                                         */
    /* ------------------------------------------------------------------ */

    _evaluateDrift: function (w, prevCard, card, prevSnapId, snapId) {
        const changes = this.diffCards(prevCard, card);
        let raised = 0;
        changes.forEach((c) => {
            c.beforeSnap = prevSnapId;
            c.afterSnap = snapId;
            raised += this._raise(w, c);
        });
        return raised;
    },

    /** Pure function: compare two Agent Cards and return typed, graded changes. */
    diffCards: function (prevCard, card) {
        const a = this._features(prevCard);
        const b = this._features(card);
        const changes = [];

        // Endpoint / transport
        if (a.url !== b.url) {
            const hostMoved = a.host !== b.host;
            changes.push({
                type: 'endpoint_changed',
                severity: hostMoved ? 'high' : 'medium',
                key: 'endpoint:' + b.url,
                title: hostMoved ? 'Runtime endpoint moved to a different host' : 'Runtime endpoint path changed',
                detail: a.url + '  ->  ' + b.url,
                evidence: { before: a.url, after: b.url },
            });
        }
        if (a.https && !b.https) {
            changes.push({
                type: 'insecure_transport',
                severity: 'critical',
                key: 'transport:' + b.url,
                title: 'Endpoint downgraded from HTTPS to HTTP',
                detail: b.url,
                evidence: { before: a.url, after: b.url },
            });
        }

        // Authentication
        if (a.authStrength > 0 && b.authStrength === 0) {
            changes.push({
                type: 'auth_removed',
                severity: 'critical',
                key: 'auth:none',
                title: 'Agent no longer declares any authentication',
                detail: 'Before: ' + a.authSummary + '  ->  After: none',
                evidence: { before: a.auth, after: b.auth },
            });
        } else if (b.authStrength < a.authStrength) {
            changes.push({
                type: 'auth_downgraded',
                severity: 'high',
                key: 'auth:' + b.authSummary,
                title: 'Authentication downgraded (' + a.authSummary + ' -> ' + b.authSummary + ')',
                detail: 'Before: ' + a.authSummary + '  ->  After: ' + b.authSummary,
                evidence: { before: a.auth, after: b.auth },
            });
        } else if (a.authSummary !== b.authSummary && b.authStrength > 0) {
            changes.push({
                type: 'auth_changed',
                severity: 'medium',
                key: 'auth:' + b.authSummary,
                title: 'Authentication scheme changed (' + a.authSummary + ' -> ' + b.authSummary + ')',
                detail: 'Before: ' + a.authSummary + '  ->  After: ' + b.authSummary,
                evidence: { before: a.auth, after: b.auth },
            });
        }
        const addedScopes = b.scopes.filter((s) => a.scopes.indexOf(s) === -1);
        if (addedScopes.length && b.authStrength > 0) {
            changes.push({
                type: 'scope_expanded',
                severity: 'medium',
                key: 'scopes:' + addedScopes.join(','),
                title: 'Agent requests additional OAuth scopes: ' + addedScopes.join(', '),
                detail: 'Before: [' + a.scopes.join(', ') + ']  ->  After: [' + b.scopes.join(', ') + ']',
                evidence: { added: addedScopes, before: a.scopes, after: b.scopes },
            });
        }

        // Skills
        Object.keys(b.skills).forEach((id) => {
            const s = b.skills[id];
            if (!a.skills[id]) {
                const destructive = this.DESTRUCTIVE.test(id + ' ' + s.name + ' ' + s.description);
                changes.push({
                    type: 'skill_added',
                    severity: destructive ? 'high' : 'medium',
                    key: 'skill+:' + id,
                    title: 'New skill "' + s.name + '"' + (destructive ? ' can change or delete data' : ' added'),
                    detail: s.name + ': ' + s.description,
                    evidence: { skill: s, destructive: destructive },
                });
            } else if (JSON.stringify(a.skills[id]) !== JSON.stringify(s)) {
                changes.push({
                    type: 'skill_modified',
                    severity: 'low',
                    key: 'skill~:' + id + ':' + this._shortHash(JSON.stringify(s)),
                    title: 'Skill "' + s.name + '" definition changed',
                    detail: JSON.stringify(a.skills[id]) + '  ->  ' + JSON.stringify(s),
                    evidence: { before: a.skills[id], after: s },
                });
            }
        });
        Object.keys(a.skills).forEach((id) => {
            if (!b.skills[id]) {
                changes.push({
                    type: 'skill_removed',
                    severity: 'medium',
                    key: 'skill-:' + id,
                    title: 'Skill "' + a.skills[id].name + '" was removed',
                    detail: a.skills[id].name + ': ' + a.skills[id].description,
                    evidence: { skill: a.skills[id] },
                });
            }
        });

        // Protocol and capabilities
        if (a.protocolVersion !== b.protocolVersion) {
            changes.push({
                type: 'protocol_changed',
                severity: 'medium',
                key: 'protocol:' + b.protocolVersion,
                title: 'A2A protocol version changed (' + a.protocolVersion + ' -> ' + b.protocolVersion + ')',
                detail: a.protocolVersion + '  ->  ' + b.protocolVersion,
                evidence: { before: a.protocolVersion, after: b.protocolVersion },
            });
        }
        if (a.capabilities !== b.capabilities) {
            changes.push({
                type: 'capability_changed',
                severity: 'low',
                key: 'capabilities:' + b.capabilities,
                title: 'Agent capabilities changed',
                detail: a.capabilities + '  ->  ' + b.capabilities,
                evidence: { before: a.capabilities, after: b.capabilities },
            });
        }

        // Meaningful change without a version bump defeats change control.
        if (changes.length && a.version === b.version) {
            changes.push({
                type: 'unversioned_change',
                severity: 'medium',
                key: 'unversioned:' + this._shortHash(JSON.stringify(changes.map((c) => c.key))),
                title: 'Card changed without a version bump (still ' + (b.version || 'unversioned') + ')',
                detail: changes.length + ' change(s) published under the same version ' + (b.version || '(none)'),
                evidence: { version: b.version, changes: changes.map((c) => c.type) },
            });
        }
        return changes;
    },

    _features: function (card) {
        const url = card.url || '';
        const hostMatch = url.match(/^https?:\/\/([^\/:?#]+)/i);
        const schemes = card.securitySchemes || {};
        const auth = {};
        let strength = 0;
        let scopes = [];
        Object.keys(schemes).forEach((name) => {
            const s = schemes[name] || {};
            let type = s.type || 'unknown';
            if (type === 'http') type = (s.scheme || '').toLowerCase() === 'basic' ? 'basic' : 'http';
            auth[name] = type;
            strength = Math.max(strength, this.AUTH_STRENGTH[type] || 1);
            Object.keys(s.flows || {}).forEach((flow) => {
                scopes = scopes.concat(Object.keys((s.flows[flow] || {}).scopes || {}));
            });
        });
        const skills = {};
        (card.skills || []).forEach((s) => {
            const id = s.id || (s.name || '').toLowerCase();
            skills[id] = {
                name: s.name || id,
                description: s.description || '',
                tags: (s.tags || []).slice().sort().join(','),
            };
        });
        const caps = card.capabilities || {};
        return {
            url: url,
            host: hostMatch ? hostMatch[1].toLowerCase() : '',
            https: /^https:\/\//i.test(url),
            version: card.version || '',
            protocolVersion: card.protocolVersion || '',
            auth: auth,
            authStrength: strength,
            authSummary: Object.keys(auth).length ? Object.keys(auth).map((k) => auth[k]).sort().join('+') : 'none',
            scopes: scopes.filter((s, i) => scopes.indexOf(s) === i).sort(),
            skills: skills,
            capabilities: 'streaming=' + !!caps.streaming + ', pushNotifications=' + !!caps.pushNotifications,
        };
    },

    /** Posture checks on the first card we see for an agent. */
    _assessBaseline: function (w, card, snapId) {
        let raised = 0;
        const f = this._features(card);
        if (f.authStrength === 0) {
            raised += this._raise(w, {
                type: 'no_auth_declared',
                severity: 'high',
                key: 'baseline:noauth',
                title: 'Agent card declares no authentication',
                detail: 'securitySchemes is empty; any client can invoke ' + (card.url || 'this agent'),
                evidence: { securitySchemes: card.securitySchemes || {} },
                afterSnap: snapId,
            });
        }
        if (f.url && !f.https) {
            raised += this._raise(w, {
                type: 'insecure_transport',
                severity: 'high',
                key: 'baseline:http',
                title: 'Agent endpoint is not served over HTTPS',
                detail: f.url,
                evidence: { url: f.url },
                afterSnap: snapId,
            });
        }
        if (/\/\.well-known\/agent\.json$/i.test(w.getValue('card_url') || '')) {
            raised += this._raise(w, {
                type: 'legacy_card_path',
                severity: 'low',
                key: 'baseline:legacypath',
                title: 'Card published at legacy path /.well-known/agent.json',
                detail: 'A2A v0.3 clients look for /.well-known/agent-card.json first; ' + w.getValue('card_url'),
                evidence: { card_url: w.getValue('card_url') },
                afterSnap: snapId,
            });
        }
        return raised;
    },

    /* ------------------------------------------------------------------ */
    /* 3. Orphaned AI assets (agent deleted, asset still "Deployed")       */
    /* ------------------------------------------------------------------ */

    reconcileOrphans: function () {
        if (!this._tableExists('alm_ai_system_digital_asset') || !this._tableExists('sn_aia_agent')) {
            gs.info(this.LOG + 'AI Control Tower inventory not installed: skipping orphan reconciliation.');
            return 0;
        }
        let raised = 0;
        const asset = new GlideRecord('alm_ai_system_digital_asset');
        asset.addQuery('servicenow_ref_table', 'sn_aia_agent');
        asset.addQuery('install_status', '!=', '32');
        asset.query();
        while (asset.next()) {
            const ci = this._ciForAsset(asset.getUniqueValue());
            let agentId = asset.getValue('servicenow_ref_id') || '';
            if (!agentId && ci) agentId = (ci.getValue('object_id') || '').split(':')[0];
            if (!agentId) continue;

            const ag = new GlideRecord('sn_aia_agent');
            if (ag.get(agentId)) continue;

            const del = new GlideRecord('sys_audit_delete');
            del.addQuery('tablename', 'sn_aia_agent');
            del.addQuery('documentkey', agentId);
            del.setLimit(1);
            del.query();
            const deleted = del.next();

            raised += this._raise(null, {
                type: 'orphan_ai_asset',
                severity: 'medium',
                key: 'orphan:' + asset.getUniqueValue(),
                title: 'AI asset "' + asset.getDisplayValue() + '" is still Deployed but its AI agent no longer exists',
                detail: 'Source agent ' + agentId + (deleted ? ' was deleted on ' + del.getValue('sys_created_on') + ' by ' + del.getValue('sys_created_by') : ' no longer exists') +
                    '. AI Control Tower\'s agent sync only iterates existing agents, so this asset (and its CI) stay "Deployed" and remain in the AI inventory used for licensing.',
                evidence: {
                    asset: asset.getUniqueValue(),
                    asset_install_status: asset.getDisplayValue('install_status'),
                    ci: ci ? ci.getUniqueValue() : '',
                    ci_install_status: ci ? ci.getDisplayValue('install_status') : '',
                    deleted_agent: agentId,
                    deleted_on: deleted ? del.getValue('sys_created_on') : '',
                    deleted_by: deleted ? del.getValue('sys_created_by') : '',
                },
                asset: asset.getUniqueValue(),
                ci: ci ? ci.getUniqueValue() : '',
            });
        }
        return raised;
    },

    /** Prefer the AI Function class so object_id is readable; fall back to the CMDB base table. */
    _ciForAsset: function (assetSysId) {
        const ci = new GlideRecord(this._tableExists('cmdb_ci_function_ai') ? 'cmdb_ci_function_ai' : 'cmdb_ci');
        ci.addQuery('asset', assetSysId);
        ci.setLimit(1);
        ci.query();
        return ci.next() ? ci : null;
    },

    /** Governed clean-up, invoked from the "Retire orphaned AI asset" UI action. */
    retireOrphan: function (finding) {
        const assetId = finding.getValue('affected_asset');
        const ciId = finding.getValue('affected_ci');
        const notes = [];
        if (assetId) {
            const asset = new GlideRecord('alm_ai_system_digital_asset');
            if (asset.get(assetId)) {
                asset.setValue('install_status', '32');
                asset.update();
                notes.push('AI asset set to Retired.');
            }
        }
        if (ciId) {
            const ci = new GlideRecord('cmdb_ci');
            if (ci.get(ciId)) {
                ci.setValue('install_status', '7');
                ci.setValue('operational_status', '6');
                ci.update();
                notes.push('CI set to Retired / Retired.');
            }
        }
        finding.setValue('work_notes', 'Retired by A2A Sentinel on request of ' + gs.getUserDisplayName() + '. ' + notes.join(' '));
        finding.setValue('state', '3');
        finding.update();
        return notes.join(' ');
    },

    /* ------------------------------------------------------------------ */
    /* Findings                                                            */
    /* ------------------------------------------------------------------ */

    /** Create a finding unless an open one with the same fingerprint exists. Returns 1 if created. */
    _raise: function (w, c) {
        const agentId = w ? w.getUniqueValue() : '';
        const agentName = w ? w.getValue('name') : 'AI Control Tower inventory';
        const fingerprint = (agentId || 'inventory') + '|' + c.type + '|' + c.key;

        const existing = new GlideRecord(this.T_FINDING);
        existing.addQuery('fingerprint', fingerprint);
        existing.addActiveQuery();
        existing.setLimit(1);
        existing.query();
        if (existing.next()) return 0;

        const f = new GlideRecord(this.T_FINDING);
        f.initialize();
        f.setValue('finding_type', c.type);
        f.setValue('severity', c.severity);
        f.setValue('priority', this.SEVERITY_PRIORITY[c.severity] || 4);
        f.setValue('short_description', '[' + c.severity.toUpperCase() + '] ' + c.title + ' - ' + agentName);
        f.setValue('description', c.detail || '');
        f.setValue('recommendation', this.RECOMMENDATIONS[c.type] || '');
        f.setValue('evidence', JSON.stringify(c.evidence || {}, null, 2));
        f.setValue('fingerprint', fingerprint);
        if (agentId) f.setValue('agent', agentId);
        if (w && w.getValue('ai_ci')) f.setValue('affected_ci', w.getValue('ai_ci'));
        if (c.ci) f.setValue('affected_ci', c.ci);
        if (c.asset) f.setValue('affected_asset', c.asset);
        if (c.beforeSnap) f.setValue('before_snapshot', c.beforeSnap);
        if (c.afterSnap) f.setValue('after_snapshot', c.afterSnap);
        f.setValue('ai_summary', this._explain(agentName, c));
        f.insert();
        return 1;
    },

    _resolveOpen: function (w, types, note) {
        const f = new GlideRecord(this.T_FINDING);
        f.addQuery('agent', w.getUniqueValue());
        f.addQuery('finding_type', 'IN', types.join(','));
        f.addActiveQuery();
        f.query();
        while (f.next()) {
            f.setValue('work_notes', note);
            f.setValue('state', '3');
            f.update();
        }
    },

    _recomputeRisk: function (w) {
        let worst = 'none';
        const f = new GlideRecord(this.T_FINDING);
        f.addQuery('agent', w.getUniqueValue());
        f.addActiveQuery();
        f.query();
        while (f.next()) {
            const sev = f.getValue('severity');
            if ((this.SEVERITY_RANK[sev] || 0) > this.SEVERITY_RANK[worst]) worst = sev;
        }
        if (w.getValue('risk') !== worst) {
            w.setValue('risk', worst);
            w.update();
        }
    },

    /** Plain-English explanation via Now Assist (Generative AI Controller), with a deterministic fallback. */
    _explain: function (agentName, c) {
        const fallback = c.title + '. ' + (this.RECOMMENDATIONS[c.type] || '');
        if (!this.llmEnabled || c.severity === 'info' || c.severity === 'low') return fallback;
        try {
            const prompt =
                'You are an AI governance analyst reviewing third-party AI agents that ServiceNow calls over the A2A protocol.\n' +
                'Explain the following change to a governance reviewer in at most 3 short sentences: what changed, why it matters, and what to do. ' +
                'Only use the facts given; do not invent details.\n\n' +
                'Agent: ' + agentName + '\n' +
                'Finding: ' + c.type + ' (' + c.severity + ')\n' +
                'Title: ' + c.title + '\n' +
                'Details: ' + (c.detail || '') + '\n' +
                'Evidence: ' + JSON.stringify(c.evidence || {}).substring(0, 1500);
            const res = new sn_generative_ai.LLMClient().call({ prompt: prompt });
            if (res && res.status === 'Success' && res.response) {
                return String(res.response).trim().substring(0, 3900);
            }
        } catch (e) {
            gs.warn(this.LOG + 'LLM explanation unavailable: ' + e);
        }
        return fallback;
    },

    /* ------------------------------------------------------------------ */
    /* Snapshots and hashing                                               */
    /* ------------------------------------------------------------------ */

    _createSnapshot: function (w, card, hash, source, fetchedOn) {
        const f = this._features(card);
        const s = new GlideRecord(this.T_SNAPSHOT);
        s.initialize();
        s.setValue('agent', w.getUniqueValue());
        s.setValue('source', source);
        s.setValue('fetched_on', fetchedOn || new GlideDateTime().getValue());
        s.setValue('card_hash', hash);
        s.setValue('card', JSON.stringify(card, null, 2));
        s.setValue('card_version', f.version);
        s.setValue('protocol_version', f.protocolVersion);
        s.setValue('skill_count', Object.keys(f.skills).length);
        s.setValue('auth_summary', f.authSummary);
        s.setValue('endpoint_host', f.host);
        return s.insert();
    },

    _snapshotCard: function (snapId) {
        const s = new GlideRecord(this.T_SNAPSHOT);
        if (!s.get(snapId)) return null;
        try {
            return JSON.parse(s.getValue('card'));
        } catch (e) {
            return null;
        }
    },

    _applyCardSummary: function (w, card, hash, snapId) {
        const f = this._features(card);
        w.setValue('current_hash', hash);
        w.setValue('last_snapshot', snapId);
        w.setValue('card_version', f.version);
        w.setValue('protocol_version', f.protocolVersion);
        w.setValue('skill_count', Object.keys(f.skills).length);
        w.setValue('auth_summary', f.authSummary);
        w.setValue('endpoint_host', f.host);
    },

    /** Hash of the canonical form: key order and skill order do not count as change. */
    _hash: function (card) {
        const copy = JSON.parse(JSON.stringify(card));
        if (Array.isArray(copy.skills)) {
            copy.skills.sort((x, y) => String(x.id || x.name).localeCompare(String(y.id || y.name)));
        }
        return new GlideDigest().getSHA256Hex(JSON.stringify(this._canonical(copy)));
    },

    _canonical: function (value) {
        if (Array.isArray(value)) return value.map((v) => this._canonical(v));
        if (value && typeof value === 'object') {
            const out = {};
            Object.keys(value).sort().forEach((k) => (out[k] = this._canonical(value[k])));
            return out;
        }
        return value;
    },

    _shortHash: function (text) {
        return new GlideDigest().getSHA256Hex(text).substring(0, 12);
    },

    _tableExists: function (table) {
        return new GlideRecord(table).isValid();
    },

    type: 'A2ASentinel',
};
