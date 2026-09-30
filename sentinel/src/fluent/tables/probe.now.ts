import '@servicenow/sdk/global'
import { Table, StringColumn, ChoiceColumn, ReferenceColumn, DateTimeColumn, IntegerColumn, BooleanColumn } from '@servicenow/sdk/core'
import { sentinelAdmin } from '../security/roles.now'

// One row per health check of an agent's live card endpoint.
export const x_snc_a2a_sentinel_probe = Table({
    name: 'x_snc_a2a_sentinel_probe',
    label: 'Health Probe',
    createAccessControls: true,
    userRole: sentinelAdmin,
    schema: {
        agent: ReferenceColumn({ label: 'Watched agent', referenceTable: 'x_snc_a2a_sentinel_agent', mandatory: true }),
        probed_on: DateTimeColumn({ label: 'Probed on' }),
        outcome: ChoiceColumn({
            label: 'Outcome',
            dropdown: 'dropdown_without_none',
            default: 'ok',
            choices: {
                ok: { label: 'OK', sequence: 0 },
                http_error: { label: 'HTTP error', sequence: 1 },
                unreachable: { label: 'Unreachable', sequence: 2 },
                invalid_json: { label: 'Invalid JSON', sequence: 3 },
                invalid_card: { label: 'Invalid Agent Card', sequence: 4 },
            },
        }),
        http_status: IntegerColumn({ label: 'HTTP status' }),
        latency_ms: IntegerColumn({ label: 'Latency (ms)' }),
        changed: BooleanColumn({ label: 'Card changed', default: false }),
        card_hash: StringColumn({ label: 'Card hash', maxLength: 64 }),
        error: StringColumn({ label: 'Error', maxLength: 1000 }),
    },
})
