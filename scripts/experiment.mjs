#!/usr/bin/env node
/**
 * Experiment control from the command line.
 *
 *   node --env-file=.env.local scripts/experiment.mjs list
 *   node --env-file=.env.local scripts/experiment.mjs start hero-no-video-v1 1
 *   node --env-file=.env.local scripts/experiment.mjs pause hero-no-video-v1 1
 *   node --env-file=.env.local scripts/experiment.mjs end   hero-no-video-v1 1
 *
 * The dashboard at /admin/analytics#experiments does the same thing behind the
 * owner password. This exists so the owner's password is never needed on the
 * server, and so a state change can be scripted during a deploy.
 *
 * The SQL mirrors `updateExperimentStatus` in lib/analytics/store.ts: one
 * transaction, other running experiments on the same page are paused on start,
 * an ended experiment cannot be restarted, and every change writes an audit row.
 * Keep the two in step.
 */

import pg from 'pg'

/**
 * Mirrors the ids in lib/analytics/experiments.ts. A page experiment the build
 * does not serve must not be startable, so `start` is limited to this list.
 */
const REGISTRY = {
  'hero-no-video-v1': {
    version: 1,
    name: 'Hero: current vs. new (no video, new headline, large metrics)',
    page: 'homepage',
    slot: 'hero.layout',
    primaryEvent: 'cta_click',
  },
  'hero-headline-recognition-v1': {
    version: 1,
    name: 'Hero headline: recognition vs. no interviews',
    page: 'homepage',
    slot: 'hero.headline',
    primaryEvent: 'cta_click',
  },
  'outcomes-videos-first-v1': {
    version: 1,
    name: 'Outcomes: videos before the screenshot wall',
    page: 'homepage',
    slot: 'outcomes.order',
    primaryEvent: 'video_start',
  },
}

const ACTIONS = new Set(['list', 'start', 'pause', 'end'])

function usage(message) {
  if (message) console.error(`\n${message}`)
  console.error(`
Usage: node --env-file=.env.local scripts/experiment.mjs <list|start|pause|end> [id] [version]

Registered ids:
${Object.entries(REGISTRY)
  .map(([id, d]) => `  ${id} v${d.version}  ${d.name}`)
  .join('\n')}
`)
  process.exit(1)
}

function databaseLabel(url) {
  try {
    const parsed = new URL(url)
    return `${parsed.hostname}${parsed.port ? `:${parsed.port}` : ''}${parsed.pathname}`
  } catch {
    return 'configured database'
  }
}

async function list(pool) {
  const experiments = await pool.query(
    `SELECT experiment_id, version, name, page, status, started_at, ended_at
     FROM analytics_experiments ORDER BY updated_at DESC`,
  )
  if (!experiments.rowCount) {
    console.log('No experiment has ever been started in this database.')
    return
  }
  for (const row of experiments.rows) {
    const exposures = await pool.query(
      `SELECT variant_key, count(*)::int visitors FROM analytics_exposures
       WHERE experiment_id = $1 AND experiment_version = $2 GROUP BY variant_key`,
      [row.experiment_id, row.version],
    )
    const arms = exposures.rows.map((arm) => `${arm.variant_key} ${arm.visitors}`).join(' · ') || 'no exposures yet'
    console.log(
      [
        `${row.status.toUpperCase().padEnd(7)} ${row.experiment_id} v${row.version}`,
        `  ${row.name}`,
        `  page ${row.page} · started ${row.started_at ? row.started_at.toISOString() : '—'}` +
          `${row.ended_at ? ` · ended ${row.ended_at.toISOString()}` : ''}`,
        `  exposed visitors: ${arms}`,
      ].join('\n'),
    )
  }
}

async function change(pool, action, id, version) {
  const definition = REGISTRY[id]
  if (!definition) usage(`Unknown experiment id: ${id}`)
  if (version !== definition.version) usage(`${id} is registered at version ${definition.version}, not ${version}`)

  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const existing = await client.query(
      `SELECT status FROM analytics_experiments
       WHERE experiment_id = $1 AND version = $2 FOR UPDATE`,
      [id, version],
    )
    const current = existing.rows[0]?.status
    if (action === 'start' && current === 'ended') {
      throw new Error('Ended experiments require a new code-defined version')
    }
    if (action !== 'start' && !existing.rows[0]) {
      throw new Error('Experiment has not been started')
    }

    let paused = []
    if (action === 'start') {
      const others = await client.query(
        `UPDATE analytics_experiments SET status = 'paused', updated_at = now()
         WHERE page = $1 AND status = 'running' AND NOT (experiment_id = $2 AND version = $3)
         RETURNING experiment_id, version`,
        [definition.page, id, version],
      )
      paused = others.rows.map((row) => `${row.experiment_id} v${row.version}`)
      await client.query(
        `INSERT INTO analytics_experiments (
          experiment_id, version, name, page, slot, primary_event, status, started_at
        ) VALUES ($1,$2,$3,$4,$5,$6,'running',now())
        ON CONFLICT (experiment_id, version) DO UPDATE SET
          status = 'running', started_at = coalesce(analytics_experiments.started_at, now()),
          ended_at = null, updated_at = now()`,
        [id, version, definition.name, definition.page, definition.slot, definition.primaryEvent],
      )
    } else {
      await client.query(
        `UPDATE analytics_experiments SET status = $3,
          ended_at = CASE WHEN $3 = 'ended' THEN now() ELSE ended_at END,
          updated_at = now()
         WHERE experiment_id = $1 AND version = $2`,
        [id, version, action === 'pause' ? 'paused' : 'ended'],
      )
    }

    await client.query(
      `INSERT INTO analytics_admin_audit (action, subject, details)
       VALUES ($1, $2, $3)`,
      [`experiment_${action}`, `${id}:${version}`, JSON.stringify({ actor: 'cli', previousStatus: current ?? null })],
    )
    await client.query('COMMIT')

    console.log(`${action === 'end' ? 'Ended' : action === 'pause' ? 'Paused' : 'Started'} ${id} v${version}.`)
    if (paused.length) console.log(`Paused to keep one homepage experiment: ${paused.join(', ')}`)
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

async function main() {
  const [action, id, versionArg] = process.argv.slice(2)
  if (!ACTIONS.has(action)) usage(action ? `Unknown action: ${action}` : undefined)
  if (!process.env.DATABASE_URL) usage('DATABASE_URL is not set. Run with: node --env-file=.env.local …')
  if (action !== 'list' && (!id || !versionArg)) usage('start, pause and end need an id and a version')

  console.log(`Database: ${databaseLabel(process.env.DATABASE_URL)}`)
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 2 })
  try {
    if (action === 'list') await list(pool)
    else await change(pool, action, id, Number(versionArg))
    if (action !== 'list') await list(pool)
  } finally {
    await pool.end()
  }
}

main().catch((error) => {
  console.error(`\n${error.message}`)
  process.exit(1)
})
