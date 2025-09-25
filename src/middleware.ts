import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Redirect root to login
  // Root path now handled by AppRoutes component

  // Protected routes
  const protectedPaths = [
    '/dashboard',
    '/miners',
    '/marketplace',
    '/hosting',
    '/investment-tools',
    '/billing',
    '/support',
    '/info-center',
    '/profile',
    '/admin'
  ];

  const isProtectedPath = protectedPaths.some(path => 
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath && !session) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};