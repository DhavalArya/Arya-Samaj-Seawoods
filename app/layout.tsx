// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aryasamajseawoods.co.in"),
  title: {
    default: "Arya Samaj Seawoods",
    template: "%s | Arya Samaj Seawoods",
  },
  description:
    "Official Arya Samaj Seawoods, Navi Mumbai — Vedic weddings, havans, sanskars and community activities.",
  alternates: {
    canonical: "https://www.aryasamajseawoods.co.in",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", // put this PNG (180x180) in /public
  },
  openGraph: {
    title: "Arya Samaj Seawoods",
    description:
      "Explore Vedic ceremonies, havans and community activities at Arya Samaj Seawoods.",
    url: "https://www.aryasamajseawoods.co.in",
    siteName: "Arya Samaj Seawoods",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/logo.png" }], // optional, place /public/logo.png
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Organization schema (helps Google connect your brand + logo) */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Arya Samaj Seawoods",
              url: "https://www.aryasamajseawoods.co.in",
              logo: "https://www.aryasamajseawoods.co.in/logo.png",
              sameAs: [], // add social URLs if you have them
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
