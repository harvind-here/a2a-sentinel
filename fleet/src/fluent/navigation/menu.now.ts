import '@servicenow/sdk/global'
import { ApplicationMenu, Record } from '@servicenow/sdk/core'

const fleetMenu = ApplicationMenu({
    $id: Now.ID['fleet-menu'],
    title: 'A2A Contoso Fleet',
    hint: 'Simulated third-party A2A agents used by the A2A Sentinel demo',
    roles: ['admin'],
    active: true,
})

Record({
    $id: Now.ID['fleet-menu-agents'],
    table: 'sys_app_module',
    data: {
        title: 'Fleet Agents',
        application: fleetMenu,
        link_type: 'LIST',
        name: 'x_2208133_a2afleet_agent',
        hint: 'Edit an agent to simulate drift (skills, auth, endpoint, outage)',
        roles: ['admin'],
        active: true,
        order: 100,
    },
})
