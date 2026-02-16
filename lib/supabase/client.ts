import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase Client - Configuration côté client
 *
 * Utilisé dans les composants Client Components ("use client")
 * pour les opérations d'authentification et les requêtes publiques.
 *
 * @returns Instance Supabase pour le navigateur
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
