import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

/**
 * Authentication utilities for Server Components
 *
 * Fonctions serveur uniquement:
 * - getSession: Récupérer session courante
 * - getUser: Récupérer utilisateur courant
 * - isAdmin: Vérifier si utilisateur est admin
 * - requireAuth: Protéger une route (Server Component)
 * - isAuthenticated: Vérifier si authentifié
 */

/**
 * Récupérer la session courante (côté serveur)
 * @returns Session utilisateur ou null
 */
export async function getSession() {
  const supabase = await createClient();

  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    console.error("Erreur lors de la récupération de la session:", error);
    return null;
  }

  return session;
}

/**
 * Récupérer l'utilisateur courant (côté serveur)
 * @returns Utilisateur ou null
 */
export async function getUser() {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    return null;
  }

  return user;
}

/**
 * Vérifier si l'utilisateur est un admin
 * @param userId ID de l'utilisateur
 * @returns true si admin, false sinon
 */
export async function isAdmin(userId: string): Promise<boolean> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('admin_users')
    .select('id, role, is_active')
    .eq('id', userId)
    .eq('is_active', true)
    .single();

  if (error || !data) {
    return false;
  }

  return true;
}

/**
 * Protéger une route - Rediriger vers /login si non authentifié
 * À utiliser dans les Server Components
 *
 * @example
 * ```tsx
 * export default async function AdminPage() {
 *   await requireAuth();
 *   // ... rest of component
 * }
 * ```
 */
export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  // Vérifier si l'utilisateur est admin
  const userIsAdmin = await isAdmin(session.user.id);

  if (!userIsAdmin) {
    redirect("/login?error=unauthorized");
  }

  return session;
}

/**
 * Vérifier si l'utilisateur est authentifié (sans redirection)
 * @returns true si authentifié, false sinon
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}
