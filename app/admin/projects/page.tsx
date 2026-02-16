/**
 * GESTION PROJETS - Dashboard Admin
 *
 * TODO Stagiaire 3 :
 * - Tableau des projets du portfolio
 * - Colonnes : titre, client, catégorie, statut, date
 * - Bouton "Nouveau projet"
 * - Actions : modifier, supprimer
 * - Formulaire création/édition (titre, client, description, images, technologies)
 *
 * Données Supabase :
 * - Table: projects
 * - Champs: id, title, slug, client_name, description, short_description, cover_image, images, category, technologies, start_date, end_date, status, is_featured
 *
 * Auth : requireAuth() obligatoire
 */

import { requireAuth } from "@/lib/auth/auth";

export default async function AdminProjectsPage() {
  await requireAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Gestion Projets</h1>
      <p>À implémenter - Voir les TODO ci-dessus</p>
    </div>
  );
}
