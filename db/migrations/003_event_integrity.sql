BEGIN;

ALTER TABLE analytics_events
  ADD CONSTRAINT analytics_events_known_name CHECK (event_name IN (
    'page_view', 'section_view', 'cta_click', 'faq_open', 'video_start',
    'rage_click', 'dead_click', 'hesitation', 'web_vital',
    'experiment_exposure', 'application_started', 'application_submitted',
    'application_qualified', 'call_booked', 'call_attended', 'enrollment_paid'
  ));

CREATE UNIQUE INDEX IF NOT EXISTS analytics_one_section_view_per_session
  ON analytics_events(session_id, section_id)
  WHERE event_name = 'section_view';

COMMIT;
