/**
 * GESTION NEWSLETTER - Dashboard Admin
 *
 * TODO Stagiaire 3 :
 * - Tableau des abonnés newsletter
 * - Colonnes : email, statut (actif/désabonné), date inscription, source
 * - Stats (actifs, désabonnés, total)
 * - Export CSV
 * - Action supprimer
 *
 * Données Supabase :
 * - Table: newsletters
 * - Champs: id, email, status, source, locale, subscribed_at, email_count, open_count
 *
 * Auth : requireAuth() obligatoire
 */

import { requireAuth } from "@/lib/auth/auth";

export default async function AdminNewsletterPage() {
  await requireAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Gestion Newsletter</h1>
      <p>À implémenter - Voir les TODO ci-dessus</p>
    </div>
  );
}
