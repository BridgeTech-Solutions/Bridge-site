import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArrowRight, ArrowLeft, CheckCircle, Phone, Zap } from "lucide-react";
import { SERVICES } from "../data";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: "Service introuvable" };
  return {
    title: `${service.title} | Bridge Technologies Solutions`,
    description: service.shortDesc,
  };
}

export default async function ServiceDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const currentIdx    = SERVICES.findIndex((s) => s.slug === slug);
  const prevService   = currentIdx > 0 ? SERVICES[currentIdx - 1] : null;
  const nextService   = currentIdx < SERVICES.length - 1 ? SERVICES[currentIdx + 1] : null;
  const otherServices = SERVICES.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <style>{`
        /* ── Animations ── */
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideRight {
          from { opacity:0; transform:translateX(-16px); }
          to   { opacity:1; transform:translateX(0); }
        }
        .au  { animation: fadeUp    .65s cubic-bezier(.22,1,.36,1) both; }
        .ai  { animation: fadeIn    .5s ease both; }
        .asr { animation: slideRight .5s ease both; }
        .d1{animation-delay:.08s} .d2{animation-delay:.16s}
        .d3{animation-delay:.24s} .d4{animation-delay:.32s}
        .d5{animation-delay:.4s}  .d6{animation-delay:.48s}

        /* ── Dot grid bg ── */
        .dot-grid {
          background-image: radial-gradient(circle,rgba(120,194,225,.18) 1px,transparent 1px);
          background-size:22px 22px;
        }

        /* ── Feature section ── */
        .feat-section {
          position: relative;
          padding: 4rem 3rem 4rem 3rem;
          border-bottom: 1px solid #edf2f7;
          overflow: hidden;
        }
        .feat-section:last-child { border-bottom: none; }
        .feat-section.even { background: #f0f9ff; }
        .feat-section.odd  { background: #ffffff; }

        .feat-ghost-num {
          position: absolute;
          top: -0.5rem;
          right: 1.5rem;
          font-size: 8rem;
          font-weight: 900;
          color: rgba(0,136,193,.055);
          line-height: 1;
          user-select: none;
          letter-spacing: -.05em;
          pointer-events: none;
        }

        .feat-accent {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(180deg,#0088C1 0%,#78C2E1 100%);
          border-radius: 0 4px 4px 0;
        }

        .feat-body {
          display: flex;
          align-items: flex-start;
          gap: 2.5rem;
          position: relative;
          z-index: 1;
        }

        .feat-icon-wrap {
          flex-shrink: 0;
          width: 96px;
          height: 96px;
          border-radius: 1.25rem;
          background: linear-gradient(135deg,#e0f2fe 0%,#bae6fd 100%);
          border: 1.5px solid rgba(0,136,193,.2);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem;
        }

        .feat-num-badge {
          display: inline-flex;
          align-items: center;
          gap: .375rem;
          padding: .2rem .75rem;
          border-radius: 999px;
          background: rgba(0,136,193,.1);
          border: 1px solid rgba(0,136,193,.2);
          font-size: .68rem;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: #0088C1;
          margin-bottom: .75rem;
        }

        .feat-title {
          font-size: 1.4rem;
          font-weight: 900;
          color: #0f172a;
          letter-spacing: -.02em;
          line-height: 1.2;
          margin-bottom: .625rem;
        }

        .feat-desc {
          font-size: .93rem;
          line-height: 1.8;
          color: #475569;
          margin-bottom: 1.25rem;
          max-width: 72ch;
        }

        /* Bullets grid */
        .bullets-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: .375rem .75rem;
        }
        .bullet-item {
          display: flex;
          align-items: flex-start;
          gap: .5rem;
          font-size: .855rem;
          color: #334155;
          line-height: 1.5;
          padding: .25rem 0;
        }

        /* Sub-sections (infrastructure) */
        .sub-section {
          margin-bottom: 1.25rem;
        }
        .sub-heading {
          font-size: .8rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: .07em;
          color: #0088C1;
          margin-bottom: .5rem;
          padding-bottom: .25rem;
          border-bottom: 1.5px solid rgba(0,136,193,.15);
        }

        /* ── Cloud types band ── */
        .cloud-type-card {
          flex: 1;
          padding: 2rem 1.5rem;
          border-radius: 1rem;
          background: rgba(255,255,255,.07);
          border: 1.5px solid rgba(255,255,255,.12);
          text-align: center;
          transition: background .2s, border-color .2s;
        }
        .cloud-type-card:hover {
          background: rgba(0,136,193,.18);
          border-color: rgba(0,136,193,.4);
        }

        /* ── Highlights grid ── */
        .highlight-card {
          display: flex;
          align-items: center;
          gap: .875rem;
          padding: 1rem 1.25rem;
          border-radius: .875rem;
          background: rgba(255,255,255,.07);
          border: 1px solid rgba(255,255,255,.1);
          transition: background .2s, border-color .2s;
        }
        .highlight-card:hover {
          background: rgba(0,136,193,.15);
          border-color: rgba(0,136,193,.35);
        }

        /* ── Compatibility table ── */
        .compat-card {
          background: #fff;
          border: 1.5px solid #e2e8f0;
          border-radius: 1rem;
          overflow: hidden;
          transition: border-color .2s, box-shadow .2s;
        }
        .compat-card:hover {
          border-color: rgba(0,136,193,.3);
          box-shadow: 0 4px 20px rgba(0,136,193,.08);
        }
        .compat-heading {
          padding: .625rem 1rem;
          font-size: .72rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .08em;
          color: #fff;
          background: linear-gradient(90deg,#0088C1,#014B6A);
        }
        .compat-item {
          display: flex;
          align-items: center;
          gap: .5rem;
          padding: .4rem 1rem;
          font-size: .83rem;
          color: #334155;
          border-bottom: 1px solid #f1f5f9;
        }
        .compat-item:last-child { border-bottom: none; }

        /* ── Supervision tools ── */
        .tool-badge {
          display: inline-flex;
          align-items: center;
          gap: .625rem;
          padding: .875rem 1.5rem;
          border-radius: .875rem;
          background: #fff;
          border: 1.5px solid #e2e8f0;
          font-size: 1rem;
          font-weight: 800;
          color: #0f172a;
          transition: border-color .2s, box-shadow .2s, transform .15s;
        }
        .tool-badge:hover {
          border-color: rgba(0,136,193,.4);
          box-shadow: 0 4px 16px rgba(0,136,193,.1);
          transform: translateY(-2px);
        }

        /* ── Nav cards ── */
        .nav-card {
          display: flex;
          align-items: center;
          gap: .875rem;
          padding: 1.125rem 1.5rem;
          border-radius: .875rem;
          border: 1.5px solid #e2e8f0;
          background: #fff;
          text-decoration: none;
          color: inherit;
          flex: 1;
          min-width: 0;
          transition: border-color .2s, box-shadow .2s, transform .2s;
        }
        .nav-card:hover {
          border-color: rgba(0,136,193,.3);
          box-shadow: 0 4px 16px rgba(0,136,193,.09);
          transform: translateY(-2px);
        }

        /* ── Other service cards ── */
        .other-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.125rem 1.5rem;
          border-radius: 1rem;
          border: 1.5px solid rgba(255,255,255,.1);
          background: rgba(255,255,255,.05);
          text-decoration: none;
          color: inherit;
          transition: border-color .2s, background .2s;
        }
        .other-card:hover {
          border-color: rgba(0,136,193,.4);
          background: rgba(0,136,193,.12);
        }

        /* ── Buttons ── */
        .btn-prim {
          display:inline-flex; align-items:center; gap:.5rem;
          padding:.9rem 2.25rem; border-radius:.75rem;
          background:#0088C1; color:#fff; font-weight:700;
          font-size:.9rem; text-decoration:none;
          transition:background .2s,transform .15s;
        }
        .btn-prim:hover { background:#014B6A; transform:translateY(-2px); }
        .btn-ghost {
          display:inline-flex; align-items:center; gap:.5rem;
          padding:.9rem 2.25rem; border-radius:.75rem;
          background:transparent; color:#fff; font-weight:700;
          font-size:.9rem; text-decoration:none;
          border:1.5px solid rgba(255,255,255,.3);
          transition:background .2s,border-color .2s;
        }
        .btn-ghost:hover { background:rgba(255,255,255,.08); border-color:rgba(255,255,255,.6); }

        @media (max-width:640px) {
          .feat-section { padding:2.5rem 1.25rem; }
          .feat-body { flex-direction:column; gap:1.25rem; }
          .feat-icon-wrap { width:72px; height:72px; padding:1rem; }
          .feat-ghost-num { font-size:5rem; }
          .bullets-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <main className="min-h-screen" style={{ background: "#f8fafc" }}>

        {/* ══ HERO ══════════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden py-24"
          style={{ background: "linear-gradient(135deg,#071020 0%,#012a45 55%,#014B6A 100%)" }}
        >
          <div className="dot-grid absolute inset-0 pointer-events-none opacity-60" />
          {/* Orb de lumière */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse,rgba(0,136,193,.18) 0%,transparent 70%)" }} />
          <div className="absolute -right-32 top-8 w-80 h-80 rounded-full pointer-events-none"
            style={{ border: "1px solid rgba(0,136,193,.12)" }} />
          <div className="absolute -left-16 -bottom-16 w-56 h-56 rounded-full pointer-events-none"
            style={{ border: "1px solid rgba(120,194,225,.08)" }} />

          <div className="relative z-10 max-w-5xl mx-auto px-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs font-semibold mb-10 ai" style={{ color: "#78C2E1" }}>
              <Link href="/services" className="hover:text-white transition-colors" style={{ color: "#78C2E1", textDecoration: "none" }}>
                Services
              </Link>
              <span style={{ color: "rgba(120,194,225,.35)" }}>/</span>
              <span className="text-white">{service.title}</span>
            </nav>

            <div className="flex items-start gap-7 au">
              {/* Grande icône hero */}
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center flex-shrink-0 p-4 shadow-lg"
                style={{ background: "rgba(0,136,193,.2)", border: "1.5px solid rgba(0,136,193,.35)" }}
              >
                <Image src={service.icon} alt={service.title} width={64} height={64} className="object-contain" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-xs font-black px-2.5 py-1 rounded" style={{ background: "rgba(0,136,193,.2)", color: "#78C2E1", letterSpacing: ".07em" }}>
                    {service.num}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#78C2E1" }}>
                    {service.subtitle}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white leading-tight" style={{ letterSpacing: "-.025em" }}>
                  {service.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Wave bas */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg viewBox="0 0 1440 44" className="w-full" preserveAspectRatio="none" fill="#f8fafc">
              <path d="M0,22 C360,44 1080,0 1440,22 L1440,44 L0,44 Z" />
            </svg>
          </div>
        </section>

        {/* ══ INTRO ═════════════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto px-6 py-12 au d1">
          <div
            className="rounded-2xl p-8 md:p-10"
            style={{ background: "#fff", border: "1.5px solid #e2e8f0", boxShadow: "0 2px 20px rgba(0,0,0,.04)" }}
          >
            <div className="flex items-start gap-5">
              <div className="w-1 self-stretch rounded-full flex-shrink-0" style={{ background: "linear-gradient(180deg,#0088C1,#78C2E1)", minHeight: "3rem" }} />
              <p className="text-gray-600 leading-loose text-base md:text-lg">{service.intro}</p>
            </div>
          </div>
        </section>

        {/* ══ CLOUD TYPES BAND (cloud uniquement) ══════════════ */}
        {service.cloudTypes && service.cloudTypes.length > 0 && (
          <section className="max-w-5xl mx-auto px-6 pb-4">
            <div
              className="rounded-2xl p-8"
              style={{ background: "linear-gradient(135deg,#012a45,#014B6A)", border: "1.5px solid rgba(0,136,193,.2)" }}
            >
              <p className="text-xs font-black uppercase tracking-widest mb-6 text-center" style={{ color: "#78C2E1" }}>
                Nos modèles cloud
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {service.cloudTypes.map((ct) => (
                  <div key={ct.title} className="cloud-type-card">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,136,193,.25)" }}>
                      <Image src="/images/cloud.png" alt={ct.title} width={28} height={28} className="object-contain" />
                    </div>
                    <h3 className="text-white font-black text-base mb-1">{ct.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: "#78C2E1" }}>{ct.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ══ FEATURES (sections numérotées) ══════════════════ */}
        {service.features.length > 0 && (
          <section className="max-w-5xl mx-auto px-6 py-6">
            <div className="mb-8 au d2">
              <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#0088C1" }}>Nos expertises</p>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900" style={{ letterSpacing: "-.02em" }}>
                Ce que nous proposons
              </h2>
            </div>

            <div className="rounded-2xl overflow-hidden" style={{ border: "1.5px solid #e2e8f0", boxShadow: "0 2px 20px rgba(0,0,0,.04)" }}>
              {service.features.map((feat, i) => (
                <div key={feat.title} className={`feat-section ${i % 2 === 0 ? "odd" : "even"} au d${Math.min(i + 2, 6)}`}>
                  <div className="feat-accent" />
                  <span className="feat-ghost-num">{String(i + 1).padStart(2, "0")}</span>

                  <div className="feat-body">
                    {/* Icône 96px */}
                    <div className="feat-icon-wrap">
                      <Image src={feat.icon} alt={feat.title} width={64} height={64} className="object-contain w-full h-full" />
                    </div>

                    {/* Contenu */}
                    <div className="flex-1 min-w-0">
                      <div className="feat-num-badge">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#0088C1" }} />
                        {String(i + 1).padStart(2, "0")} — {feat.title}
                      </div>
                      <h3 className="feat-title">{feat.title}</h3>
                      <p className="feat-desc">{feat.description}</p>

                      {/* Sub-sections (infrastructure Offres) */}
                      {feat.subSections && feat.subSections.length > 0 && (
                        <div className="space-y-4">
                          {feat.subSections.map((sub) => (
                            <div key={sub.heading} className="sub-section">
                              <p className="sub-heading">{sub.heading}</p>
                              <ul className="space-y-1">
                                {sub.items.map((item) => (
                                  <li key={item} className="bullet-item">
                                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "#0088C1" }} />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Bullets classiques */}
                      {feat.items.length > 0 && (
                        <div className="bullets-grid">
                          {feat.items.map((item) => (
                            <div key={item} className="bullet-item">
                              <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "#0088C1" }} />
                              {item}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ══ TABLE DE COMPATIBILITÉ (protection) ═════════════ */}
        {service.compatibility && service.compatibility.length > 0 && (
          <section className="max-w-5xl mx-auto px-6 py-8">
            <div className="mb-8">
              <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#0088C1" }}>Couverture</p>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900" style={{ letterSpacing: "-.02em" }}>
                Environnements & plateformes supportés
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.compatibility.map((group) => (
                <div key={group.heading} className="compat-card">
                  <div className="compat-heading">{group.heading}</div>
                  <div className="py-2">
                    {group.items.map((item) => (
                      <div key={item} className="compat-item">
                        <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#0088C1" }} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ══ OUTILS DE SUPERVISION (protection) ═════════════ */}
        {service.supervisionTools && service.supervisionTools.length > 0 && (
          <section className="max-w-5xl mx-auto px-6 py-6">
            <div
              className="rounded-2xl p-8 md:p-10"
              style={{ background: "linear-gradient(135deg,#012a45,#071020)", border: "1.5px solid rgba(0,136,193,.2)" }}
            >
              <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#78C2E1" }}>
                Nos outils
              </p>
              <h2 className="text-xl font-black text-white mb-8" style={{ letterSpacing: "-.015em" }}>
                Solution de supervision réseau
              </h2>
              <div className="flex flex-wrap gap-3">
                {service.supervisionTools.map((tool) => (
                  <span key={tool} className="tool-badge">
                    <Zap className="w-4 h-4 flex-shrink-0" style={{ color: "#0088C1" }} />
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ══ HIGHLIGHTS "POURQUOI NOUS CHOISIR" (infra) ══════ */}
        {service.highlights && service.highlights.length > 0 && (
          <section className="max-w-5xl mx-auto px-6 py-8">
            <div
              className="rounded-2xl p-8 md:p-10"
              style={{ background: "linear-gradient(135deg,#012a45,#071020)", border: "1.5px solid rgba(0,136,193,.2)" }}
            >
              <p className="text-xs font-black uppercase tracking-widest mb-2 text-center" style={{ color: "#78C2E1" }}>
                Nos engagements
              </p>
              <h2 className="text-xl font-black text-white mb-8 text-center" style={{ letterSpacing: "-.015em" }}>
                Pourquoi choisir nos services
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {service.highlights.map((h) => (
                  <div key={h.label} className="highlight-card">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,136,193,.25)" }}>
                      <CheckCircle className="w-4 h-4" style={{ color: "#78C2E1" }} />
                    </div>
                    <p className="text-sm font-bold text-white leading-snug">{h.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ══ SÉPARATEUR ACCROCHE ══════════════════════════════ */}
        <section className="max-w-5xl mx-auto px-6 py-6">
          <div
            className="rounded-2xl px-8 py-7 flex items-center gap-5"
            style={{ background: "linear-gradient(90deg,rgba(0,136,193,.08),rgba(0,136,193,.03))", border: "1.5px solid rgba(0,136,193,.15)" }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,136,193,.15)" }}>
              <Zap className="w-5 h-5" style={{ color: "#0088C1" }} />
            </div>
            <p className="text-gray-600 font-semibold leading-snug text-sm md:text-base italic">
              &ldquo;Des solutions pensées pour votre croissance et la continuité de votre activité.&rdquo;
            </p>
          </div>
        </section>

        {/* ══ PREV / NEXT ══════════════════════════════════════ */}
        <section className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex gap-4">
            {prevService ? (
              <Link href={`/services/${prevService.slug}`} className="nav-card">
                <ArrowLeft className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-400 font-semibold mb-0.5">Précédent</p>
                  <p className="text-sm font-black text-gray-900 truncate">{prevService.title}</p>
                </div>
              </Link>
            ) : <div className="flex-1" />}
            {nextService && (
              <Link href={`/services/${nextService.slug}`} className="nav-card justify-end text-right">
                <div className="min-w-0">
                  <p className="text-xs text-gray-400 font-semibold mb-0.5">Suivant</p>
                  <p className="text-sm font-black text-gray-900 truncate">{nextService.title}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </Link>
            )}
          </div>
        </section>

        {/* ══ CTA FINAL ════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden py-20"
          style={{ background: "linear-gradient(135deg,#071020 0%,#012a45 100%)" }}
        >
          <div className="dot-grid absolute inset-0 opacity-40 pointer-events-none" />
          <div className="relative z-10 max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

              {/* Colonne gauche — CTA */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "#78C2E1" }}>
                  Parlons de votre projet
                </p>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-4" style={{ letterSpacing: "-.02em" }}>
                  Intéressé par ce service ?
                </h2>
                <p className="text-sm leading-relaxed mb-8" style={{ color: "#94a3b8" }}>
                  Contactez notre équipe pour une analyse gratuite de vos besoins et
                  une proposition personnalisée adaptée à votre contexte.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/contact" className="btn-prim">
                    Nous contacter <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a href="tel:+237679289166" className="btn-ghost">
                    <Phone className="w-4 h-4" /> +237 679 289 166
                  </a>
                </div>
              </div>

              {/* Colonne droite — autres services */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: "#78C2E1" }}>
                  Autres services
                </p>
                <div className="space-y-2">
                  {otherServices.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className="other-card">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 p-2" style={{ background: "rgba(0,136,193,.2)" }}>
                        <Image src={s.icon} alt={s.title} width={22} height={22} className="object-contain" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-black text-white truncate">{s.title}</p>
                        <p className="text-xs truncate" style={{ color: "#78C2E1" }}>{s.subtitle}</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#78C2E1" }} />
                    </Link>
                  ))}
                  <Link href="/services" className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold" style={{ color: "#78C2E1", textDecoration: "none" }}>
                    Voir tous les services <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
