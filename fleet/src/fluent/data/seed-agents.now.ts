import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Four simulated third-party agents. They start "clean"; the demo introduces
// drift by editing these records (see docs/demo-script.md).

Record({
    $id: Now.ID['fleet-agent-travel'],
    table: 'x_2208133_a2afleet_agent',
    data: {
        name: 'Contoso Travel Booking Agent',
        slug: 'travel-booking',
        description: 'Searches flights and hotels and books business trips within travel policy.',
        provider_org: 'Contoso Ltd',
        version: '1.0.0',
        protocol_version: '0.3.0',
        auth_mode: 'oauth2',
        oauth_scopes: 'trips.read,trips.book',
        skills: JSON.stringify([
            { id: 'search_travel', name: 'Search travel options', description: 'Find flights and hotels for given dates and destinations.', tags: ['travel', 'search'] },
            { id: 'book_trip', name: 'Book trip', description: 'Book an approved itinerary on behalf of the employee.', tags: ['travel', 'booking'] },
        ]),
        status: 'online',
        streaming: false,
        push_notifications: false,
        active: true,
    },
})

Record({
    $id: Now.ID['fleet-agent-expense'],
    table: 'x_2208133_a2afleet_agent',
    data: {
        name: 'Contoso Expense Policy Agent',
        slug: 'expense-policy',
        description: 'Checks expense claims against the corporate expense policy and summarises receipts.',
        provider_org: 'Contoso Ltd',
        version: '2.1.0',
        protocol_version: '0.3.0',
        auth_mode: 'oauth2',
        oauth_scopes: 'expenses.read',
        skills: JSON.stringify([
            { id: 'check_policy', name: 'Check expense policy', description: 'Validate an expense line against policy limits.', tags: ['finance', 'policy'] },
            { id: 'summarize_receipts', name: 'Summarize receipts', description: 'Extract totals and categories from receipt text.', tags: ['finance'] },
        ]),
        status: 'online',
        streaming: false,
        push_notifications: false,
        active: true,
    },
})

Record({
    $id: Now.ID['fleet-agent-vendor'],
    table: 'x_2208133_a2afleet_agent',
    data: {
        name: 'Contoso Vendor Risk Agent',
        slug: 'vendor-risk',
        description: 'Scores third-party vendors for security and financial risk.',
        provider_org: 'Contoso Ltd',
        version: '1.4.2',
        protocol_version: '0.3.0',
        auth_mode: 'api_key',
        oauth_scopes: '',
        skills: JSON.stringify([
            { id: 'vendor_risk_score', name: 'Vendor risk score', description: 'Return a 0-100 risk score with the top risk drivers.', tags: ['risk', 'vendor'] },
        ]),
        status: 'online',
        streaming: false,
        push_notifications: false,
        active: true,
    },
})

Record({
    $id: Now.ID['fleet-agent-hr'],
    table: 'x_2208133_a2afleet_agent',
    data: {
        name: 'Contoso HR Letters Agent',
        slug: 'hr-letters',
        description: 'Drafts employment verification and experience letters from HR templates.',
        provider_org: 'Contoso Ltd',
        version: '1.0.3',
        protocol_version: '0.3.0',
        auth_mode: 'oauth2',
        oauth_scopes: 'letters.draft',
        skills: JSON.stringify([
            { id: 'draft_letter', name: 'Draft HR letter', description: 'Draft a verification or experience letter for an employee.', tags: ['hr', 'documents'] },
        ]),
        status: 'online',
        streaming: false,
        push_notifications: false,
        active: true,
    },
})
