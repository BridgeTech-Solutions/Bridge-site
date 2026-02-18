/**
 * PAGE HEADER / BANNIERE DE PAGE
 *
 * Composant reutilisable pour l'en-tete de chaque page (sauf homepage).
 * Affiche un titre et optionnellement une image de fond ou un sous-titre.
 *
 * TODO :
 * - Fond en gradient bleu ou image de fond
 * - Titre de la page centre
 * - Sous-titre optionnel
 * - Fil d'Ariane optionnel (Accueil > Page actuelle)
 *
 * Utilisation :
 * <PageHeader title="Nos Services" subtitle="Decouvrez ce que nous proposons" />
 * <PageHeader title="Contact" image="/images/bt-title-contact.png" />
 */

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  image?: string;
}

export function PageHeader({ title, subtitle, image }: PageHeaderProps) {
  return (
    <section className="pt-20 bg-gradient-to-r from-[#0088C1]/10 to-transparent py-16">
      {/* TODO : implementer le composant */}
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-lg text-gray-600 mt-4">{subtitle}</p>}
      </div>
    </section>
  );
}
