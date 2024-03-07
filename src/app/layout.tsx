"use client";

import "./globals.css";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="font-poppins">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
};
