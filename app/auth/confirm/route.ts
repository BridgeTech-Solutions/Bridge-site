import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

/**
 * Route handler pour confirmer les tokens Supabase Auth :
 * - Invitations admin (type=invite)
 * - Réinitialisation mot de passe (type=recovery)
 * - Confirmation email (type=signup)
 *
 * Supabase redirige ici après clic sur le lien email.
 * On échange le token contre une session, puis on redirige.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as "invite" | "recovery" | "signup" | null;
  // Valider next pour éviter les redirections ouvertes (open redirect)
  const rawNext = searchParams.get("next") ?? "/auth/set-password";
  const next = rawNext.startsWith("/") && !rawNext.includes("://") ? rawNext : "/auth/set-password";

  if (!token_hash || !type) {
    return NextResponse.redirect(new URL("/login?error=invalid_link", request.url));
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({ token_hash, type });

  if (error) {
    console.error("Auth confirm error:", error.message);
    return NextResponse.redirect(new URL("/login?error=link_expired", request.url));
  }

  // Token valide → rediriger vers la page de définition du mot de passe
  return NextResponse.redirect(new URL(next, request.url));
}
