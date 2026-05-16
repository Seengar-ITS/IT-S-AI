import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const anonId = request.cookies.get('its_anon_id')
  const response = NextResponse.next()
  if (!anonId) {
    response.cookies.set('its_anon_id', crypto.randomUUID(), {
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: false,
      sameSite: 'lax'
    })
  }
  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
