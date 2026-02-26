import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, Phone } from "lucide-react";
import { SERVICES } from "./data";

export const metadata: Metadata = {
  title: "Nos Services | Bridge Technologies Solutions",
  description:
    "Découvrez les 6 domaines d'expertise de Bridge Technologies Solutions : gestion de projets, infrastructure, cloud, sécurité des données, DSI externe et conseil.",
};

export default function ServicesPage() {
  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-fade-up { animation: fadeUp .65s cubic-bezier(.22,1,.36,1) both; }
        .delay-1 { animation-delay:.1s; }
        .delay-2 { animation-delay:.2s; }
        .delay-3 { animation-delay:.3s; }
        .delay-4 { animation-delay:.4s; }
        .delay-5 { animation-delay:.5s; }
        .delay-6 { animation-delay:.6s; }

        .dot-grid {
          background-image: radial-gradient(circle, rgba(120,194,225,.18) 1px, transparent 1px);
          background-size: 22px 22px;
        }

        .svc-card {
          background: #fff;
          border: 1.5px solid #edf2f7;
          border-radius: 1.25rem;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          text-decoration: none;
          color: inherit;
          position: relative;
          overflow: hidden;
          transition: border-color .25s, box-shadow .25s, transform .25s;
        }
        .svc-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,136,193,.04) 0%, transparent 60%);
          opacity: 0;
          transition: opacity .25s;
        }
        .svc-card:hover {
          border-color: rgba(0,136,193,.3);
          box-shadow: 0 12px 40px rgba(0,136,193,.12);
          transform: translateY(-4px);
        }
        .svc-card:hover::before { opacity: 1; }

        .svc-card-num {
          position: absolute;
          top: 1.25rem;
          right: 1.5rem;
          font-size: 3.5rem;
          font-weight: 900;
          color: rgba(0,136,193,.06);
          letter-spacing: -.05em;
          line-height: 1;
          user-select: none;
        }

        .svc-card-icon {
          width: 56px;
          height: 56px;
          border-radius: .875rem;
          background: rgba(0,136,193,.08);
          border: 1.5px solid rgba(0,136,193,.15);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: .75rem;
          flex-shrink: 0;
        }

        .svc-card-link {
          display: flex;
          align-items: center;
          gap: .4rem;
          font-size: .8rem;
          font-weight: 700;
          color: #0088C1;
          margin-top: auto;
          letter-spacing: .01em;
        }

        .btn-primary {
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
        }
        .btn-primary:hover { background: #014B6A; transform: translateY(-2px); }

        .btn-ghost {
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
        }
        .btn-ghost:hover { background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.6); }
      `}</style>

      <main className="min-h-screen bg-gray-50">

        {/* ══ HERO ══════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden py-20"
          style={{ background: "linear-gradient(135deg, #0a1628 0%, #012a45 60%, #014B6A 100%)" }}
        >
          <div className="dot-grid absolute inset-0 pointer-events-none" />
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full pointer-events-none"
            style={{ border: "1.5px solid rgba(0,136,193,.18)" }} />
          <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full pointer-events-none"
            style={{ border: "1px solid rgba(120,194,225,.1)" }} />

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center anim-fade-up">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5"
              style={{ background: "rgba(0,136,193,.2)", color: "#78C2E1", letterSpacing: ".06em" }}
            >
              6 DOMAINES D&apos;EXPERTISE
            </div>
            <h1
              className="text-4xl md:text-5xl font-black text-white leading-tight mb-4"
              style={{ letterSpacing: "-.02em" }}
            >
              Nos <span style={{ color: "#0088C1" }}>services</span>
            </h1>
            <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: "#78C2E1" }}>
              Des solutions complètes, intégrées et adaptées à votre réalité d&apos;affaires —
              de la gestion de projet à la transformation digitale.
            </p>
          </div>

          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg viewBox="0 0 1440 40" className="w-full" preserveAspectRatio="none" fill="#f9fafb">
              <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" />
            </svg>
          </div>
        </section>

        {/* ══ GRID ══════════════════════════════════════════ */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc, i) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className={`svc-card anim-fade-up delay-${i + 1}`}
              >
                <span className="svc-card-num">{svc.num}</span>

                <div className="svc-card-icon">
                  <Image
                    src={svc.icon}
                    alt={svc.title}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>

                <div>
                  <p
                    className="text-xs font-black uppercase tracking-widest mb-1"
                    style={{ color: "#0088C1" }}
                  >
                    {svc.subtitle}
                  </p>
                  <h2
                    className="text-lg font-black text-gray-900 leading-snug"
                    style={{ letterSpacing: "-.01em" }}
                  >
                    {svc.title}
                  </h2>
                </div>

                <p className="text-sm text-gray-500 leading-relaxed flex-1">
                  {svc.shortDesc}
                </p>

                <div className="svc-card-link">
                  Voir le détail <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ══ CTA ═══════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden py-16"
          style={{ background: "linear-gradient(135deg, #0a1628 0%, #012a45 100%)" }}
        >
          <div className="dot-grid absolute inset-0 opacity-30 pointer-events-none" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <h2
              className="text-3xl font-black text-white mb-3"
              style={{ letterSpacing: "-.02em" }}
            >
              Un projet en tête ?
            </h2>
            <p className="text-sm max-w-md mx-auto mb-7" style={{ color: "#78C2E1" }}>
              Contactez notre équipe pour discuter de vos besoins et obtenir
              une proposition adaptée à votre entreprise.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Contactez-nous <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+237679289166" className="btn-ghost">
                <Phone className="w-4 h-4" />
                +237 679 289 166
              </a>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
