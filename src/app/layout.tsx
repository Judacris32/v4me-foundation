import type { Metadata } from "next";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { siteConfig } from "@/lib/site-config";
// Self hosted fonts (no runtime request to Google Fonts).
// Manrope for body copy, Fraunces (full axes, roman + italic) for every
// heading, and Caveat for the small handwritten section labels.
import "@fontsource-variable/manrope";
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/fraunces/full-italic.css";
import "@fontsource/caveat/600.css";
import "@fontsource/caveat/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.shortName}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.shortName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  // No manual `icons` entry: favicon.ico, icon.png, and apple-icon.png in
  // src/app/ are picked up automatically by Next.js's file-convention
  // metadata and injected into <head> — see app-icons.md.
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className="h-full scroll-smooth antialiased">
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
