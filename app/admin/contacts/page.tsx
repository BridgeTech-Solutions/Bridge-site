/**
 * GESTION CONTACTS - Dashboard Admin
 *
 * TODO Stagiaire 3 :
 * - Tableau des messages de contact reçus
 * - Colonnes : nom, email, sujet, date, statut (lu/non lu)
 * - Filtrage par statut
 * - Actions : marquer comme lu, supprimer
 * - Stats en haut (total, non lus, aujourd'hui)
 *
 * Données Supabase :
 * - Table: contacts
 * - Champs: id, name, email, phone, subject, message, status, created_at
 *
 * Auth : requireAuth() obligatoire
 */

import { requireAuth } from "@/lib/auth/auth";

export default async function AdminContactsPage() {
  await requireAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Gestion Contacts</h1>
      <p>À implémenter - Voir les TODO ci-dessus</p>
    </div>
  );
}
