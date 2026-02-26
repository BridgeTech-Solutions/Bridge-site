"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

// Déclaration du type global pour gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * GoogleAnalytics — charge GA uniquement si :
 *  1. NEXT_PUBLIC_GA_ID est défini dans .env.local
 *  2. L'utilisateur a accepté les cookies (localStorage "bts-cookie-consent" === "accepted")
 *
 * Écoute aussi l'événement "cookie-consent-accepted" pour activer GA
 * si l'utilisateur accepte après le chargement de la page.
 */
export function GoogleAnalytics() {
  const pathname = usePathname();

  // Envoyer un pageview à chaque changement de route
  useEffect(() => {
    if (!GA_ID) return;
    const consent = localStorage.getItem("bts-cookie-consent");
    if (consent !== "accepted") return;

    window.gtag?.("config", GA_ID, { page_path: pathname });
  }, [pathname]);

  // Activer GA si l'utilisateur accepte les cookies en cours de session
  useEffect(() => {
    if (!GA_ID) return;

    function onConsent() {
      window.gtag?.("consent", "update", {
        analytics_storage: "granted",
      });
      window.gtag?.("config", GA_ID!, { page_path: window.location.pathname });
    }

    window.addEventListener("cookie-consent-accepted", onConsent);
    return () => window.removeEventListener("cookie-consent-accepted", onConsent);
  }, []);

  // Pas d'ID GA configuré → rien à charger
  if (!GA_ID) return null;

  // Vérifier le consentement côté client uniquement
  const hasConsent = typeof window !== "undefined"
    && localStorage.getItem("bts-cookie-consent") === "accepted";

  if (!hasConsent) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', {
            analytics_storage: 'granted'
          });
          gtag('config', '${GA_ID}', { page_path: window.location.pathname });
        `}
      </Script>
    </>
  );
}
