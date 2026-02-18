"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Linkedin,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const FOOTER_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "L'entreprise", href: "/entreprise" },
  { label: "Contact", href: "/contact" },
  { label: "Assent", href: "/assent", badge: "New" },
];

const SERVICES_LINKS = [
  { label: "Gestion des projets", href: "/services/gestion-projets" },
  { label: "Infrastructure informatique", href: "/services/infrastructure" },
  { label: "Solutions cloud computing", href: "/services/cloud" },
  { label: "Sécurité des données", href: "/services/protection-donnees" },
  { label: "DSI externe", href: "/services/dsi-externe" },
  { label: "Conseils & Consultants", href: "/services/conseil-consulting" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMsg("Veuillez entrer un email valide.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setErrorMsg(data?.error ?? "Une erreur est survenue.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Une erreur est survenue. Réessayez plus tard.");
    }
  };

  return (
    <footer className="bg-[#0a1628] text-gray-300">
      {/* Accent line top */}
      <div className="h-1 w-full bg-gradient-to-r from-[#0088C1] via-[#78C2E1] to-[#014B6A]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Col 1 — Logo + description + socials */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.png"
                alt="Bridge Technologies Solutions"
                width={140}
                height={44}
                className="object-contain brightness-0 invert opacity-90 h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Nous accompagnons les entreprises dans leur transformation numérique
              avec des solutions innovantes et adaptées à leurs besoins.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/people/Bridge-Technologies-Solutions/100093075549355/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 text-gray-400 hover:bg-[#0088C1] hover:text-white transition-colors duration-200"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/bridgetechnologies-solutions/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 text-gray-400 hover:bg-[#0088C1] hover:text-white transition-colors duration-200"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2 — Liens utiles + Services */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-5">
              Liens utiles
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#78C2E1] transition-colors group"
                  >
                    <ArrowRight className="w-3 h-3 shrink-0 text-[#0088C1] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                    {link.label}
                    {link.badge && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-[#0088C1] text-white leading-none">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mt-8 mb-5">
              Nos services
            </h3>
            <ul className="space-y-2.5">
              {SERVICES_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#78C2E1] transition-colors group"
                  >
                    <ArrowRight className="w-3 h-3 shrink-0 text-[#0088C1] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:contact@bridgetech-solutions.com"
                  className="flex items-start gap-3 text-sm text-gray-400 hover:text-[#78C2E1] transition-colors group"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#0088C1]/15 text-[#0088C1] shrink-0 group-hover:bg-[#0088C1] group-hover:text-white transition-colors duration-200">
                    <Mail className="w-4 h-4" />
                  </span>
                  <span className="pt-1 leading-snug break-all">
                    contact@bridgetech-solutions.com
                  </span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#0088C1]/15 text-[#0088C1] shrink-0">
                    <Phone className="w-4 h-4" />
                  </span>
                  <div className="pt-1 space-y-0.5">
                    <a
                      href="tel:+237679289166"
                      className="block text-sm text-gray-400 hover:text-[#78C2E1] transition-colors"
                    >
                      +237 679 289 166
                    </a>
                    <a
                      href="tel:+237692143811"
                      className="block text-sm text-gray-400 hover:text-[#78C2E1] transition-colors"
                    >
                      +237 692 143 811
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#0088C1]/15 text-[#0088C1] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <address className="text-sm text-gray-400 not-italic leading-relaxed pt-1">
                    Bonamoussadi, DLA<br />
                    Douala, Cameroun
                  </address>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4 — Newsletter */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-2">
              Newsletter
            </h3>
            <p className="text-sm text-gray-400 mb-5 leading-relaxed">
              Restez informé de nos dernières actualités et offres.
            </p>

            {status === "success" ? (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-sm text-emerald-300 leading-snug">
                  Merci pour votre inscription&nbsp;! Vous recevrez nos prochaines actualités.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} noValidate>
                <div className="flex flex-col gap-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      placeholder="votre@email.com"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-[#0088C1] focus:bg-white/8 transition-colors"
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-xs text-red-400">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#0088C1] text-white text-sm font-semibold hover:bg-[#014B6A] disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {status === "loading" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Inscription…
                      </>
                    ) : (
                      <>
                        S&apos;abonner
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            <p className="mt-4 text-xs text-gray-600 leading-relaxed">
              Aucun spam. Désabonnement possible à tout moment.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Bridge Technologies Solutions. Tous droits réservés.
          </p>
          {/* <div className="flex items-center gap-1">
            <span className="text-xs text-gray-600">Fait avec</span>
            <span className="text-[#0088C1] text-xs mx-1">♦</span>
            <span className="text-xs text-gray-600">au Cameroun</span>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
