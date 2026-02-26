import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, CheckCircle } from "lucide-react";
import {
  SERVICES as CONST_SERVICES,
  VALUES as CONST_VALUES,
  METRICS,
  COMPANY,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: `L'entreprise | ${COMPANY.name}`,
  description:
    "Découvrez Bridge Technologies Solutions, votre partenaire technologique pour la gestion de vos systèmes informatiques au Cameroun et en Afrique.",
};

const SERVICES = CONST_SERVICES.map((s) => ({
  icon: s.image,
  title: s.title,
  desc: s.shortDesc,
  href: `/services/${s.slug}`,
}));

const VALUES = CONST_VALUES.map((v) => ({
  icon: v.image,
  title: v.title,
  desc: v.description,
}));

const STATS = METRICS.map((m) => ({ value: m.value, label: m.label }));

export default function EntreprisePage() {
  return (
    <>
      <style>{`
        /* ── animations ─────────────────────────────── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideRight {
          from { transform: scaleX(0); transform-origin: left; }
          to   { transform: scaleX(1); transform-origin: left; }
        }
        .anim-fade-up  { animation: fadeUp  .7s cubic-bezier(.22,1,.36,1) both; }
        .anim-fade-in  { animation: fadeIn  .6s ease both; }
        .anim-line     { animation: slideRight .8s cubic-bezier(.22,1,.36,1) .3s both; }
        .delay-1 { animation-delay: .1s; }
        .delay-2 { animation-delay: .2s; }
        .delay-3 { animation-delay: .3s; }
        .delay-4 { animation-delay: .4s; }
        .delay-5 { animation-delay: .5s; }
        .delay-6 { animation-delay: .6s; }

        /* ── dot grid ───────────────────────────────── */
        .dot-grid {
          background-image: radial-gradient(circle, rgba(120,194,225,.18) 1px, transparent 1px);
          background-size: 22px 22px;
        }

        /* ── section number ─────────────────────────── */
        .section-num {
          font-size: 7rem;
          font-weight: 900;
          line-height: 1;
          color: rgba(0,136,193,.07);
          letter-spacing: -.05em;
          user-select: none;
          position: absolute;
          top: -1.5rem;
          left: -1rem;
        }

        /* ── service card ───────────────────────────── */
        .svc-card {
          background: #fff;
          border: 1.5px solid #edf2f7;
          border-radius: 1rem;
          padding: 2rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: .75rem;
          transition: border-color .25s, box-shadow .25s, transform .25s;
          position: relative;
          overflow: hidden;
        }
        .svc-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: #0088C1;
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform .25s cubic-bezier(.22,1,.36,1);
        }
        .svc-card:hover {
          border-color: rgba(0,136,193,.25);
          box-shadow: 0 8px 32px rgba(0,136,193,.10);
          transform: translateY(-3px);
        }
        .svc-card:hover::before { transform: scaleY(1); }

        /* ── value card ─────────────────────────────── */
        .val-card {
          border-radius: 1rem;
          padding: 2.5rem 2rem;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.1);
          transition: background .25s, border-color .25s;
          text-align: center;
        }
        .val-card:hover {
          background: rgba(0,136,193,.15);
          border-color: rgba(0,136,193,.35);
        }

        /* ── quote bar ──────────────────────────────── */
        .quote-bar {
          border-left: 4px solid #0088C1;
          padding-left: 1.5rem;
        }

        /* ── cta btn ────────────────────────────────── */
        .btn-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          padding: .875rem 2rem;
          border-radius: .75rem;
          background: #0088C1;
          color: #fff;
          font-weight: 700;
          font-size: .9rem;
          text-decoration: none;
          transition: background .2s, transform .15s;
          letter-spacing: .01em;
        }
        .btn-cta-primary:hover { background: #014B6A; transform: translateY(-2px); }

        .btn-cta-ghost {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          padding: .875rem 2rem;
          border-radius: .75rem;
          background: transparent;
          color: #fff;
          font-weight: 700;
          font-size: .9rem;
          text-decoration: none;
          border: 1.5px solid rgba(255,255,255,.3);
          transition: background .2s, border-color .2s;
          letter-spacing: .01em;
        }
        .btn-cta-ghost:hover {
          background: rgba(255,255,255,.08);
          border-color: rgba(255,255,255,.6);
        }

        /* ── mission check ──────────────────────────── */
        .mission-item {
          display: flex;
          align-items: flex-start;
          gap: .75rem;
          padding: .5rem 0;
        }
      `}</style>

      <main className="bg-white min-h-screen">

        {/* ══ HERO ════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden py-20"
          style={{ background: "linear-gradient(135deg, #0a1628 0%, #012a45 60%, #014B6A 100%)" }}
        >
          <div className="dot-grid absolute inset-0 pointer-events-none" />
          <div
            className="absolute -right-24 -top-24 w-96 h-96 rounded-full pointer-events-none"
            style={{ border: "1.5px solid rgba(0,136,193,.18)" }}
          />
          <div
            className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full pointer-events-none"
            style={{ border: "1px solid rgba(120,194,225,.1)" }}
          />

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center anim-fade-up">
            <h1
              className="text-4xl md:text-5xl font-black text-white leading-tight mb-4"
              style={{ letterSpacing: "-.02em" }}
            >
              Votre partenaire
              <span style={{ color: "#0088C1" }}> technologique</span>
            </h1>
            <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: "#78C2E1" }}>
              Nous accompagnons les entreprises dans la gestion et l'évolution
              de leurs systèmes informatiques avec des solutions complètes et adaptées.
            </p>
          </div>

          {/* Wave */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg viewBox="0 0 1440 40" className="w-full" preserveAspectRatio="none" fill="#ffffff">
              <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" />
            </svg>
          </div>
        </section>

        {/* ══ QUI SOMMES-NOUS ═════════════════════════════ */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Text */}
              <div className="relative anim-fade-up delay-1">
                <span className="section-num">01</span>
                <div className="relative z-10">
                  <p
                    className="text-xs font-black uppercase tracking-widest mb-3"
                    style={{ color: "#0088C1" }}
                  >
                    Qui sommes-nous
                  </p>
                  <h2
                    className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight"
                    style={{ letterSpacing: "-.02em" }}
                  >
                    Nous façonnons
                    <br />l&apos;informatique de demain
                  </h2>
                  <div className="quote-bar mb-6">
                    <p className="text-lg text-gray-600 leading-relaxed font-medium">
                      En tant que fournisseur de solutions technologiques, nous accompagnons
                      au quotidien nos clients dans la gestion de leurs systèmes informatiques
                      avec des solutions complètes, intégrées et adaptées à leur réalité d&apos;affaires.
                    </p>
                  </div>
                  <p className="text-gray-500 leading-relaxed">
                    Basés à Douala, au Cameroun, nous intervenons auprès d&apos;entreprises de toutes
                    tailles pour les aider à tirer pleinement parti de la technologie — de
                    l&apos;infrastructure à la stratégie numérique.
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    {[
                      "Expertise certifiée",
                      "Approche sur-mesure",
                      "Support réactif 24/7",
                      "Partenaires de confiance",
                    ].map((item) => (
                      <div key={item} className="mission-item">
                        <CheckCircle
                          className="w-4 h-4 flex-shrink-0 mt-0.5"
                          style={{ color: "#0088C1" }}
                        />
                        <span className="text-sm font-semibold text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="anim-fade-in delay-3 relative">
                <div
                  className="absolute -top-4 -right-4 w-full h-full rounded-2xl"
                  style={{ background: "rgba(0,136,193,.08)", border: "1.5px solid rgba(0,136,193,.15)" }}
                />
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/scheme1.png"
                    alt="Solutions Bridge Technologies"
                    width={600}
                    height={420}
                    className="object-cover w-full"
                  />
                  {/* Overlay badge */}
                  <div
                    className="absolute bottom-4 left-4 px-4 py-2.5 rounded-xl backdrop-blur-sm"
                    style={{ background: "rgba(10,22,40,.85)", border: "1px solid rgba(0,136,193,.3)" }}
                  >
                    <p className="text-xs font-bold text-white">{COMPANY.name}</p>
                    <p className="text-xs" style={{ color: "#78C2E1" }}>{COMPANY.address.street}, {COMPANY.address.city} · {COMPANY.address.country}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ STATS STRIP ═════════════════════════════════ */}
        <section style={{ background: "#071020" }}>
          <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`text-center anim-fade-up delay-${i + 1}`}
              >
                <p
                  className="text-4xl md:text-5xl font-black mb-1"
                  style={{ color: "#0088C1", letterSpacing: "-.03em" }}
                >
                  {s.value}
                </p>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#78C2E1" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ NOS SERVICES ════════════════════════════════ */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="relative mb-14 anim-fade-up">
              <span className="section-num">02</span>
              <div className="relative z-10">
                <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#0088C1" }}>
                  Ce que nous faisons
                </p>
                <h2
                  className="text-3xl md:text-4xl font-black text-gray-900 leading-tight"
                  style={{ letterSpacing: "-.02em" }}
                >
                  Nos services
                </h2>
                <div
                  className="anim-line mt-3 h-1 w-16 rounded-full"
                  style={{ background: "#0088C1" }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((svc, i) => (
                <Link
                  key={svc.title}
                  href={svc.href}
                  className={`svc-card anim-fade-up delay-${i + 1}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="w-14 h-14 relative flex-shrink-0">
                    <Image
                      src={svc.icon}
                      alt={svc.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-base font-black text-gray-900" style={{ letterSpacing: "-.01em" }}>
                    {svc.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">{svc.desc}</p>
                  <div
                    className="flex items-center gap-1 text-xs font-bold mt-1"
                    style={{ color: "#0088C1" }}
                  >
                    En savoir plus <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══ MISSION ═════════════════════════════════════ */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Decorative left */}
              <div className="anim-fade-in delay-1 relative order-2 lg:order-1">
                <div
                  className="rounded-2xl p-8 relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #0a1628 0%, #012a45 100%)", border: "1px solid rgba(0,136,193,.2)" }}
                >
                  <div className="dot-grid absolute inset-0 opacity-40 pointer-events-none" />
                  <div className="relative z-10 space-y-6">
                    <p className="text-xs font-black uppercase tracking-widest" style={{ color: "#78C2E1" }}>
                      Notre engagement
                    </p>
                    <p className="text-2xl font-black text-white leading-snug" style={{ letterSpacing: "-.02em" }}>
                      "Être l'acteur clé du marché des services informatiques en Afrique."
                    </p>
                    <div className="h-px" style={{ background: "rgba(120,194,225,.2)" }} />
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { v: "2015", l: "Fondation" },
                        { v: "DLA", l: "Siège social" },
                        { v: "CAM", l: "Pays" },
                        { v: "24/7", l: "Disponibilité" },
                      ].map((item) => (
                        <div key={item.l}>
                          <p className="text-xl font-black text-white">{item.v}</p>
                          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#78C2E1" }}>
                            {item.l}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="relative anim-fade-up delay-2 order-1 lg:order-2">
                <span className="section-num">03</span>
                <div className="relative z-10">
                  <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "#0088C1" }}>
                    Notre mission
                  </p>
                  <h2
                    className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight"
                    style={{ letterSpacing: "-.02em" }}
                  >
                    Dépasser les limites,
                    <br />chaque jour
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    En endossant le rôle de partenaire technologique, nous favorisons la mise
                    en place de solutions véritablement utiles à la performance de nos clients.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Nous cherchons constamment à nous dépasser pour affirmer notre position
                    d'acteur clé sur le marché des services informatiques — en Afrique et au-delà.
                  </p>
                  <div className="mt-8">
                    <Link href="/contact" className="btn-cta-primary">
                      Travailler avec nous <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══ VALEURS ═════════════════════════════════════ */}
        <section
          className="py-20 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0a1628 0%, #071020 100%)" }}
        >
          <div className="dot-grid absolute inset-0 opacity-30 pointer-events-none" />
          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <div className="text-center mb-14 anim-fade-up">
              <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#78C2E1" }}>
                Ce qui nous définit
              </p>
              <h2
                className="text-3xl md:text-4xl font-black text-white"
                style={{ letterSpacing: "-.02em" }}
              >
                Nos valeurs
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {VALUES.map((val, i) => (
                <div key={val.title} className={`val-card anim-fade-up delay-${i + 1}`}>
                  <div className="w-16 h-16 relative mx-auto mb-5">
                    <Image
                      src={val.icon}
                      alt={val.title}
                      fill
                      className="object-contain"
                      style={{ filter: "brightness(0) invert(1)" }}
                    />
                  </div>
                  <h3 className="text-lg font-black text-white mb-3">{val.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#78C2E1" }}>{val.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-14 anim-fade-up delay-4">
              <p className="text-sm mb-6 font-medium" style={{ color: "#78C2E1" }}>
                Prêt à transformer votre infrastructure IT ?
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact" className="btn-cta-primary">
                  Contactez-nous <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/services" className="btn-cta-ghost">
                  Voir nos services
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
