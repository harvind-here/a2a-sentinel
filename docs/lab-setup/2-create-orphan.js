// Run after 1-register-rovo-and-test-agent.js, once "Sync Now Assist AI Assets" has finished.
// System Definition > Scripts - Background, scope "global".
//
// Deletes the agent "Sentinel Orphan Test" the same way a user would. AI Control Tower's agent sync only visits agents
// that still exist, so the agent's AI asset stays "Deployed" and its CI "Installed": an orphan.
// Afterwards, in A2A Sentinel, open Watched Agents and click "Run watch cycle". It imports Atlassian Rovo and
// raises the orphaned AI asset finding.
(function () {
    var NAME = 'Sentinel Orphan Test';
    var ag = new GlideRecord('sn_aia_agent');
    if (!ag.get('name', NAME)) {
        gs.print(NAME + ' not found: already deleted, or step 1 was not run.');
        return;
    }
    var agentId = ag.getUniqueValue();
    var asset = new GlideRecord('alm_ai_system_digital_asset');
    asset.addQuery('servicenow_ref_id', agentId);
    asset.query();
    if (!asset.next()) {
        gs.print('No AI asset for ' + NAME + ' yet. Wait for "Sync Now Assist AI Assets" to finish, then run this again.');
        return;
    }
    ag.deleteRecord();
    gs.print('Deleted agent ' + NAME + ' (' + agentId + ').');
    asset.get(asset.getUniqueValue());
    gs.print('Its AI asset ' + asset.getUniqueValue() + ' is still: ' + asset.getDisplayValue('install_status'));
    gs.print('Now open A2A Sentinel > Watched Agents and click "Run watch cycle".');
})();
