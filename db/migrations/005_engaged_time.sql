BEGIN;

ALTER TABLE analytics_events DROP CONSTRAINT IF EXISTS analytics_events_known_name;
ALTER TABLE analytics_events
  ADD CONSTRAINT analytics_events_known_name CHECK (event_name IN (
    'page_view', 'section_view', 'cta_click', 'faq_open', 'video_start',
    'rage_click', 'dead_click', 'hesitation', 'web_vital',
    'experiment_exposure', 'application_started',
    'application_submit_attempted', 'application_validation_failed',
    'application_submit_failed', 'application_submitted', 'engaged_time',
    'application_qualified', 'call_booked', 'call_attended', 'enrollment_paid'
  ));

CREATE TABLE IF NOT EXISTS analytics_engagement_daily (
  day date PRIMARY KEY,
  total_engaged_ms bigint NOT NULL CHECK (total_engaged_ms >= 0),
  timed_sessions bigint NOT NULL CHECK (timed_sessions >= 0),
  engaged_sessions bigint NOT NULL CHECK (engaged_sessions >= 0),
  deep_sessions bigint NOT NULL CHECK (deep_sessions >= 0)
);

COMMIT;
