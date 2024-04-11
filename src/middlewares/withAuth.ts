import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";

const authPage = ['/masuk']; 
const homePage = ['/'];
const onlyAdminPage = ['/admin/:path*'];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = [],
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    if (requireAuth.includes(pathname)) {
      // Get token
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET
      })
      
      // Handle not logged in
      if (!token && !authPage.includes(pathname)) {
        return NextResponse.redirect(new URL('/masuk', req.url));
      }

      if (token) {
        // Handle authorized user and admin
        if (authPage.includes(pathname) || homePage.includes(pathname)) {
          return NextResponse.redirect(new URL('/presensi', req.url))
        }

        // // Handle unauthorized user
        // if (token.role !== 'ADMIN' && onlyAdminPage.includes(pathname)) {
        //   return NextResponse.redirect(new URL('/presensi', req.url));
        // }
      }
    }

    return middleware(req, next);
  }
}