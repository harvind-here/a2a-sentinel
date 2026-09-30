import '@servicenow/sdk/global'
import { Role } from '@servicenow/sdk/core'

export const sentinelViewer = Role({
    name: 'x_snc_a2a_sentinel.viewer',
    description: 'Read-only access to A2A Sentinel watched agents, card history, probes and findings.',
})

export const sentinelAdmin = Role({
    name: 'x_snc_a2a_sentinel.admin',
    description: 'Manage A2A Sentinel: watched agents, watch cycles, findings and orphan retirement.',
    containsRoles: [sentinelViewer],
})
