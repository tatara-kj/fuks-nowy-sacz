import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const manrope = localFont({
  src: "./fonts/manrope.woff2",
  variable: "--font-manrope",
  display: "swap",
});

const barlow = localFont({
  src: [
    { path: "./fonts/barlow-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/barlow-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-barlow",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fuks-nowy-sacz.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FUKS — szkoła jazdy Nowy Sącz i Bobowa",
    template: "%s | FUKS",
  },
  description: "FUKS: kursy prawa jazdy AM, A1, A2, A, B1, B, B+E, C, C+E, D1, D i T oraz kwalifikacje, ADR i szkolenia zawodowe w Nowym Sączu i Bobowej.",
  keywords: [
    "szkoła jazdy Nowy Sącz",
    "szkoła jazdy Bobowa",
    "prawo jazdy Nowy Sącz",
    "kurs prawa jazdy kat B Nowy Sącz",
    "prawo jazdy C C+E",
    "kurs ADR Nowy Sącz",
    "FUKS Krzysztof Groń",
  ],
  authors: [{ name: "FUKS Krzysztof Groń" }],
  creator: "FUKS Krzysztof Groń",
  category: "education",
  openGraph: {
    title: "FUKS — Lubimy uczyć jeździć",
    description: "Prawo jazdy wszystkich kategorii i szkolenia zawodowe w Nowym Sączu i Bobowej.",
    url: siteUrl,
    locale: "pl_PL",
    type: "website",
    siteName: "FUKS Krzysztof Groń",
    images: [{ url: "/images/fleet/samochody-szkola-jazdy-fuks.jpg", width: 2048, height: 2048, alt: "Flota szkoły jazdy FUKS" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FUKS — Lubimy uczyć jeździć",
    description: "Szkoła jazdy i kursy zawodowe · Nowy Sącz · Bobowa",
    images: ["/images/fleet/samochody-szkola-jazdy-fuks.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#071a5c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={`${manrope.variable} ${barlow.variable}`} suppressHydrationWarning>
      <head>
        <Script id="restore-fuks-branch" strategy="beforeInteractive">{`try{var b=localStorage.getItem("fuks-branch:v1");if(b==="nowy-sacz"||b==="bobowa")document.documentElement.dataset.fuksBranch=b}catch(e){}`}</Script>
      </head>
      <body>
        <a className="skip-link" href="#main-content">Przejdź do treści</a>
        <div className="scroll-progress" aria-hidden="true" />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
