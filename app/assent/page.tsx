/**
 * PAGE ASSENT - Solution de conformite bancaire
 *
 * Cette page est DEJA IMPLEMENTEE (copiee du projet principal).
 * Elle presente le produit ASSENT de BTS pour le secteur bancaire.
 *
 * Sections :
 * 1. Gestion unifiee de la conformite bancaire
 * 2. Gestion complete du KYC (Know Your Customer)
 * 3. Deontologie et ethique professionnelle
 * 4. Exigences reglementaires
 * 5. Clients externes
 * 6. Reporting
 * 7. Call to Action (telechargement brochure + contact)
 *
 * Images utilisees : assent.jpg, bt-title-assent.png, kyc.jpg,
 *                    ethique.jpg, reglementaire.jpeg, cliext.png, reporting.png
 *
 * TODO Stagiaire :
 * - Integrer le Header et Footer quand ils seront crees
 * - Verifier que toutes les images s'affichent correctement
 * - Adapter le style si necessaire pour correspondre au reste du site
 */

import Image from "next/image";
import { Metadata } from "next";
import { Check, Download, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Assent - Gestion unifiee de la conformite bancaire | Bridge Technologies Solutions",
  description:
    "Bridge Technologies Solutions repond aux besoins des entreprises du secteur bancaire.",
};

export default function AssentPage() {
  return (
    <main className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-[#0088C1]/10 to-transparent py-16">
        <div className="container mx-auto text-center">
          <div className="relative w-full max-w-sm mx-auto h-24 mb-8">
            <Image
              src="/images/bt-title-assent.png"
              alt="Assent Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* 1. Gestion unifiee de la conformite bancaire */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Gestion unifiee de la conformite bancaire
            </h1>
            <div className="h-1.5 w-32 bg-gradient-to-r from-[#0088C1] to-[#78C2E1] rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Bridge Technologies Solutions (BTS) repond aux besoins des
                entreprises du secteur bancaire afin d&apos;ameliorer la satisfaction
                de leurs clients en toute conformite.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                En effet, une bonne gouvernance passe par le respect de la
                reglementation, des lois, des standards et des processus
                adequats : L&apos;application de ces normes est appelee conformite.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed font-medium text-[#0088C1]">
                Ainsi, fonctionner en se conformant permet a l&apos;entreprise
                d&apos;eviter les risques.
              </p>
            </div>
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/assent.jpg"
                alt="Conformite bancaire"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Gestion complete du KYC */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12 md:text-right flex flex-col items-end">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Gestion complete du KYC
            </h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-[#0088C1] to-[#78C2E1] rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl order-2 md:order-1">
              <Image
                src="/images/kyc.jpg"
                alt="KYC Management"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-8 order-1 md:order-2">
              <p className="text-lg text-gray-700 leading-relaxed">
                Une bonne connaissance de son client permet de mieux le
                satisfaire ; ceci necessite une collecte de ses informations sur
                la base des documents en vigueur.
                <br />
                <span className="text-[#0088C1] font-medium">
                  Ainsi, le module &quot;Know Your Customer&quot; vous permet entre autres :
                </span>
              </p>
              <ul className="space-y-4">
                {[
                  "La gestion centralisee et securisee des dossiers client",
                  "La gestion des alertes et notifications",
                  "La revue automatique des dossiers/documents des clients",
                  "La gestion illimitee de l'obsolescence des documents",
                  "L'archivage automatique des dossiers et documents",
                  "La securisation et anonymisation des documents",
                  "La prise en charge des clients externes",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 min-w-5 h-5 rounded-full bg-[#0088C1]/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#0088C1]" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Deontologie et ethique professionnelle */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Deontologie et ethique professionnelle
            </h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-[#0088C1] to-[#78C2E1] rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                Dans le but d&apos;eviter toute subjectivite d&apos;une part entre employes
                et d&apos;autre part entre clients et employes, il est necessaire de
                s&apos;assurer du respect des regles etablies au sein de
                l&apos;organisation.
                <br />
                <span className="text-[#0088C1] font-medium block mt-2">
                  En effet le module &quot;Ethique&quot; permet :
                </span>
              </p>
              <ul className="space-y-4">
                {[
                  "La gestion centralisee des conflits d'interets et des cadeaux",
                  "La gestion anonyme des alertes et declaration des soupcons",
                  "Le workflow de validation des declarations",
                  "La generation des rapports",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="min-w-5 h-5 rounded-full bg-[#0088C1]/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#0088C1]" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/ethique.jpg"
                alt="Ethique et Deontologie"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Exigences reglementaires */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12 md:text-right flex flex-col items-end">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Exigences reglementaires
            </h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-[#0088C1] to-[#78C2E1] rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl order-2 md:order-1">
              <Image
                src="/images/reglementaire.jpeg"
                alt="Reglementation"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <p className="text-lg text-gray-700 leading-relaxed">
                Il est important de connaitre les textes qui regissent votre
                secteur d&apos;activite afin d&apos;exercer en toute legalite.
              </p>
              <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
                <h3 className="font-bold text-xl mb-3 text-[#0088C1]">
                  Le module &quot;Reglements&quot;
                </h3>
                <p className="text-gray-600">
                  Il vous permet de recenser les textes elabores par differentes
                  instances (COBAC, BEAC, BCEAO,...) s&apos;appliquant a votre domaine
                  d&apos;activite, et sur la base desquels vous pourrez aisement
                  definir les plans d&apos;actions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Clients externes */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Clients externes
            </h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-[#0088C1] to-[#78C2E1] rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                Il existe des clients non bancarises mais qui interagissent avec
                la banque en souscrivant a des services qu&apos;offre cette derniere.
                <br />
                <span className="text-[#0088C1] font-medium block mt-2">
                  Pour une collaboration transparente, le module &quot;Clients Externes&quot; offre la possibilite de :
                </span>
              </p>
              <ul className="space-y-4">
                {[
                  "Gerer les clients sur la base des documents fournis",
                  "Garantir la gestion complete des produits des clients",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="min-w-5 h-5 rounded-full bg-[#0088C1]/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#0088C1]" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[300px] w-full flex justify-center items-center">
              <Image
                src="/images/cliext.png"
                alt="Clients externes"
                width={400}
                height={300}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Reporting */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12 md:text-right flex flex-col items-end">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Reporting
            </h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-[#0088C1] to-[#78C2E1] rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] w-full flex justify-center items-center order-2 md:order-1">
              <Image
                src="/images/reporting.png"
                alt="Reporting"
                width={400}
                height={400}
                className="object-contain"
              />
            </div>
            <div className="space-y-8 order-1 md:order-2">
              <p className="text-lg text-gray-700 leading-relaxed">
                Les rapports permettent de prendre des actions pour l&apos;avenir. Le
                but du Reporting est de communiquer efficacement les constats et
                conclusions sur la base des informations collectees.
                <br />
                <span className="text-[#0088C1] font-medium block mt-2">
                  Ainsi le module &quot;Reporting&quot; permet de :
                </span>
              </p>
              <ul className="space-y-4">
                {[
                  "Faire une revue de tous les documents enregistres dans l'application",
                  "Generer les rapports sous forme de tableaux de bord et graphes",
                  "Generer les rapports sous fichiers PDF, Word ou Excel",
                  "Gerer et suivre les Reportings reglementaires avec alertes et plans d'actions",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 min-w-5 h-5 rounded-full bg-[#0088C1]/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#0088C1]" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action & Download */}
      <section className="py-20 bg-[#0088C1] text-white">
        <div className="container mx-auto text-center space-y-8 px-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Interesse par la solution Assent ?
          </h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <a
              href="https://1drv.ms/b/s!AlrLPlKnjQe-h4hypB7lPHUkPvIxdw?e=0aOl2M"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#0088C1] px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              <Download className="w-5 h-5" />
              Telecharger la brochure
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Contactez-nous
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
