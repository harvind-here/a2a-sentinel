import '@servicenow/sdk/global'
import { ScriptInclude, ScheduledScript, UiAction, Property } from '@servicenow/sdk/core'
import { sentinelAdmin } from '../security/roles.now'

ScriptInclude({
    $id: Now.ID['a2a-sentinel-si'],
    name: 'A2ASentinel',
    description: 'Watches third-party A2A Agent Cards consumed by ServiceNow: drift, health, and orphaned AI assets.',
    script: Now.include('../../scripts/A2ASentinel.js'),
    accessibleFrom: 'package_private',
})

ScheduledScript({
    $id: Now.ID['a2a-sentinel-watch-job'],
    name: 'A2A Sentinel - watch cycle',
    frequency: 'periodically',
    executionInterval: { minutes: 10 },
    executionStart: '2026-09-30 00:00:00',
    script: Now.include('../../scripts/watch-cycle.js'),
    active: true,
})

// ---- UI actions -------------------------------------------------------

UiAction({
    $id: Now.ID['a2a-sentinel-check-now'],
    table: 'x_snc_a2a_sentinel_agent',
    name: 'Check now',
    actionName: 'a2a_sentinel_check_now',
    hint: 'Fetch the live Agent Card now, snapshot any change and raise findings',
    showUpdate: true,
    form: { showButton: true, style: 'primary' },
    list: { showContextMenu: true },
    roles: [sentinelAdmin],
    script: `var result = new x_snc_a2a_sentinel.A2ASentinel().checkAgent(current);
gs.addInfoMessage('A2A Sentinel: ' + result.message);
action.setRedirectURL(current);`,
})

UiAction({
    $id: Now.ID['a2a-sentinel-run-cycle'],
    table: 'x_snc_a2a_sentinel_agent',
    name: 'Run watch cycle',
    actionName: 'a2a_sentinel_run_cycle',
    hint: 'Import consumed agents from AI Agent Studio, check every watched agent and reconcile orphaned AI assets',
    showQuery: true,
    showUpdate: true,
    list: { showBannerButton: true, style: 'primary' },
    roles: [sentinelAdmin],
    // A server-side list button runs once per listed (or selected) record. The session marker makes one click
    // run one cycle: later invocations in the same request start right after the previous run finished.
    script: `var KEY = 'x_snc_a2a_sentinel.cycle_finished_at';
var session = gs.getSession();
var last = parseInt(session.getClientData(KEY) || '0', 10);
if (new GlideDateTime().getNumericValue() - last > 5000) {
    var s = new x_snc_a2a_sentinel.A2ASentinel().runCycle();
    session.putClientData(KEY, String(new GlideDateTime().getNumericValue()));
    gs.addInfoMessage('A2A Sentinel watch cycle: ' + s.checked + ' agent(s) checked, ' + s.imported + ' imported from AI Agent Studio, ' +
        s.changed + ' card change(s), ' + s.findings + ' new drift/health finding(s), ' + s.orphans + ' orphaned AI asset finding(s).');
}
action.setRedirectURL('x_snc_a2a_sentinel_agent_list.do');`,
})

UiAction({
    $id: Now.ID['a2a-sentinel-retire-orphan'],
    table: 'x_snc_a2a_sentinel_finding',
    name: 'Retire orphaned AI asset',
    actionName: 'a2a_sentinel_retire_orphan',
    hint: 'Set the orphaned AI asset and its CI to Retired and close this finding',
    showUpdate: true,
    condition: "current.finding_type == 'orphan_ai_asset' && current.active == true",
    form: { showButton: true, style: 'destructive' },
    roles: [sentinelAdmin],
    script: `var summary = new x_snc_a2a_sentinel.A2ASentinel().retireOrphan(current);
gs.addInfoMessage('A2A Sentinel: ' + summary);
action.setRedirectURL(current);`,
})

UiAction({
    $id: Now.ID['a2a-sentinel-accept-risk'],
    table: 'x_snc_a2a_sentinel_finding',
    name: 'Accept risk',
    actionName: 'a2a_sentinel_accept_risk',
    hint: 'Record that the change was reviewed and accepted, and close the finding',
    showUpdate: true,
    condition: "current.active == true && current.finding_type != 'orphan_ai_asset'",
    form: { showButton: true, style: 'unstyled' },
    roles: [sentinelAdmin],
    script: `current.work_notes = 'Change reviewed and risk accepted by ' + gs.getUserDisplayName() + '.';
current.state = 3;
current.update();
action.setRedirectURL(current);`,
})

// ---- Configuration ----------------------------------------------------

Property({
    $id: Now.ID['a2a-sentinel-prop-llm'],
    name: 'x_snc_a2a_sentinel.llm_enabled',
    type: 'boolean',
    value: 'true',
    description: 'Use Now Assist (Generative AI Controller) to explain findings in plain English. Falls back to deterministic text when unavailable.',
})

Property({
    $id: Now.ID['a2a-sentinel-prop-latency'],
    name: 'x_snc_a2a_sentinel.latency_degraded_ms',
    type: 'integer',
    value: '3000',
    description: 'Card fetch latency (ms) above which an agent is reported as Degraded.',
})

Property({
    $id: Now.ID['a2a-sentinel-prop-failures'],
    name: 'x_snc_a2a_sentinel.failure_threshold',
    type: 'integer',
    value: '2',
    description: 'Consecutive failed checks before an agent is marked Down and an Unreachable finding is raised.',
})
