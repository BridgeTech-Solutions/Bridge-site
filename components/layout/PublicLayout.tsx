"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

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
export function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/admin");
  const isLogin = pathname === "/login";
  const showPublicLayout = !isAdmin && !isLogin;

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
      <Footer />
    </>
  );
}
