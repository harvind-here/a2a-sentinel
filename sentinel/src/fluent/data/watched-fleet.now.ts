import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// The simulated Contoso fleet (published from a separate PDI) watched as
// third-party agents. Agents registered in AI Agent Studio (e.g. Atlassian Rovo)
// are imported automatically by the watch cycle; these are watched by URL.
const FLEET = 'https://dev342222.service-now.com/api/x_2208133_a2afleet/fleet/agents'

Record({
    $id: Now.ID['watched-contoso-travel'],
    table: 'x_snc_a2a_sentinel_agent',
    data: { name: 'Contoso Travel Booking Agent', card_url: `${FLEET}/travel-booking/card`, source: 'manual', active: true, health: 'unknown', risk: 'none', consecutive_failures: 0 },
})

Record({
    $id: Now.ID['watched-contoso-expense'],
    table: 'x_snc_a2a_sentinel_agent',
    data: { name: 'Contoso Expense Policy Agent', card_url: `${FLEET}/expense-policy/card`, source: 'manual', active: true, health: 'unknown', risk: 'none', consecutive_failures: 0 },
})

Record({
    $id: Now.ID['watched-contoso-vendor'],
    table: 'x_snc_a2a_sentinel_agent',
    data: { name: 'Contoso Vendor Risk Agent', card_url: `${FLEET}/vendor-risk/card`, source: 'manual', active: true, health: 'unknown', risk: 'none', consecutive_failures: 0 },
})

Record({
    $id: Now.ID['watched-contoso-hr'],
    table: 'x_snc_a2a_sentinel_agent',
    data: { name: 'Contoso HR Letters Agent', card_url: `${FLEET}/hr-letters/card`, source: 'manual', active: true, health: 'unknown', risk: 'none', consecutive_failures: 0 },
})
