/**
 * DASHBOARD ADMIN - Bridge Technologies Solutions
 *
 * TODO Stagiaire 3 :
 * - Cards de statistiques (total contacts, abonnés newsletter, articles blog, projets)
 * - Récupérer les données depuis Supabase (count sur chaque table)
 * - Liste des contacts récents
 * - Actions rapides (liens vers les autres pages admin)
 * - Graphiques optionnels (chart.js ou recharts)
 *
 * Requêtes Supabase nécessaires :
 * - supabase.from('contacts').select('*', { count: 'exact', head: true })
 * - supabase.from('newsletters').select('*', { count: 'exact', head: true })
 * - supabase.from('blog_posts').select('*', { count: 'exact', head: true })
 * - supabase.from('projects').select('*', { count: 'exact', head: true })
 * - supabase.from('contacts').select('*').order('created_at', { ascending: false }).limit(5)
 *
 * Auth : Utiliser requireAuth() de lib/auth/auth.ts (Server Component)
 */

import { requireAuth } from "@/lib/auth/auth";

export default async function AdminDashboard() {
  await requireAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <p>À implémenter - Voir les TODO ci-dessus</p>
    </div>
  );
}
