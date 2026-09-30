import '@servicenow/sdk/global'
import { Table, StringColumn, ChoiceColumn, ReferenceColumn, MultiLineTextColumn } from '@servicenow/sdk/core'

// A governance finding. Extends task so it gets numbering, state, assignment and work notes.
export const x_snc_a2a_sentinel_finding = Table({
    name: 'x_snc_a2a_sentinel_finding',
    label: 'Sentinel Finding',
    extends: 'task',
    autoNumber: { prefix: 'A2AF', number: 1000, numberOfDigits: 7 },
    schema: {
        finding_type: ChoiceColumn({
            label: 'Finding type',
            dropdown: 'dropdown_without_none',
            choices: {
                auth_removed: { label: 'Authentication removed', sequence: 0 },
                auth_downgraded: { label: 'Authentication downgraded', sequence: 1 },
                auth_changed: { label: 'Authentication changed', sequence: 2 },
                scope_expanded: { label: 'OAuth scopes expanded', sequence: 3 },
                skill_added: { label: 'Skill added', sequence: 4 },
                skill_removed: { label: 'Skill removed', sequence: 5 },
                skill_modified: { label: 'Skill modified', sequence: 6 },
                endpoint_changed: { label: 'Endpoint changed', sequence: 7 },
                insecure_transport: { label: 'Insecure transport', sequence: 8 },
                protocol_changed: { label: 'Protocol version changed', sequence: 9 },
                capability_changed: { label: 'Capabilities changed', sequence: 10 },
                unversioned_change: { label: 'Unversioned change', sequence: 11 },
                unreachable: { label: 'Card unreachable', sequence: 12 },
                invalid_card: { label: 'Invalid Agent Card', sequence: 13 },
                no_auth_declared: { label: 'No authentication declared', sequence: 14 },
                legacy_card_path: { label: 'Legacy card path', sequence: 15 },
                orphan_ai_asset: { label: 'Orphaned AI asset', sequence: 16 },
            },
        }),
        severity: ChoiceColumn({
            label: 'Severity',
            dropdown: 'dropdown_without_none',
            default: 'medium',
            choices: {
                critical: { label: 'Critical', sequence: 0 },
                high: { label: 'High', sequence: 1 },
                medium: { label: 'Medium', sequence: 2 },
                low: { label: 'Low', sequence: 3 },
                info: { label: 'Info', sequence: 4 },
            },
        }),
        agent: ReferenceColumn({ label: 'Watched agent', referenceTable: 'x_snc_a2a_sentinel_agent' }),
        before_snapshot: ReferenceColumn({ label: 'Card before', referenceTable: 'x_snc_a2a_sentinel_snapshot' }),
        after_snapshot: ReferenceColumn({ label: 'Card after', referenceTable: 'x_snc_a2a_sentinel_snapshot' }),
        affected_ci: ReferenceColumn({ label: 'Affected CI', referenceTable: 'cmdb_ci' }),
        affected_asset: ReferenceColumn({ label: 'Affected AI asset', referenceTable: 'alm_asset' }),
        ai_summary: MultiLineTextColumn({ label: 'AI explanation (Now Assist)', maxLength: 4000 }),
        recommendation: MultiLineTextColumn({ label: 'Recommended action', maxLength: 2000 }),
        evidence: MultiLineTextColumn({ label: 'Evidence (JSON)', maxLength: 8000 }),
        fingerprint: StringColumn({ label: 'Fingerprint', maxLength: 250 }),
    },
})
