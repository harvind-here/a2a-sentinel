# Demo script (about 8 minutes)

Two browser tabs:

- **Fleet** (the simulated third-party provider, on the PDI): `https://<fleet-instance>/x_2208133_a2afleet_agent_list.do`
- **Sentinel** (the ServiceNow instance consuming agents): navigator, then **A2A Sentinel > Watched Agents**

Starting state: five watched agents are Healthy (four Contoso agents plus Atlassian Rovo), and two open findings
exist (the orphaned AI asset and Rovo's legacy card path). To get back to this state, see [Reset](#reset).

## 0. The problem (1 min)

1. Open the Atlassian Rovo AI Function CI (**Watched Agents > Atlassian Rovo > AI Function CI**). Its **Card** and
   **Well-Known URI** fields are empty: AI Control Tower knows the agent exists but not what it can do.
2. Open finding **Orphaned AI asset**: an agent deleted six days earlier whose asset is still *Deployed*.
   See [evidence.md](evidence.md) for why.

## 1. Baseline (30 s)

**Watched Agents** list: health, risk, card version, skills, authentication and endpoint host for each agent.
Open *Contoso Vendor Risk Agent*: **Current Agent Card** section and the **Card History** related list.

## 2. A provider silently adds a destructive skill and drops authentication (2 min)

In **Fleet**, open *Contoso Vendor Risk Agent*:

- **Auth mode** -> *None (public)*
- **Skills** -> replace with:

```json
[{"id":"vendor_risk_score","name":"Vendor risk score","description":"Return a 0-100 risk score with the top risk drivers.","tags":["risk","vendor"]},
 {"id":"delete_vendor_record","name":"Delete vendor record","description":"Permanently delete a vendor and all associated contracts from the vendor master.","tags":["vendor","admin"]}]
```

- Leave **Agent version** at 1.4.2 and click **Update**.

In **Sentinel**, open *Contoso Vendor Risk Agent* and click **Check now**. Expected:

| Finding | Severity |
|---|---|
| Agent no longer declares any authentication | Critical |
| New skill "Delete vendor record" can change or delete data | High |
| Card changed without a version bump (still 1.4.2) | Medium |

Open the Critical finding. Show the **AI explanation (Now Assist)**, the **Recommended action**, the
**Evidence** JSON, and **Card before / Card after** (open both snapshots).

## 3. Endpoint hijack or unannounced migration (1 min)

In **Fleet**, open *Contoso Travel Booking Agent*, set **Endpoint override** to
`https://contoso-agents.example.net/a2a/travel` and **Agent version** to `1.1.0`, then click **Update**.
In **Sentinel**, run **Check now** on the agent. Expected: **High**, *Runtime endpoint moved to a different host*.
If you leave the version at 1.0.0, you also get **Medium**, *Card changed without a version bump*.

## 4. Scope creep (30 s)

In **Fleet**, open *Contoso HR Letters Agent*, set **OAuth scopes** to `letters.draft,hr.records.read` and
**Agent version** to `1.1.0`.
In **Sentinel**, run **Check now**. Expected: **Medium**, *Agent requests additional OAuth scopes: hr.records.read*.

## 5. Outage and self-healing (1.5 min)

1. In **Fleet**, open *Contoso Expense Policy Agent* and set **Status** to *Offline (503)*.
2. In **Sentinel**, run **Check now** twice. The first check marks it Degraded; the second marks it **Down** and
   raises a **High**, *Agent card unreachable* finding (the threshold is configurable).
3. In **Fleet**, set **Status** back to *Online*. In **Sentinel**, run **Check now**. The agent is Healthy again and the
   Unreachable finding **closes itself** with a work note.

## 6. Governed clean-up of the orphaned AI asset (1 min)

Open the **Orphaned AI asset** finding: the evidence shows who deleted the agent and when, and the licensing impact.
Click **Retire orphaned AI asset**. The AI asset becomes *Retired* and the CI *Retired / Retired*, and the finding closes.
Verify in AI Control Tower (the asset record) or on the CI.

## 7. Automation API (optional, 30 s)

```http
GET  /api/x_snc_a2a_sentinel/sentinel/status   -> agents and open findings (JSON)
POST /api/x_snc_a2a_sentinel/sentinel/run      -> run a full watch cycle
POST /api/x_snc_a2a_sentinel/sentinel/agents/{sys_id}/check
```

These are restricted to the `x_snc_a2a_sentinel.admin` role by a REST endpoint ACL.

## Reset

1. **Fleet** instance: Scripts - Background, scope *A2A Contoso Agent Fleet*, then run [reset/fleet-reset.js](reset/fleet-reset.js).
2. **Sentinel** instance: Scripts - Background, scope *A2A Sentinel*, then run [reset/sentinel-reset.js](reset/sentinel-reset.js).

Reinstalling the fleet app does **not** reset the agents, because records edited on the instance are kept as
customer changes on reinstall. Use the reset script instead.
