import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "N1 Store | Premium iOS Signing",
  description:
    "N1 Store - Premium iOS signing, IPA install, anti-revoke, warranty and Telegram support.",
  manifest: "/manifest.json",
  icons: {
    icon: "/n1-logo.png",
    apple: "/n1-logo.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ku" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
