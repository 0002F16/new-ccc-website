import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/admin-auth'
import { validSameOrigin } from '@/lib/analytics/request'
import { getExperimentDefinition } from '@/lib/analytics/experiments'
import { updateExperimentStatus } from '@/lib/analytics/store'
import { publicUrl } from '@/lib/admin-url'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  if (!validSameOrigin(request)) return new NextResponse('Forbidden', { status: 403 })
  if (!verifyAdminSession(request.cookies.get('ccc_admin_session')?.value)) {
    return NextResponse.redirect(publicUrl(request, '/admin/login'), 303)
  }
  const data = await request.formData()
  const id = data.get('experimentId')
  const version = Number(data.get('version'))
  const action = data.get('action')
  if (typeof id !== 'string' || !Number.isInteger(version) || !['start', 'pause', 'end'].includes(String(action))) {
    return new NextResponse('Invalid experiment action', { status: 400 })
  }
  const definition = getExperimentDefinition(id, version)
  if (!definition) return new NextResponse('Experiment is not registered in this build', { status: 400 })
  try {
    await updateExperimentStatus(definition, action as 'start' | 'pause' | 'end')
  } catch (error) {
    console.error('Experiment state change failed', error)
    return new NextResponse('Experiment state change was rejected', { status: 409 })
  }
  return NextResponse.redirect(publicUrl(request, '/admin/analytics#experiments'), 303)
}
