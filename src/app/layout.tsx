'use client'

import './globals.css'
import { SessionProvider } from 'next-auth/react';
import ToastContainer from '@/components/dialouge/ToastContainer';
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
          <ToastContainer />
          <SessionProvider>{children}</SessionProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
