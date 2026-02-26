import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import {
  FolderKanban, Server, Cloud, ShieldCheck, Users, Lightbulb,
  ArrowRight, Award, Briefcase, Globe, TrendingUp, CheckCircle2, ChevronDown, Phone,
} from "lucide-react";
import {
  SERVICES as CONST_SERVICES,
  METRICS,
  PARTNERS,
  SERVICE_IMAGES,
  COMPANY,
} from "@/lib/constants";

/* ─── Maps statiques ─── */
const ICON_MAP: Record<string, React.ElementType> = {
  FolderKanban, Server, Cloud, ShieldCheck, Users, Lightbulb,
};

const FALLBACK_SERVICES = CONST_SERVICES.map((s, i) => ({
  id:                String(i + 1),
  slug:              s.slug,
  title:             s.title,
  short_description: s.shortDesc,
  icon:              s.icon,
}));

const STATS = METRICS.map((m) => ({
  value: m.value,
  label: m.label,
  icon:  { Award, Briefcase, TrendingUp, Globe }[m.icon] ?? Award,
}));

/* ─── Page ─── */

export default async function Home() {
  const supabase = await createClient();
  const { data: services } = await supabase
    .from("services")
    .select("id, slug, title, short_description, icon")
    .eq("status", "published")
    .order("order_position");

  const displayServices = services && services.length > 0 ? services : FALLBACK_SERVICES;

  return (
    <>
      {/* ── CSS animations ── */}
      <style>{`
        /* ── Carousel hero ── */
        @keyframes slide-show-first {
          0%,28%   { opacity:1; }
          33%,100% { opacity:0; }
        }
        @keyframes slide-show {
          0%,1%    { opacity:0; }
          6%,28%   { opacity:1; }
          33%,100% { opacity:0; }
        }
        .hero-slide   { position:absolute; inset:0; }
        .hero-slide-1 { animation: slide-show-first 18s ease-in-out infinite 0s;  z-index:1; }
        .hero-slide-2 { animation: slide-show       18s ease-in-out infinite 6s;  z-index:1; }
        .hero-slide-3 { animation: slide-show       18s ease-in-out infinite 12s; z-index:1; }

        /* ── Hero content ── */
        @keyframes fade-up {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .hero-1 { animation:fade-up .7s ease-out .1s  both; }
        .hero-2 { animation:fade-up .7s ease-out .25s both; }
        .hero-3 { animation:fade-up .7s ease-out .4s  both; }
        .hero-4 { animation:fade-up .7s ease-out .55s both; }

        /* ── Shimmer titre ── */
        @keyframes shimmer-text {
          0%   { background-position:0%   center; }
          100% { background-position:200% center; }
        }
        .shimmer {
          background: linear-gradient(90deg,#fff 0%,#78C2E1 35%,#fff 55%,#78C2E1 100%);
          background-size:200% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation:shimmer-text 4s linear infinite;
        }

        /* ── Service cards ── */
        .svc-card { transition:box-shadow .3s, transform .3s, border-color .3s; }
        .svc-card:hover { box-shadow:0 20px 48px rgba(0,136,193,.12); transform:translateY(-3px); border-color:rgba(0,136,193,.25) !important; }
        .svc-card:hover .svc-title { color:#0088C1; }
        .svc-icon { transition:transform .3s ease,background .3s,color .3s; }
        .svc-card:hover .svc-icon { transform:scale(1.12) rotate(-6deg); background:#0088C1 !important; color:#fff !important; }
        .svc-arrow { opacity:0; transform:translateX(-6px); transition:opacity .25s,transform .25s; }
        .svc-card:hover .svc-arrow { opacity:1; transform:translateX(0); }

        /* ── Partner marquee ── */
        @keyframes scroll-left  { from{transform:translateX(0)}    to{transform:translateX(-50%)} }
        @keyframes scroll-right { from{transform:translateX(-50%)} to{transform:translateX(0)}    }
        .marquee-left  { animation:scroll-left  35s linear infinite; display:flex; width:max-content; }
        .marquee-right { animation:scroll-right 28s linear infinite; display:flex; width:max-content; }
        .marquee-left:hover, .marquee-right:hover { animation-play-state:paused; }
        .partner-logo { filter:grayscale(100%) opacity(.55); transition:filter .35s; }
        .partner-item:hover .partner-logo { filter:grayscale(0%) opacity(1); }
        .partner-item { transition:box-shadow .25s,border-color .25s; }
        .partner-item:hover { border-color:rgba(0,136,193,.35) !important; box-shadow:0 6px 20px rgba(0,136,193,.12); }
      `}</style>

      {/* ══════════════════════════════════════
          HERO — Carousel CSS automatique
      ══════════════════════════════════════ */}
      <section
        className="relative flex items-center overflow-hidden"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        {/* Slides de fond */}
        <div className="absolute inset-0">
          {/* Slide 1 */}
          <div className="hero-slide hero-slide-1">
            <Image
              src="/images/security.jpeg"
              alt="Sécurité des données"
              fill className="object-cover" priority
            />
          </div>
          {/* Slide 2 */}
          <div className="hero-slide hero-slide-2">
            <Image
              src="/images/iminfinf2.png"
              alt="Infrastructure informatique"
              fill className="object-cover"
            />
          </div>
          {/* Slide 3 */}
          <div className="hero-slide hero-slide-3">
            <Image
              src="/images/btshomeimage.jpg"
              alt="Bridge Technologies Solutions"
              fill className="object-cover"
            />
          </div>

          {/* Overlay dégradé sombre */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(to right, rgba(7,16,32,0.92) 0%, rgba(7,16,32,0.75) 55%, rgba(7,16,32,0.45) 100%)",
            }}
          />
          {/* Accent ligne bas */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1 z-20"
            style={{ background: "linear-gradient(to right,#0088C1,#78C2E1,#014B6A)" }}
          />
        </div>

        {/* Contenu */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            {/* Titre */}
            <h1
              className="hero-2 font-black leading-[1.06] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.5rem,5.5vw,4.2rem)" }}
            >
              <span className="text-white block mb-1">We drive your</span>
              <span className="shimmer block">digital transformation</span>
            </h1>

            {/* Sous-titre */}
            <p
              className="hero-3 text-gray-300 leading-relaxed mb-10 max-w-xl"
              style={{ fontSize: "clamp(.95rem,1.6vw,1.15rem)" }}
            >
              Spécialiste en infrastructure, cloud et sécurité des données. Nous accompagnons
              les entreprises de toutes tailles vers l&apos;excellence technologique.
            </p>

            {/* CTAs */}
            <div className="hero-4 flex flex-wrap gap-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-bold text-white bg-[#0088C1] hover:bg-[#014B6A] transition-colors"
                style={{ boxShadow: "0 8px 28px rgba(0,136,193,.4)" }}
              >
                Découvrir nos services
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-bold text-white border border-white/25 hover:bg-white/8 hover:border-white/45 transition-colors"
              >
                Nous contacter
                <Phone className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-white/40">
          <span className="text-[10px] font-semibold tracking-[.2em] uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS
      ══════════════════════════════════════ */}
      <section className="bg-[#071020] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} className="group flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl mb-4 bg-[#0088C1]/12 text-[#0088C1] group-hover:bg-[#0088C1] group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-4xl font-black text-white mb-1.5">{value}</span>
                <span className="text-sm text-gray-500 font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SOLUTIONS TECHNOLOGIQUES
      ══════════════════════════════════════ */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Texte */}
            <div>
              <div className="flex items-center gap-2 text-[#0088C1] text-xs font-bold uppercase tracking-[.18em] mb-5">
                <span className="w-8 h-px bg-[#0088C1]" />
                Notre approche
              </div>
              <h2
                className="font-black text-gray-900 leading-tight mb-6"
                style={{ fontSize: "clamp(1.9rem,3.2vw,2.8rem)" }}
              >
                Solutions technologiques{" "}
                <span className="text-[#0088C1]">sur mesure</span>
              </h2>
              <div className="w-14 h-1.5 rounded-full mb-8"
                style={{ background: "linear-gradient(to right,#0088C1,#78C2E1)" }} />
              <p className="text-gray-600 leading-relaxed mb-5 text-[1.04rem]">
                Choisir des solutions technologiques véritablement adaptées est indispensable
                pour toute entreprise souhaitant assurer son bon fonctionnement et optimiser
                son niveau de compétitivité.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8 text-[1.04rem]">
                En choisissant BTS, vous privilégiez une approche globale pour une sérénité
                maximale. Nos experts vous conseillent et vous accompagnent, de la compréhension
                de votre besoin au déploiement de vos outils.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  "Audit et conseil personnalisé",
                  "Déploiement et intégration",
                  "Maintenance et support continu",
                  "Formation de vos équipes",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full shrink-0 bg-[#0088C1]/10">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0088C1]" />
                    </div>
                    <span className="text-gray-700 font-medium text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/entreprise"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0088C1] hover:text-[#014B6A] transition-colors"
              >
                En savoir plus sur BTS
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Image schéma */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-50 border border-gray-100">
                <Image
                  src="/images/scheme1.png"
                  alt="Schéma de solutions BTS"
                  width={620}
                  height={460}
                  className="w-full h-auto object-contain"
                />
              </div>
              {/* Badge déco */}
              <div
                className="absolute -bottom-5 -left-5 w-28 h-28 rounded-2xl flex flex-col items-center justify-center -rotate-6 select-none bg-[#0088C1]"
                style={{ boxShadow: "0 16px 40px rgba(0,136,193,.4)" }}
              >
                <span className="text-3xl font-black text-white leading-none">10+</span>
                <span className="text-[10px] text-white/80 font-semibold text-center mt-1 leading-tight">
                  ans<br />d&apos;expertise
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          NOS SERVICES
      ══════════════════════════════════════ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Titre */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 text-[#0088C1] text-xs font-bold uppercase tracking-[.18em] mb-5">
              <span className="w-8 h-px bg-[#0088C1]" />
              Ce que nous faisons
              <span className="w-8 h-px bg-[#0088C1]" />
            </div>
            <h2
              className="font-black text-gray-900 mb-4"
              style={{ fontSize: "clamp(1.9rem,3.2vw,2.8rem)" }}
            >
              Nos services
            </h2>
            <div className="w-14 h-1.5 rounded-full mx-auto mb-5"
              style={{ background: "linear-gradient(to right,#0088C1,#78C2E1)" }} />
            <p className="text-gray-500 max-w-xl mx-auto">
              Des solutions complètes pour accompagner votre transformation numérique.
            </p>
          </div>

          {/* Grille */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayServices.map((service) => {
              const Icon = ICON_MAP[service.icon] ?? Lightbulb;
              const img  = SERVICE_IMAGES[service.slug];
              return (
                <Link
                  key={service.id ?? service.slug}
                  href={`/services/${service.slug}`}
                  className="svc-card group bg-white rounded-2xl flex flex-col border border-slate-100 overflow-hidden"
                >
                  {/* Thumbnail image */}
                  {img && (
                    <div className="relative h-40 shrink-0 overflow-hidden bg-slate-100">
                      <Image
                        src={img}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Overlay léger */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                  )}

                  {/* Contenu */}
                  <div className="p-7 flex flex-col flex-1">
                    <div
                      className="svc-icon w-12 h-12 rounded-xl flex items-center justify-center mb-4 shrink-0 bg-[#0088C1]/10 text-[#0088C1]"
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="svc-title font-bold text-gray-900 mb-2.5 text-sm leading-snug transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed flex-1 line-clamp-3">
                      {service.short_description ?? "Découvrez nos solutions adaptées à vos besoins."}
                    </p>
                    <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-[#0088C1]">
                      <span className="svc-arrow inline-flex items-center gap-1">
                        En savoir plus <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold border-2 border-[#0088C1] text-[#0088C1] hover:bg-[#0088C1] hover:text-white transition-colors duration-200"
            >
              Voir tous nos services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PARTENAIRES — marquee deux rangées
      ══════════════════════════════════════ */}
      <section className="py-20 bg-white overflow-hidden">
        {/* Titre */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <div className="flex items-center justify-center gap-3 text-[#0088C1] text-xs font-bold uppercase tracking-[.18em] mb-5">
            <span className="w-8 h-px bg-[#0088C1]" />
            Nos partenaires technologiques
            <span className="w-8 h-px bg-[#0088C1]" />
          </div>
          <h2
            className="font-black text-gray-900 mb-4"
            style={{ fontSize: "clamp(1.7rem,2.8vw,2.4rem)" }}
          >
            Des solutions sur mesure
          </h2>
          <div className="w-14 h-1.5 rounded-full mx-auto"
            style={{ background: "linear-gradient(to right,#0088C1,#78C2E1)" }} />
          <p className="text-gray-500 mt-4 text-sm max-w-lg mx-auto">
            Nous travaillons avec les leaders mondiaux de la technologie pour vous offrir
            les meilleures solutions.
          </p>
        </div>

        {/* Rangée 1 — scroll vers la gauche */}
        <div className="relative mb-4">
          {/* Masques de fondu gauche/droite */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right,#fff,transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left,#fff,transparent)" }} />

          <div className="marquee-left">
            {[...PARTNERS, ...PARTNERS].map(({ name, logo }, idx) => (
              <div
                key={`r1-${name}-${idx}`}
                className="partner-item flex-shrink-0 mx-3 flex items-center justify-center bg-white border border-slate-200 rounded-2xl px-7 py-5"
                style={{ width: 160 }}
                title={name}
              >
                <div className="relative w-full" style={{ height: 44 }}>
                  <Image
                    src={logo}
                    alt={name}
                    fill
                    className="partner-logo object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rangée 2 — scroll vers la droite (sens inverse) */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right,#fff,transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left,#fff,transparent)" }} />

          <div className="marquee-right">
            {/* On inverse l'ordre pour varier */}
            {[...PARTNERS.slice().reverse(), ...PARTNERS.slice().reverse()].map(({ name, logo }, idx) => (
              <div
                key={`r2-${name}-${idx}`}
                className="partner-item flex-shrink-0 mx-3 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-2xl px-7 py-5"
                style={{ width: 160 }}
                title={name}
              >
                <div className="relative w-full" style={{ height: 44 }}>
                  <Image
                    src={logo}
                    alt={name}
                    fill
                    className="partner-logo object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden bg-[#0088C1]">
        {/* Grille déco */}
        <div className="absolute inset-0 opacity-[.07]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.3) 1px,transparent 1px)",
            backgroundSize: "44px 44px",
          }} />
        <div className="absolute -top-1/3 -right-1/4 w-[38rem] h-[38rem] rounded-full opacity-[.13]"
          style={{ background: "radial-gradient(circle,#fff 0%,transparent 65%)" }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="font-black text-white leading-tight mb-5"
            style={{ fontSize: "clamp(1.9rem,3.8vw,2.9rem)" }}
          >
            Prêt à transformer votre infrastructure ?
          </h2>
          <p className="text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto text-[1.05rem]">
            Contactez nos experts pour un audit gratuit de votre système informatique
            et découvrez les solutions adaptées à votre entreprise.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold bg-white text-[#0088C1] hover:bg-blue-50 transition-colors shadow-lg"
            >
              Demander un audit gratuit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+237679289166"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white border-2 border-white/60 hover:bg-white/10 transition-colors"
            >
              <Phone className="w-4 h-4" />
              +237 679 289 166
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
