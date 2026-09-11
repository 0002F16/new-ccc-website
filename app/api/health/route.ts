import { NextResponse } from 'next/server'
import { databaseConfigured, query } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  if (!databaseConfigured()) {
    return NextResponse.json({ status: 'degraded', database: 'unconfigured' }, { status: 503 })
  }
  try {
    await query('SELECT 1')
    return NextResponse.json({ status: 'ok', database: 'ok' })
  } catch {
    return NextResponse.json({ status: 'degraded', database: 'unavailable' }, { status: 503 })
  }
}

