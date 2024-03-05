import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";

// const onlyAdminPage = [];
const authPage = ['/masuk']; 
const homePage = ['/']

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
      console.log(token);
      
      // Handle not logged in
      if (!token && !authPage.includes(pathname)) {
        return NextResponse.redirect(new URL('/masuk', req.url));
      }

      if (token) {
        // Handle authorized user and admin
        if (authPage.includes(pathname) || homePage.includes(pathname)) {
          return NextResponse.redirect(new URL('/tes', req.url))
        }

        // // Handle unauthorized user
        // if (token.role !== 'admin' && onlyAdminPage.includes(pathname)) {
        //   return NextResponse.redirect(new URL('/presensi', req.url));
        // }
      }
    }

    return middleware(req, next);
  }
}