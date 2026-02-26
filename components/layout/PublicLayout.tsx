"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import type { SiteSettings } from "@/lib/site-settings";

/**
 * PublicLayout
 *
 * Affiche automatiquement le Header et le Footer sur toutes les pages
 * publiques du site (/, /services, /contact, /entreprise, /assent, etc.)
 *
 * Le Header et le Footer sont masqués sur :
 *  - /admin et toutes ses sous-pages (qui ont leur propre layout)
 *  - /login (page de connexion sans navigation)
 */
export function PublicLayout({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings: SiteSettings;
}) {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/admin");
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/auth");
  const showPublicLayout = !isAdmin && !isAuthPage;

  if (!showPublicLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {/* pt-20 compense la hauteur fixe du header (h-20 = 80px) */}
      <div className="pt-20 min-h-screen">
        {children}
      </div>
      <Footer settings={settings} />
    </>
  );
}
