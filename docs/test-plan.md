# Hands-on test plan

Walk through this in order. **Part A** is a read-only tour of what was built. **Part B** changes things and shows
how Sentinel reacts. Every test lists what to do, what you should see, and what happens behind the scenes.

| Shortcut | URL |
|---|---|
| **LAB** (Sentinel, consumer of agents) | `https://nowlearning-nlinst04752573-4jhzz-0001.lab.service-now.com` (now-sdk alias `lab_2`) |
| **PDI** (Contoso fleet, third-party provider) | `https://dev342222.service-now.com` |

Tips:

- The **watch cycle also runs by itself every 10 minutes**. If you wait between a change and *Check now*, the job may
  have already caught it. That is expected behaviour, not a bug.
- *Check now* takes about 1 second with no change, and a few extra seconds per new finding (Now Assist writes the explanation).
- **B13 cannot be undone** (it retires an AI Control Tower asset). Do it last, or on camera during your recording.
- **The PDI hibernates when it's unused.** While it sleeps, every Contoso card URL returns an *Instance Hibernating*
  page, and Sentinel correctly marks the four Contoso agents **Down**. Wake it from developer.servicenow.com before
  testing (see *Before you start Part B*).
- **This is the second lab.** The original lab (`nlinst04702984`) expired on 3 Oct 2026. Wherever this plan says
  "the original lab", it describes data that existed only there:
  - the Atlassian Rovo agent registered in AI Agent Studio (A4, A6, A7);
  - the orphan finding A2AF0001001 (A7, B13).

  On this lab, A4 shows 4 rows (no Rovo). To see A6 and A7, register an external agent in AI Agent Studio
  ([migration.md](migration.md), optional section). To get an orphan, follow B13 from step 1.

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
2. List every application file: `LAB/sys_metadata_list.do?sysparm_query=sys_scope=d9d36e0a24d1412e96d40f570df28d3e`,
   then group by *Class*. You'll find 4 tables (`sys_db_object`), 1 Script Include, 1 scheduled job (`sysauto_script`),
   4 UI actions, 1 REST service with 3 routes (`sys_ws_definition` / `sys_ws_operation`), 17 ACLs (16 table + 1 REST),
   3 properties, 2 roles, 4 forms and 4 list layouts, and 5 navigator modules.
3. **Cross-scope privileges** (`sys_scope_privilege`): about 33 rows, all *Allowed*.
   - **13** are declared in the source (`src/fluent/security/access.now.ts`), such as reading `sn_aia_agent` and writing `cmdb_ci`.
   - **About 20** were recorded automatically by the platform's **runtime access tracking** the first time the code
     ran: every platform API a scoped app calls (`RESTMessageV2.execute`, `GlideDigest.getSHA256Hex`, ...) is logged
     and allowed in *Tracking* mode.
   - On the original lab, **4 declared rows showed an empty Target scope**. An early build wrote scope names instead of
     sys_ids, and runtime tracking had already created correct twins before the fix. A fresh install (like this lab) is clean.

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
The CI is found through AI Control Tower's link: agent, then AI asset (`servicenow_ref_id`), then CI (`asset`).

### A7. The problem Sentinel solves (evidence in AI Control Tower)
1. From Rovo's watched-agent record, open its **AI Function CI**. The **Card** and **Well-Known URI** fields are **empty**:
   AI Control Tower knows Rovo exists but not what it can do.
2. Compare: open `cmdb_ci_function_ai.list` and filter *Name = Application Support Finder*. **Two** CIs have this name:
   - The one whose **Object ID starts with `caa6f4d9`** (most recent discovery: today) is your live agent. Its **Card**
     and **Well-Known URI** are filled, because the CMDB only stores cards for agents ServiceNow *exposes*.
   - The one whose **Object ID starts with `d620eaa0`** (last discovered 24 Sep) is the orphan from step 3, with no card.
3. Open finding **A2AF0001001 (Orphaned AI asset)**. The evidence says the agent was deleted on 24 Sep by `admin`. Open the
   **Affected AI asset**: Install status is still **Deployed**. Open the **Affected CI**: still **Installed / Operational**.

See [evidence.md](evidence.md) for the code-level reasons.

### A8. The scheduled job
**All > System Definition > Scheduled Jobs**, then *A2A Sentinel - watch cycle* (Periodically, every 10 minutes).
Proof it runs: **A2A Sentinel > Health Probes**, sorted by *Probed on* descending, shows batches of 5 probes at
:00, :10, :20 and so on.

---

## Part B: change things, watch Sentinel react (exact steps)

### How Part B works: the same agent exists twice

Each Contoso agent exists as **two separate records with the same name**, one on each instance:

| | **Fleet Agent**, on the **PDI** | **Watched Agent**, on the **LAB** |
|---|---|---|
| Plays the role of | The **vendor** (Contoso) and its agent | **Your company's ServiceNow**, watching that vendor's agent |
| Menu | **All > A2A Contoso Fleet > Fleet Agents** | **All > A2A Sentinel > Watched Agents** |
| In Part B you... | **Edit fields** on it, to pretend the vendor changed its agent | **Never edit it.** Click **Check now**, then read what Sentinel found |

The two records are connected only through the **Agent Card URL**. The Watched Agent's *Agent Card URL* points at the
Fleet Agent's public card, for example `https://dev342222.service-now.com/api/x_2208133_a2afleet/fleet/agents/vendor-risk/card`.
Sentinel can't see the PDI record itself. It sees only the card the PDI publishes, the same way it would see a real vendor's.

Every test is the same three steps:

```
1. PDI : open the Fleet Agent -> change the field(s) the test names -> click Update
         (the vendor publishes a changed Agent Card)
2. LAB : open the Watched Agent with the SAME name -> click Check now
         (Sentinel fetches the card again and compares it with the last copy it stored)
3. LAB : read the blue banner, the fields, and the Sentinel Findings list at the bottom of the form
```

The Fleet Agent fields that Part B changes:

| Field on the PDI form | What it represents for the vendor's agent | Agent Card field it changes |
|---|---|---|
| **Auth mode** | How callers must authenticate. *None (public)* means anyone can call the agent | `securitySchemes`, `security` |
| **Skills (JSON array)** | What the agent can do | `skills` |
| **Endpoint override** | Where the agent really runs. Empty means the default PDI URL | `url` |
| **OAuth scopes (comma separated)** | The permissions the agent requests | the OAuth `scopes` |
| **A2A protocol version** | The A2A protocol version the agent speaks | `protocolVersion` |
| **Supports streaming** | A capability the agent advertises | `capabilities.streaming` |
| **Agent version** | The vendor's release number | `version` |
| **Status** | Whether the vendor's server is up (*Online*), down (*Offline (503)*) or broken (*Broken card (500)*) | the HTTP response itself |

Leave every other field alone. In particular, **never change *Name* or *Slug***: the slug is part of the card URL, so
the Watched Agent would lose its card.

### Cheat sheet

| Test | 1. PDI: Fleet Agent to edit | 1. PDI: change | 2. LAB: Watched Agent | 2. LAB: click | 3. Expect |
|---|---|---|---|---|---|
| B1 | none | none | Contoso Vendor Risk Agent | Check now | `no change, 0 new finding(s)` |
| B2 | Contoso Vendor Risk Agent | Auth mode = None (public); Skills = **JSON 1** | Contoso Vendor Risk Agent | Check now | 3 findings: Critical, High, Medium |
| B3 | none | none | Contoso Vendor Risk Agent | Check now | `no change`, no duplicates |
| B4 | none | none | Contoso Vendor Risk Agent, then its Medium finding | Accept risk | finding Closed Complete |
| B5 | Contoso Travel Booking Agent | Endpoint override = `https://contoso-agents.example.net/a2a/travel`; Agent version = `1.1.0` | Contoso Travel Booking Agent | Check now | 1 High finding |
| B6 | Contoso HR Letters Agent | OAuth scopes = `letters.draft,hr.records.read`; Agent version = `1.1.0` | Contoso HR Letters Agent | Check now | 1 Medium finding |
| B7 | Contoso Expense Policy Agent | Skills = **JSON 2**; Agent version = `2.2.0` | Contoso Expense Policy Agent | Check now | 1 Medium finding |
| B8 | Contoso HR Letters Agent | A2A protocol version = `1.0.0`; Supports streaming = ticked; Agent version = `1.2.0` | Contoso HR Letters Agent | Check now | 1 Medium and 1 Low finding |
| B9 | Contoso Expense Policy Agent | Status = Offline (503) | Contoso Expense Policy Agent | Check now **twice** | Degraded, then Down plus 1 High finding |
| B10 | Contoso Expense Policy Agent | Status = Online | Contoso Expense Policy Agent | Check now | Healthy; the B9 finding closes itself |
| B11 | none | none | Watched Agents **list** | Run watch cycle | summary banner |
| B12 | Contoso HR Letters Agent (after a LAB setting change) | OAuth scopes = `letters.draft,hr.records.read,letters.send`; Agent version = `1.2.1` | Contoso HR Letters Agent | Check now | 1 Medium finding with fixed-text explanation |
| B13 | none (LAB only) | none | Open Findings, then the orphan finding | Retire orphaned AI asset | asset and CI Retired |
| B14 | none (LAB only) | none | Watched Agents list, then **New** | Submit, then Check now | 1 Low finding |
| B15 | none (Postman) | none | none | none | API responses |
| B16 | none (LAB users) | none | none | none | viewer vs admin access |

B14 is the **only** test where you create or fill in a Watched Agent. Everywhere else you only read Watched Agents;
Sentinel fills them in.

**JSON 1** (B2): Vendor Risk keeps its skill and gains a "delete" skill.
```json
[{"id":"vendor_risk_score","name":"Vendor risk score","description":"Return a 0-100 risk score with the top risk drivers.","tags":["risk","vendor"]},{"id":"delete_vendor_record","name":"Delete vendor record","description":"Permanently delete a vendor and all associated contracts from the vendor master.","tags":["vendor","admin"]}]
```

**JSON 2** (B7): Expense Policy loses its "Summarize receipts" skill.
```json
[{"id":"check_policy","name":"Check expense policy","description":"Validate an expense line against policy limits.","tags":["finance","policy"]}]
```

### Before you start Part B

1. **Wake the PDI.** Developer instances hibernate when they're unused. Open
   `https://dev342222.service-now.com/api/x_2208133_a2afleet/fleet/agents/vendor-risk/card` in a browser.
   - If you see JSON, the PDI is awake.
   - If you see an *Instance Hibernating* page, sign in at developer.servicenow.com and wake the instance. It takes
     a few minutes; reload until you see JSON.

   While the PDI sleeps, Sentinel sees every Contoso card as broken. After two checks it marks the four agents **Down**
   and raises `[HIGH] Endpoint no longer returns a valid Agent Card - Contoso ...` findings. That's correct behaviour,
   and it happened for real on 1 Oct 2026 (A2AF0001020 to A2AF0001023). The findings close themselves on the first
   successful check after the PDI wakes up.
2. **Run steps 1 and 2 of the [Reset](#reset-after-testing)** so you start from a clean slate.
3. **Check the starting state.** LAB: **All > A2A Sentinel > Watched Agents**. Every Contoso agent shows *Health*
   **Healthy**, *Risk* **None**, and:

   | Watched Agent | Card version | Skills | Authentication |
   |---|---|---|---|
   | Contoso Travel Booking Agent | 1.0.0 | 2 | oauth2 |
   | Contoso Expense Policy Agent | 2.1.0 | 2 | oauth2 |
   | Contoso Vendor Risk Agent | 1.4.2 | 1 | apiKey |
   | Contoso HR Letters Agent | 1.0.3 | 1 | oauth2 |

**Where the fields are on the PDI Fleet Agent form** (the form you edit):

| Row | Left | Right |
|---|---|---|
| 1 | Name (full width) | |
| 2 | Slug | Supports push notifications |
| 3 | Provider organization (full width) | |
| 4 | **Skills (JSON array)**, a big text box (full width) | |
| 5 | **A2A protocol version**, **Status** | **Agent version** |
| 6 | **Endpoint override** (full width) | |
| 7 | **Auth mode**, **Supports streaming** | Active |
| 8 | Description, then **OAuth scopes (comma separated)** (full width) | |

After changing fields, click **Update** (top right). The record saves and you return to the list.

**Where the results are on the LAB Watched Agent form** (the form you read):

| Part of the form | What's there |
|---|---|
| Top right | The **Check now** button. After you click it, a blue banner at the top shows the result |
| **Agent** section | Left: Name, Agent Card URL, Source, ServiceNow AI agent, AI Function CI, Active. Right: **Health**, **Risk**, Last checked, Last HTTP status, Last latency (ms), Consecutive failures |
| **Current Agent Card** section | Left: **Card version**, A2A protocol, **Skills**. Right: **Authentication**, **Endpoint host**, Current card snapshot |
| Related lists at the bottom | **Sentinel Findings** (what Sentinel flagged), **Card Snapshots** (one stored copy per distinct card), **Health Probes** (one row per check) |

**Rules**

- Do the tests **in order**, and **don't undo PDI changes between tests**. The reset at the end restores everything.
- `###` in a message is the response time in milliseconds and varies. Finding numbers (`A2AF000xxxx`) vary too, so
  match findings by their **Short description**.
- In **Health Probes**, click the *Probed on* column header until the newest row is on top.
- The 10-minute background job may check an agent before you click *Check now*. If the banner says
  *"no change, 0 new finding(s)"* right after a PDI change, the job got there first. The findings are already in
  **Sentinel Findings** (look at *Created*).

---

### B1. A check with no change creates no noise

**Simulates:** nothing changed at the vendor. Sentinel should record the check and stay quiet.

1. **PDI:** nothing.
2. **LAB:** **All > A2A Sentinel > Watched Agents**, click **Contoso Vendor Risk Agent**, then click **Check now**.
3. **Expect:**
   - Banner: `A2A Sentinel: Contoso Vendor Risk Agent: ok (HTTP 200, ### ms), no change, 0 new finding(s)`
   - *Last checked* = now, *Last HTTP status* = `200`, *Consecutive failures* = `0`.
   - **Health Probes**: a new row with *Outcome* = OK, *HTTP status* = 200, *Card changed* = false.
   - **Card Snapshots** still has **1** row, and **Sentinel Findings** is empty.

### B2. The vendor removes authentication and adds a "delete" skill, without changing the version

**Simulates:** Contoso's Vendor Risk agent can now be called by anyone, and it gained a skill that deletes data, all
under the same version number.

1. **PDI:** **All > A2A Contoso Fleet > Fleet Agents**, then click **Contoso Vendor Risk Agent**.
   - **Auth mode** (row 7): choose **None (public)**.
   - **Skills (JSON array)** (row 4): click in the box, press **Ctrl+A**, press **Delete**, then paste **JSON 1**.
   - **Agent version** (row 5, right): leave it at `1.4.2`.
   - Click **Update**.
   - *(Optional)* Open `.../fleet/agents/vendor-risk/card` in a browser. It now shows `"securitySchemes": {}`,
     `"security": []` and 2 skills. This is what Sentinel will fetch.
2. **LAB:** **All > A2A Sentinel > Watched Agents**, click **Contoso Vendor Risk Agent**, then click **Check now**.
3. **Expect:**
   - Banner: `A2A Sentinel: Contoso Vendor Risk Agent: ok (HTTP 200, ### ms), card changed, 3 new finding(s)`
   - Fields: *Risk* = **Critical**, *Health* = Healthy, *Authentication* = `none`, *Skills* = `2`, *Card version* = `1.4.2`.
   - **Sentinel Findings**: 3 new rows, all *State* = Open:

     | Severity | Finding type | Short description | Priority |
     |---|---|---|---|
     | Critical | Authentication removed | `[CRITICAL] Agent no longer declares any authentication - Contoso Vendor Risk Agent` | 1 - Critical |
     | High | Skill added | `[HIGH] New skill "Delete vendor record" can change or delete data - Contoso Vendor Risk Agent` | 2 - High |
     | Medium | Unversioned change | `[MEDIUM] Card changed without a version bump (still 1.4.2) - Contoso Vendor Risk Agent` | 3 - Moderate |

   - **Card Snapshots**: 2 rows. The new one has *Authentication* = `none` and *Skills* = `2`. The newest
     **Health Probes** row has *Card changed* = true.
4. **Open each finding** (click its number):
   - **Critical**:
     - *Description*: `Before: apiKey  ->  After: none`
     - *AI explanation (Now Assist)*: 2 to 3 sentences, worded differently on every run.
     - *Recommended action*: `Suspend use of this agent in agentic workflows until the provider restores authentication, then confirm with the vendor why it was removed.`
     - In the **Evidence** section, *Evidence (JSON)* shows `"before": {"apiKey": "apiKey"}` and `"after": {}`.
     - Click the **(i)** icon next to *Card before* and *Card after*. The before card has a `securitySchemes.apiKey`
       block; the after card's `securitySchemes` is empty.
   - **High**: *Description* `Delete vendor record: Permanently delete a vendor and all associated contracts from the vendor master.`,
     and the evidence contains `"destructive": true`.
   - **Medium**: *Description* `2 change(s) published under the same version 1.4.2`, and the evidence lists
     `"changes": ["auth_removed", "skill_added"]`.

### B3. Checking again doesn't duplicate findings

**Simulates:** Sentinel checks again (or the 10-minute job runs) and the vendor hasn't changed anything since B2.

1. **PDI:** nothing.
2. **LAB:** on **Contoso Vendor Risk Agent**, click **Check now** again.
3. **Expect:** banner `... ok (HTTP 200, ### ms), no change, 0 new finding(s)`. **Sentinel Findings** still has
   exactly the 3 findings from B2, and **Card Snapshots** still has 2 rows.

### B4. A reviewer accepts a risk

**Simulates:** a governance reviewer looks at the unversioned change and accepts it.

1. **PDI:** nothing.
2. **LAB:** on **Contoso Vendor Risk Agent**, scroll to **Sentinel Findings** and open the **Medium** finding
   *"Card changed without a version bump"*. Click **Accept risk** (top right).
3. **Expect:**
   - *State* = **Closed Complete**.
   - The activity stream shows the work note `Change reviewed and risk accepted by <your name>.`
   - Go back to the Watched Agent and click **Check now**. *Risk* stays **Critical**, because the Critical and High
     findings are still open.

### B5. The vendor moves its agent to a different server

**Simulates:** the agent's runtime URL suddenly points at a different host. That could be a migration or a hijack.

1. **PDI:** **Fleet Agents**, then click **Contoso Travel Booking Agent**.
   - **Endpoint override** (row 6): type `https://contoso-agents.example.net/a2a/travel`
   - **Agent version** (row 5, right): change `1.0.0` to `1.1.0`
   - Click **Update**.
2. **LAB:** **Watched Agents**, click **Contoso Travel Booking Agent**, then click **Check now**.
3. **Expect:**
   - Banner `... card changed, 1 new finding(s)`.
   - *Risk* = **High**, *Card version* = `1.1.0`, *Endpoint host* = `contoso-agents.example.net`.
   - The new finding has Finding type **Endpoint changed** and short description
     `[HIGH] Runtime endpoint moved to a different host - Contoso Travel Booking Agent`.
   - *Description*: `https://dev342222.service-now.com/api/x_2208133_a2afleet/fleet/agents/travel-booking/rpc  ->  https://contoso-agents.example.net/a2a/travel`

### B6. The vendor asks for more permissions

**Simulates:** OAuth scope creep. The agent now also wants to read HR records.

1. **PDI:** **Fleet Agents**, then click **Contoso HR Letters Agent**.
   - **OAuth scopes (comma separated)** (row 8, last field): change `letters.draft` to `letters.draft,hr.records.read`
   - **Agent version**: change `1.0.3` to `1.1.0`
   - Click **Update**.
2. **LAB:** **Watched Agents**, click **Contoso HR Letters Agent**, then click **Check now**.
3. **Expect:**
   - Banner `... card changed, 1 new finding(s)`. *Risk* = **Medium**.
   - The new finding has Finding type **OAuth scopes expanded** and short description
     `[MEDIUM] Agent requests additional OAuth scopes: hr.records.read - Contoso HR Letters Agent`.
   - *Description*: `Before: [letters.draft]  ->  After: [hr.records.read, letters.draft]`

### B7. The vendor removes a skill

**Simulates:** a capability your workflows may depend on disappears.

1. **PDI:** **Fleet Agents**, then click **Contoso Expense Policy Agent**.
   - **Skills (JSON array)**: Ctrl+A, Delete, then paste **JSON 2**.
   - **Agent version**: change `2.1.0` to `2.2.0`
   - Click **Update**.
2. **LAB:** **Watched Agents**, click **Contoso Expense Policy Agent**, then click **Check now**.
3. **Expect:**
   - Banner `... card changed, 1 new finding(s)`.
   - *Skills* = `1`, *Card version* = `2.2.0`, *Risk* = **Medium**.
   - The new finding has Finding type **Skill removed** and short description
     `[MEDIUM] Skill "Summarize receipts" was removed - Contoso Expense Policy Agent`.
   - *Recommended action*: `Identify ServiceNow workflows that depend on the removed skill; they will fail or degrade.`

### B8. The vendor changes protocol version and capabilities

**Simulates:** the vendor moves to a new A2A protocol version and turns on streaming.

1. **PDI:** **Fleet Agents**, then click **Contoso HR Letters Agent** (the same agent as in B6).
   - **A2A protocol version** (row 5, left): change `0.3.0` to `1.0.0`
   - **Supports streaming** (row 7, left): tick the box
   - **Agent version**: change `1.1.0` to `1.2.0`
   - Click **Update**.
2. **LAB:** **Watched Agents**, click **Contoso HR Letters Agent**, then click **Check now**.
3. **Expect:**
   - Banner `... card changed, 2 new finding(s)`.
   - **Protocol version changed** (Medium): `[MEDIUM] A2A protocol version changed (0.3.0 -> 1.0.0) - Contoso HR Letters Agent`
   - **Capabilities changed** (Low): `[LOW] Agent capabilities changed - Contoso HR Letters Agent`, with *Description*
     `streaming=false, pushNotifications=false  ->  streaming=true, pushNotifications=false`
   - **Low** findings skip Now Assist. Their *AI explanation* is the fixed text
     `Agent capabilities changed. Review whether workflows rely on the changed capability (streaming / push notifications).`

### B9. The vendor's server goes down

**Simulates:** an outage at the vendor. One failure could be a blip, so Sentinel waits for two failed checks in a row
before it raises a finding.

1. **PDI:** **Fleet Agents**, then click **Contoso Expense Policy Agent**.
   - **Status** (row 5, left): choose **Offline (503)**
   - Click **Update**.
   - *(Optional)* The card URL `.../agents/expense-policy/card` now returns `{"error": "Service Unavailable"}`.
2. **LAB:** **Watched Agents**, click **Contoso Expense Policy Agent**, then click **Check now** (the first check).
3. **Expect after the first check:**
   - Banner `A2A Sentinel: Contoso Expense Policy Agent: http_error (HTTP 503, ### ms), no change, 0 new finding(s)`
   - *Health* = **Degraded**, *Last HTTP status* = `503`, *Consecutive failures* = `1`.
   - The newest **Health Probes** row has *Outcome* = HTTP error and *Error* = `HTTP 503`.
4. **LAB:** click **Check now** again (the second check).
5. **Expect after the second check:**
   - Banner `... http_error (HTTP 503, ### ms), no change, 1 new finding(s)`
   - *Health* = **Down**, *Consecutive failures* = `2`, *Risk* = **High**.
   - The new finding has Finding type **Card unreachable** and short description
     `[HIGH] Agent card unreachable - Contoso Expense Policy Agent`.
   - *Description*: `HTTP 503 (2 consecutive failed checks of https://dev342222.service-now.com/api/x_2208133_a2afleet/fleet/agents/expense-policy/card)`

### B10. The vendor's server comes back

**Simulates:** the outage ends. Sentinel closes the outage finding by itself.

1. **PDI:** **Fleet Agents**, then click **Contoso Expense Policy Agent**. Set **Status** to **Online**, then click **Update**.
2. **LAB:** **Watched Agents**, click **Contoso Expense Policy Agent**, then click **Check now**.
3. **Expect:**
   - Banner `... ok (HTTP 200, ### ms), no change, 0 new finding(s)`
   - *Health* = **Healthy**, *Consecutive failures* = `0`.
   - In **Sentinel Findings**, the *Card unreachable* finding is now *State* = **Closed Complete**, with the work note
     `Recovered: live card fetched successfully (HTTP 200, ### ms).`
   - *Risk* = **Medium**, because the B7 finding is still open.

### B11. Check every agent at once

1. **PDI:** nothing.
2. **LAB:** **All > A2A Sentinel > Watched Agents**. Stay on the **list** without opening a record, and click
   **Run watch cycle** at the top of the list.
3. **Expect:**
   - Banner `A2A Sentinel watch cycle: N agent(s) checked, 0 imported from AI Agent Studio, 0 card change(s), 0 new drift/health finding(s), 0 orphaned AI asset finding(s).`
   - *N* is the number of active Watched Agents (5 on the original lab: the 4 Contoso agents plus Atlassian Rovo).
   - **All > A2A Sentinel > Health Probes**, newest first, shows N new rows with the same time.

### B12. Turn off Now Assist explanations

**Simulates:** an instance without Now Assist. Detection still works; only the explanation becomes fixed text.

1. **LAB, change a setting:**
   - In the filter navigator, type `sys_properties.list` and press **Enter**.
   - Filter on *Name* **starts with** `x_snc_a2a_sentinel`.
   - Open **x_snc_a2a_sentinel.llm_enabled**, set **Value** to `false`, then click **Update**.
   - If the form is read-only and a banner says the record belongs to the A2A Sentinel application, click the link in
     that banner to switch to the application, then edit the value.
2. **PDI:** **Fleet Agents**, then click **Contoso HR Letters Agent**.
   - **OAuth scopes (comma separated)**: change to `letters.draft,hr.records.read,letters.send`
   - **Agent version**: change `1.2.0` to `1.2.1`
   - Click **Update**.
3. **LAB:** **Watched Agents**, click **Contoso HR Letters Agent**, then click **Check now**. Banner `... card changed, 1 new finding(s)`.
4. **Expect:** open `[MEDIUM] Agent requests additional OAuth scopes: letters.send - Contoso HR Letters Agent`.
   - Its *AI explanation (Now Assist)* is exactly
     `Agent requests additional OAuth scopes: letters.send. Review whether the newly requested OAuth scopes are justified and approve or reject them explicitly.`
   - Compare it with the B6 finding, whose explanation is free-form Now Assist prose.
5. **LAB:** set **x_snc_a2a_sentinel.llm_enabled** back to `true`.

### B13. An AI asset whose agent was deleted (orphan): detect and retire

**No PDI step.** This test is about AI Control Tower's inventory on the LAB, not about a vendor.

**The original lab already has an orphan:** finding **A2AF0001001**,
`[MEDIUM] AI asset "Application Support Finder" is still Deployed but its AI agent no longer exists - AI Control Tower inventory`.
Go straight to step 6. **On a new lab**, create an orphan first with steps 1 to 5. Before steps 1 and 4, switch your
update set to **Default** so test records don't land in a deliverable update set.

1. LAB: **AI Agent Studio > Create and manage > AI agents > New**. Create an agent named `Sentinel Orphan Test` with any
   description, role and instructions, and no tools. Save it.
2. LAB: **All > System Definition > Scheduled Jobs**, open **Sync Now Assist AI Assets**, and click **Execute Now**
   (or wait up to an hour for the hourly run).
3. LAB: in the filter navigator, type `alm_ai_system_digital_asset.list` and filter *Display name* =
   `Sentinel Orphan Test`. *Install status* = **Deployed**.
4. LAB: type `sn_aia_agent.list`, open **Sentinel Orphan Test**, and click **Delete**.
5. LAB: **Watched Agents** list, then **Run watch cycle**. The banner ends with `1 orphaned AI asset finding(s).`

   > **If it says `0 orphaned AI asset finding(s)`:** check the asset from step 3. If it's now **Retired**, your release
   > cleans up agents deleted from their list, so the gap doesn't reproduce this way. The original orphan came from
   > **uninstalling an app that contained an agent**. To reproduce that:
   > 1. Install the assignment project (`newrocket_assignment`, which defines an AI agent) with
   >    `npx @servicenow/sdk install --auth <new-lab-alias>`.
   > 2. Run **Sync Now Assist AI Assets** (step 2).
   > 3. Delete that app from its **Custom Application** record (**Delete** button).
   > 4. Repeat this step.
6. LAB: **All > A2A Sentinel > Open Findings**, then open the orphan finding.
   - *Description* names the deleted agent's sys_id, who deleted it, and when. On the original lab it reads
     `... was deleted on 2026-09-24 13:37:14 by admin ...`.
   - *Affected AI asset* and *Affected CI* are filled in.
7. Click **Retire orphaned AI asset** (red button, top right). There is no undo button for this.
8. **Expect:**
   - Banner `A2A Sentinel: AI asset set to Retired. CI set to Retired / Retired.`
   - *State* = **Closed Complete**, with the work note
     `Retired by A2A Sentinel on request of <your name>. AI asset set to Retired. CI set to Retired / Retired.`
   - Click **(i)** next to *Affected AI asset*: *Install status* = **Retired**.
   - Click **(i)** next to *Affected CI*: *Install status* = **Retired** and *Operational status* = **Retired**.
9. Click **Run watch cycle** again. The banner shows `0 orphaned AI asset finding(s).` The asset no longer counts in
   AI Control Tower's licensing inventory, which excludes only Retired assets.

### B14. Watch a real third-party agent (the one test where you create a Watched Agent)

**No PDI step.** This shows Sentinel works with any public A2A card, not only the simulated fleet.

1. LAB: **All > A2A Sentinel > Watched Agents**, click **New**, and fill in:
   - **Name**: `Atlassian Rovo (manual)`
   - **Agent Card URL**: `https://a2a.atlassian.com/.well-known/agent.json`
   - **Source**: **Manually watched**
   - **Active**: ticked
   - Click **Submit**.
2. Open **Atlassian Rovo (manual)** from the list and click **Check now**.
3. **Expect:**
   - Banner `A2A Sentinel: Atlassian Rovo (manual): ok (HTTP 200, ### ms), card changed, 1 new finding(s)`. On a
     first check, *"card changed"* means the first copy of the card was stored.
   - *Card version* = `1.0.0`, *Authentication* = `oauth2`, *Skills* = `2`, *Endpoint host* = `a2a.atlassian.com`,
     *Risk* = **Low**.
   - The finding has Finding type **Legacy card path** and short description
     `[LOW] Card published at legacy path /.well-known/agent.json - Atlassian Rovo (manual)`. This is a real
     observation about Atlassian's live agent.

### B15. Automation API (Postman)

**No PDI step.**

1. LAB: **Watched Agents** list. Right-click the **Contoso Vendor Risk Agent** row, then click **Copy sys_id**.
2. In Postman, for each request: **Authorization** = **Basic Auth** with your LAB admin user name and password, plus the
   header `Accept: application/json`.

   | Method and URL | Expected |
   |---|---|
   | `GET https://<LAB>/api/x_snc_a2a_sentinel/sentinel/status` | `200`, `{"result": {"agents": [...], "open_findings": [...]}}`. Each agent has `health`, `risk`, `card_version`, `auth`, `endpoint_host` |
   | `POST https://<LAB>/api/x_snc_a2a_sentinel/sentinel/run` | `200`, `{"result": {"imported": 0, "checked": N, "changed": 0, "findings": 0, "orphans": 0}}` |
   | `POST https://<LAB>/api/x_snc_a2a_sentinel/sentinel/agents/<sys_id>/check` | `200`, `{"result": {"changed": false, "findings": 0, "message": "Contoso Vendor Risk Agent: ok (HTTP 200, ### ms), no change, 0 new finding(s)"}}` |

3. **Negative test (after B16):** set a password on `sentinel.viewer` (open the user, then **Set Password**), and call
   `/status` as that user. **Expect HTTP 403**: only `x_snc_a2a_sentinel.admin` may call the API.

### B16. Viewer vs admin access

**No PDI step.**

1. LAB: **All > User Administration > Users**, click **New**. Set *User ID* `sentinel.viewer`, *First name* `Sentinel`,
   *Last name* `Viewer`, then click **Submit**.
2. Open **Sentinel Viewer**. In the **Roles** related list, click **Edit...**, add `x_snc_a2a_sentinel.viewer`, then click **Save**.
3. Click your avatar (top right), then **Impersonate user**, then **Sentinel Viewer**.
4. **Expect (viewer):**
   - **All > A2A Sentinel** shows the 5 modules.
   - The Watched Agents list has **no New** and **no Run watch cycle** button.
   - A Watched Agent form is **read-only** and has **no Check now** button.
   - Findings have **no Accept risk** and **no Retire** button.
5. Avatar, then **End impersonation**. Add the role `x_snc_a2a_sentinel.admin` to Sentinel Viewer, then impersonate again.
6. **Expect (admin):** **New**, **Run watch cycle**, **Check now** and **Accept risk** are visible, and you can create
   and edit Watched Agents.
7. **End impersonation**.

---

## Reset after testing

Run this after Part B, or any time the starting state is off (for example after the PDI has been asleep).
**Wake the PDI first**; otherwise step 2 stores the hibernation page instead of the cards.

1. **PDI:** **All > System Definition > Scripts - Background**. Set **in scope** to **A2A Contoso Agent Fleet**, paste
   [reset/fleet-reset.js](reset/fleet-reset.js), and click **Run script**. You should see `Restored travel-booking`
   and so on for all four agents.
2. **LAB:** the same page. Set **in scope** to **A2A Sentinel**, paste [reset/sentinel-reset.js](reset/sentinel-reset.js),
   and click **Run script**. You should see the deleted counts, then `Fresh baselines captured: {...}`.
3. **LAB:** delete the Watched Agent **Atlassian Rovo (manual)** from B14, and check that
   **x_snc_a2a_sentinel.llm_enabled** is `true`.
4. B13's retirement is deliberate and isn't undone.
