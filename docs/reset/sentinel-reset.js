// Run on the SENTINEL instance (lab): System Definition > Scripts - Background,
// scope "A2A Sentinel". Clears the demo history for the Contoso agents so the next
// watch cycle captures fresh baselines. Findings for other agents (e.g. Atlassian Rovo)
// and the orphaned-asset finding are kept.
(function () {
    var tables = ['x_snc_a2a_sentinel_finding', 'x_snc_a2a_sentinel_snapshot', 'x_snc_a2a_sentinel_probe'];
    tables.forEach(function (t) {
        var gr = new GlideRecord(t);
        gr.addQuery('agent.name', 'STARTSWITH', 'Contoso');
        gr.query();
        var count = gr.getRowCount();
        gr.deleteMultiple();
        gs.print(t + ': deleted ' + count);
    });
    var w = new GlideRecord('x_snc_a2a_sentinel_agent');
    w.addQuery('name', 'STARTSWITH', 'Contoso');
    w.query();
    while (w.next()) {
        ['current_hash', 'last_snapshot', 'card_version', 'protocol_version', 'skill_count', 'auth_summary',
            'endpoint_host', 'last_checked', 'last_http_status', 'last_latency_ms'].forEach(function (f) { w.setValue(f, ''); });
        w.setValue('health', 'unknown');
        w.setValue('risk', 'none');
        w.setValue('consecutive_failures', 0);
        w.update();
    }
    var stats = new x_snc_a2a_sentinel.A2ASentinel().runCycle();
    gs.print('Fresh baselines captured: ' + JSON.stringify(stats));
})();
