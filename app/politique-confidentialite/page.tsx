import { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/lib/constants";
import { ResetCookiesButton } from "@/components/analytics/ResetCookiesButton";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et gestion des cookies de Bridge Technologies Solutions.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a1628 0%, #012a45 60%, #014B6A 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(120,194,225,.15) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#78C2E1" }}>
            Informations légales
          </p>
          <h1 className="text-3xl md:text-4xl font-black text-white" style={{ letterSpacing: "-.02em" }}>
            Politique de confidentialité
          </h1>
          <p className="mt-3 text-sm" style={{ color: "#78C2E1" }}>
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <div className="relative h-8 -mb-1">
          <svg viewBox="0 0 1440 32" className="absolute bottom-0 w-full" preserveAspectRatio="none" fill="#f9fafb">
            <path d="M0,16 C360,32 1080,0 1440,16 L1440,32 L0,32 Z" />
          </svg>
        </div>
      </section>

      {/* Contenu */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-8 md:px-12 py-10 space-y-10 text-gray-700 text-sm leading-relaxed">

            {/* 1. Responsable */}
            <article>
              <h2 className="text-lg font-black text-gray-900 mb-4" style={{ letterSpacing: "-.01em" }}>
                1. Responsable du traitement
              </h2>
              <p>
                Le responsable du traitement des données collectées sur ce site est :
              </p>
              <div className="mt-3 p-4 rounded-xl bg-gray-50 border border-gray-100 text-sm">
                <p className="font-bold text-gray-900">{COMPANY.name}</p>
                <p className="mt-1">{COMPANY.address.full}</p>
                <p>Email : <a href={`mailto:${COMPANY.email}`} className="text-[#0088C1] hover:underline">{COMPANY.email}</a></p>
                <p>Téléphone : {COMPANY.phones[0]}</p>
              </div>
            </article>

            <hr className="border-gray-100" />

            {/* 2. Données collectées */}
            <article>
              <h2 className="text-lg font-black text-gray-900 mb-4" style={{ letterSpacing: "-.01em" }}>
                2. Données collectées
              </h2>
              <p>Nous collectons les données suivantes selon vos interactions avec le site :</p>
              <ul className="mt-3 space-y-2">
                {[
                  { label: "Formulaire de contact", detail: "Nom, email, téléphone, entreprise, sujet, message" },
                  { label: "Newsletter", detail: "Adresse email uniquement" },
                  { label: "Google Analytics (si consentement)", detail: "Pages visitées, durée de visite, type d'appareil, pays — données anonymisées" },
                ].map(({ label, detail }) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#0088C1] flex-shrink-0" />
                    <span><span className="font-semibold text-gray-900">{label} :</span> {detail}</span>
                  </li>
                ))}
              </ul>
            </article>

            <hr className="border-gray-100" />

            {/* 3. Cookies */}
            <article>
              <h2 className="text-lg font-black text-gray-900 mb-4" style={{ letterSpacing: "-.01em" }}>
                3. Cookies
              </h2>
              <p className="mb-4">
                Un cookie est un petit fichier texte déposé sur votre navigateur lors de la visite d&apos;un site web.
              </p>

              <div className="space-y-4">
                {/* Essentiels */}
                <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">Essentiels</span>
                    <span className="text-xs text-gray-500">Toujours actifs — aucun consentement requis</span>
                  </div>
                  <p>
                    <span className="font-semibold text-gray-900">Session administrateur (Supabase Auth) </span>
                    — utilisé exclusivement pour l&apos;authentification de l&apos;espace administrateur. Les visiteurs du site public ne reçoivent aucun cookie de session.
                  </p>
                </div>

                {/* Analytics */}
                <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">Analytiques</span>
                    <span className="text-xs text-gray-500">Requièrent votre consentement</span>
                  </div>
                  <p>
                    <span className="font-semibold text-gray-900">Google Analytics </span>
                    — nous utilisons Google Analytics pour mesurer l&apos;audience de notre site (pages visitées, durée de visite, type d&apos;appareil). Ces données sont collectées de manière anonymisée et ne permettent pas de vous identifier personnellement.
                  </p>
                  <p className="mt-2">
                    Cookies déposés : <code className="bg-white border border-gray-200 px-1.5 py-0.5 rounded text-xs">_ga</code>,{" "}
                    <code className="bg-white border border-gray-200 px-1.5 py-0.5 rounded text-xs">_ga_*</code> — durée : 2 ans.
                  </p>
                </div>
              </div>

              <p className="mt-4">
                Vous pouvez modifier votre choix à tout moment en{" "}
                <ResetCookiesButton />.
              </p>
            </article>

            <hr className="border-gray-100" />

            {/* 4. Finalités */}
            <article>
              <h2 className="text-lg font-black text-gray-900 mb-4" style={{ letterSpacing: "-.01em" }}>
                4. Finalités et base légale
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left py-2.5 px-3 text-xs font-bold text-gray-600 uppercase tracking-wide border border-gray-100">Finalité</th>
                      <th className="text-left py-2.5 px-3 text-xs font-bold text-gray-600 uppercase tracking-wide border border-gray-100">Base légale</th>
                      <th className="text-left py-2.5 px-3 text-xs font-bold text-gray-600 uppercase tracking-wide border border-gray-100">Durée</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Répondre à vos demandes de contact", "Intérêt légitime", "3 ans"],
                      ["Envoi de la newsletter", "Consentement", "Jusqu'à désinscription"],
                      ["Mesure d'audience (Google Analytics)", "Consentement", "2 ans"],
                    ].map(([fin, base, duree]) => (
                      <tr key={fin} className="border-b border-gray-50 hover:bg-gray-50/50">
                        <td className="py-2.5 px-3 border border-gray-100">{fin}</td>
                        <td className="py-2.5 px-3 border border-gray-100">{base}</td>
                        <td className="py-2.5 px-3 border border-gray-100">{duree}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <hr className="border-gray-100" />

            {/* 5. Vos droits */}
            <article>
              <h2 className="text-lg font-black text-gray-900 mb-4" style={{ letterSpacing: "-.01em" }}>
                5. Vos droits
              </h2>
              <p>Conformément à la réglementation applicable, vous disposez des droits suivants :</p>
              <ul className="mt-3 space-y-1.5">
                {[
                  "Droit d'accès à vos données personnelles",
                  "Droit de rectification des données inexactes",
                  "Droit à l'effacement (droit à l'oubli)",
                  "Droit d'opposition au traitement",
                  "Droit à la portabilité de vos données",
                  "Droit de retirer votre consentement à tout moment",
                ].map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#0088C1] flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                Pour exercer ces droits, contactez-nous à :{" "}
                <a href={`mailto:${COMPANY.email}`} className="text-[#0088C1] hover:underline font-medium">
                  {COMPANY.email}
                </a>
              </p>
            </article>

            <hr className="border-gray-100" />

            {/* 6. Contact */}
            <article>
              <h2 className="text-lg font-black text-gray-900 mb-4" style={{ letterSpacing: "-.01em" }}>
                6. Contact et réclamations
              </h2>
              <p>
                Pour toute question relative à cette politique ou à la gestion de vos données personnelles,
                vous pouvez nous contacter à l&apos;adresse{" "}
                <a href={`mailto:${COMPANY.email}`} className="text-[#0088C1] hover:underline font-medium">
                  {COMPANY.email}
                </a>{" "}
                ou par téléphone au <span className="font-medium">{COMPANY.phones[0]}</span>.
              </p>
            </article>

          </div>
        </div>

        {/* Retour */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#0088C1] transition-colors"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </section>

    </main>
  );
}
