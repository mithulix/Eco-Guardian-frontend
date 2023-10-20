import PrimaryLayout from "@/layout/PrimaryLayout";
import "./globals.css";
import type { Metadata } from "next";
import Providers from "@/lib/Providers";

export const metadata: Metadata = {
  title: 'earthCleaner',
  description: 'earthCleaner is a cleaning service',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return ( <Providers>
    <PrimaryLayout>{children}</PrimaryLayout>
  </Providers>);
}
