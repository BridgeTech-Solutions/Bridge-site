/**
 * PAGE SERVICES - Bridge Technologies Solutions
 *
 * TODO Stagiaire 2 :
 * - Récupérer les services depuis Supabase (table: services)
 * - Grille des 6 services avec icône, titre, description courte
 * - Chaque card cliquable vers la page détail du service
 * - Design avec hover effects
 * - Section CTA "Demander un devis"
 *
 * Les 6 services :
 * 1. Gestion de projets (gestion-projets)
 * 2. Infrastructure informatique (infrastructure)
 * 3. Cloud Computing (cloud)
 * 4. Protection des données (protection-donnees)
 * 5. DSI Externe (dsi-externe)
 * 6. Conseil & Consulting (conseil-consulting)
 *
 * Données Supabase :
 * - Table: services
 * - Champs: id, title, slug, short_description, full_description, icon, features, is_active
 */

export default function ServicesPage() {
  return (
    <main className="pt-20">
      <h1>Page Services</h1>
      <p>À implémenter - Voir les TODO ci-dessus</p>
    </main>
  );
}
