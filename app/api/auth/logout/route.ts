import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { SESSION_COOKIE } from '@/lib/auth'

export async function POST() {
  cookies().delete(SESSION_COOKIE)
  return NextResponse.redirect(
    new URL('/admin/login', process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000')
  )
}
