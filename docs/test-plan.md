# Hands-on test plan

Walk through this in order. **Part A** is a read-only tour of what was built. **Part B** changes things and shows
how Sentinel reacts. Every test lists what to do, what you should see, and what happens behind the scenes.

| Shortcut | URL |
|---|---|
| **LAB** (Sentinel, consumer of agents) | `https://nowlearning-nlinst04702984-6h36w-0001.lab.service-now.com` |
| **PDI** (Contoso fleet, third-party provider) | `https://dev342222.service-now.com` |

Tips:

- The **watch cycle also runs by itself every 10 minutes**. If you wait between a change and *Check now*, the job may
  have already caught it. That is expected behaviour, not a bug.
- *Check now* takes about 1 second with no change, and a few extra seconds per new finding (Now Assist writes the explanation).
- **B13 cannot be undone** (it retires an AI Control Tower asset). Do it last, or on camera during your recording.

---

## Part A: tour of what was built (read-only)

### A1. The simulated third-party provider (PDI)
1. PDI, then **All > A2A Contoso Fleet > Fleet Agents**.
2. You see 4 agents: Travel Booking, Expense Policy, Vendor Risk, HR Letters. Open **Contoso Vendor Risk Agent**.
3. Fields: *Auth mode* (API key), *Skills* (JSON), *Status* (Online), *Endpoint override* (empty), *Agent version* 1.4.2.

**Behind the scenes:** each record is one simulated vendor agent. Editing a record changes what the vendor
publishes, which is how you create drift in Part B.

### A2. The provider's public A2A endpoints (no login)
Open these in a **private/incognito window** to prove they are public, the way a real vendor's card is:

- `PDI/api/x_2208133_a2afleet/fleet/agents`: registry of the 4 agents.
- `PDI/api/x_2208133_a2afleet/fleet/agents/vendor-risk/card`: a real **A2A v0.3 Agent Card**. Note `skills`,
  `securitySchemes` (apiKey), `url` and `version`.

**Behind the scenes:** a Scripted REST API (`fleet/src/server/fleet-api.ts`, `buildCard`) renders the record as an
Agent Card on every request. `POST .../agents/vendor-risk/rpc` answers A2A `message/send` (try it in Postman).

### A3. The Sentinel application (LAB)
1. LAB, then **All > A2A Sentinel**. Modules: *Watched Agents, Open Findings, All Findings, Card History, Health Probes*.
2. Open the app record `LAB/sys_app.do?sys_id=d9d36e0a24d1412e96d40f570df28d3e` and scroll to its application files.
   You'll find 4 tables, the `A2ASentinel` Script Include, the *A2A Sentinel - watch cycle* job, 4 UI actions, the
   *A2A Sentinel API* REST service, 16 table ACLs plus 1 REST ACL, 13 cross-scope privileges, 3 properties and 2 roles.

**Behind the scenes:** all of it is generated from the Fluent source in `sentinel/src/fluent`. Nothing was built by hand.

### A4. Watched Agents list
**A2A Sentinel > Watched Agents**: 5 rows, all **Healthy**. Rovo has Risk **Low**; the Contoso agents have **None**.
Columns show card version, skills, authentication, endpoint host, latency and last check.

### A5. One agent in detail
Open **Contoso Vendor Risk Agent**.

- The **Agent** section shows health, risk, last HTTP status and latency. **Current Agent Card** shows version 1.4.2,
  1 skill, `apiKey`, and host `dev342222.service-now.com`.
- Related lists: **Sentinel Findings** (none), **Card Snapshots** (1, *Live fetch*), **Health Probes** (one per check).
- Open the snapshot. The **Agent Card (JSON)** equals what you saw in A2.

**Behind the scenes:** every check writes a Health Probe. A new Card Snapshot is written **only when the content
changes**, detected with a SHA-256 hash of the canonical JSON (key order and skill order are ignored).

### A6. An agent imported from AI Agent Studio
Open **Atlassian Rovo** in Watched Agents.

- **Source** is *Consumed via AI Agent Studio*; **ServiceNow AI agent** and **AI Function CI** are filled in automatically.
- **Card Snapshots** has exactly 1 row, with Source *ServiceNow registration record*: the card ServiceNow stored when
  Rovo was registered. There is no *Live fetch* snapshot because the live card matches it exactly (no drift, no false positive).
- Finding **A2AF0001002 (Low)**: Rovo publishes its card at the legacy path `/.well-known/agent.json` (a real finding).

**Behind the scenes:** `syncFromAgentStudio()` reads `sn_aia_agent` (type external), follows
card record, then discovery record, then provider, to find the card URL, and imports the registered card as the baseline.

### A7. The problem Sentinel solves (evidence in AI Control Tower)
1. From Rovo's watched-agent record, open its **AI Function CI**. The **Card** and **Well-Known URI** fields are **empty**:
   AI Control Tower knows Rovo exists but not what it can do.
2. Compare: open `cmdb_ci_function_ai.list` and filter *Name* on your exposed internal agent's name. Your own exposed agent's CI
   **does** have a card, because the CMDB only stores cards for agents ServiceNow *exposes*.
3. Open finding **A2AF0001001 (Orphaned AI asset)**. The evidence says the agent was deleted on 24 Sep by `admin`. Open the
   **Affected AI asset**: Install status is still **Deployed**. Open the **Affected CI**: still **Installed / Operational**.

See [evidence.md](evidence.md) for the code-level reasons.

### A8. The scheduled job
**All > System Definition > Scheduled Jobs**, then *A2A Sentinel - watch cycle* (Periodically, every 10 minutes).
Proof it runs: **A2A Sentinel > Health Probes**, sorted by *Probed on* descending, shows batches of 5 probes at
:00, :10, :20 and so on.

---

## Part B: change things, watch Sentinel react

In PDI, edit records in **A2A Contoso Fleet > Fleet Agents**. In LAB, use the **Check now** button on the matching
Watched Agent form.

### B1. No change, no noise
LAB: open *Contoso Vendor Risk Agent* and click **Check now**.
**Expect:** the message *"Contoso Vendor Risk Agent: ok (HTTP 200, N ms), no change, 0 new finding(s)"*, 1 new Health
Probe with *Card changed* = false, and no new snapshot.

### B2. The vendor silently adds a destructive skill and drops authentication
PDI, *Contoso Vendor Risk Agent*: set **Auth mode** to *None (public)*, replace **Skills** with the JSON below, and leave
**Agent version** at 1.4.2. Click **Update**.

```json
[{"id":"vendor_risk_score","name":"Vendor risk score","description":"Return a 0-100 risk score with the top risk drivers.","tags":["risk","vendor"]},
 {"id":"delete_vendor_record","name":"Delete vendor record","description":"Permanently delete a vendor and all associated contracts from the vendor master.","tags":["vendor","admin"]}]
```

LAB: **Check now**.
**Expect:** *"... card changed, 3 new finding(s)"*, plus:

| Finding | Severity |
|---|---|
| Agent no longer declares any authentication | Critical |
| New skill "Delete vendor record" can change or delete data | High |
| Card changed without a version bump (still 1.4.2) | Medium |

The agent's **Risk** becomes *Critical*, **Authentication** becomes *none*, **Skills** becomes 2, and a new *Live fetch* snapshot appears.

Open the Critical finding and check:

- **AI explanation (Now Assist)**: a plain-English summary. The wording differs on every run because it is an LLM.
- **Recommended action**: deterministic, by finding type.
- **Evidence (JSON)**: before and after authentication.
- **Card before / Card after**: open both snapshots and compare the JSON.

**Behind the scenes:** `checkAgent()` fetches the card, sees a new hash, stores a snapshot, then `diffCards()` compares
the old and new cards. The rules are: auth strength dropped to zero gives Critical; a new skill whose name or description
matches destructive verbs (delete, purge, transfer, approve, ...) gives High; changes under the same version give Medium.
`_raise()` creates each finding and asks Now Assist (`sn_generative_ai.LLMClient`) for the explanation.

### B3. De-duplication
LAB: click **Check now** again.
**Expect:** *"no change, 0 new finding(s)"*, with no duplicate findings.
**Behind the scenes:** the hash is unchanged. Even if it weren't, each finding has a fingerprint
(agent, type and detail), and an open finding with the same fingerprint is never created twice.

### B4. Accept risk
Open the Medium finding *Card changed without a version bump* and click **Accept risk**.
**Expect:** State is *Closed Complete*, with a work note saying who accepted it. The agent's Risk is recalculated on its
next check, and stays *Critical* while the Critical finding is open.

### B5. Endpoint moved to another host
PDI, *Contoso Travel Booking Agent*: set **Endpoint override** to `https://contoso-agents.example.net/a2a/travel` and
**Agent version** to `1.1.0`. LAB: **Check now**.
**Expect:** **High**, *Runtime endpoint moved to a different host*, and **Endpoint host** becomes `contoso-agents.example.net`.
**Variation:** leave the version at 1.0.0 and you also get **Medium**, *changed without a version bump*.

### B6. OAuth scope creep
PDI, *Contoso HR Letters Agent*: set **OAuth scopes** to `letters.draft,hr.records.read` and **Agent version** to `1.1.0`.
LAB: **Check now**.
**Expect:** **Medium**, *Agent requests additional OAuth scopes: hr.records.read*.

### B7. A skill disappears
PDI, *Contoso Expense Policy Agent*: set **Skills** to the JSON below and **Agent version** to `2.2.0`. LAB: **Check now**.

```json
[{"id":"check_policy","name":"Check expense policy","description":"Validate an expense line against policy limits.","tags":["finance","policy"]}]
```

**Expect:** **Medium**, *Skill "Summarize receipts" was removed*. The recommendation warns that workflows depending on it will fail.

### B8. Protocol and capability change (optional)
PDI, any agent: set **A2A protocol version** to `1.0.0`, tick **Supports streaming**, and bump **Agent version**. LAB: **Check now**.
**Expect:** **Medium**, *A2A protocol version changed*, and **Low**, *Agent capabilities changed*.

### B9. Outage: Degraded, then Down
PDI, *Contoso Expense Policy Agent*: set **Status** to *Offline (503)*.

1. LAB: **Check now**. **Expect:** *http_error (HTTP 503 ...)*, Health **Degraded**, no finding yet.
2. LAB: **Check now** again. **Expect:** Health **Down**, and **High**, *Agent card unreachable*.

Health Probes show *HTTP error* rows. The threshold of 2 is the property `x_snc_a2a_sentinel.failure_threshold`.
The 500-error variant (**Status** set to *Broken card (500)*) behaves the same way with HTTP 500.

### B10. Self-healing
PDI: set **Status** back to *Online*. LAB: **Check now**.
**Expect:** Health **Healthy**, and the *Agent card unreachable* finding is **closed automatically**. Its Activity shows the
work note *"Recovered: live card fetched successfully (HTTP 200, N ms)"*.

### B11. Run the whole cycle from the list
LAB: **Watched Agents** list, then the **Run watch cycle** banner button.
**Expect:** a message with counts: agents checked, imported from AI Agent Studio, card changes, new findings, orphan findings.

### B12. Switch off Now Assist
1. LAB: open `sys_properties.list`, filter *Name starts with* `x_snc_a2a_sentinel`, and set `x_snc_a2a_sentinel.llm_enabled` to `false`.
2. Create any new drift, for example B6 with scope `letters.send` and version `1.1.1`, then **Check now**.

**Expect:** the new finding's **AI explanation** is the deterministic text (title plus recommendation), and detection is unchanged.
Set the property back to `true` afterwards.

### B13. Retire the orphaned AI asset (one-way, do it last or on camera)
Open **A2AF0001001** and click **Retire orphaned AI asset**.
**Expect:**

- The message *"AI asset set to Retired. CI set to Retired / Retired."*, and the finding is *Closed Complete*.
- The Affected AI asset's Install status is **Retired**; the Affected CI is **Retired / Retired**.
- A later **Run watch cycle** creates no new orphan finding, because retired assets are excluded. Retired assets are also
  excluded from AI Control Tower's licensing count.

This action is exercised here for the first time. If you see an error, note the message.

### B14. Watch any A2A agent, including your own
LAB: **Watched Agents > New**. Name: `<deleted agent> (self)`. Card URL:
`LAB/api/sn_aia/a2a/v2/agent_card/id/caa6f4d95c2b03107f44bec5dff3e2c8`. Source: *Manually watched*. Save, then **Check now**.
**Expect:** a baseline (1 skill, oauth2). Then in AI Agent Studio, change the description of the tool
*Find Application Support Group* and click **Check now** again. **Expect:** **Low**, *Skill ... definition changed*.
Sentinel works with any A2A card URL, not just the fleet.

### B15. Automation API (Postman)
Use Basic auth with your admin user, and header `Accept: application/json`:

| Request | Expect |
|---|---|
| `GET LAB/api/x_snc_a2a_sentinel/sentinel/status` | JSON: `agents[]` (health, risk, version, auth...) and `open_findings[]` |
| `POST LAB/api/x_snc_a2a_sentinel/sentinel/run` | `{"imported":0,"checked":5,...}` |
| `POST LAB/api/x_snc_a2a_sentinel/sentinel/agents/0cf3f56524b54ef780b6b84278ba6255/check` | Result of checking Vendor Risk |

Negative test: call `/status` as a user **without** `x_snc_a2a_sentinel.admin`. **Expect:** 403 (the REST endpoint ACL).

### B16. Role-based access
1. LAB: create user `sentinel.viewer` with role `x_snc_a2a_sentinel.viewer`, then impersonate it.
   **Expect:** the A2A Sentinel menu and all lists are visible and readable. There are **no** Check now, Run watch cycle,
   Accept risk or Retire buttons, and fields are read-only; you cannot create a watched agent.
2. Add role `x_snc_a2a_sentinel.admin` to the user and impersonate again.
   **Expect:** the buttons appear, and you can create and edit watched agents.

---

## Reset after testing

1. **PDI**: Scripts - Background, scope *A2A Contoso Fleet*, then run [reset/fleet-reset.js](reset/fleet-reset.js).
2. **LAB**: Scripts - Background, scope *A2A Sentinel*, then run [reset/sentinel-reset.js](reset/sentinel-reset.js).
3. Delete the watched agent from B14 if you created it, and restore the tool description you changed in AI Agent Studio.

B13 (retirement) is not undone by the reset scripts.
