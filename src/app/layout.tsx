import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/components/Provider";

export const metadata: Metadata = {
  title: "SweepIn",
  description: "Website Presensi",
};

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
        <Provider session={session}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
