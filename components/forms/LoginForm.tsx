/**
 * FORMULAIRE DE CONNEXION ADMIN
 *
 * TODO (Stagiaire 3) :
 * - Champs : email + mot de passe
 * - Bouton "Se connecter"
 * - Gerer les erreurs (identifiants incorrects)
 * - Rediriger vers /admin apres connexion reussie
 * - Afficher un spinner pendant la connexion
 *
 * IMPORTANT : Le logo BTS doit etre visible sur la page login
 * Ce composant est utilise dans app/login/page.tsx
 *
 * Logique de connexion :
 * import { signInWithEmail } from "@/lib/auth/auth-client";
 *
 * const { success, error } = await signInWithEmail(email, password);
 * if (success) {
 *   router.push("/admin");
 *   router.refresh();
 * }
 *
 * Utiliser : Input, Button, Label de components/ui/
 */

"use client";

export function LoginForm() {
  return (
    <form>
      {/* TODO : implementer le formulaire de connexion */}
    </form>
  );
}
