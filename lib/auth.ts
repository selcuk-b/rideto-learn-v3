import { cookies } from 'next/headers'

export const SESSION_COOKIE = 'rideto-admin-session'
export const SESSION_VALUE = 'authenticated'

export function isAuthenticated(): boolean {
  const cookieStore = cookies()
  return cookieStore.get(SESSION_COOKIE)?.value === SESSION_VALUE
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  }
}
