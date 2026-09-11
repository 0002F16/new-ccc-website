import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import pg from 'pg'

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required')

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 1 })
try {
  await pool.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
    filename text PRIMARY KEY,
    applied_at timestamptz NOT NULL DEFAULT now()
  )`)
  const directory = path.join(process.cwd(), 'db', 'migrations')
  const files = (await fs.readdir(directory)).filter((file) => file.endsWith('.sql')).sort()
  for (const filename of files) {
    const exists = await pool.query('SELECT 1 FROM schema_migrations WHERE filename = $1', [filename])
    if (exists.rowCount) continue
    const sql = await fs.readFile(path.join(directory, filename), 'utf8')
    await pool.query(sql)
    await pool.query('INSERT INTO schema_migrations (filename) VALUES ($1)', [filename])
    process.stdout.write(`Applied ${filename}\n`)
  }
} finally {
  await pool.end()
}

