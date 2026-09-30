import '@servicenow/sdk/global'
import { Form, List, default_view } from '@servicenow/sdk/core'

// ---- Watched Agent --------------------------------------------------------

Form({
    table: 'x_snc_a2a_sentinel_agent',
    view: default_view,
    sections: [
        {
            caption: 'Agent',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [
                        { field: 'name', type: 'table_field' },
                        { field: 'card_url', type: 'table_field' },
                        { field: 'source', type: 'table_field' },
                        { field: 'sn_agent', type: 'table_field' },
                        { field: 'ai_ci', type: 'table_field' },
                        { field: 'active', type: 'table_field' },
                    ],
                    rightElements: [
                        { field: 'health', type: 'table_field' },
                        { field: 'risk', type: 'table_field' },
                        { field: 'last_checked', type: 'table_field' },
                        { field: 'last_http_status', type: 'table_field' },
                        { field: 'last_latency_ms', type: 'table_field' },
                        { field: 'consecutive_failures', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Current Agent Card',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [
                        { field: 'card_version', type: 'table_field' },
                        { field: 'protocol_version', type: 'table_field' },
                        { field: 'skill_count', type: 'table_field' },
                    ],
                    rightElements: [
                        { field: 'auth_summary', type: 'table_field' },
                        { field: 'endpoint_host', type: 'table_field' },
                        { field: 'last_snapshot', type: 'table_field' },
                    ],
                },
                {
                    layout: 'one-column',
                    elements: [
                        { type: 'list', listType: '12M', listRef: 'x_snc_a2a_sentinel_finding.agent' },
                        { type: 'list', listType: '12M', listRef: 'x_snc_a2a_sentinel_snapshot.agent' },
                        { type: 'list', listType: '12M', listRef: 'x_snc_a2a_sentinel_probe.agent' },
                    ],
                },
            ],
        },
    ],
})

List({
    table: 'x_snc_a2a_sentinel_agent',
    view: default_view,
    columns: ['name', 'source', 'health', 'risk', 'card_version', 'skill_count', 'auth_summary', 'endpoint_host', 'last_latency_ms', 'last_checked'],
})

// ---- Finding --------------------------------------------------------------

Form({
    table: 'x_snc_a2a_sentinel_finding',
    view: default_view,
    sections: [
        {
            caption: 'Finding',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [
                        { field: 'number', type: 'table_field' },
                        { field: 'finding_type', type: 'table_field' },
                        { field: 'severity', type: 'table_field' },
                        { field: 'agent', type: 'table_field' },
                    ],
                    rightElements: [
                        { field: 'state', type: 'table_field' },
                        { field: 'priority', type: 'table_field' },
                        { field: 'affected_ci', type: 'table_field' },
                        { field: 'affected_asset', type: 'table_field' },
                    ],
                },
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'short_description', type: 'table_field' },
                        { field: 'description', type: 'table_field' },
                        { field: 'ai_summary', type: 'table_field' },
                        { field: 'recommendation', type: 'table_field' },
                        { field: 'work_notes', type: 'table_field' },
                        { type: 'formatter', formatterRef: 'Activities_Filtered' },
                    ],
                },
            ],
        },
        {
            caption: 'Evidence',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [{ field: 'before_snapshot', type: 'table_field' }],
                    rightElements: [{ field: 'after_snapshot', type: 'table_field' }],
                },
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'evidence', type: 'table_field' },
                        { field: 'fingerprint', type: 'table_field' },
                    ],
                },
            ],
        },
    ],
})

List({
    table: 'x_snc_a2a_sentinel_finding',
    view: default_view,
    columns: ['number', 'severity', 'finding_type', 'short_description', 'agent', 'state', 'sys_created_on'],
})

// ---- Snapshot and Probe ---------------------------------------------------

Form({
    table: 'x_snc_a2a_sentinel_snapshot',
    view: default_view,
    sections: [
        {
            caption: 'Card Snapshot',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [
                        { field: 'agent', type: 'table_field' },
                        { field: 'source', type: 'table_field' },
                        { field: 'fetched_on', type: 'table_field' },
                        { field: 'card_hash', type: 'table_field' },
                    ],
                    rightElements: [
                        { field: 'card_version', type: 'table_field' },
                        { field: 'protocol_version', type: 'table_field' },
                        { field: 'skill_count', type: 'table_field' },
                        { field: 'auth_summary', type: 'table_field' },
                        { field: 'endpoint_host', type: 'table_field' },
                    ],
                },
                { layout: 'one-column', elements: [{ field: 'card', type: 'table_field' }] },
            ],
        },
    ],
})

List({
    table: 'x_snc_a2a_sentinel_snapshot',
    view: default_view,
    columns: ['agent', 'source', 'fetched_on', 'card_version', 'skill_count', 'auth_summary', 'endpoint_host', 'card_hash'],
})

Form({
    table: 'x_snc_a2a_sentinel_probe',
    view: default_view,
    sections: [
        {
            caption: 'Health Probe',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [
                        { field: 'agent', type: 'table_field' },
                        { field: 'probed_on', type: 'table_field' },
                        { field: 'outcome', type: 'table_field' },
                        { field: 'changed', type: 'table_field' },
                    ],
                    rightElements: [
                        { field: 'http_status', type: 'table_field' },
                        { field: 'latency_ms', type: 'table_field' },
                        { field: 'card_hash', type: 'table_field' },
                    ],
                },
                { layout: 'one-column', elements: [{ field: 'error', type: 'table_field' }] },
            ],
        },
    ],
})

List({
    table: 'x_snc_a2a_sentinel_probe',
    view: default_view,
    columns: ['agent', 'probed_on', 'outcome', 'http_status', 'latency_ms', 'changed', 'error'],
})
