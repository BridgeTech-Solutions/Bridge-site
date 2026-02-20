/**
 * PAGE ENTREPRISE (À PROPOS) - Bridge Technologies Solutions
 *
 * TODO Stagiaire 1 :
 * - Section hero avec titre "À propos de BTS"
 * - Section histoire/mission de l'entreprise
 * - Section valeurs (cards avec icônes)
 * - Section chiffres clés (statistiques animées)
 * - Section localisation (Bonamoussadi, Douala, Cameroun)
 *
 * Couleurs : primary=#0088C1, dark=#005A80
 * Police : Montserrat
 */
"use client";

import { VALUES, PARTNERS } from "@/lib/constants";
import Image from "next/image";
import { motion } from "framer-motion";

export default function EntreprisePage() {
  // Générer les logos partenaires avec mapping spécifique
  const partnerLogos = Object.entries(PARTNERS).flatMap(([category, names]) =>
    names.map((name) => {
      let fileName = "";
      switch (name) {
        case "gcp":
          fileName = "gcp.png";
          break;
        case "Azure":
          fileName = "azure.png";
          break;
        case "Palo_Alto":
          fileName = "Palo_Alto.png";
          break;
        case "Hyper-V":
          fileName = "mshyperv.png"; // image spécifique pour Hyper-V
          break;
        default:
          fileName = `${name.toLowerCase()}.png`;
      }
      return {
        category,
        name,
        image: `/images/partners/${fileName}`,
      };
    })
  );

  return (
    <main>
      {/* 1. Bannière avec logo agrandi */}
      <section className="relative h-72 md:h-[30rem] flex items-center justify-center bg-gray-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative w-72 h-72 md:w-96 md:h-96"
        >
          <Image
            src="/images/bt-title-entreprise.png"
            alt="Bridge Technologies Solutions"
            fill
            className="object-contain"
          />
        </motion.div>
      </section>

      {/* 2. Présentation */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6 text-[#0088C1]"
          >
            Qui nous sommes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-700 text-lg leading-relaxed"
          >
            Bridge Technologies Solutions est un fournisseur de solutions
            technologiques pour les entreprises. Nous vous accompagnons dans
            votre transformation digitale avec expertise et engagement.
          </motion.p>
        </div>
      </section>

      {/* 3. Nos valeurs avec effet hover */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#0088C1] mb-12">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((value, index) => (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center transform transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-gray-100"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="h-28 w-28 relative mb-6"
                >
                  <Image
                    src={value.image}
                    alt={value.title}
                    fill
                    className="object-contain"
                  />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-[#0088C1]">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Nos partenaires technologiques */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#0088C1]">
            Nos Partenaires Technologiques
          </h2>

          {Object.entries(PARTNERS).map(([category]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h3 className="text-xl font-semibold mb-6 text-center capitalize">
                {category}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-center">
                {partnerLogos
                  .filter((p) => p.category === category)
                  .map((partner) => (
                    <motion.div
                      key={partner.name}
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center justify-center bg-gray-50 rounded-lg shadow-sm p-4 hover:shadow-md transition"
                    >
                      <Image
                        src={partner.image}
                        alt={partner.name}
                        width={140}
                        height={70}
                        className="object-contain"
                      />
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
