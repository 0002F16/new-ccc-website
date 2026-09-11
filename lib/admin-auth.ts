import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import argon2 from 'argon2'

export const ADMIN_COOKIE = 'ccc_admin_session'
const SESSION_SECONDS = 8 * 60 * 60

function sessionSecret() {
  const value = process.env.ADMIN_SESSION_SECRET
  if (!value && process.env.NODE_ENV === 'production') return null
  return value || 'ccc-local-admin-session-secret'
}

function signature(value: string) {
  const secret = sessionSecret()
  if (!secret) return null
  return createHmac('sha256', secret).update(value).digest('base64url')
}

export function createAdminSession() {
  const payload = `${Date.now() + SESSION_SECONDS * 1000}.${randomBytes(16).toString('base64url')}`
  const signed = signature(payload)
  return signed ? `${payload}.${signed}` : null
}

export function verifyAdminSession(value: string | undefined) {
  if (!value) return false
  const lastDot = value.lastIndexOf('.')
  if (lastDot < 1) return false
  const payload = value.slice(0, lastDot)
  const expected = signature(payload)
  if (!expected) return false
  const actualBuffer = Buffer.from(value.slice(lastDot + 1))
  const expectedBuffer = Buffer.from(expected)
  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) return false
  const expires = Number(payload.split('.')[0])
  return Number.isFinite(expires) && expires > Date.now()
}

export async function verifyAdminPassword(password: string) {
  const hash = process.env.ADMIN_PASSWORD_HASH
  if (!hash) return false
  try {
    return await argon2.verify(hash, password)
  } catch {
    return false
  }
}

export async function requireAdmin() {
  const store = await cookies()
  if (!verifyAdminSession(store.get(ADMIN_COOKIE)?.value)) redirect('/admin/login')
}

