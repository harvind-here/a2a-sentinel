# Evidence: why A2A Sentinel exists

Every claim below was verified on a ServiceNow lab instance on **30 Sep 2026**, running
**Now Assist AI Agents (`sn_aia`) 6.0.23** and **AI Control Tower Core (`sn_ai_governance`) 5.0.6**,
by reading platform code and data.

It was **re-verified on 3 Oct 2026** on a second lab running **ServiceNow Otto AI Agents (`sn_aia`, renamed) 8.0.12**
and **AI Control Tower Core 7.0.1**. Gaps 1, 2, 3 and 5 are unchanged. Gap 4 holds through a different mechanism
(see below). Later releases may change this behaviour.

## What AI Control Tower already does (credit where due)

- Every AI agent in AI Agent Studio, **including external A2A agents ServiceNow consumes**, is inventoried
  hourly as an **AI System Digital Asset** (`alm_ai_system_digital_asset`) and an **AI Function CI**
  (`cmdb_ci_function_ai`). Jobs: *Sync Now Assist AI Assets*, *Populate AI Assets From MIF Virtual Table*.
- AI Discovery connectors cover hyperscaler and SaaS platforms (Bedrock, Azure AI Foundry, Vertex AI, Microsoft Copilot Studio, ...).
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
Second lab: the same check is still in place, and Rovo's CI again has an empty `card` and `well_known_uri`.
**Result:** governance sees *that* a third-party agent exists, but not *what it can do* or *how it authenticates*.

## Gap 2: the registered card is frozen

The only copy of a consumed agent's card is `sn_aia_external_agent_card.details`, captured once when the agent
is registered. Rovo's record was created 24 Sep 21:34 and never updated. No scheduled job re-fetches it; the only
A2A flows are *External AI Agent Card / Provider - A2A Protocol* (discovery) and *AI Agent A2A Message Responder*.
Second lab: unchanged. The only scheduled job that touches external agents is the security job in Gap 5.
**Result:** if the provider adds a destructive skill, removes authentication or moves its endpoint, ServiceNow
keeps trusting the old card and **nobody is told**.

## Gap 3: deleted agents stay "Deployed" forever

`NowAssistAIAssetsUtilSNC._syncAIAgents()` iterates only agents that **still exist** (`new GlideRecord('sn_aia_agent').query()`)
and never sets an install status for agents. Skills, prompts and virtual agents *do* get a Deployed-to-Retired
transition; agents do not.

Observed: the asset for agent `d620eaa0...` (deleted 24 Sep 13:37:14 per `sys_audit_delete`) was still
**Deployed**, and its CI still **Installed / Operational**, six days later.

Second lab (AICT 7.0.1): `_syncAIAgents()` now sets an install status for agents that still exist (Retired when the
agent's config is inactive), but it still pages through `sn_aia_agent` only, so a deleted agent is never visited.
Observed: agent *Sentinel Orphan Test* was inventoried at 13:22 and deleted at 13:24:13 (`sys_audit_delete`). After the
next full *Sync Now Assist AI Assets* run (13:27 to 13:28), its asset was still **Deployed** and its CI still
**Installed / Operational**, both untouched since 13:22.

## Gap 4: orphaned assets can still count toward licensing

Only a *Retired* (or *Cancelled*) state takes an AI asset out of AI Control Tower's licensing count, and because of
Gap 3 a deleted agent's asset never reaches that state on its own.

- **AICT 5.0.6** (first lab): `AIInventoryLicensingUtilSNC` aggregated the AI inventory for licensing and excluded
  only Retired assets:

  ```text
  ... ^asset.install_status!=32^ ...
  ```

  A Deployed orphan was therefore counted.
- **AICT 7.0.1** (second lab): the aggregation counts asset governance records (`sn_ai_governance_asset_governance_details`)
  with `governed=true` (*Management status*). Only the business rule *Update governed field on state change* sets
  `governed=false`, and only when `install_status` changes to Retired or Cancelled. Asset management rules never
  mark Retired or Cancelled assets as governed. A **managed** orphan therefore keeps counting until someone retires it.
  On the second lab no AI asset was under management, so nothing was counted there either way.

## Gap 5: no A2A health or security posture checks

- The only external-agent security job (*AI Security Daily update of external agent security info*) calls
  `AiSPExtAgentSecurityManager.resolvePrivilegedAgent()`, which implements **AWS Bedrock only**
  (`_resolvePrivilegedAgentForBedrock`). Second lab: unchanged.
- MCP has gateway metrics; A2A endpoints are not probed. A2A logs (`sn_aia_external_agent_exec_history`)
  record individual calls, not proactive health.

## Real-world conformance observation

Atlassian Rovo publishes its card at the legacy `/.well-known/agent.json`; the A2A v0.3 path
`/.well-known/agent-card.json` returns 404 (re-checked 3 Oct 2026). A2A Sentinel reports this as a Low finding.

## Design consequence

A2A Sentinel **extends** AI Control Tower rather than competing with it:

- It reads AICT's inventory and AI Agent Studio's registration records.
- It keeps its own versioned card history. It does not write to the CI `card` field, because AICT's hourly
  sync would blank it again for non-public agents (Gap 1).
- It retires orphaned AICT assets **only** through an explicit, audited admin action.
