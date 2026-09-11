BEGIN;

CREATE TABLE IF NOT EXISTS analytics_admin_audit (
  audit_id bigserial PRIMARY KEY,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  action text NOT NULL,
  subject text NOT NULL,
  details jsonb NOT NULL DEFAULT '{}'::jsonb
);

COMMIT;

