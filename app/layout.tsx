import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Polygot",
    default: "Polygot - The AI-Powered Translation & Localization Platform",
  },
  description:
    "Polygot helps developers and teams seamlessly translate and localize apps, websites, and content using advanced AI. With support for 100+ languages, real-time collaboration, and developer-friendly APIs, Polygot streamlines global app deployment — ensuring fast, accurate, and context-aware translations.",
  keywords: [
    "react",
    "next.js",
    "localization",
    "i18n",
    "translation",
    "polygot",
    "ai",
    "internationalization",
    "l10n",
    "language",
    "automation",
  ],
  openGraph: {
    title: "Polygot - The AI-Powered Translation & Localization Platform",
    description:
      "Polygot is an AI-powered platform that simplifies and automates the translation and localization of applications, websites, and content for a global audience.",
    url: "https://polygot.tech",
    siteName: "Polygot",
    images: [
      {
        url: "https://polygot.tech/logo.png",
        width: 1200,
        height: 630,
        alt: "Polygot - AI-Powered Translation & Localization",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Polygot - The AI-Powered Translation & Localization Platform",
    description:
      "Polygot simplifies and automates the translation and localization of applications, websites, and content for a global audience.",
    images: ["https://polygot.tech/logo.png"],
  },
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics/>
        <SpeedInsights/>
        <Toaster/>
        <QueryProvider>
        {children}
        </QueryProvider>
      </body>
    </html>
  );
}
