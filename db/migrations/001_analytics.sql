BEGIN;

CREATE TABLE IF NOT EXISTS analytics_visitors (
  visitor_id uuid PRIMARY KEY,
  first_seen_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  first_utm_source text,
  first_utm_medium text,
  first_utm_campaign text,
  first_utm_content text,
  first_utm_term text,
  first_referrer_host text
);

CREATE TABLE IF NOT EXISTS analytics_sessions (
  session_id uuid PRIMARY KEY,
  visitor_id uuid NOT NULL REFERENCES analytics_visitors(visitor_id) ON DELETE CASCADE,
  started_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  entry_path text NOT NULL,
  device_bucket text NOT NULL CHECK (device_bucket IN ('mobile', 'tablet', 'desktop')),
  viewport_width integer NOT NULL CHECK (viewport_width BETWEEN 1 AND 10000),
  viewport_height integer NOT NULL CHECK (viewport_height BETWEEN 1 AND 10000),
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  referrer_host text
);

CREATE INDEX IF NOT EXISTS analytics_sessions_started_idx ON analytics_sessions(started_at DESC);
CREATE INDEX IF NOT EXISTS analytics_sessions_campaign_idx ON analytics_sessions(utm_campaign, started_at DESC);

CREATE TABLE IF NOT EXISTS analytics_batches (
  batch_id uuid PRIMARY KEY,
  session_id uuid NOT NULL REFERENCES analytics_sessions(session_id) ON DELETE CASCADE,
  received_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS analytics_events (
  event_id uuid PRIMARY KEY,
  session_id uuid NOT NULL REFERENCES analytics_sessions(session_id) ON DELETE CASCADE,
  pageview_id uuid NOT NULL,
  occurred_at timestamptz NOT NULL,
  received_at timestamptz NOT NULL DEFAULT now(),
  event_name text NOT NULL,
  page_path text NOT NULL,
  section_id text,
  element_id text,
  numeric_value double precision,
  metric_name text CHECK (metric_name IS NULL OR metric_name IN ('LCP', 'CLS', 'INP')),
  experiment_id text,
  experiment_version integer,
  variant_key text CHECK (variant_key IS NULL OR variant_key IN ('control', 'treatment'))
);

CREATE INDEX IF NOT EXISTS analytics_events_name_time_idx ON analytics_events(event_name, occurred_at DESC);
CREATE INDEX IF NOT EXISTS analytics_events_session_idx ON analytics_events(session_id, occurred_at);
CREATE INDEX IF NOT EXISTS analytics_events_experiment_idx ON analytics_events(experiment_id, experiment_version, variant_key);

CREATE TABLE IF NOT EXISTS analytics_heatmap_bins (
  session_id uuid NOT NULL REFERENCES analytics_sessions(session_id) ON DELETE CASCADE,
  page_path text NOT NULL,
  section_id text NOT NULL,
  device_bucket text NOT NULL CHECK (device_bucket IN ('mobile', 'tablet', 'desktop')),
  experiment_id text NOT NULL DEFAULT '',
  variant_key text NOT NULL DEFAULT '',
  kind text NOT NULL CHECK (kind IN ('move', 'click')),
  grid_x smallint NOT NULL CHECK (grid_x BETWEEN 0 AND 19),
  grid_y smallint NOT NULL CHECK (grid_y BETWEEN 0 AND 19),
  sample_count integer NOT NULL DEFAULT 0,
  dwell_ms integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (session_id, page_path, section_id, kind, grid_x, grid_y)
);

CREATE INDEX IF NOT EXISTS analytics_heatmap_time_idx ON analytics_heatmap_bins(updated_at DESC);

CREATE TABLE IF NOT EXISTS analytics_experiments (
  experiment_id text NOT NULL,
  version integer NOT NULL,
  name text NOT NULL,
  page text NOT NULL,
  slot text NOT NULL,
  primary_event text NOT NULL,
  status text NOT NULL CHECK (status IN ('running', 'paused', 'ended')),
  started_at timestamptz,
  ended_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (experiment_id, version)
);

CREATE UNIQUE INDEX IF NOT EXISTS analytics_one_running_homepage
  ON analytics_experiments(page) WHERE status = 'running';

CREATE TABLE IF NOT EXISTS analytics_exposures (
  experiment_id text NOT NULL,
  experiment_version integer NOT NULL,
  visitor_id uuid NOT NULL,
  session_id uuid NOT NULL REFERENCES analytics_sessions(session_id) ON DELETE CASCADE,
  variant_key text NOT NULL CHECK (variant_key IN ('control', 'treatment')),
  exposed_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (experiment_id, experiment_version, visitor_id)
);

CREATE INDEX IF NOT EXISTS analytics_exposures_variant_idx
  ON analytics_exposures(experiment_id, experiment_version, variant_key);

CREATE TABLE IF NOT EXISTS analytics_daily (
  day date NOT NULL,
  event_name text NOT NULL,
  page_path text NOT NULL,
  device_bucket text NOT NULL,
  utm_source text NOT NULL DEFAULT '',
  utm_campaign text NOT NULL DEFAULT '',
  experiment_id text NOT NULL DEFAULT '',
  variant_key text NOT NULL DEFAULT '',
  event_count bigint NOT NULL,
  unique_sessions bigint NOT NULL,
  PRIMARY KEY (day, event_name, page_path, device_bucket, utm_source, utm_campaign, experiment_id, variant_key)
);

CREATE TABLE IF NOT EXISTS analytics_heatmap_daily (
  day date NOT NULL,
  page_path text NOT NULL,
  section_id text NOT NULL,
  device_bucket text NOT NULL,
  experiment_id text NOT NULL DEFAULT '',
  variant_key text NOT NULL DEFAULT '',
  kind text NOT NULL,
  grid_x smallint NOT NULL,
  grid_y smallint NOT NULL,
  sample_count bigint NOT NULL,
  dwell_ms bigint NOT NULL,
  PRIMARY KEY (day, page_path, section_id, device_bucket, experiment_id, variant_key, kind, grid_x, grid_y)
);

COMMIT;

