import '@servicenow/sdk/global'
import { ApplicationMenu, Record } from '@servicenow/sdk/core'
import { sentinelViewer, sentinelAdmin } from '../security/roles.now'

const menu = ApplicationMenu({
    $id: Now.ID['a2a-sentinel-menu'],
    title: 'A2A Sentinel',
    hint: 'Supply-chain assurance for third-party A2A agents consumed by ServiceNow',
    roles: [sentinelViewer, sentinelAdmin],
    active: true,
})

Record({
    $id: Now.ID['a2a-sentinel-module-agents'],
    table: 'sys_app_module',
    data: { title: 'Watched Agents', application: menu, link_type: 'LIST', name: 'x_snc_a2a_sentinel_agent', roles: ['x_snc_a2a_sentinel.viewer'], active: true, order: 100 },
})

Record({
    $id: Now.ID['a2a-sentinel-module-open-findings'],
    table: 'sys_app_module',
    data: {
        title: 'Open Findings',
        application: menu,
        link_type: 'FILTER',
        name: 'x_snc_a2a_sentinel_finding',
        filter: 'active=true^ORDERBYpriority^ORDERBYDESCsys_created_on',
        roles: ['x_snc_a2a_sentinel.viewer'],
        active: true,
        order: 200,
    },
})

Record({
    $id: Now.ID['a2a-sentinel-module-all-findings'],
    table: 'sys_app_module',
    data: { title: 'All Findings', application: menu, link_type: 'LIST', name: 'x_snc_a2a_sentinel_finding', roles: ['x_snc_a2a_sentinel.viewer'], active: true, order: 300 },
})

Record({
    $id: Now.ID['a2a-sentinel-module-snapshots'],
    table: 'sys_app_module',
    data: { title: 'Card History', application: menu, link_type: 'LIST', name: 'x_snc_a2a_sentinel_snapshot', roles: ['x_snc_a2a_sentinel.viewer'], active: true, order: 400 },
})

Record({
    $id: Now.ID['a2a-sentinel-module-probes'],
    table: 'sys_app_module',
    data: { title: 'Health Probes', application: menu, link_type: 'LIST', name: 'x_snc_a2a_sentinel_probe', roles: ['x_snc_a2a_sentinel.viewer'], active: true, order: 500 },
})
