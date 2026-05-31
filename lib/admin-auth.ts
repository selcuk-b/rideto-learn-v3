import { cookies } from 'next/headers'
import { SESSION_COOKIE, SESSION_VALUE } from './auth'
import { NextResponse } from 'next/server'

/** Call at the top of every admin API route. Returns a 401 response if not authenticated, or null if OK. */
export function requireAdminAuth(): NextResponse | null {
  const cookieStore = cookies()
  if (cookieStore.get(SESSION_COOKIE)?.value !== SESSION_VALUE) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}
