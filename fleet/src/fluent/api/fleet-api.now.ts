import '@servicenow/sdk/global'
import { RestApi } from '@servicenow/sdk/core'
import { listAgents, getCard, rpc } from '../../server/fleet-api'

// Public, unauthenticated endpoints: they impersonate a third-party agent provider
// whose Agent Cards are publicly discoverable (as A2A expects). Demo data only.
RestApi({
    $id: Now.ID['fleet-api'],
    name: 'Contoso A2A Agent Fleet',
    serviceId: 'fleet',
    shortDescription: 'Publishes simulated third-party A2A v0.3 Agent Cards and a minimal JSON-RPC endpoint for the A2A Sentinel demo.',
    consumes: 'application/json',
    produces: 'application/json',
    routes: [
        {
            $id: Now.ID['fleet-api-list'],
            name: 'List agents',
            method: 'GET',
            path: '/agents',
            script: listAgents,
            authentication: false,
            authorization: false,
            internalRole: false,
        },
        {
            $id: Now.ID['fleet-api-card'],
            name: 'Agent card',
            method: 'GET',
            path: '/agents/{slug}/card',
            script: getCard,
            authentication: false,
            authorization: false,
            internalRole: false,
        },
        {
            $id: Now.ID['fleet-api-rpc'],
            name: 'Agent JSON-RPC',
            method: 'POST',
            path: '/agents/{slug}/rpc',
            script: rpc,
            authentication: false,
            authorization: false,
            internalRole: false,
        },
    ],
})
