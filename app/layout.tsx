import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { PublicLayout } from "@/components/layout/PublicLayout";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bridge Technologies Solutions",
  description:
    "Spécialiste en transformation numérique — Infrastructure, Cloud, Sécurité, Gestion de projets et Conseil IT.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${montserrat.variable} antialiased`}>
        <PublicLayout>{children}</PublicLayout>
      </body>
    </html>
  );
}
