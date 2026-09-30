# Evidence: why A2A Sentinel exists

Every claim below was verified on a ServiceNow lab instance on **30 Sep 2026**, running
**Now Assist AI Agents (`sn_aia`) 6.0.23** and **AI Control Tower Core (`sn_ai_governance`) 5.0.6**,
by reading platform code and data. Later releases may change this behaviour.

## What AI Control Tower already does (credit where due)

- Every AI agent in AI Agent Studio, **including external A2A agents ServiceNow consumes**, is inventoried
  hourly as an **AI System Digital Asset** (`alm_ai_system_digital_asset`) and an **AI Function CI**
  (`cmdb_ci_function_ai`). Jobs: *Sync Now Assist AI Assets*, *Populate AI Assets From MIF Virtual Table*.
- AI Discovery connectors cover hyperscaler and SaaS platforms (Bedrock, Azure AI Foundry, Vertex, Copilot Studio, ...).
- MCP servers are synced every 15 minutes, and the AI Gateway records MCP success rate and latency.
- The CI class has native `card` (JSON) and `well_known_uri` fields.

## Gap 1: a consumed agent's capabilities never reach the CMDB

`CIIntegrationUtilSNC._addAgentCardFieldsToPayload()` only stores the card for **public** agents, meaning agents
ServiceNow *exposes*. Consumed third-party agents are never public:

```text
if (!this.aigUtil.isAgentPublic(agentSysId)) { values.card = ''; ... return; }
```

Observed: CI **Atlassian Rovo** (external A2A agent, `public=false`) has `card` length 0 and an empty `well_known_uri`,
while an internal agent that ServiceNow exposes via A2A has a 2,653-character card.
**Result:** governance sees *that* a third-party agent exists, but not *what it can do* or *how it authenticates*.

## Gap 2: the registered card is frozen

The only copy of a consumed agent's card is `sn_aia_external_agent_card.details`, captured once when the agent
is registered. Rovo's record was created 24 Sep 21:34 and never updated. No scheduled job re-fetches it; the only
A2A flows are *External AI Agent Card / Provider - A2A Protocol* (discovery) and *AI Agent A2A Message Responder*.
**Result:** if the provider adds a destructive skill, removes authentication or moves its endpoint, ServiceNow
keeps trusting the old card and **nobody is told**.

## Gap 3: deleted agents stay "Deployed" forever

`NowAssistAIAssetsUtilSNC._syncAIAgents()` iterates only agents that **still exist** (`new GlideRecord('sn_aia_agent').query()`)
and never sets an install status for agents. Skills, prompts and virtual agents *do* get a Deployed-to-Retired
transition; agents do not.

Observed: the asset for agent `d620eaa0...` (deleted 24 Sep 13:37:14 per `sys_audit_delete`) was still
**Deployed**, and its CI still **Installed / Operational**, six days later.

## Gap 4: orphaned assets still count toward licensing

`AIInventoryLicensingUtilSNC` aggregates AI inventory for licensing and excludes only Retired assets:

```text
... ^asset.install_status!=32^ ...
```

Because Gap 3 never retires deleted agents, **orphaned assets remain in the AI inventory count used for licensing**.

## Gap 5: no A2A health or security posture checks

- The only external-agent security job (*AI Security Daily update of external agent security info*) calls
  `AiSPExtAgentSecurityManager.resolvePrivilegedAgent()`, which implements **AWS Bedrock only**
  (`_resolvePrivilegedAgentForBedrock`).
- MCP has gateway metrics; A2A endpoints are not probed. A2A logs (`sn_aia_external_agent_exec_history`)
  record individual calls, not proactive health.

## Real-world conformance observation

Atlassian Rovo publishes its card at the legacy `/.well-known/agent.json`; the A2A v0.3 path
`/.well-known/agent-card.json` returns 404. A2A Sentinel reports this as a Low finding.

## Design consequence

A2A Sentinel **extends** AI Control Tower rather than competing with it:

- It reads AICT's inventory and AI Agent Studio's registration records.
- It keeps its own versioned card history. It does not write to the CI `card` field, because AICT's hourly
  sync would blank it again for non-public agents (Gap 1).
- It retires orphaned AICT assets **only** through an explicit, audited admin action.
