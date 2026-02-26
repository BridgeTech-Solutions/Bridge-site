"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CONSENT_KEY = "bts-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  function dismiss(value: "accepted" | "refused") {
    setLeaving(true);
    setTimeout(() => {
      localStorage.setItem(CONSENT_KEY, value);
      setVisible(false);
      if (value === "accepted") {
        window.dispatchEvent(new Event("cookie-consent-accepted"));
      }
    }, 380);
  }

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(110%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes slideDown {
          from { transform: translateY(0);    opacity: 1; }
          to   { transform: translateY(110%); opacity: 0; }
        }
        .cookie-bar { animation: slideUp 0.42s cubic-bezier(.22,1,.36,1) both; }
        .cookie-bar.leaving { animation: slideDown 0.36s cubic-bezier(.55,0,1,.45) both; }
        .cookie-btn-refuse {
          padding: 7px 18px; border-radius: 8px;
          border: 1.5px solid rgba(120,194,225,.3);
          background: transparent; color: #94a3b8;
          font-size: 12px; font-weight: 600; cursor: pointer;
          transition: border-color .2s, color .2s; font-family: inherit;
        }
        .cookie-btn-refuse:hover { border-color: rgba(120,194,225,.7); color: #fff; }
        .cookie-btn-accept {
          padding: 7px 20px; border-radius: 8px; border: none;
          background: #0088C1; color: #fff;
          font-size: 12px; font-weight: 700; cursor: pointer;
          transition: background .2s; font-family: inherit; letter-spacing: .02em;
        }
        .cookie-btn-accept:hover { background: #006fa3; }
      `}</style>

      <div
        className={`cookie-bar${leaving ? " leaving" : ""}`}
        role="dialog"
        aria-label="Consentement cookies"
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9999,
          background: "rgba(10,22,40,.97)",
          borderTop: "1px solid rgba(0,136,193,.3)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 -4px 32px rgba(0,0,0,.4)",
        }}
      >
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          padding: "13px 24px",
          display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap",
        }}>
          {/* Icône cookie */}
          <div style={{
            flexShrink: 0, width: "32px", height: "32px", borderRadius: "8px",
            background: "rgba(0,136,193,.15)", border: "1px solid rgba(0,136,193,.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="#0088C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
              <path d="M8.5 8.5v.01M16 15.5v.01M12 12v.01"/>
            </svg>
          </div>

          {/* Texte */}
          <p style={{ flex: 1, minWidth: "220px", margin: 0, fontSize: "13px", lineHeight: 1.5 }}>
            <span style={{ color: "#fff", fontWeight: 700 }}>Ce site utilise des cookies. </span>
            <span style={{ color: "#94a3b8" }}>
              Nous utilisons Google Analytics pour mesurer l&apos;audience et améliorer votre expérience.
            </span>
            {" "}
            <Link href="/politique-confidentialite"
              style={{ color: "#78C2E1", fontSize: "12px", textDecoration: "underline" }}>
              En savoir plus
            </Link>
          </p>

          {/* Boutons */}
          <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
            <button className="cookie-btn-refuse" onClick={() => dismiss("refused")}>
              Refuser
            </button>
            <button className="cookie-btn-accept" onClick={() => dismiss("accepted")}>
              Tout accepter
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
