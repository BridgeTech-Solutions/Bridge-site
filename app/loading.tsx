/**
 * LOADING - Ecran de chargement global
 *
 * Ce fichier s'affiche automatiquement pendant le chargement de n'importe quelle page.
 * Next.js l'utilise automatiquement avec React Suspense.
 *
 * TODO :
 * - Remplacer le spinner basique par un design plus elabore
 * - Ajouter le logo BTS pendant le chargement (optionnel)
 * - Animer avec Framer Motion ou Tailwind animate-spin / animate-pulse
 */

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-gray-200 border-t-[#0088C1] rounded-full animate-spin" />
      <p className="mt-4 text-gray-500 text-sm">Chargement...</p>
    </div>
  );
}
