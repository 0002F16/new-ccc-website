import process from 'node:process'
import pg from 'pg'

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required')
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 1 })

try {
  await pool.query('BEGIN')
  await pool.query(`DELETE FROM analytics_daily WHERE day >= current_date - 3`)
  await pool.query(`
    INSERT INTO analytics_daily (
      day, event_name, page_path, device_bucket, utm_source, utm_campaign,
      experiment_id, variant_key, section_id, element_id, country_code,
      subdivision_code, event_count, unique_sessions
    )
    SELECT
      (e.occurred_at AT TIME ZONE 'Europe/Warsaw')::date,
      e.event_name,
      e.page_path,
      s.device_bucket,
      coalesce(s.utm_source, ''),
      coalesce(s.utm_campaign, ''),
      coalesce(e.experiment_id, ''),
      coalesce(e.variant_key, ''),
      coalesce(e.section_id, ''),
      coalesce(e.element_id, ''),
      coalesce(s.country_code, ''),
      coalesce(s.subdivision_code, ''),
      count(*),
      count(DISTINCT e.session_id)
    FROM analytics_events e
    JOIN analytics_sessions s ON s.session_id = e.session_id
    WHERE e.occurred_at >= current_date - 3
    GROUP BY 1,2,3,4,5,6,7,8,9,10,11,12
  `)
  await pool.query(`DELETE FROM analytics_heatmap_daily WHERE day >= current_date - 3`)
  await pool.query(`
    INSERT INTO analytics_heatmap_daily (
      day, page_path, section_id, device_bucket, experiment_id, variant_key,
      kind, grid_x, grid_y, sample_count, dwell_ms
    )
    SELECT
      (updated_at AT TIME ZONE 'Europe/Warsaw')::date,
      page_path, section_id, device_bucket, experiment_id, variant_key,
      kind, grid_x, grid_y, sum(sample_count), sum(dwell_ms)
    FROM analytics_heatmap_bins
    WHERE updated_at >= current_date - 3
    GROUP BY 1,2,3,4,5,6,7,8,9
  `)
  await pool.query(`DELETE FROM analytics_heatmap_bins WHERE updated_at < now() - interval '30 days'`)
  await pool.query(`DELETE FROM analytics_events WHERE occurred_at < now() - interval '90 days'`)
  await pool.query(`DELETE FROM analytics_batches WHERE received_at < now() - interval '90 days'`)
  await pool.query(`DELETE FROM analytics_exposures WHERE exposed_at < now() - interval '90 days'`)
  await pool.query(`DELETE FROM analytics_sessions WHERE last_seen_at < now() - interval '90 days'`)
  await pool.query(`DELETE FROM analytics_visitors WHERE last_seen_at < now() - interval '90 days'`)
  await pool.query(`DELETE FROM analytics_daily WHERE day < current_date - interval '24 months'`)
  await pool.query(`DELETE FROM analytics_heatmap_daily WHERE day < current_date - interval '24 months'`)
  await pool.query('COMMIT')
  await pool.query('ANALYZE')
  process.stdout.write('Analytics aggregation and retention complete.\n')
} catch (error) {
  await pool.query('ROLLBACK')
  throw error
} finally {
  await pool.end()
}
