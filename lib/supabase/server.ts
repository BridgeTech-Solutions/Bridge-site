import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Supabase Server Client - Configuration côté serveur
 *
 * Utilisé dans:
 * - Server Components
 * - Server Actions
 * - Route Handlers (API routes)
 * - Middleware
 *
 * Gère automatiquement les cookies pour l'authentification.
 *
 * @returns Instance Supabase pour le serveur avec gestion des cookies
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

/**
 * Supabase Admin Client - Client avec privilèges administrateur
 *
 * ⚠️ ATTENTION: Utilise la clé service_role qui contourne Row Level Security (RLS)
 *
 * À utiliser UNIQUEMENT dans:
 * - Server Actions sécurisées
 * - Route Handlers protégées
 * - Opérations administratives
 *
 * NE JAMAIS exposer cette clé côté client.
 *
 * @returns Instance Supabase avec privilèges admin
 */
export function createAdminClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {},
      },
    }
  );
}
