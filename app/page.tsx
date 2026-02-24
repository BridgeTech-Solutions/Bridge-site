/**
 * PAGE D'ACCUEIL - Bridge Technologies Solutions
 *
 * TODO :
 * - Créer un Hero section avec gradient (couleur primaire #0088C1)
 * - Sectiexporton "Solutions technologiques" avec texte + image
 * - Grille des 6 services (cards cliquables)
 * - Section statistiques (chiffres clés animés)
 * - Carrousel témoignages clients
 * - Section partenaires (logos)
 *
 * Composants à créer :
 * - components/layout/Header.tsx (navbar avec menu responsive)
 * - components/layout/Footer.tsx (newsletter, liens, contact)
 * - components/home/Hero.tsx
 * - components/home/ServicesGrid.tsx
 * - components/home/StatsSection.tsx
 *
 * Couleurs : primary=#0088C1, dark=#005A80
 * Police : Montserrat (Google Fonts)
 */
//import { SERVICES } from "@/lib/constants";
"use client";

import { SERVICES, METRICS, VALUES, IMAGES ,PARTNERS } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Slider automatique toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
  };

  // Générer les logos partenaires
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
          fileName = "mshyperv.png";
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
      {/* Section HERO réduite */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {IMAGES.map((img) => (
            <div key={img.key} className="relative w-full h-[60vh] flex-shrink-0">
              <Image
                src={img.image}
                alt={img.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 text-center px-4 max-w-3xl">
                <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                  {img.title}
                </h1>
                <h5 className="text-sm md:text-lg text-gray-100 drop-shadow-md">
                  {img.description}
                </h5>
              </div>
            </div>
          ))}
        </div>

        {/* Flèches navigation */}
        <div className="absolute inset-0 flex items-center justify-between px-6 z-20">
          <button
            onClick={prevImage}
            className="bg-black/30 text-white p-2 rounded-full transition hover:bg-black/50"
          >
            ◀
          </button>
          <button
            onClick={nextImage}
            className="bg-black/30 text-white p-2 rounded-full transition hover:bg-black/50"
          >
            ▶
          </button>
        </div>
      </section>

      {/* Section SERVICES */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
              >
                <div className="h-48 w-full bg-gray-100 flex items-center justify-center relative">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-4 text-[#0088C1]">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section CHIFFRES CLÉS */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Chiffres Clés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {METRICS.map((metric, index) => (
              <div key={metric.key} className="flex flex-col items-center">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-bold text-[#0088C1]"
                >
                  {metric.value}
                </motion.span>
                <p className="mt-2 text-gray-600">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section VALEURS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {VALUES.map((value, index) => (
              <motion.div
                key={value.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center"
              >
                <div className="h-24 w-24 relative mb-6">
                  <Image
                    src={value.image}
                    alt={value.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section PARTENAIRES */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Partenaires</h2>
          <div className="overflow-hidden relative">
            <motion.div
              className="flex gap-12"
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 8,
                ease: "linear",
              }}
            >
              {[...partnerLogos, ...partnerLogos].map((partner) => (
                <div key={partner.name} className="flex-shrink-0 w-28 h-16 relative">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

           {/* Section CALL TO ACTION */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Besoin d&apos;un accompagnement ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 mb-8"
          >
            Notre équipe est prête à vous aider à réussir vos projets digitaux.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              href="/contact"
              className="inline-block bg-[#0088C1] hover:bg-[#006F9E] text-white font-semibold py-3 px-8 rounded-lg transition"
            >
              Contactez-nous
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}



















