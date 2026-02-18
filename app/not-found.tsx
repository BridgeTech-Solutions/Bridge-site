/**
 * PAGE 404 - Page non trouvee
 *
 * Ce fichier s'affiche automatiquement quand une URL n'existe pas.
 * Next.js l'utilise automatiquement pour toutes les routes inconnues.
 *
 * TODO :
 * - Ameliorer le design (illustration, animation)
 * - Ajouter des suggestions de pages (Accueil, Services, Contact)
 * - Garder le Header et Footer si possible
 */

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      {/* Code erreur */}
      <h1 className="text-9xl font-bold text-[#0088C1] opacity-20 select-none">
        404
      </h1>

      {/* Message */}
      <h2 className="text-3xl font-bold text-gray-900 mt-4">
        Page introuvable
      </h2>
      <p className="text-gray-500 mt-3 max-w-md">
        La page que vous recherchez n&apos;existe pas ou a ete deplacee.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Link
          href="/"
          className="px-6 py-3 bg-[#0088C1] text-white rounded-lg font-medium hover:bg-[#014B6A] transition-colors"
        >
          Retour a l&apos;accueil
        </Link>
        <Link
          href="/contact"
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Nous contacter
        </Link>
      </div>
    </main>
  );
}
