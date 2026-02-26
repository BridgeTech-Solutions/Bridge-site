"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FolderKanban,
  Server,
  Cloud,
  ShieldCheck,
  Users,
  Lightbulb,
  ChevronDown,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const SERVICES = [
  { label: "Gestion des projets", href: "/services/gestion-projets", icon: FolderKanban },
  { label: "Infrastructure informatique", href: "/services/infrastructure", icon: Server },
  { label: "Solutions cloud computing", href: "/services/cloud", icon: Cloud },
  { label: "Protection | Sécurité des données", href: "/services/protection-donnees", icon: ShieldCheck },
  { label: "DSI externe", href: "/services/dsi-externe", icon: Users },
  { label: "Conseils | Consultants", href: "/services/conseils-consultants", icon: Lightbulb },
];

const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "L'entreprise", href: "/entreprise" },
  { label: "Contact", href: "/contact" },
  { label: "Assent", href: "/assent", badge: "New" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
    setServicesExpanded(false);
  }, [pathname]);

  // Désactiver le scroll body quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-20 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-lg" : "shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-8">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="Bridge Technologies Solutions"
              width={150}
              height={48}
              className="object-contain h-12 w-auto"
              priority
            />
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) =>
              link.hasDropdown ? (
                <div key={link.href} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((o) => !o)}
                    className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold transition-colors rounded-lg ${
                      isActive(link.href)
                        ? "text-[#0088C1]"
                        : "text-gray-700 hover:text-[#0088C1]"
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                    {/* Barre active sous le bouton */}
                    {isActive(link.href) && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#0088C1] rounded-full" />
                    )}
                  </button>

                  {/* Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-76 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                      <div className="h-1 w-full bg-gradient-to-r from-[#0088C1] to-[#78C2E1]" />
                      <div className="p-2">
                        {SERVICES.map((service) => {
                          const Icon = service.icon;
                          return (
                            <Link
                              key={service.href}
                              href={service.href}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-[#0088C1] hover:text-white transition-all duration-150 group"
                            >
                              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#0088C1]/10 text-[#0088C1] group-hover:bg-white/20 group-hover:text-white transition-colors shrink-0">
                                <Icon className="w-4 h-4" />
                              </span>
                              {service.label}
                            </Link>
                          );
                        })}
                      </div>
                      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs text-gray-500">Tous nos services IT</span>
                        <Link
                          href="/services"
                          className="text-xs font-semibold text-[#0088C1] hover:text-[#014B6A] transition-colors flex items-center gap-1"
                        >
                          Voir tout
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-colors rounded-lg ${
                    isActive(link.href)
                      ? "text-[#0088C1]"
                      : "text-gray-700 hover:text-[#0088C1]"
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0088C1] leading-none" style={{ color: '#ffffff' }}>
                      {link.badge}
                    </span>
                  )}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#0088C1] rounded-full" />
                  )}
                </Link>
              )
            )}
          </nav>

          {/* CTA desktop */}
          <div className="hidden lg:flex items-center shrink-0">
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-[#0088C1] text-sm font-semibold rounded-xl hover:bg-[#014B6A] transition-colors shadow-md"
              style={{ color: '#ffffff' }}
            >
              Nous contacter
            </Link>
          </div>

          {/* Bouton hamburger mobile */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Ouvrir le menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Menu mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel */}
          <div className="absolute top-20 left-0 right-0 bg-white shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto">
            {/* Accent line */}
            <div className="h-1 w-full bg-gradient-to-r from-[#0088C1] to-[#78C2E1]" />

            <nav className="p-3">
              {NAV_LINKS.map((link) => (
                <div key={link.href}>
                  {link.hasDropdown ? (
                    <>
                      {/* Bouton Services avec toggle */}
                      <button
                        onClick={() => setServicesExpanded((o) => !o)}
                        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold transition-colors mb-0.5 ${
                          isActive(link.href)
                            ? "bg-[#0088C1] text-white"
                            : "text-gray-800 hover:bg-gray-50"
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            servicesExpanded ? "rotate-180" : ""
                          } ${isActive(link.href) ? "text-white" : "text-gray-400"}`}
                        />
                      </button>

                      {/* Sous-menu services */}
                      {servicesExpanded && (
                        <div className="mb-1 ml-3 border-l-2 border-[#0088C1]/20 pl-3 space-y-0.5">
                          {SERVICES.map((service) => {
                            const Icon = service.icon;
                            return (
                              <Link
                                key={service.href}
                                href={service.href}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 font-medium hover:text-[#0088C1] hover:bg-[#0088C1]/5 transition-colors"
                              >
                                <Icon className="w-4 h-4 text-[#0088C1] shrink-0" />
                                {service.label}
                              </Link>
                            );
                          })}
                          <Link
                            href="/services"
                            className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-[#0088C1] hover:text-[#014B6A] transition-colors"
                          >
                            Voir tous les services <ChevronRight className="w-3 h-3" />
                          </Link>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold transition-colors mb-0.5 ${
                        isActive(link.href)
                          ? "bg-[#0088C1] text-white"
                          : "text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {link.label}
                        {link.badge && (
                          <span
                            className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-[#0088C1] leading-none"
                            style={{ color: '#ffffff' }}
                          >
                            {link.badge}
                          </span>
                        )}
                      </span>
                      {isActive(link.href) && (
                        <ChevronRight className="w-4 h-4 opacity-70" />
                      )}
                    </Link>
                  )}
                </div>
              ))}

              {/* Séparateur */}
              <div className="my-3 border-t border-gray-100" />

              {/* CTA mobile */}
              <Link
                href="/contact"
                className="flex items-center justify-center w-full py-3.5 rounded-xl text-sm font-bold transition-colors bg-[#0088C1] hover:bg-[#014B6A]"
                style={{ color: '#ffffff' }}
              >
                Nous contacter
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
