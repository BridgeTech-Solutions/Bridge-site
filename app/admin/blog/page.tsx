/**
 * GESTION BLOG - Dashboard Admin
 *
 * TODO Stagiaire 3 :
 * - Tableau des articles de blog
 * - Colonnes : titre, catégorie, statut (brouillon/publié), date, vues
 * - Bouton "Nouvel article"
 * - Actions : modifier, publier/dépublier, supprimer
 * - Formulaire création/édition article (titre, contenu, image, catégorie, tags)
 *
 * Données Supabase :
 * - Table: blog_posts
 * - Champs: id, title, slug, excerpt, content, cover_image, category, tags, author_id, status, published_at, views_count
 *
 * Auth : requireAuth() obligatoire
 */

import { requireAuth } from "@/lib/auth/auth";

export default async function AdminBlogPage() {
  await requireAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Gestion Blog</h1>
      <p>À implémenter - Voir les TODO ci-dessus</p>
    </div>
  );
}
