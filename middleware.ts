import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SESSION_COOKIE = 'rideto-admin-session'
const SESSION_VALUE = 'authenticated'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isLoginPage = pathname === '/admin/login'
  const isAuthenticated = request.cookies.get(SESSION_COOKIE)?.value === SESSION_VALUE

  // Redirect unauthenticated users to login
  if (!isLoginPage && !isAuthenticated) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect already-authenticated users away from login
  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
