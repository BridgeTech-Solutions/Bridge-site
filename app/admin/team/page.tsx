/**
 * GESTION ÉQUIPE - Dashboard Admin
 *
 * TODO Stagiaire 3 :
 * - Tableau des membres de l'équipe
 * - Colonnes : photo, nom, poste, email, statut (actif/inactif)
 * - Bouton "Nouveau membre"
 * - Actions : modifier, activer/désactiver, supprimer
 * - Formulaire création/édition (nom, poste, bio, photo, LinkedIn)
 * - Drag & drop pour réordonner (optionnel)
 *
 * Données Supabase :
 * - Table: team_members
 * - Champs: id, full_name, role, bio, photo_url, linkedin_url, email, display_order, is_active
 *
 * Auth : requireAuth() obligatoire
 */

import { requireAuth } from "@/lib/auth/auth";

export default async function AdminTeamPage() {
  await requireAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Gestion Équipe</h1>
      <p>À implémenter - Voir les TODO ci-dessus</p>
    </div>
  );
}
