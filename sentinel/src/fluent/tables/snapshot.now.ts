import '@servicenow/sdk/global'
import { Table, StringColumn, ChoiceColumn, ReferenceColumn, DateTimeColumn, IntegerColumn, MultiLineTextColumn } from '@servicenow/sdk/core'
import { sentinelAdmin } from '../security/roles.now'

// Versioned history of an agent's Agent Card: one row per distinct card content.
export const x_snc_a2a_sentinel_snapshot = Table({
    name: 'x_snc_a2a_sentinel_snapshot',
    label: 'Card Snapshot',
    display: 'card_hash',
    createAccessControls: true,
    userRole: sentinelAdmin,
    schema: {
        agent: ReferenceColumn({ label: 'Watched agent', referenceTable: 'x_snc_a2a_sentinel_agent', mandatory: true }),
        source: ChoiceColumn({
            label: 'Source',
            dropdown: 'dropdown_without_none',
            default: 'live',
            choices: {
                live: { label: 'Live fetch', sequence: 0 },
                registration: { label: 'ServiceNow registration record', sequence: 1 },
            },
        }),
        fetched_on: DateTimeColumn({ label: 'Fetched on' }),
        card_hash: StringColumn({ label: 'Card hash (SHA-256)', maxLength: 64 }),
        card_version: StringColumn({ label: 'Card version', maxLength: 40 }),
        protocol_version: StringColumn({ label: 'A2A protocol', maxLength: 20 }),
        skill_count: IntegerColumn({ label: 'Skills' }),
        auth_summary: StringColumn({ label: 'Authentication', maxLength: 200 }),
        endpoint_host: StringColumn({ label: 'Endpoint host', maxLength: 200 }),
        card: MultiLineTextColumn({ label: 'Agent Card (JSON)', maxLength: 65000 }),
    },
})
