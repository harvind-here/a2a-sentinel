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
- **On a new lab** (after migrating): A6 and A7 need an external agent registered in that lab's AI Agent Studio (the old lab
  had Atlassian Rovo). The orphan in A7 step 3 existed only on the old lab; B13 shows how to create one.

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
   - On this lab, **4 declared rows show an empty Target scope**. An early build wrote scope names instead of sys_ids,
     and runtime tracking had already created correct twins before the fix, so the platform could not update them.
     Access works through the twins. A fresh install is clean.

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

### Before you start Part B

**Where things are**

| You need | Where |
|---|---|
| Fleet agent records (PDI) | PDI, then **All > A2A Contoso Fleet > Fleet Agents**, then click the agent's **Name** |
| Watched agents (LAB) | LAB, then **All > A2A Sentinel > Watched Agents**, then click the agent's **Name** |
| Findings for one agent | Bottom of the Watched Agent form: the **Sentinel Findings** related list |
| All open findings | LAB, then **All > A2A Sentinel > Open Findings** |
| *Check now* | Button at the **top right** of the Watched Agent form (or right-click a row in the list, then **Check now**) |
| A fleet agent's live card | `https://dev342222.service-now.com/api/x_2208133_a2afleet/fleet/agents/<slug>/card` (slugs: `travel-booking`, `expense-policy`, `vendor-risk`, `hr-letters`) |

**Fleet Agent form layout (PDI)**, top to bottom:

| Row | Left | Right |
|---|---|---|
| 1 | **Name** (full width) | |
| 2 | **Slug** | **Supports push notifications** |
| 3 | **Provider organization** (full width) | |
| 4 | **Skills (JSON array)**, a large text box (full width) | |
| 5 | **A2A protocol version**, **Status** | **Agent version** |
| 6 | **Endpoint override** (full width) | |
| 7 | **Auth mode**, **Supports streaming** | **Active** |
| 8 | **Description**, then **OAuth scopes (comma separated)** (full width) | |

After editing, click **Update** (top right) on the PDI form.

**Starting state check.** In LAB **Watched Agents** every Contoso agent should show Health **Healthy** and Risk **None**, with:

| Agent | Card version | Authentication | Skills |
|---|---|---|---|
| Contoso Travel Booking Agent | 1.0.0 | oauth2 | 2 |
| Contoso Expense Policy Agent | 2.1.0 | oauth2 | 2 |
| Contoso Vendor Risk Agent | 1.4.2 | apiKey | 1 |
| Contoso HR Letters Agent | 1.0.3 | oauth2 | 1 |

If not, run the [Reset](#reset-after-testing) first.

**Rules for Part B**

- Do the tests **in order** and **do not undo PDI edits between tests**; the final reset restores everything.
- In every message below, `###` is the latency in milliseconds and varies.
- Finding numbers (`A2AF000xxxx`) depend on your instance, so match findings by **Short description** instead.
- The 10-minute job may check an agent before you click *Check now*. If your banner says
  *"no change, 0 new finding(s)"* right after an edit, the job got there first: the findings are already in the
  **Sentinel Findings** related list (check *Created*).

---

### B1. A check with no change creates no noise

1. LAB: **Watched Agents**, open **Contoso Vendor Risk Agent**, click **Check now**.
2. **Banner:** `A2A Sentinel: Contoso Vendor Risk Agent: ok (HTTP 200, ### ms), no change, 0 new finding(s)`
3. **Verify on the form:** *Last checked* is now, *Last HTTP status* = `200`, *Consecutive failures* = `0`.
4. **Verify related lists:** **Health Probes** has a new top row (*Outcome* = OK, *HTTP status* = 200,
   *Card changed* = false). **Card Snapshots** still has **1** row.

### B2. The vendor drops authentication and adds a destructive skill (same version)

1. PDI: open **Contoso Vendor Risk Agent**.
   - **Auth mode**: select **None (public)**
   - **Skills (JSON array)**: select all the text, delete it, and paste:
     ```json
     [{"id":"vendor_risk_score","name":"Vendor risk score","description":"Return a 0-100 risk score with the top risk drivers.","tags":["risk","vendor"]},{"id":"delete_vendor_record","name":"Delete vendor record","description":"Permanently delete a vendor and all associated contracts from the vendor master.","tags":["vendor","admin"]}]
     ```
   - **Agent version**: leave **1.4.2**
   - Click **Update**.
2. (Optional) Open `.../agents/vendor-risk/card` in a browser: `"securitySchemes": {}`, `"security": []`, and 2 skills.
3. LAB: open **Contoso Vendor Risk Agent**, click **Check now**.
4. **Banner:** `A2A Sentinel: Contoso Vendor Risk Agent: ok (HTTP 200, ### ms), card changed, 3 new finding(s)`
5. **Verify on the form:** *Risk* = **Critical**, *Health* = Healthy, *Authentication* = `none`, *Skills* = `2`, *Card version* = `1.4.2`.
6. **Verify Sentinel Findings** (3 new rows, *State* = Open):

   | Severity | Finding type | Short description | Priority |
   |---|---|---|---|
   | Critical | Authentication removed | `[CRITICAL] Agent no longer declares any authentication - Contoso Vendor Risk Agent` | 1 - Critical |
   | High | Skill added | `[HIGH] New skill "Delete vendor record" can change or delete data - Contoso Vendor Risk Agent` | 2 - High |
   | Medium | Unversioned change | `[MEDIUM] Card changed without a version bump (still 1.4.2) - Contoso Vendor Risk Agent` | 3 - Moderate |

7. **Verify Card Snapshots:** 2 rows. The newest has *Authentication* = `none` and *Skills* = `2`.
   **Health Probes:** the newest row has *Card changed* = true.
8. Open the **Critical** finding:
   - *Description*: `Before: apiKey  ->  After: none`
   - *AI explanation (Now Assist)*: 2 to 3 sentences written by Now Assist (the wording varies on every run).
   - *Recommended action*: `Suspend use of this agent in agentic workflows until the provider restores authentication, then confirm with the vendor why it was removed.`
   - **Evidence** section: *Evidence (JSON)* is `{"before": {"apiKey": "apiKey"}, "after": {}}`. Click the **(i)** icon next to
     *Card before* and *Card after*: the "before" card has a `securitySchemes.apiKey` block; the "after" card's `securitySchemes` is empty.
9. Open the **High** finding. *Description*:
   `Delete vendor record: Permanently delete a vendor and all associated contracts from the vendor master.`
   The *Evidence (JSON)* contains `"destructive": true`.
10. Open the **Medium** finding. *Description*: `2 change(s) published under the same version 1.4.2`.
    *Evidence (JSON)*: `{"version": "1.4.2", "changes": ["auth_removed", "skill_added"]}`.

### B3. De-duplication

1. LAB: on **Contoso Vendor Risk Agent**, click **Check now** again.
2. **Banner:** `... ok (HTTP 200, ### ms), no change, 0 new finding(s)`
3. **Verify:** Sentinel Findings still has exactly the 3 findings from B2, and Card Snapshots still has 2 rows.

### B4. Accept a risk

1. LAB: in **Contoso Vendor Risk Agent > Sentinel Findings**, open the **Medium** finding *"Card changed without a version bump"*.
2. Click **Accept risk** (top right).
3. **Verify:** *State* = **Closed Complete**. The Activity stream shows the work note
   `Change reviewed and risk accepted by <your name>.`
4. Go back to the agent and click **Check now**. *Risk* stays **Critical**, because the Critical and High findings are still open.

### B5. The runtime endpoint moves to another host

1. PDI: open **Contoso Travel Booking Agent**.
   - **Endpoint override**: `https://contoso-agents.example.net/a2a/travel`
   - **Agent version**: `1.1.0`
   - Click **Update**.
2. LAB: open **Contoso Travel Booking Agent**, click **Check now**.
3. **Banner:** `... card changed, 1 new finding(s)`
4. **Verify on the form:** *Risk* = **High**, *Card version* = `1.1.0`, *Endpoint host* = `contoso-agents.example.net`.
5. **Verify the finding:** Severity **High**, Finding type **Endpoint changed**,
   short description `[HIGH] Runtime endpoint moved to a different host - Contoso Travel Booking Agent`.
   *Description*: `https://dev342222.service-now.com/api/x_2208133_a2afleet/fleet/agents/travel-booking/rpc  ->  https://contoso-agents.example.net/a2a/travel`

### B6. OAuth scope creep

1. PDI: open **Contoso HR Letters Agent**.
   - **OAuth scopes (comma separated)**: `letters.draft,hr.records.read`
   - **Agent version**: `1.1.0`
   - Click **Update**.
2. LAB: open **Contoso HR Letters Agent**, click **Check now**.
3. **Banner:** `... card changed, 1 new finding(s)`
4. **Verify the finding:** Severity **Medium**, Finding type **OAuth scopes expanded**,
   short description `[MEDIUM] Agent requests additional OAuth scopes: hr.records.read - Contoso HR Letters Agent`.
   *Description*: `Before: [letters.draft]  ->  After: [hr.records.read, letters.draft]`. The agent's *Risk* = **Medium**.

### B7. A skill disappears

1. PDI: open **Contoso Expense Policy Agent**.
   - **Skills (JSON array)**: replace everything with:
     ```json
     [{"id":"check_policy","name":"Check expense policy","description":"Validate an expense line against policy limits.","tags":["finance","policy"]}]
     ```
   - **Agent version**: `2.2.0`
   - Click **Update**.
2. LAB: open **Contoso Expense Policy Agent**, click **Check now**.
3. **Banner:** `... card changed, 1 new finding(s)`
4. **Verify:** *Skills* = `1`, *Card version* = `2.2.0`, *Risk* = **Medium**. The finding is Severity **Medium**, Finding type
   **Skill removed**, short description `[MEDIUM] Skill "Summarize receipts" was removed - Contoso Expense Policy Agent`.
   *Recommended action*: `Identify ServiceNow workflows that depend on the removed skill; they will fail or degrade.`

### B8. Protocol and capability changes

1. PDI: open **Contoso HR Letters Agent**.
   - **A2A protocol version**: `1.0.0`
   - **Supports streaming**: tick it
   - **Agent version**: `1.2.0`
   - Click **Update**.
2. LAB: open **Contoso HR Letters Agent**, click **Check now**.
3. **Banner:** `... card changed, 2 new finding(s)`
4. **Verify the findings:**
   - Medium, **Protocol version changed**: `[MEDIUM] A2A protocol version changed (0.3.0 -> 1.0.0) - Contoso HR Letters Agent`
   - Low, **Capabilities changed**: `[LOW] Agent capabilities changed - Contoso HR Letters Agent`, with *Description*
     `streaming=false, pushNotifications=false  ->  streaming=true, pushNotifications=false`
5. Note: **Low** findings don't call Now Assist. Their *AI explanation* is the fixed text
   `Agent capabilities changed. Review whether workflows rely on the changed capability (streaming / push notifications).`

### B9. Outage: Degraded, then Down

1. PDI: open **Contoso Expense Policy Agent**. **Status**: select **Offline (503)**, then click **Update**.
2. (Optional) Open `.../agents/expense-policy/card` in a browser: `{"error": "Service Unavailable"}`.
3. LAB: open **Contoso Expense Policy Agent**, click **Check now** (**first** check).
   - **Banner:** `A2A Sentinel: Contoso Expense Policy Agent: http_error (HTTP 503, ### ms), no change, 0 new finding(s)`
   - **Form:** *Health* = **Degraded**, *Last HTTP status* = `503`, *Consecutive failures* = `1`.
   - **Health Probes**, newest row: *Outcome* = HTTP error, *HTTP status* = 503, *Error* = `HTTP 503`.
4. Click **Check now** again (**second** check).
   - **Banner:** `... http_error (HTTP 503, ### ms), no change, 1 new finding(s)`
   - **Form:** *Health* = **Down**, *Consecutive failures* = `2`, *Risk* = **High**.
   - **Finding:** Severity **High**, Finding type **Card unreachable**, short description
     `[HIGH] Agent card unreachable - Contoso Expense Policy Agent`. *Description*:
     `HTTP 503 (2 consecutive failed checks of https://dev342222.service-now.com/api/x_2208133_a2afleet/fleet/agents/expense-policy/card)`

### B10. Self-healing

1. PDI: open **Contoso Expense Policy Agent**. **Status**: select **Online**, then click **Update**.
2. LAB: open **Contoso Expense Policy Agent**, click **Check now**.
3. **Banner:** `... ok (HTTP 200, ### ms), no change, 0 new finding(s)`
4. **Verify:** *Health* = **Healthy**, *Consecutive failures* = `0`. The **Card unreachable** finding is now
   *State* = **Closed Complete**, with the work note `Recovered: live card fetched successfully (HTTP 200, ### ms).`
   *Risk* goes back to **Medium**, because the B7 finding is still open.

### B11. Run the whole cycle from the list

1. LAB: **All > A2A Sentinel > Watched Agents** (the list). Click **Run watch cycle** at the top of the list.
2. **Banner:** `A2A Sentinel watch cycle: N agent(s) checked, 0 imported from AI Agent Studio, 0 card change(s), 0 new drift/health finding(s), 0 orphaned AI asset finding(s).`
   *N* is the number of active watched agents.
3. **Verify:** **All > A2A Sentinel > Health Probes**, sorted by *Probed on*, shows N new rows with the same timestamp.

### B12. Turn off Now Assist explanations

1. LAB: type `sys_properties.list` in the filter navigator and press Enter. Filter on **Name starts with** `x_snc_a2a_sentinel`.
2. Open **x_snc_a2a_sentinel.llm_enabled**, set **Value** to `false`, and click **Update**.
3. PDI: open **Contoso HR Letters Agent**. Set **OAuth scopes (comma separated)** to `letters.draft,hr.records.read,letters.send`
   and **Agent version** to `1.2.1`, then click **Update**.
4. LAB: open **Contoso HR Letters Agent**, click **Check now**. **Banner:** `... card changed, 1 new finding(s)`
5. Open `[MEDIUM] Agent requests additional OAuth scopes: letters.send - Contoso HR Letters Agent`.
   Its *AI explanation (Now Assist)* is exactly:
   `Agent requests additional OAuth scopes: letters.send. Review whether the newly requested OAuth scopes are justified and approve or reject them explicitly.`
   Compare it with the B6 finding, whose explanation is free-form Now Assist prose. Detection is identical either way.
6. Set **x_snc_a2a_sentinel.llm_enabled** back to `true`.

### B13. Orphaned AI asset: detect and retire

*On the original lab, finding A2AF0001001 already existed; skip to step 6.* On a new lab, create an orphan first.
Switch your update set to **Default** before steps 1 and 4, so test records don't land in a deliverable update set.

1. LAB: **AI Agent Studio > Create and manage > AI agents > New**. Create an agent named `Sentinel Orphan Test` with any
   description, role and instructions, and no tools. Save it.
2. Make AI Control Tower inventory it: **All > System Definition > Scheduled Jobs**, open **Sync Now Assist AI Assets**,
   and click **Execute Now** (or wait up to an hour for the hourly run).
3. Verify the asset exists: type `alm_ai_system_digital_asset.list` in the filter navigator and filter
   *Display name* = `Sentinel Orphan Test`. You should see *Install status* = **Deployed**.
4. Delete the agent: type `sn_aia_agent.list`, open **Sentinel Orphan Test**, and click **Delete**.
5. LAB: **Watched Agents** list, then **Run watch cycle**. **Banner** ends with `1 orphaned AI asset finding(s).`

   > **If it says `0 orphaned AI asset finding(s)`:** check the asset from step 3. If its *Install status* changed to
   > **Retired**, your release cleaned it up when the agent was deleted from its list, so the gap does not reproduce
   > this way. The original orphan came from **uninstalling an app that contained an agent**. To reproduce exactly that,
   > install the assignment project (`newrocket_assignment`, which defines an AI agent) with
   > `npx @servicenow/sdk install --auth <new-lab-alias>`, run **Sync Now Assist AI Assets** (step 2), then delete that
   > app from its **Custom Application** record (**Delete** button), and repeat step 5.
6. **All > A2A Sentinel > Open Findings**: open `[MEDIUM] AI asset "Sentinel Orphan Test" is still Deployed but its AI agent no longer exists - AI Control Tower inventory`
   (on the original lab: *"...Application Support Finder..."*). *Description* names the deleted agent's sys_id and who deleted it and when.
   *Affected AI asset* and *Affected CI* are filled in.
7. Click **Retire orphaned AI asset** (red button, top right).
8. **Banner:** `A2A Sentinel: AI asset set to Retired. CI set to Retired / Retired.`
9. **Verify:** *State* = **Closed Complete**, with the work note
   `Retired by A2A Sentinel on request of <your name>. AI asset set to Retired. CI set to Retired / Retired.`
   Click **(i)** on *Affected AI asset*: *Install status* = **Retired**. Click **(i)** on *Affected CI*:
   *Install status* = **Retired** and *Operational status* = **Retired**.
10. Click **Run watch cycle** again: `0 orphaned AI asset finding(s).`
    The asset is no longer counted in AI Control Tower's licensing inventory, which excludes only Retired assets.

### B14. Watch a real third-party agent by URL

1. LAB: **Watched Agents**, click **New**.
   - **Name**: `Atlassian Rovo (manual)`
   - **Agent Card URL**: `https://a2a.atlassian.com/.well-known/agent.json`
   - **Source**: **Manually watched**
   - **Active**: ticked
   - Click **Submit**.
2. Open **Atlassian Rovo (manual)**, click **Check now**.
3. **Banner:** `A2A Sentinel: Atlassian Rovo (manual): ok (HTTP 200, ### ms), card changed, 1 new finding(s)`
   (*"card changed"* here means the first baseline was captured.)
4. **Verify:** *Card version* = `1.0.0`, *Authentication* = `oauth2`, *Skills* = `2`, *Endpoint host* = `a2a.atlassian.com`, *Risk* = **Low**.
   The finding is Severity **Low**, Finding type **Legacy card path**, short description
   `[LOW] Card published at legacy path /.well-known/agent.json - Atlassian Rovo (manual)`.
5. Sentinel works with **any** public A2A card URL, not only the simulated fleet.

### B15. Automation API (Postman)

1. Find a watched agent's sys_id: in **Watched Agents**, right-click the **Contoso Vendor Risk Agent** row, then **Copy sys_id**.
2. In Postman, for each request set **Authorization** to **Basic Auth** with your LAB admin user name and password, and add the header `Accept: application/json`.

   | Method and URL | Expected |
   |---|---|
   | `GET https://<LAB>/api/x_snc_a2a_sentinel/sentinel/status` | `200`, `{"result": {"agents": [...], "open_findings": [...]}}`. Each agent has `health`, `risk`, `card_version`, `auth`, `endpoint_host` |
   | `POST https://<LAB>/api/x_snc_a2a_sentinel/sentinel/run` | `200`, `{"result": {"imported": 0, "checked": N, "changed": 0, "findings": 0, "orphans": 0}}` |
   | `POST https://<LAB>/api/x_snc_a2a_sentinel/sentinel/agents/<sys_id>/check` | `200`, `{"result": {"changed": false, "findings": 0, "message": "Contoso Vendor Risk Agent: ok (HTTP 200, ### ms), no change, 0 new finding(s)"}}` |

3. **Negative test (after B16):** set a password on `sentinel.viewer` (open the user, then **Set Password**) and call `/status`
   with that user. **Expect HTTP 403**: the REST endpoint ACL only allows `x_snc_a2a_sentinel.admin`.

### B16. Role-based access

1. LAB: **All > User Administration > Users**, click **New**. *User ID* `sentinel.viewer`, *First name* `Sentinel`,
   *Last name* `Viewer`, then **Submit**.
2. Open **Sentinel Viewer**, go to the **Roles** related list, click **Edit...**, add `x_snc_a2a_sentinel.viewer`, then **Save**.
3. Click your avatar (top right), then **Impersonate user**, then **Sentinel Viewer**.
4. **Verify (viewer):**
   - **All > A2A Sentinel** shows the 5 modules.
   - The **Watched Agents** list has **no New** and **no Run watch cycle** button.
   - A watched agent's form is **read-only**, with **no Check now** button.
   - In **Open Findings**, a finding has **no Accept risk** and **no Retire** button.
5. Avatar, then **End impersonation**. Add the role `x_snc_a2a_sentinel.admin` to Sentinel Viewer, then impersonate again.
6. **Verify (admin):** **New**, **Run watch cycle**, **Check now** and **Accept risk** are visible, and you can edit and create watched agents.
7. End impersonation.

---

## Reset after testing

1. **PDI**: **All > System Definition > Scripts - Background**. Set **in scope** to **A2A Contoso Agent Fleet**, paste
   [reset/fleet-reset.js](reset/fleet-reset.js), and click **Run script**. You should see `Restored travel-booking`, and so on for all four.
2. **LAB**: **Scripts - Background**. Set **in scope** to **A2A Sentinel**, paste [reset/sentinel-reset.js](reset/sentinel-reset.js),
   and click **Run script**. You should see the deleted counts and `Fresh baselines captured: {...}`.
3. LAB: delete the watched agent **Atlassian Rovo (manual)** from B14, and set **x_snc_a2a_sentinel.llm_enabled** back
   to `true` if you skipped that in B12.
4. B13's retirement is deliberate and is not undone.
