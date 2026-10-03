# Moving to a new instance

Both apps are pure Fluent source, so an instance is disposable. The fleet lives on a long-lived PDI and the
Sentinel app goes on any instance you are testing on. A lab instance only lasts about two days.

## Sentinel on a new lab instance (about 10 minutes)

1. Make sure the account you'll deploy with has the **admin** role on the new lab. A user you create yourself on a lab
   starts with **no roles**: the SDK can sign in, but every system table returns HTTP 403 and the install fails.
   As the lab's `admin` user:
   1. Open **User Administration > Users**, then your user.
   2. In the **Roles** related list, click **Edit...**, add `admin`, then click **Save**.
   3. If `admin` can't be added, first go to the avatar menu, then **Elevate role**, then **security_admin**.
2. Add credentials. You type the password yourself; the SDK stores it locally, never in the repo.
   ```bash
   npx @servicenow/sdk auth --add https://<new-lab>.service-now.com --type basic --alias lab_2
   ```
3. Point the deploy script at it: in `sentinel/package.json`, set `"deploy": "now-sdk install --auth lab_2"`.
4. Build and install:
   ```bash
   cd sentinel && npm install && npm run build && npm run deploy
   ```
5. Wake the fleet PDI (it hibernates when unused), then run a first watch cycle: **A2A Sentinel > Watched Agents > Run watch cycle**.
   - The four Contoso agents are pre-seeded and watched immediately.
   - Consumed A2A agents registered in that instance's AI Agent Studio (for example Atlassian Rovo, if the lab
     ships with it) are imported automatically, with ServiceNow's registered card as the baseline.
   - On instances without AI Control Tower or AI Agents, the import and orphan steps skip themselves. Drift and
     health monitoring still run.

## Optional: consume a Contoso agent through AI Agent Studio

This demonstrates *drift since registration* against ServiceNow's own registration record:
**AI Agent Studio > Create and manage > AI agents > Add > External > Agent2Agent (A2A) protocol**,
then add a provider with card URL
`https://<fleet-instance>/api/x_2208133_a2afleet/fleet/agents/travel-booking/card`,
then **Discover**, then **Activate**. The next watch cycle imports it.

## Fleet on a new PDI

1. Check the PDI's vendor prefix (`glide.appcreator.company.code`). The fleet scope is `x_2208133_a2afleet`;
   another PDI may need a different prefix, which means renaming the scope, table and REST namespace.
2. Add credentials, set `fleet/package.json` deploy to that alias, then `npm run build && npm run deploy`.
3. Update `FLEET` in `sentinel/src/fluent/data/watched-fleet.now.ts` to the new host and redeploy Sentinel.
