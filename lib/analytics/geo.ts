import { isIP } from 'node:net'
import maxmind, { type CityResponse, type Reader } from 'maxmind'
import type { AnalyticsGeo } from './types'

const DEFAULT_DATABASE = '/var/lib/GeoIP/GeoLite2-City.mmdb'
const SAFE_CODE = /^[A-Z0-9-]{1,12}$/
const SAFE_NAME = /^[\p{L}\p{N} .()'\-]{1,80}$/u

let readerPromise: Promise<Reader<CityResponse> | null> | null = null
let warned = false

function databasePath() {
  return process.env.GEOIP_DB_PATH || DEFAULT_DATABASE
}

async function reader() {
  if (!readerPromise) {
    readerPromise = maxmind.open<CityResponse>(databasePath(), { watchForUpdates: true }).catch((error) => {
      if (!warned) {
        warned = true
        console.warn('GeoIP database unavailable; visitor geography will be recorded as unknown', error instanceof Error ? error.name : 'unknown')
      }
      return null
    })
  }
  return readerPromise
}

function normalizedIp(value: string | null | undefined) {
  const candidate = value?.trim().replace(/^::ffff:/, '') || ''
  return isIP(candidate) ? candidate : null
}

function code(value: string | undefined) {
  const normalized = value?.trim().toUpperCase()
  return normalized && SAFE_CODE.test(normalized) ? normalized : undefined
}

function name(value: string | undefined) {
  const normalized = value?.trim().slice(0, 80)
  return normalized && SAFE_NAME.test(normalized) ? normalized : undefined
}

export function sanitizeGeo(value: AnalyticsGeo | null | undefined): AnalyticsGeo {
  const countryCode = code(value?.countryCode)
  return {
    countryCode: countryCode?.length === 2 ? countryCode : undefined,
    subdivisionCode: code(value?.subdivisionCode),
    subdivisionName: name(value?.subdivisionName),
  }
}

/** Resolve coarse geography locally. The address is neither returned nor cached. */
export async function resolveAnalyticsGeo(realIp: string | null | undefined): Promise<AnalyticsGeo> {
  const ip = normalizedIp(realIp)
  if (!ip) return {}
  const database = await reader()
  if (!database) return {}
  let result: CityResponse | null
  try {
    result = database.get(ip)
  } catch {
    return {}
  }
  const subdivision = result?.subdivisions?.[0]
  return sanitizeGeo({
    countryCode: result?.country?.iso_code,
    subdivisionCode: subdivision?.iso_code,
    subdivisionName: subdivision?.names?.en,
  })
}

export function resetGeoReaderForTests() {
  readerPromise = null
  warned = false
}
