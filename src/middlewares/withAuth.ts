import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server'

const roleRedirects = {
  guest : ['/masuk'],
  user: ['/presensi', '/presensi/awal', '/presensi/akhir', '/laporan', '/laporan/baru'],
  admin: ['/admin']
};

const isPublicRoute = (pathname: string) => {
  const publicPresensi = /^\/presensi\/\d+$/;
  const publicLaporan = /^\/laporan\/\d+$/;
  return publicPresensi.test(pathname) || publicLaporan.test(pathname);
}

const isStaticOrInternalRoute = (pathname: string) => {
  const staticFileExtensions = [
    '.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.webp', 
    '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.otf'
  ];

  const isStaticFile = staticFileExtensions.some(ext => pathname.endsWith(ext));
  const isInternalRoute = pathname.startsWith('/_next') || pathname.startsWith('/api');

  return isStaticFile || isInternalRoute;
};

const isAuthorized = (pathname: string, role: 'guest' | 'admin' | 'user') => {
  const redirects = roleRedirects[role] || [];
  for (const route of redirects) {
    if (pathname === route || pathname.startsWith(route)) {
      return true;
    }
  }
  return false;
};

export default function withAuth(
  middleware: NextMiddleware,
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname

    // Handle static asset routes
    if (isStaticOrInternalRoute(pathname)) {
      return middleware(req, next);
    }

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET
    })

    let role : 'guest' | 'user' | 'admin' = 'guest';
    if (token && token.role) {
      if (token.role === 'SECURITY' || token.role === 'CLEANER') {
        role = 'user';
      } else if (token.role === 'ADMIN') {
        role = 'admin';
      }
    }

    // Handle public routes
    if (isPublicRoute(pathname)) {
      return middleware(req, next);
    }

    // Handle protected routes
    if (isAuthorized(pathname, role)) {
      return middleware(req, next)
    } else {
      if (role === 'guest') return NextResponse.redirect(new URL('/masuk', req.url));
      if (role === 'user') return NextResponse.redirect(new URL('/presensi', req.url));
      if (role === 'admin') return NextResponse.redirect(new URL('/admin', req.url));
    }
  }
}
