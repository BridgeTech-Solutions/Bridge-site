import { createClient } from "@/lib/supabase/client";

/**
 * Authentication utilities for Client Components
 *
 * Fonctions côté client uniquement
 * - signInWithEmail: Connexion
 * - signOut: Déconnexion
 */

/**
 * Connexion utilisateur (côté client)
 * @param email Email de l'utilisateur
 * @param password Mot de passe
 * @returns Success status et erreur éventuelle
 */
export async function signInWithEmail(email: string, password: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

/**
 * Envoyer un email de réinitialisation de mot de passe
 */
export async function resetPasswordForEmail(email: string) {
  const supabase = createClient();
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/confirm`,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Déconnexion utilisateur (côté client)
 */
export async function signOut() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
