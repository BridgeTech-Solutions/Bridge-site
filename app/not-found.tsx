import Link from "next/link";
import { Home, Mail, Briefcase, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <style>{`
        /* ── fade in ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .anim-up   { animation: fadeUp  .7s cubic-bezier(.22,1,.36,1) both; }
        .anim-in   { animation: fadeIn  .5s ease both; }
        .delay-1   { animation-delay: .15s; }
        .delay-2   { animation-delay: .3s; }
        .delay-3   { animation-delay: .45s; }

        /* ── glitch on 404 ── */
        @keyframes glitch-1 {
          0%, 90%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
          92%  { clip-path: inset(10% 0 60% 0); transform: translate(-4px, 2px); }
          94%  { clip-path: inset(50% 0 20% 0); transform: translate(4px, -2px); }
          96%  { clip-path: inset(30% 0 40% 0); transform: translate(-2px, 1px); }
          98%  { clip-path: inset(70% 0 10% 0); transform: translate(2px, -1px); }
        }
        @keyframes glitch-2 {
          0%, 88%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
          90%  { clip-path: inset(60% 0 20% 0); transform: translate(4px, -2px); }
          93%  { clip-path: inset(20% 0 55% 0); transform: translate(-3px, 2px); }
          97%  { clip-path: inset(40% 0 30% 0); transform: translate(3px, -1px); }
        }

        .glitch-wrap {
          position: relative;
          display: inline-block;
          line-height: 1;
        }
        .glitch-base {
          font-size: clamp(7rem, 20vw, 14rem);
          font-weight: 900;
          letter-spacing: -.05em;
          background: linear-gradient(135deg, rgba(0,136,193,.15) 0%, rgba(120,194,225,.08) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          user-select: none;
        }
        .glitch-layer {
          position: absolute;
          inset: 0;
          font-size: clamp(7rem, 20vw, 14rem);
          font-weight: 900;
          letter-spacing: -.05em;
          user-select: none;
        }
        .glitch-layer-1 {
          color: rgba(0,136,193,.25);
          animation: glitch-1 5s ease-in-out infinite;
        }
        .glitch-layer-2 {
          color: rgba(120,194,225,.2);
          animation: glitch-2 5s ease-in-out infinite .3s;
        }

        /* ── dot grid ── */
        .dot-grid {
          background-image: radial-gradient(circle, rgba(120,194,225,.14) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        /* ── suggestion cards ── */
        .sug-card {
          display: flex;
          align-items: center;
          gap: .875rem;
          padding: 1rem 1.25rem;
          border-radius: .875rem;
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(255,255,255,.04);
          text-decoration: none;
          transition: background .2s, border-color .2s, transform .2s;
        }
        .sug-card:hover {
          background: rgba(0,136,193,.12);
          border-color: rgba(0,136,193,.3);
          transform: translateX(4px);
        }

        /* ── rings ── */
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        .ring-spin { animation: spin-slow 20s linear infinite; }

        /* ── home btn ── */
        .btn-home {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          padding: .75rem 1.75rem;
          border-radius: .75rem;
          background: #0088C1;
          color: #fff;
          font-weight: 700;
          font-size: .875rem;
          text-decoration: none;
          transition: background .2s, transform .15s;
        }
        .btn-home:hover { background: #014B6A; transform: translateY(-2px); }
      `}</style>

      <main
        className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-6 py-20"
        style={{ background: "linear-gradient(135deg, #0a1628 0%, #071020 100%)" }}
      >
        {/* Dot grid */}
        <div className="dot-grid absolute inset-0 pointer-events-none" />

        {/* Decorative rings */}
        <div
          className="ring-spin absolute -right-32 -top-32 w-[36rem] h-[36rem] rounded-full pointer-events-none"
          style={{ border: "1px solid rgba(0,136,193,.08)" }}
        />
        <div
          className="absolute -left-24 -bottom-24 w-80 h-80 rounded-full pointer-events-none"
          style={{ border: "1px solid rgba(120,194,225,.06)" }}
        />

        <div className="relative z-10 max-w-lg w-full text-center">

          {/* 404 glitch */}
          <div className="anim-in flex justify-center mb-2">
            <div className="glitch-wrap">
              <span className="glitch-base">404</span>
              <span className="glitch-layer glitch-layer-1" aria-hidden="true">404</span>
              <span className="glitch-layer glitch-layer-2" aria-hidden="true">404</span>
            </div>
          </div>

          {/* Accent line */}
          <div
            className="anim-in delay-1 mx-auto mb-6 h-px w-16"
            style={{ background: "linear-gradient(90deg, transparent, #0088C1, transparent)" }}
          />

          {/* Message */}
          <div className="anim-up delay-1 mb-8">
            <h1
              className="text-2xl md:text-3xl font-black text-white mb-3"
              style={{ letterSpacing: "-.02em" }}
            >
              Page introuvable
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: "#78C2E1" }}>
              La page que vous recherchez n&apos;existe pas ou a été déplacée.
              Voici quelques liens pour vous aider à retrouver votre chemin.
            </p>
          </div>

          {/* Suggestions */}
          <div className="anim-up delay-2 space-y-2 mb-8 text-left">
            <Link href="/" className="sug-card">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(0,136,193,.2)" }}
              >
                <Home className="w-4 h-4" style={{ color: "#0088C1" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white">Accueil</p>
                <p className="text-xs" style={{ color: "#78C2E1" }}>Retourner à la page principale</p>
              </div>
              <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: "#78C2E1" }} />
            </Link>

            <Link href="/services" className="sug-card">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(0,136,193,.2)" }}
              >
                <Briefcase className="w-4 h-4" style={{ color: "#0088C1" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white">Nos services</p>
                <p className="text-xs" style={{ color: "#78C2E1" }}>Découvrir nos 6 domaines d&apos;expertise</p>
              </div>
              <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: "#78C2E1" }} />
            </Link>

            <Link href="/contact" className="sug-card">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(0,136,193,.2)" }}
              >
                <Mail className="w-4 h-4" style={{ color: "#0088C1" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white">Nous contacter</p>
                <p className="text-xs" style={{ color: "#78C2E1" }}>Besoin d&apos;aide ? Notre équipe répond vite</p>
              </div>
              <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: "#78C2E1" }} />
            </Link>
          </div>

          {/* Code terminal */}
          <div
            className="anim-up delay-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono"
            style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", color: "rgba(120,194,225,.6)" }}
          >
            <span style={{ color: "rgba(0,136,193,.7)" }}>$</span>
            <span>ERROR 404 — resource not found</span>
            <span
              className="w-1.5 h-3.5 ml-1 rounded-sm"
              style={{
                background: "rgba(0,136,193,.6)",
                animation: "fadeIn .8s ease-in-out infinite alternate",
              }}
            />
          </div>
        </div>
      </main>
    </>
  );
}
