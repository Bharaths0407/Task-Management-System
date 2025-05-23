import type { Metadata } from "next";
import {Inter} from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/components/query-provider";

import "./globals.css";


const inter = Inter({subsets:["latin"]});

export const metadata: Metadata = {
  title: "TaskFlow",
  description: "Task Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(inter.className,"antialiased min-h-screen")}
      >
        <QueryProvider>
          <Toaster />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
