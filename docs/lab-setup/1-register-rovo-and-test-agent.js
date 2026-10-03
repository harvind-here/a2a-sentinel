// Run on a NEW lab instance as admin: System Definition > Scripts - Background, scope "global".
//
// 1. Registers Atlassian Rovo as an external A2A agent through AI Agent Studio's own onboarding API
//    (sn_aia.ExternalAgentGuidedSetupUtil: create provider, discover, onboard). It creates the same records as
//    AI Agent Studio > Add > External > Agent2Agent (A2A) protocol in the UI.
// 2. Creates the agent "Sentinel Orphan Test", used to reproduce an orphaned AI asset (test B13).
// 3. Starts AI Control Tower's "Sync Now Assist AI Assets" job so both agents get an AI asset and an AI Function CI.
//
// Then wait until the job has finished (2 to 3 minutes: System Logs > All shows
// "Sync Now Assist AI Assets: Completed") and run 2-create-orphan.js. Safe to run twice.
(function () {
    var CARD_URL = 'https://a2a.atlassian.com/.well-known/agent.json';
    var ORPHAN_NAME = 'Sentinel Orphan Test';
    var C = sn_aia.AIAgentConstants.EXTERNAL_AGENT_API;
    var util = new sn_aia.ExternalAgentGuidedSetupUtil();

    // --- 1. Atlassian Rovo -------------------------------------------------------------------
    var provider = new GlideRecord('sn_aia_external_agent_provider');
    provider.addQuery('agent_card_url', CARD_URL);
    provider.query();
    var discoveryId;
    if (provider.next()) {
        var disc = new GlideRecord('sn_aia_external_agent_discovery');
        disc.addQuery('provider', provider.getUniqueValue());
        disc.query();
        if (disc.next()) discoveryId = disc.getUniqueValue();
        gs.print('Rovo provider already exists: ' + provider.getUniqueValue());
    } else {
        var protocol = new GlideRecord('sn_aia_external_agent_protocol');
        if (!protocol.get('name', 'Agent2Agent (A2A) protocol')) {
            gs.print('ERROR: no "Agent2Agent (A2A) protocol" record. Is AI Agent Studio installed?');
            return;
        }
        discoveryId = util.createDiscoveryProvider({
            name: 'Atlassian',
            discoveryType: C.DISCOVERY.DISCOVERY_TYPE_KEY.WELL_KNOWN,
            protocolSysId: protocol.getUniqueValue(),
            subFlowSysId: C.REQUEST.DEFAULT_AGENT_CARD_SUBFLOW,
            connectionAliasSysId: '',
            agentCardUrl: CARD_URL,
            apiType: 'sys_hub_flow'
        });
        gs.print('Rovo discovery provider created: ' + discoveryId);
    }

    var rovo = new GlideRecord('sn_aia_agent');
    rovo.addQuery('name', 'Atlassian Rovo');
    rovo.addQuery('agent_type', 'external');
    rovo.query();
    if (rovo.next()) {
        gs.print('Atlassian Rovo already onboarded: ' + rovo.getUniqueValue());
    } else {
        var res = util.discoverAgents(discoveryId);
        if (!res.success || !res.details || !res.details.length) {
            gs.print('ERROR: discovery failed. Check that the instance can reach ' + CARD_URL);
            return;
        }
        var card = res.details[0].agent_card;
        var rovoId = util.onboardExternalAgent(card, {
            agentName: card.name,
            agentDescription: card.description,
            externalAgentId: card.name,
            synchronous: true,
            analyseResponse: false
        }, discoveryId);
        gs.print('Atlassian Rovo onboarded: ' + rovoId + ' (card ' + card.version + ', ' + (card.skills || []).length + ' skills)');
    }

    // --- 2. The agent that will become the orphan --------------------------------------------
    var orphan = new GlideRecord('sn_aia_agent');
    var orphanAsset = new GlideRecord('alm_ai_system_digital_asset');
    orphanAsset.addQuery('display_name', ORPHAN_NAME);
    orphanAsset.addQuery('install_status', '!=', '32');
    orphanAsset.query();
    if (orphan.get('name', ORPHAN_NAME)) {
        gs.print(ORPHAN_NAME + ' already exists: ' + orphan.getUniqueValue());
    } else if (orphanAsset.hasNext()) {
        gs.print('An orphaned AI asset for ' + ORPHAN_NAME + ' already exists. Not creating the agent again.');
    } else {
        orphan.initialize();
        orphan.setValue('name', ORPHAN_NAME);
        orphan.setValue('description', 'Temporary agent used to reproduce an orphaned AI asset for A2A Sentinel (test B13). Deleted after AI Control Tower inventoried it.');
        orphan.setValue('role', 'Test agent with no tools.');
        orphan.setValue('instructions', 'Reply that this is a test agent.');
        gs.print(ORPHAN_NAME + ' created: ' + orphan.insert());
    }

    // Both agents need an active agent config, or AI Control Tower won't inventory them.
    ['Atlassian Rovo', ORPHAN_NAME].forEach(function (name) {
        var ag = new GlideRecord('sn_aia_agent');
        if (!ag.get('name', name)) return;
        var cfg = new GlideRecord('sn_aia_agent_config');
        cfg.addQuery('agent', ag.getUniqueValue());
        cfg.query();
        if (cfg.next()) {
            if (cfg.getValue('active') != '1') {
                cfg.setValue('active', true);
                cfg.update();
            }
        } else {
            cfg.initialize();
            cfg.setValue('agent', ag.getUniqueValue());
            cfg.setValue('active', true);
            cfg.insert();
        }
        gs.print(name + ': agent config active');
    });

    // --- 3. Inventory both agents now instead of waiting for the hourly run --------------------
    var job = new GlideRecord('sysauto_script');
    if (job.get('name', 'Sync Now Assist AI Assets')) {
        SncTriggerSynchronizer.executeNow(job);
        gs.print('Started "Sync Now Assist AI Assets". Wait for it to finish, then run 2-create-orphan.js.');
    } else {
        gs.print('WARNING: job "Sync Now Assist AI Assets" not found. Is AI Control Tower installed?');
    }
})();
