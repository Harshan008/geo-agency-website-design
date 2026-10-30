# GEO agency site

Marketing site for a founder-led Generative Engine Optimization agency, built on
Next.js and deployed to Cloudflare Workers via [vinext](https://vinext.dev).

```bash
pnpm install
pnpm dev              # Next.js dev server (no Cloudflare bindings)
pnpm dev:vinext       # Vite/Workers dev server
pnpm build            # Next.js production build
pnpm build:vinext     # Workers production build
pnpm deploy:vinext    # Build and deploy to Cloudflare
```

## Lead capture

Both public forms — the strategy-call form on `/contact` and the audit-request
form on `/audit` — persist submissions to Cloudflare D1 and send a notification
email through Resend.

### Flow

```
form submit → validate + normalize → honeypot check → Turnstile verify
            → rate-limit check → duplicate check → INSERT into D1
            → Resend notification → mark notification_status
```

The D1 write always happens **before** the notification. If Resend fails the
lead is still stored, with `notification_status = 'failed'`, and the admin
dashboard flags it as "email not sent".

### Endpoints

| Method | Path | Auth |
| --- | --- | --- |
| `POST` | `/api/leads` | Public — honeypot + Turnstile + rate limit |
| `GET` | `/api/admin/leads` | Cloudflare Access |
| `PATCH` | `/api/admin/leads/:id` | Cloudflare Access |
| `DELETE` | `/api/admin/leads/:id` | Cloudflare Access |

The site's own forms use Next.js Server Actions and call the same intake
pipeline directly, so they keep working without client-side JavaScript.
`POST /api/leads` exists for anything external.

`POST /api/leads` accepts JSON or form-encoded bodies up to 16KB:

```bash
curl -X POST https://yourdomain.com/api/leads \
  -H 'Content-Type: application/json' \
  -d '{"email":"someone@example.com","name":"Someone","message":"Hello"}'
```

Responses are always JSON: `201` on success, `422` with a `fields` map on
validation errors, `429` when rate limited, `503` when storage is unavailable.
Internal errors are logged server-side and never returned to the caller.

### Admin dashboard

`/admin/leads` lists newest-first, is searchable by name/email/company/website,
filterable by status, and lets you change status or delete a lead. Statuses are
`new`, `contacted`, `qualified`, `won`, `archived`.

The page and its API fail **closed**: without `CF_ACCESS_TEAM_DOMAIN` and
`CF_ACCESS_AUD` configured, every admin request is denied. The Access JWT's
signature, audience and issuer are all verified server-side — a spoofed header
is not enough.

### Data stored

`id`, `created_at` (UTC ISO-8601), `name`, `email`, `phone`, `company`,
`website`, `service`, `budget`, `message`, `source`, `status`,
`notification_status`, `notified_at`, and `ip_hash` — a salted SHA-256 of the
submitter's IP used only for rate limiting and duplicate detection. The raw IP
is never stored.

---

## Setup

Run these in order. Replace every `<PLACEHOLDER>`.

### 1. Create the D1 database

```bash
npx wrangler d1 create geo_agency_leads
```

Copy the `database_id` from the output into `wrangler.jsonc`, replacing
`REPLACE_WITH_YOUR_D1_DATABASE_ID`.

### 2. Run the migration

```bash
npx wrangler d1 migrations apply geo_agency_leads --local    # local dev database
npx wrangler d1 migrations apply geo_agency_leads --remote   # production
```

Verify:

```bash
npx wrangler d1 execute geo_agency_leads --remote \
  --command "SELECT name FROM sqlite_master WHERE type='table';"
```

### 3. Set up Resend

1. Create a free account at [resend.com](https://resend.com).
2. Add and verify your sending domain (Domains → Add Domain, then add the DNS
   records it gives you). Until a domain is verified you can only send to your
   own address.
3. Create an API key with **Sending access** at
   [resend.com/api-keys](https://resend.com/api-keys).

### 4. Set up Turnstile

1. In the Cloudflare dashboard, go to **Turnstile → Add widget**.
2. Add your domain. Widget mode **Managed** is a good default.
3. You get a **Site key** (public) and a **Secret key** (private).

The site key must be present at **build time** so it can be inlined into the
client bundle:

```bash
cp .env.example .env
# then set NEXT_PUBLIC_TURNSTILE_SITE_KEY in .env
```

If no site key is set, the widget renders nothing and forms still work — the
honeypot and rate limit stay active. Set it before launch.

### 5. Add Worker secrets

Generate the IP hash salt first:

```bash
openssl rand -hex 32
```

Then set each secret (each command prompts for the value — nothing is written to
disk or to shell history):

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put LEAD_NOTIFY_TO         # harshan@lumencito.com
npx wrangler secret put LEAD_NOTIFY_FROM       # leads@<your-verified-domain>
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put IP_HASH_SALT           # the openssl value from above
npx wrangler secret put CF_ACCESS_TEAM_DOMAIN  # <yourteam>.cloudflareaccess.com
npx wrangler secret put CF_ACCESS_AUD          # from step 7
npx wrangler secret put ADMIN_BASE_URL         # https://<yourdomain>
```

For local `wrangler dev`, put the same values in `.dev.vars`:

```bash
cp .dev.vars.example .dev.vars
```

`.dev.vars` and `.env` are gitignored. Never commit them, and never put secrets
in `wrangler.jsonc` `vars` — those are plain text in the bundle.

### 6. Deploy

```bash
pnpm build:vinext
pnpm deploy:vinext
```

### 7. Protect the admin dashboard with Cloudflare Access

1. In the Cloudflare **Zero Trust** dashboard, go to **Access → Applications →
   Add an application → Self-hosted**.
2. Application domain: `<yourdomain>`, path `admin`. Add a second application
   for path `api/admin`.
3. Add a policy: action **Allow**, rule **Emails** → `harshan@lumencito.com`.
4. Open the application's **Overview** tab and copy the **Application Audience
   (AUD) Tag**.
5. Set it as the `CF_ACCESS_AUD` secret (step 5) and redeploy.

Your team domain is under **Settings → Custom Pages**, or is the
`<yourteam>.cloudflareaccess.com` hostname you see when signing in.

### Testing locally

`start:vinext` runs wrangler against `dist/server/wrangler.json`, and wrangler
resolves its local database directory relative to the **config file** — so it
looks in `dist/server/.wrangler/`, not the repo root. Migrations applied from the
root then appear to be missing ("no such table: leads"). Pass `--persist-to` to
both commands so they share one local database:

```bash
npx wrangler d1 migrations apply geo_agency_leads --local \
  --config wrangler.jsonc --persist-to .wrangler/state

npx vinext build
npx wrangler dev --config dist/server/wrangler.json --local \
  --persist-to "$PWD/.wrangler/state"
```

Inspect the local rows with:

```bash
npx wrangler d1 execute geo_agency_leads --local \
  --config wrangler.jsonc --persist-to .wrangler/state \
  --command "SELECT created_at, email, status, notification_status FROM leads ORDER BY created_at DESC;"
```

### 8. Verify end to end

1. Submit the form on `/contact`.
2. Check your inbox for the notification.
3. Open `/admin/leads` — you should be prompted by Cloudflare Access, then see
   the lead.
4. Confirm the lead is stored:

```bash
npx wrangler d1 execute geo_agency_leads --remote \
  --command "SELECT id, created_at, email, status, notification_status FROM leads ORDER BY created_at DESC LIMIT 5;"
```

## Known limits

- **Rate limiting counts stored leads only** (5 per IP per 10 minutes). Requests
  that fail validation are not counted, so Turnstile and Cloudflare's own edge
  protections are what absorb a flood of invalid payloads.
- **Duplicate suppression** treats the same email + same form within 5 minutes as
  one lead, returning the original id without sending a second email.
- **Turnstile outages fail open.** If Cloudflare's verification endpoint is
  unreachable the submission is allowed through and a warning is logged, so an
  outage never blocks real leads. A token that is present and actually rejected
  is always refused.
- **Deleting a lead is permanent** — there is no soft delete. Use the `archived`
  status if you want to keep the record.
