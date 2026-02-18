/**
 * PAGE D'ACCUEIL - Bridge Technologies Solutions
 *
 * TODO :
 * - Créer un Hero section avec gradient (couleur primaire #0088C1)
 * - Section "Solutions technologiques" avec texte + image
 * - Grille des 6 services (cards cliquables)
 * - Section statistiques (chiffres clés animés)
 * - Carrousel témoignages clients
 * - Section partenaires (logos)
 *
 * Composants à créer :
 * - components/layout/Header.tsx (navbar avec menu responsive)
 * - components/layout/Footer.tsx (newsletter, liens, contact)
 * - components/home/Hero.tsx
 * - components/home/ServicesGrid.tsx
 * - components/home/StatsSection.tsx
 *
 * Couleurs : primary=#0088C1, dark=#005A80
 * Police : Montserrat (Google Fonts)
 */
// page.tsx
export default function Home() {
  // Le Header et Footer sont geres automatiquement par PublicLayout (app/layout.tsx).
  // Ne pas ajouter pt-20 ici, PublicLayout le gere.
  return (
    <div>
  <div className="hero">
  <div className="hero-content">
    <h1>Bridge Technologies Solutions</h1>
    <p>We drive your digital transformation</p>
    <a href="/services">Découvrir nos services</a>
  </div>
</div>
    <div className="flex items-center justify-center min-h-[60vh] text-center px-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Bridge Technologies Solutions</h1>
          <p className="text-gray-500">Page d&apos;accueil à implémenter — Stagiaire 1</p>
        </div>
      </div>
    </div>
  );
}
