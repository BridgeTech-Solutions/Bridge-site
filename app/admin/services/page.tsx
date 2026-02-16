/**
 * GESTION SERVICES - Dashboard Admin
 *
 * TODO Stagiaire 3 :
 * - Tableau des services
 * - Colonnes : titre, slug, statut (actif/inactif)
 * - Actions : modifier, activer/désactiver
 * - Formulaire édition (titre, description courte, description complète, icône, fonctionnalités)
 *
 * Données Supabase :
 * - Table: services
 * - Champs: id, title, slug, short_description, full_description, icon, features, is_active, display_order
 *
 * Auth : requireAuth() obligatoire
 */

import { requireAuth } from "@/lib/auth/auth";

export default async function AdminServicesPage() {
  await requireAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Gestion Services</h1>
      <p>À implémenter - Voir les TODO ci-dessus</p>
    </div>
  );
}
