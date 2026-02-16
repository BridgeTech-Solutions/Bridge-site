/**
 * PARAMÈTRES DU SITE - Dashboard Admin
 *
 * TODO Stagiaire 3 :
 * - Formulaire pour modifier les paramètres du site
 * - Nom du site, description, email de contact, téléphones
 * - Liens réseaux sociaux (Facebook, LinkedIn)
 * - Logo et favicon
 * - Couleurs du thème
 * - Sauvegarder dans Supabase (table: site_settings)
 *
 * Données Supabase :
 * - Table: site_settings
 * - Champs: id, key, value, type, description
 *
 * Auth : requireAuth() obligatoire (super_admin uniquement)
 */

import { requireAuth } from "@/lib/auth/auth";

export default async function AdminSettingsPage() {
  await requireAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Paramètres</h1>
      <p>À implémenter - Voir les TODO ci-dessus</p>
    </div>
  );
}
