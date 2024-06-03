import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server'

export default function withAuth(
  middleware: NextMiddleware,
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET
    })

    // Handle not logged in
    if (!token && (pathname.startsWith('/admin') || pathname.startsWith('/presensi') || pathname.startsWith('/laporan'))) {
      return NextResponse.redirect(new URL('/masuk', req.url))
    }

    if (token) {

      // Handle authorized user and admin
      if (pathname === '/' || pathname === '/masuk') {
        if (token.role === 'ADMIN') {
          return NextResponse.redirect(new URL('/admin', req.url))
        } else {
          return NextResponse.redirect(new URL('/presensi', req.url))
        }
      }


      // Handle unauthorized user
      if (pathname.startsWith('/admin') && token.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/presensi', req.url));
      }

      // Handle unauthorized admin
      if ((pathname.startsWith('/presensi') || pathname.startsWith('/laporan')) && token.role === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
    }

    return middleware(req, next)
  }
}
