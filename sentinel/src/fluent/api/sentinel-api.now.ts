import '@servicenow/sdk/global'
import { RestApi, Acl } from '@servicenow/sdk/core'
import { sentinelAdmin } from '../security/roles.now'

// Admin-only automation API: lets pipelines, other agents or ops tooling
// trigger checks and read the current posture without the UI.
const sentinelApiAcl = Acl({
    $id: Now.ID['a2a-sentinel-api-acl'],
    type: 'rest_endpoint',
    name: 'A2A Sentinel API',
    operation: 'execute',
    roles: [sentinelAdmin],
    description: 'Only A2A Sentinel admins may call the Sentinel automation API.',
})

RestApi({
    $id: Now.ID['a2a-sentinel-api'],
    name: 'A2A Sentinel API',
    serviceId: 'sentinel',
    shortDescription: 'Trigger A2A Sentinel watch cycles and read the posture of watched A2A agents.',
    consumes: 'application/json',
    produces: 'application/json',
    enforceAcl: [sentinelApiAcl],
    routes: [
        {
            $id: Now.ID['a2a-sentinel-api-run'],
            name: 'Run watch cycle',
            method: 'POST',
            path: '/run',
            script: `(function process(request, response) {
    var stats = new x_snc_a2a_sentinel.A2ASentinel().runCycle();
    response.setStatus(200);
    response.setBody(stats);
})(request, response);`,
        },
        {
            $id: Now.ID['a2a-sentinel-api-check'],
            name: 'Check one agent',
            method: 'POST',
            path: '/agents/{sys_id}/check',
            script: `(function process(request, response) {
    var w = new GlideRecord('x_snc_a2a_sentinel_agent');
    if (!w.get(request.pathParams.sys_id)) {
        response.setStatus(404);
        response.setBody({ error: 'Watched agent not found' });
        return;
    }
    response.setStatus(200);
    response.setBody(new x_snc_a2a_sentinel.A2ASentinel().checkAgent(w));
})(request, response);`,
        },
        {
            $id: Now.ID['a2a-sentinel-api-status'],
            name: 'Status',
            method: 'GET',
            path: '/status',
            script: `(function process(request, response) {
    var agents = [];
    var w = new GlideRecord('x_snc_a2a_sentinel_agent');
    w.orderBy('name');
    w.query();
    while (w.next()) {
        agents.push({
            sys_id: w.getUniqueValue(), name: w.getValue('name'), source: w.getValue('source'),
            health: w.getValue('health'), risk: w.getValue('risk'), card_version: w.getValue('card_version'),
            skills: parseInt(w.getValue('skill_count') || '0', 10), auth: w.getValue('auth_summary'),
            endpoint_host: w.getValue('endpoint_host'), last_http_status: w.getValue('last_http_status'),
            last_latency_ms: w.getValue('last_latency_ms'), last_checked: w.getValue('last_checked')
        });
    }
    var findings = [];
    var f = new GlideRecord('x_snc_a2a_sentinel_finding');
    f.addActiveQuery();
    f.orderBy('priority');
    f.query();
    while (f.next()) {
        findings.push({ number: f.getValue('number'), severity: f.getValue('severity'), type: f.getValue('finding_type'),
            summary: f.getValue('short_description'), agent: f.getDisplayValue('agent') });
    }
    response.setStatus(200);
    response.setBody({ agents: agents, open_findings: findings });
})(request, response);`,
        },
    ],
})
