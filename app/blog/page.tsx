/**
 * PAGE BLOG - Bridge Technologies Solutions
 *
 * TODO Stagiaire 2 :
 * - Récupérer les articles depuis Supabase (table: blog_posts, status='published')
 * - Grille d'articles avec image, titre, extrait, date, catégorie
 * - Filtrage par catégorie
 * - Pagination
 * - Lien vers page détail /blog/[slug]
 * - Design responsive
 *
 * Données Supabase :
 * - Table: blog_posts
 * - Champs: id, title, slug, excerpt, content, cover_image, category, tags, author_id, status, published_at, views_count
 *
 * Pages supplémentaires à créer :
 * - app/blog/[slug]/page.tsx (page détail d'un article)
 */

export default function BlogPage() {
  return (
    <main className="pt-20">
      <h1>Page Blog</h1>
      <p>À implémenter - Voir les TODO ci-dessus</p>
    </main>
  );
}
