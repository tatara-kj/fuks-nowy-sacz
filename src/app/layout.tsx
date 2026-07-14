import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://fuks-nowy-sacz.vercel.app",
  ),
  title: "FUKS — prawo jazdy i kursy zawodowe | Nowy Sącz",
  description:
    "FUKS w Nowym Sączu: kursy prawa jazdy kategorii A, B, B+E, C, C+E, D i T oraz szkolenia zawodowe kierowców. Koncepcyjna strona demonstracyjna.",
  keywords: [
    "szkoła jazdy Nowy Sącz",
    "prawo jazdy Nowy Sącz",
    "kurs prawa jazdy kat B Nowy Sącz",
    "prawo jazdy kat C Nowy Sącz",
    "kurs C+E Nowy Sącz",
    "FUKS Krzysztof Groń",
    "kursy zawodowe kierowców Nowy Sącz",
  ],
  authors: [{ name: "Projekt demonstracyjny FUKS" }],
  category: "education",
  openGraph: {
    title: "FUKS — ruszaj po swoje",
    description: "Prawo jazdy i szkolenia zawodowe w Nowym Sączu. Od pierwszej jazdy po zawodową trasę.",
    locale: "pl_PL",
    type: "website",
    siteName: "FUKS Nowy Sącz — demo",
  },
  twitter: {
    card: "summary_large_image",
    title: "FUKS — prawo jazdy i kursy zawodowe",
    description: "Nowy Sącz · kategorie osobowe, motocyklowe i zawodowe.",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#080a08",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={`${manrope.variable} ${barlow.variable}`}>
      <body>{children}</body>
    </html>
  );
}
