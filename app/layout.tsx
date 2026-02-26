import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { getSiteSettings } from "@/lib/site-settings";
import { CookieConsent } from "@/components/analytics/CookieConsent";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bridge Technologies Solutions",
    template: "%s | Bridge Technologies Solutions",
  },
  description:
    "Spécialiste en transformation numérique — Infrastructure, Cloud, Sécurité, Gestion de projets et Conseil IT au Cameroun.",
  metadataBase: new URL("https://bridgetech-solutions.com"),
  openGraph: {
    type:     "website",
    locale:   "fr_FR",
    siteName: "Bridge Technologies Solutions",
    images:   [{ url: "/logo.png", width: 400, height: 128, alt: "Bridge Technologies Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="fr">
      <body className={`${montserrat.variable} antialiased`}>
        <GoogleAnalytics />
        <PublicLayout settings={settings}>{children}</PublicLayout>
        <CookieConsent />
      </body>
    </html>
  );
}
