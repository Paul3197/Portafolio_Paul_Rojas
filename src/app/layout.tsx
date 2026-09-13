import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const siteUrl = "https://paulrojas.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Paul Rojas — Full-Stack Developer",
    template: "%s — Paul Rojas",
  },
  description:
    "Full-Stack Developer specializing in ERP systems, financial software, and business applications. React, Angular, TypeScript, .NET, PostgreSQL, Docker.",
  keywords: [
    "Full-Stack Developer",
    "ERP Software",
    "Financial Software",
    "React Developer",
    ".NET Developer",
    "Business Applications",
    "PostgreSQL",
    "Clean Architecture",
  ],
  openGraph: {
    title: "Paul Rojas — Full-Stack Developer",
    description:
      "Building the systems behind ambitious businesses. ERP systems, financial software, and business applications.",
    url: siteUrl,
    siteName: "Paul Rojas",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paul Rojas — Full-Stack Developer",
    description:
      "Building the systems behind ambitious businesses. ERP systems, financial software, and business applications.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-obsidian text-text-primary">
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
