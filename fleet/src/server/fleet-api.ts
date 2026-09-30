import { gs, GlideRecord } from '@servicenow/glide'

const TABLE = 'x_2208133_a2afleet_agent'
const API_BASE = 'api/x_2208133_a2afleet/fleet'

type Skill = { id: string; name: string; description?: string; tags?: string[] }

function baseUrl(): string {
    const uri = gs.getProperty('glide.servlet.uri') || ''
    return uri.endsWith('/') ? uri : uri + '/'
}

function isTrue(value: string | null): boolean {
    return value === '1' || value === 'true'
}

function parseSkills(raw: string | null): Skill[] {
    try {
        const parsed = JSON.parse(raw || '[]')
        return Array.isArray(parsed) ? parsed : []
    } catch (e) {
        return []
    }
}

function securityFor(mode: string, scopes: string): { securitySchemes: object; security: object[] } {
    if (mode === 'none') {
        return { securitySchemes: {}, security: [] }
    }
    if (mode === 'api_key') {
        return {
            securitySchemes: { apiKey: { type: 'apiKey', in: 'header', name: 'X-Contoso-Key' } },
            security: [{ apiKey: [] }],
        }
    }
    const scopeMap: { [scope: string]: string } = {}
    scopes
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
        .forEach((s) => (scopeMap[s] = s))
    return {
        securitySchemes: {
            oauth2: {
                type: 'oauth2',
                flows: { clientCredentials: { tokenUrl: 'https://login.contoso.example.com/oauth2/token', scopes: scopeMap } },
            },
        },
        security: [{ oauth2: Object.keys(scopeMap) }],
    }
}

/** Renders a fleet agent record as an A2A v0.3 Agent Card. */
export function buildCard(gr: any): object {
    const slug = gr.getValue('slug')
    const security = securityFor(gr.getValue('auth_mode') || 'oauth2', gr.getValue('oauth_scopes') || '')
    return {
        protocolVersion: gr.getValue('protocol_version') || '0.3.0',
        name: gr.getValue('name'),
        description: gr.getValue('description') || '',
        url: gr.getValue('endpoint_override') || `${baseUrl()}${API_BASE}/agents/${slug}/rpc`,
        preferredTransport: 'JSONRPC',
        provider: { organization: gr.getValue('provider_org') || 'Contoso Ltd', url: 'https://contoso.example.com' },
        version: gr.getValue('version') || '1.0.0',
        capabilities: {
            streaming: isTrue(gr.getValue('streaming')),
            pushNotifications: isTrue(gr.getValue('push_notifications')),
            stateTransitionHistory: false,
        },
        securitySchemes: security.securitySchemes,
        security: security.security,
        defaultInputModes: ['text/plain'],
        defaultOutputModes: ['text/plain'],
        skills: parseSkills(gr.getValue('skills')).map((s) => ({
            id: s.id,
            name: s.name,
            description: s.description || '',
            tags: s.tags || [],
        })),
    }
}

function findAgent(slug: string): any {
    const gr = new GlideRecord(TABLE)
    gr.addQuery('slug', slug)
    gr.addQuery('active', true)
    gr.setLimit(1)
    gr.query()
    return gr.next() ? gr : null
}

function write(response: any, status: number, contentType: string, body: string) {
    response.setStatus(status)
    response.setContentType(contentType)
    response.getStreamWriter().writeString(body)
}

function writeJson(response: any, status: number, body: object) {
    write(response, status, 'application/json', JSON.stringify(body, null, 2))
}

/** GET /agents : a simple curated registry of all active fleet agents. */
export function listAgents(request: any, response: any) {
    const agents: object[] = []
    const gr = new GlideRecord(TABLE)
    gr.addQuery('active', true)
    gr.orderBy('name')
    gr.query()
    while (gr.next()) {
        agents.push({
            name: gr.getValue('name'),
            slug: gr.getValue('slug'),
            status: gr.getValue('status'),
            cardUrl: `${baseUrl()}${API_BASE}/agents/${gr.getValue('slug')}/card`,
        })
    }
    writeJson(response, 200, { provider: 'Contoso Ltd (simulated)', agents })
}

/** GET /agents/{slug}/card : the agent's A2A Agent Card, honouring simulated outages. */
export function getCard(request: any, response: any) {
    const agent = findAgent(request.pathParams.slug)
    if (!agent) {
        writeJson(response, 404, { error: 'Agent not found' })
        return
    }
    const status = agent.getValue('status')
    if (status === 'offline') {
        writeJson(response, 503, { error: 'Service Unavailable' })
        return
    }
    if (status === 'error') {
        write(response, 500, 'text/html', '<html><body><h1>500 Internal Server Error</h1></body></html>')
        return
    }
    writeJson(response, 200, buildCard(agent))
}

/** POST /agents/{slug}/rpc : minimal A2A JSON-RPC responder (message/send only). */
export function rpc(request: any, response: any) {
    let payload: any = {}
    try {
        payload = JSON.parse(request.body.dataString || '{}')
    } catch (e) {
        writeJson(response, 400, { jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } })
        return
    }
    const agent = findAgent(request.pathParams.slug)
    if (!agent || agent.getValue('status') !== 'online') {
        writeJson(response, 503, { jsonrpc: '2.0', id: payload.id ?? null, error: { code: -32603, message: 'Agent unavailable' } })
        return
    }
    if (payload.method !== 'message/send') {
        writeJson(response, 200, { jsonrpc: '2.0', id: payload.id ?? null, error: { code: -32601, message: 'Method not found' } })
        return
    }
    const parts = payload.params?.message?.parts || []
    const text = parts.filter((p: any) => p.kind === 'text').map((p: any) => p.text).join(' ')
    writeJson(response, 200, {
        jsonrpc: '2.0',
        id: payload.id ?? null,
        result: {
            kind: 'task',
            id: gs.generateGUID(),
            contextId: payload.params?.message?.contextId || gs.generateGUID(),
            status: { state: 'completed', timestamp: new Date().toISOString() },
            artifacts: [
                {
                    artifactId: gs.generateGUID(),
                    parts: [{ kind: 'text', text: `[${agent.getValue('name')}] Simulated response to: "${text}"` }],
                },
            ],
        },
    })
}
