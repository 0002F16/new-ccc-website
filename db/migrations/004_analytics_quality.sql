BEGIN;

ALTER TABLE analytics_sessions
  ADD COLUMN IF NOT EXISTS country_code text,
  ADD COLUMN IF NOT EXISTS subdivision_code text,
  ADD COLUMN IF NOT EXISTS subdivision_name text;

ALTER TABLE analytics_sessions
  DROP CONSTRAINT IF EXISTS analytics_sessions_country_code_check,
  DROP CONSTRAINT IF EXISTS analytics_sessions_subdivision_code_check,
  DROP CONSTRAINT IF EXISTS analytics_sessions_subdivision_name_check;

ALTER TABLE analytics_sessions
  ADD CONSTRAINT analytics_sessions_country_code_check
    CHECK (country_code IS NULL OR country_code ~ '^[A-Z]{2}$'),
  ADD CONSTRAINT analytics_sessions_subdivision_code_check
    CHECK (subdivision_code IS NULL OR subdivision_code ~ '^[A-Z0-9-]{1,12}$'),
  ADD CONSTRAINT analytics_sessions_subdivision_name_check
    CHECK (subdivision_name IS NULL OR char_length(subdivision_name) BETWEEN 1 AND 80);

CREATE INDEX IF NOT EXISTS analytics_sessions_geo_time_idx
  ON analytics_sessions(country_code, subdivision_code, started_at DESC);

ALTER TABLE analytics_daily
  ADD COLUMN IF NOT EXISTS section_id text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS element_id text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS country_code text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS subdivision_code text NOT NULL DEFAULT '';

ALTER TABLE analytics_daily DROP CONSTRAINT IF EXISTS analytics_daily_pkey;
ALTER TABLE analytics_daily ADD PRIMARY KEY (
  day, event_name, page_path, device_bucket, utm_source, utm_campaign,
  experiment_id, variant_key, section_id, element_id, country_code, subdivision_code
);

ALTER TABLE analytics_events DROP CONSTRAINT IF EXISTS analytics_events_known_name;
ALTER TABLE analytics_events
  ADD CONSTRAINT analytics_events_known_name CHECK (event_name IN (
    'page_view', 'section_view', 'cta_click', 'faq_open', 'video_start',
    'rage_click', 'dead_click', 'hesitation', 'web_vital',
    'experiment_exposure', 'application_started',
    'application_submit_attempted', 'application_validation_failed',
    'application_submit_failed', 'application_submitted',
    'application_qualified', 'call_booked', 'call_attended', 'enrollment_paid'
  ));

COMMIT;
