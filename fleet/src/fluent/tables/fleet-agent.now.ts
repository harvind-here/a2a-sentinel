import '@servicenow/sdk/global'
import { Table, StringColumn, ChoiceColumn, BooleanColumn, MultiLineTextColumn, UrlColumn } from '@servicenow/sdk/core'

// A simulated third-party A2A agent. Each record is published as a live
// A2A v0.3 Agent Card by the fleet REST API; editing a record is how we
// create real-world "drift" (new skills, auth changes, endpoint moves, outages).
export const x_2208133_a2afleet_agent = Table({
    name: 'x_2208133_a2afleet_agent',
    label: 'Fleet Agent',
    display: 'name',
    schema: {
        name: StringColumn({ label: 'Name', maxLength: 100, mandatory: true }),
        slug: StringColumn({ label: 'Slug', maxLength: 60, mandatory: true }),
        description: StringColumn({ label: 'Description', maxLength: 1000 }),
        provider_org: StringColumn({ label: 'Provider organization', maxLength: 100, default: 'Contoso Ltd' }),
        version: StringColumn({ label: 'Agent version', maxLength: 20, default: '1.0.0' }),
        protocol_version: StringColumn({ label: 'A2A protocol version', maxLength: 20, default: '0.3.0' }),
        auth_mode: ChoiceColumn({
            label: 'Auth mode',
            dropdown: 'dropdown_without_none',
            default: 'oauth2',
            choices: {
                oauth2: { label: 'OAuth 2.0 (client credentials)', sequence: 0 },
                api_key: { label: 'API key', sequence: 1 },
                none: { label: 'None (public)', sequence: 2 },
            },
        }),
        oauth_scopes: StringColumn({ label: 'OAuth scopes (comma separated)', maxLength: 500 }),
        skills: MultiLineTextColumn({
            label: 'Skills (JSON array)',
            maxLength: 8000,
            default: '[]',
        }),
        endpoint_override: UrlColumn({ label: 'Endpoint override' }),
        status: ChoiceColumn({
            label: 'Status',
            dropdown: 'dropdown_without_none',
            default: 'online',
            choices: {
                online: { label: 'Online', sequence: 0 },
                offline: { label: 'Offline (503)', sequence: 1 },
                error: { label: 'Broken card (500)', sequence: 2 },
            },
        }),
        streaming: BooleanColumn({ label: 'Supports streaming', default: false }),
        push_notifications: BooleanColumn({ label: 'Supports push notifications', default: false }),
        active: BooleanColumn({ label: 'Active', default: true }),
    },
    index: [{ name: 'slug_unique', unique: true, element: 'slug' }],
})
