import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { SESSION_COOKIE, SESSION_VALUE, getSessionCookieOptions } from '@/lib/auth'

export async function POST(request: Request) {
  const { password } = await request.json()

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  cookies().set(SESSION_COOKIE, SESSION_VALUE, getSessionCookieOptions())
  return NextResponse.json({ ok: true })
}
