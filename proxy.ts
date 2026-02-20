import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const ua = request.headers.get('user-agent') || ''

  if (
    ua.includes('Google') ||
    ua.includes('AdsBot') ||
    ua.includes('facebookexternalhit') ||
    ua.includes('Facebot')
  ) {
    console.log('BOT DETECTED:', ua)
  }

  return NextResponse.next()
}