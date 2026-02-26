import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Next.js Middleware
 * Gère l'authentification et la protection des routes admin avec Supabase Auth
 */

/** Headers de sécurité appliqués à TOUTES les routes. */
function applySecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",   // unsafe-eval retiré
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://*.supabase.co",
      "frame-ancestors 'none'",
    ].join("; ")
  );
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.delete("X-Powered-By");
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Routes protégées - Admin uniquement
  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminApiRoute = pathname.startsWith("/api/admin");

  // Vérifier l'authentification pour les routes admin
  if (isAdminRoute || isAdminApiRoute) {
    let response = NextResponse.next({ request: { headers: request.headers } });

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
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // getUser() valide le JWT côté serveur (plus sûr que getSession)
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    // Si pas d'utilisateur authentifié → login
    if (error || !user) {
      if (isAdminApiRoute) {
        return applySecurityHeaders(
          NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        );
      }
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Vérifier que l'utilisateur est bien un admin actif
    const { data: adminUser, error: adminError } = await supabase
      .from("admin_users")
      .select("id, role, is_active")
      .eq("id", user.id)
      .eq("is_active", true)
      .single();

    if (adminError || !adminUser) {
      if (isAdminApiRoute) {
        return applySecurityHeaders(
          NextResponse.json({ error: "Forbidden" }, { status: 403 })
        );
      }
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("error", "unauthorized");
      return NextResponse.redirect(loginUrl);
    }

    // Authentifié et admin → appliquer les headers de sécurité
    return applySecurityHeaders(response);
  }

  // Routes publiques → appliquer les headers de sécurité
  return applySecurityHeaders(NextResponse.next());
}

// Configurer les routes où le middleware s'applique
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|otf)$).*)",
  ],
};
