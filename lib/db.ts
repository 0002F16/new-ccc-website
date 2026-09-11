import { Pool, type PoolClient, type QueryResultRow } from 'pg'

declare global {
  // eslint-disable-next-line no-var
  var __cccDatabasePool: Pool | undefined
}

export function databaseConfigured() {
  return Boolean(process.env.DATABASE_URL)
}

export function getPool(): Pool {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not configured')
  if (!global.__cccDatabasePool) {
    global.__cccDatabasePool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 2_000,
      application_name: 'ccc-website',
    })
  }
  return global.__cccDatabasePool
}

export async function query<T extends QueryResultRow>(text: string, values: unknown[] = []) {
  return getPool().query<T>(text, values)
}

export async function transaction<T>(work: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await getPool().connect()
  try {
    await client.query('BEGIN')
    const result = await work(client)
    await client.query('COMMIT')
    return result
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

