/**
 * PAGE CONNEXION ADMIN - Bridge Technologies Solutions
 *
 * TODO Stagiaire 3 :
 * - Formulaire de connexion (email + mot de passe)
 * - Logo de l'entreprise visible en haut (/logo.png)
 * - Utiliser signInWithEmail() de lib/auth/auth-client.ts
 * - Redirection vers /admin après connexion réussie
 * - Gestion des erreurs (identifiants incorrects)
 * - Design centré, professionnel
 *
 * IMPORTANT : Le logo de BTS doit être visible sur cette page !
 * Chemin du logo : /logo.png
 *
 * Auth : Supabase Auth (email/password)
 * Fonction : signInWithEmail(email, password) de lib/auth/auth-client.ts
 */

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1>Page Connexion</h1>
      <p>À implémenter - Voir les TODO ci-dessus</p>
    </main>
  );
}
