// Run on the FLEET instance (PDI): System Definition > Scripts - Background,
// scope "A2A Contoso Agent Fleet". Restores the four agents to their clean seed values.
(function () {
    var seed = {
        'travel-booking': { version: '1.0.0', auth_mode: 'oauth2', oauth_scopes: 'trips.read,trips.book', endpoint_override: '', status: 'online',
            skills: '[{"id":"search_travel","name":"Search travel options","description":"Find flights and hotels for given dates and destinations.","tags":["travel","search"]},{"id":"book_trip","name":"Book trip","description":"Book an approved itinerary on behalf of the employee.","tags":["travel","booking"]}]' },
        'expense-policy': { version: '2.1.0', auth_mode: 'oauth2', oauth_scopes: 'expenses.read', endpoint_override: '', status: 'online',
            skills: '[{"id":"check_policy","name":"Check expense policy","description":"Validate an expense line against policy limits.","tags":["finance","policy"]},{"id":"summarize_receipts","name":"Summarize receipts","description":"Extract totals and categories from receipt text.","tags":["finance"]}]' },
        'vendor-risk': { version: '1.4.2', auth_mode: 'api_key', oauth_scopes: '', endpoint_override: '', status: 'online',
            skills: '[{"id":"vendor_risk_score","name":"Vendor risk score","description":"Return a 0-100 risk score with the top risk drivers.","tags":["risk","vendor"]}]' },
        'hr-letters': { version: '1.0.3', auth_mode: 'oauth2', oauth_scopes: 'letters.draft', endpoint_override: '', status: 'online',
            skills: '[{"id":"draft_letter","name":"Draft HR letter","description":"Draft a verification or experience letter for an employee.","tags":["hr","documents"]}]' },
    };
    // Fields every agent shares in its clean state (changed by test B8).
    var common = { protocol_version: '0.3.0', streaming: false, push_notifications: false, active: true };
    Object.keys(seed).forEach(function (slug) {
        var gr = new GlideRecord('x_2208133_a2afleet_agent');
        if (!gr.get('slug', slug)) return;
        var values = seed[slug];
        Object.keys(common).forEach(function (field) { gr.setValue(field, common[field]); });
        Object.keys(values).forEach(function (field) { gr.setValue(field, values[field]); });
        gr.update();
        gs.print('Restored ' + slug);
    });
})();
