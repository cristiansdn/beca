import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {


  return NextResponse.next()
}

export const config = {
  matcher: ['/front-end/admin/:path*']
}
