import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

/**
 * Next.js Middleware
 * Gère l'authentification et la protection des routes admin avec Supabase Auth
 */

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Routes protégées - Admin uniquement
  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminApiRoute = pathname.startsWith("/api/admin");

  // Vérifier l'authentification pour les routes admin
  if (isAdminRoute || isAdminApiRoute) {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    // Créer client Supabase pour middleware
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // Vérifier la session
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    // Si pas de session, rediriger vers login
    if (error || !session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Vérifier si l'utilisateur est admin
    const { data: adminUser, error: adminError } = await supabase
      .from("admin_users")
      .select("id, role, is_active")
      .eq("id", session.user.id)
      .eq("is_active", true)
      .single();

    // Si pas admin, rediriger vers login avec message
    if (adminError || !adminUser) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("error", "unauthorized");
      return NextResponse.redirect(loginUrl);
    }

    return response;
  }

  // Ajouter des headers de sécurité à toutes les réponses
  const response = NextResponse.next();

  // Content Security Policy
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co;"
  );

  // Autres headers de sécurité
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  return response;
}

// Configurer les routes où le middleware s'applique
export const config = {
  matcher: [
    /*
     * Matcher pour toutes les routes sauf:
     * - api (hors /api/admin)
     * - _next/static (fichiers statiques)
     * - _next/image (optimisation d'images)
     * - favicon.ico
     * - fichiers publics (images, fonts, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|otf)$).*)",
  ],
};
