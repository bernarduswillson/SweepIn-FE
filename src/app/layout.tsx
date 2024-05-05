'use client'

import './globals.css'
import { SessionProvider } from 'next-auth/react';
import UserToastContainer from '@/components/dialouge/UserToastContainer';
import AdminToastContainer from '@/components/dialouge/AdminToastContainer';
import { ToastProvider } from '@/context/ToastProvider';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
  session: any
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="w-screen min-h-screen overflow-y-auto overflow-x-hidden scroll-smooth">
        <ToastProvider>
          <UserToastContainer />
          <AdminToastContainer />
          <SessionProvider>{children}</SessionProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
