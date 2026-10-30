-- Migration 0001: lead capture storage
-- Applied with: wrangler d1 migrations apply geo_agency_leads

CREATE TABLE IF NOT EXISTS leads (
  id                  TEXT PRIMARY KEY,
  created_at          TEXT NOT NULL,
  name                TEXT,
  email               TEXT NOT NULL,
  phone               TEXT,
  company             TEXT,
  website             TEXT,
  service             TEXT,
  budget              TEXT,
  message             TEXT,
  source              TEXT NOT NULL DEFAULT 'contact',
  status              TEXT NOT NULL DEFAULT 'new'
                        CHECK (status IN ('new','contacted','qualified','won','archived')),
  notification_status TEXT NOT NULL DEFAULT 'pending'
                        CHECK (notification_status IN ('pending','sent','failed')),
  notified_at         TEXT,
  -- Salted SHA-256 of the submitter IP. Used only for rate limiting and
  -- duplicate detection; the raw address is never stored.
  ip_hash             TEXT
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_status_created_at ON leads (status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_ip_hash_created_at ON leads (ip_hash, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email_created_at ON leads (email, created_at DESC);
