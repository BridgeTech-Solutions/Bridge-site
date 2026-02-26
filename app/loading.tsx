import Image from "next/image";

export default function Loading() {
  return (
    <>
      <style>{`
        /* ── progress bar ── */
        @keyframes progress {
          0%   { transform: scaleX(0); transform-origin: left; }
          60%  { transform: scaleX(.85); transform-origin: left; }
          100% { transform: scaleX(.95); transform-origin: left; }
        }

        /* ── scan shimmer over logo ── */
        @keyframes scan {
          0%   { left: -60%; }
          100% { left: 160%; }
        }

        /* ── pulse dots ── */
        @keyframes dot-pulse {
          0%, 80%, 100% { transform: scale(.6); opacity: .3; }
          40%            { transform: scale(1);   opacity: 1;  }
        }

        /* ── fade in whole screen ── */
        @keyframes fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── subtle float ── */
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }

        .loading-wrap {
          animation: fade-in .3s ease both;
        }

        .progress-bar {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 2.5px;
          background: linear-gradient(90deg, #0088C1, #78C2E1, #0088C1);
          background-size: 200% 100%;
          transform: scaleX(0);
          transform-origin: left;
          animation: progress 2.5s cubic-bezier(.4,0,.2,1) forwards;
          z-index: 9999;
        }

        .logo-wrap {
          animation: float 3s ease-in-out infinite;
          position: relative;
          overflow: hidden;
        }

        .scan-line {
          position: absolute;
          top: 0; bottom: 0;
          width: 50%;
          background: linear-gradient(90deg, transparent, rgba(120,194,225,.35), transparent);
          animation: scan 1.8s ease-in-out infinite;
          pointer-events: none;
        }

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #0088C1;
          animation: dot-pulse 1.4s ease-in-out infinite;
        }
        .dot:nth-child(2) { animation-delay: .2s; }
        .dot:nth-child(3) { animation-delay: .4s; }

        .dot-grid-bg {
          background-image: radial-gradient(circle, rgba(120,194,225,.12) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        @keyframes ring-spin {
          to { transform: rotate(360deg); }
        }
        .ring-1 { animation: ring-spin 12s linear infinite; }
        .ring-2 { animation: ring-spin 18s linear infinite reverse; }
      `}</style>

      {/* Progress bar */}
      <div className="progress-bar" />

      <div
        className="loading-wrap min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a1628 0%, #071020 100%)" }}
      >
        {/* Dot grid */}
        <div className="dot-grid-bg absolute inset-0 pointer-events-none" />

        {/* Decorative rings */}
        <div
          className="ring-1 absolute w-96 h-96 rounded-full pointer-events-none"
          style={{ border: "1px solid rgba(0,136,193,.1)" }}
        />
        <div
          className="ring-2 absolute w-64 h-64 rounded-full pointer-events-none"
          style={{ border: "1px solid rgba(120,194,225,.08)" }}
        />
        <div
          className="absolute w-32 h-32 rounded-full pointer-events-none"
          style={{ border: "1px solid rgba(0,136,193,.15)" }}
        />

        {/* Logo */}
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="logo-wrap rounded-xl p-6"
            style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)" }}
          >
            <div className="scan-line" />
            <Image
              src="/logo.png"
              alt="Bridge Technologies Solutions"
              width={160}
              height={52}
              className="object-contain brightness-0 invert opacity-90"
              priority
            />
          </div>

          {/* Dots */}
          <div className="flex items-center gap-2">
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
          </div>

          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "rgba(120,194,225,.5)", letterSpacing: ".18em" }}
          >
            Chargement
          </p>
        </div>
      </div>
    </>
  );
}
