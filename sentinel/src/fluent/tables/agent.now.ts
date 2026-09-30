import '@servicenow/sdk/global'
import {
    Table,
    StringColumn,
    UrlColumn,
    ChoiceColumn,
    ReferenceColumn,
    BooleanColumn,
    DateTimeColumn,
    IntegerColumn,
} from '@servicenow/sdk/core'

// A third-party A2A agent whose live Agent Card is watched.
export const x_snc_a2a_sentinel_agent = Table({
    name: 'x_snc_a2a_sentinel_agent',
    label: 'Watched Agent',
    display: 'name',
    schema: {
        name: StringColumn({ label: 'Name', maxLength: 100, mandatory: true }),
        card_url: UrlColumn({ label: 'Agent Card URL', mandatory: true }),
        source: ChoiceColumn({
            label: 'Source',
            dropdown: 'dropdown_without_none',
            default: 'manual',
            choices: {
                servicenow_external: { label: 'Consumed via AI Agent Studio', sequence: 0 },
                manual: { label: 'Manually watched', sequence: 1 },
            },
        }),
        sn_agent: ReferenceColumn({ label: 'ServiceNow AI agent', referenceTable: 'sn_aia_agent' }),
        ai_ci: ReferenceColumn({ label: 'AI Function CI', referenceTable: 'cmdb_ci' }),
        active: BooleanColumn({ label: 'Active', default: true }),
        health: ChoiceColumn({
            label: 'Health',
            dropdown: 'dropdown_without_none',
            default: 'unknown',
            choices: {
                unknown: { label: 'Unknown', sequence: 0 },
                healthy: { label: 'Healthy', sequence: 1 },
                degraded: { label: 'Degraded', sequence: 2 },
                down: { label: 'Down', sequence: 3 },
            },
        }),
        risk: ChoiceColumn({
            label: 'Risk',
            dropdown: 'dropdown_without_none',
            default: 'none',
            choices: {
                none: { label: 'None', sequence: 0 },
                info: { label: 'Info', sequence: 1 },
                low: { label: 'Low', sequence: 2 },
                medium: { label: 'Medium', sequence: 3 },
                high: { label: 'High', sequence: 4 },
                critical: { label: 'Critical', sequence: 5 },
            },
        }),
        last_checked: DateTimeColumn({ label: 'Last checked' }),
        last_http_status: IntegerColumn({ label: 'Last HTTP status' }),
        last_latency_ms: IntegerColumn({ label: 'Last latency (ms)' }),
        consecutive_failures: IntegerColumn({ label: 'Consecutive failures', default: 0 }),
        current_hash: StringColumn({ label: 'Current card hash', maxLength: 64 }),
        last_snapshot: ReferenceColumn({ label: 'Current card snapshot', referenceTable: 'x_snc_a2a_sentinel_snapshot' }),
        card_version: StringColumn({ label: 'Card version', maxLength: 40 }),
        protocol_version: StringColumn({ label: 'A2A protocol', maxLength: 20 }),
        skill_count: IntegerColumn({ label: 'Skills' }),
        auth_summary: StringColumn({ label: 'Authentication', maxLength: 200 }),
        endpoint_host: StringColumn({ label: 'Endpoint host', maxLength: 200 }),
    },
})
