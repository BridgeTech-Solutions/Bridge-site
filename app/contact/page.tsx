"use client";

import { useState, useRef } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Linkedin,
  Facebook,
  ChevronRight,
} from "lucide-react";
import { COMPANY } from "@/lib/constants";

/* ─── Types ─────────────────────────────────────────────── */
interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

const SUBJECTS = [
  "Gestion de projets IT",
  "Infrastructure informatique",
  "Solutions cloud",
  "Protection & sécurité des données",
  "DSI externe",
  "Conseils & consultants",
  "Demande de devis",
  "Autre",
];

/* ─── Component ─────────────────────────────────────────── */
export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  /* Validation */
  function validate() {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Votre nom est requis.";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Adresse email invalide.";
    if (!form.message.trim()) e.message = "Veuillez écrire votre message.";
    return e;
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (serverError) setServerError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error ?? "Une erreur est survenue.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setServerError("Impossible d'envoyer le message. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        /* ── animations ─────────────────────────────── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideRight {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: .25; }
          50%       { opacity: .6; }
        }
        .anim-fade-up   { animation: fadeUp .65s cubic-bezier(.22,1,.36,1) both; }
        .anim-fade-in   { animation: fadeIn .5s ease both; }
        .delay-100 { animation-delay: .1s; }
        .delay-200 { animation-delay: .2s; }
        .delay-300 { animation-delay: .3s; }
        .delay-400 { animation-delay: .4s; }

        /* ── dot grid background ─────────────────────── */
        .dot-grid {
          background-image: radial-gradient(circle, rgba(120,194,225,.18) 1px, transparent 1px);
          background-size: 22px 22px;
        }

        /* ── diagonal stripe accent ──────────────────── */
        .stripe-accent {
          background-image: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 6px,
            rgba(255,255,255,.04) 6px,
            rgba(255,255,255,.04) 12px
          );
        }

        /* ── input base ──────────────────────────────── */
        .ct-input {
          width: 100%;
          padding: .625rem 1rem;
          border: 1.5px solid #e2e8f0;
          border-radius: .625rem;
          font-size: .875rem;
          color: #1a202c;
          background: #fff;
          transition: border-color .2s, box-shadow .2s;
          outline: none;
          font-family: inherit;
        }
        .ct-input::placeholder { color: #a0aec0; }
        .ct-input:focus {
          border-color: #0088C1;
          box-shadow: 0 0 0 3px rgba(0,136,193,.12);
        }
        .ct-input.error { border-color: #fc8181; }

        /* ── select arrow ─────────────────────────────── */
        .ct-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23a0aec0' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          padding-right: 2.5rem;
        }

        /* ── info card hover ──────────────────────────── */
        .info-item {
          display: flex;
          align-items: flex-start;
          gap: .875rem;
          padding: .875rem 1rem;
          border-radius: .625rem;
          transition: background .2s;
        }
        .info-item:hover { background: rgba(120,194,225,.08); }

        /* ── submit button ───────────────────────────── */
        .btn-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: .5rem;
          width: 100%;
          padding: .875rem 1.5rem;
          border-radius: .75rem;
          border: none;
          background: #0088C1;
          color: #fff;
          font-size: .9rem;
          font-weight: 700;
          cursor: pointer;
          transition: background .2s, transform .15s;
          font-family: inherit;
          letter-spacing: .02em;
        }
        .btn-submit:hover:not(:disabled) { background: #014B6A; transform: translateY(-1px); }
        .btn-submit:active:not(:disabled) { transform: translateY(0); }
        .btn-submit:disabled { opacity: .6; cursor: not-allowed; }

        /* ── social links ─────────────────────────────── */
        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.25rem;
          height: 2.25rem;
          border-radius: .5rem;
          background: rgba(120,194,225,.12);
          color: #78C2E1;
          transition: background .2s, color .2s;
        }
        .social-btn:hover { background: #0088C1; color: #fff; }

        /* ── label ───────────────────────────────────── */
        .ct-label {
          display: block;
          font-size: .78rem;
          font-weight: 700;
          color: #4a5568;
          margin-bottom: .35rem;
          letter-spacing: .04em;
          text-transform: uppercase;
        }

        /* ── decorative ring ────────────────────────── */
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        .spin-slow { animation: spin-slow 18s linear infinite; }
      `}</style>

      <main className="bg-gray-50 min-h-screen">

        {/* ══ HERO ════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0a1628 0%, #012a45 60%, #014B6A 100%)" }}
        >
          {/* Dot grid overlay */}
          <div className="absolute inset-0 dot-grid stripe-accent pointer-events-none" />

          {/* Decorative ring */}
          <div
            className="spin-slow absolute -right-24 -top-24 w-96 h-96 rounded-full pointer-events-none"
            style={{ border: "1.5px solid rgba(0,136,193,.18)" }}
          />
          <div
            className="absolute -right-12 -top-12 w-64 h-64 rounded-full pointer-events-none"
            style={{ border: "1px solid rgba(120,194,225,.12)" }}
          />

          <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-10">

            {/* Text */}
            <div className="flex-1 text-center md:text-left anim-fade-up">
              <h1
                className="text-4xl md:text-5xl font-black text-white leading-tight"
                style={{ letterSpacing: "-.02em" }}
              >
                Parlons de votre
                <br />
                <span style={{ color: "#0088C1" }}>projet</span>
              </h1>
              <p className="mt-4 text-base leading-relaxed" style={{ color: "#78C2E1", maxWidth: "420px" }}>
                Notre équipe est disponible pour répondre à vos questions
                et vous accompagner dans vos projets IT.
              </p>

              {/* Quick contact chips */}
              <div className="flex flex-wrap gap-3 mt-7 justify-center md:justify-start">
                <a
                  href={`tel:${COMPANY.phones[0].replace(/\s/g, "")}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all"
                  style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)" }}
                >
                  <Phone className="w-3.5 h-3.5" style={{ color: "#0088C1" }} />
                  {COMPANY.phones[0]}
                </a>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all"
                  style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)" }}
                >
                  <Mail className="w-3.5 h-3.5" style={{ color: "#0088C1" }} />
                  {COMPANY.email}
                </a>
              </div>
            </div>

          </div>

          {/* Wave divider */}
          <div className="relative h-10 -mb-1">
            <svg viewBox="0 0 1440 40" className="absolute bottom-0 w-full" preserveAspectRatio="none" fill="#f9fafb">
              <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" />
            </svg>
          </div>
        </section>

        {/* ══ MAIN CONTENT ════════════════════════════════ */}
        <section className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── LEFT: Contact Info Panel ─────────────────── */}
          <aside className="lg:col-span-2 anim-fade-up delay-100">
            <div
              className="rounded-2xl overflow-hidden h-full"
              style={{ background: "linear-gradient(160deg, #0a1628 0%, #012a45 100%)", border: "1px solid rgba(0,136,193,.2)" }}
            >
              {/* Header bar */}
              <div
                className="px-7 py-6 relative overflow-hidden"
                style={{ background: "rgba(0,136,193,.15)", borderBottom: "1px solid rgba(0,136,193,.2)" }}
              >
                <div className="dot-grid absolute inset-0 opacity-40 pointer-events-none" />
                <div className="relative z-10">
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#78C2E1" }}>
                    Nos coordonnées
                  </p>
                  <h2 className="text-xl font-black text-white">Bridge Technologies<br />Solutions</h2>
                </div>
              </div>

              {/* Info items */}
              <div className="px-5 py-6 space-y-1">
                <div className="info-item">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(0,136,193,.18)" }}
                  >
                    <MapPin className="w-4 h-4" style={{ color: "#0088C1" }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: "#78C2E1" }}>Adresse</p>
                    <p className="text-sm font-medium text-white">{COMPANY.address.street}, {COMPANY.address.city}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#78C2E1" }}>{COMPANY.address.country}</p>
                  </div>
                </div>

                <div className="info-item">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(0,136,193,.18)" }}
                  >
                    <Mail className="w-4 h-4" style={{ color: "#0088C1" }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: "#78C2E1" }}>Email</p>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-sm font-medium text-white transition-colors"
                      style={{ textDecoration: "none" }}
                    >
                      {COMPANY.email}
                    </a>
                  </div>
                </div>

                <div className="info-item">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(0,136,193,.18)" }}
                  >
                    <Phone className="w-4 h-4" style={{ color: "#0088C1" }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: "#78C2E1" }}>Téléphone</p>
                    {COMPANY.phones.map((phone, i) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className={`block text-sm font-medium text-white${i > 0 ? " mt-0.5" : ""}`}
                        style={{ textDecoration: "none" }}
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="mx-6" style={{ height: "1px", background: "rgba(120,194,225,.12)" }} />

              {/* Services links */}
              <div className="px-5 py-5">
                <p className="text-xs font-bold uppercase tracking-widest mb-3 px-2" style={{ color: "#78C2E1" }}>
                  Nos domaines
                </p>
                {[
                  "Gestion de projets IT",
                  "Infrastructure informatique",
                  "Solutions cloud",
                  "Sécurité des données",
                  "DSI externe",
                  "Conseils & consultants",
                ].map((s) => (
                  <div
                    key={s}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white transition-colors cursor-default"
                  >
                    <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#0088C1" }} />
                    {s}
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="px-7 pb-7 pt-2">
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#78C2E1" }}>
                  Réseaux sociaux
                </p>
                <div className="flex gap-2">
                  <a href={COMPANY.social.facebook} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href={COMPANY.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* ── RIGHT: Form ──────────────────────────────── */}
          <div className="lg:col-span-3 anim-fade-up delay-200">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

              {/* Form header */}
              <div className="px-8 pt-8 pb-6" style={{ borderBottom: "1px solid #f0f4f8" }}>
                <div className="h-1 w-10 rounded-full mb-4" style={{ background: "#0088C1" }} />
                <h2 className="text-2xl font-black text-gray-900" style={{ letterSpacing: "-.02em" }}>
                  Formulaire de contact
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Les champs marqués <span className="text-red-400 font-bold">*</span> sont obligatoires.
                </p>
              </div>

              {/* Success state */}
              {submitted ? (
                <div className="px-8 py-14 flex flex-col items-center text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                    style={{ background: "rgba(16,185,129,.1)" }}
                  >
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">Message envoyé !</h3>
                  <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
                    Merci pour votre message. Notre équipe vous répondra dans les meilleurs délais.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
                    }}
                    className="mt-7 text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
                    style={{ background: "#f0f9ff", color: "#0088C1", border: "1.5px solid #0088C1" }}
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} noValidate className="px-8 py-7 space-y-5">

                  {/* Row 1: Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="ct-label" htmlFor="name">
                        Nom complet <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Jean Dupont"
                        value={form.name}
                        onChange={handleChange}
                        disabled={loading}
                        className={`ct-input${errors.name ? " error" : ""}`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="ct-label" htmlFor="email">
                        Adresse email <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="jean@entreprise.com"
                        value={form.email}
                        onChange={handleChange}
                        disabled={loading}
                        className={`ct-input${errors.email ? " error" : ""}`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Phone + Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="ct-label" htmlFor="phone">Téléphone</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+237 6XX XXX XXX"
                        value={form.phone}
                        onChange={handleChange}
                        disabled={loading}
                        className="ct-input"
                      />
                    </div>

                    <div>
                      <label className="ct-label" htmlFor="company">Entreprise</label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        placeholder="Mon Entreprise"
                        value={form.company}
                        onChange={handleChange}
                        disabled={loading}
                        className="ct-input"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="ct-label" htmlFor="subject">Sujet de la demande</label>
                    <select
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      disabled={loading}
                      className="ct-input ct-select"
                    >
                      <option value="">— Sélectionnez un sujet —</option>
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="ct-label" htmlFor="message">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Décrivez votre projet ou votre demande…"
                      value={form.message}
                      onChange={handleChange}
                      disabled={loading}
                      className={`ct-input${errors.message ? " error" : ""}`}
                      style={{ resize: "vertical", minHeight: "120px" }}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Server error */}
                  {serverError && (
                    <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-100">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-red-600 leading-snug">{serverError}</p>
                    </div>
                  )}

                  {/* Submit */}
                  <button type="submit" disabled={loading} className="btn-submit">
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Envoi en cours…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ══ MAP / CTA STRIP ═════════════════════════════ */}
        <section
          className="relative overflow-hidden"
          style={{ background: "linear-gradient(90deg, #0a1628 0%, #012a45 100%)" }}
        >
          <div className="dot-grid absolute inset-0 opacity-30 pointer-events-none" />
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-black text-white mb-1">Vous préférez nous appeler ?</h3>
              <p className="text-sm" style={{ color: "#78C2E1" }}>
                Notre équipe est disponible du lundi au vendredi, de 8h à 18h (WAT).
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              {COMPANY.phones.map((phone, i) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-colors"
                  style={i === 0
                    ? { background: "#0088C1", color: "#fff" }
                    : { background: "rgba(255,255,255,.08)", color: "#fff", border: "1.5px solid rgba(255,255,255,.15)" }
                  }
                >
                  <Phone className="w-4 h-4" />
                  {phone}
                </a>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
