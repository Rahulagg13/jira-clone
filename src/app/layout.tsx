import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

import { auth } from "@/server/auth";
import { cn } from "@/lib/utils";
import QueryProvider from "@/components/query-providers";
import { Toaster } from "@/components/ui/sonner";
const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(inter.className, "antialiased min-h-screen")}>
          <QueryProvider>{children}</QueryProvider>
          <Toaster richColors />
        </body>
      </html>
    </SessionProvider>
  );
}
