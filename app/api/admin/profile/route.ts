import { createClient, createAdminClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// PUT — Mettre à jour le profil (nom) + mot de passe optionnel
export async function PUT(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { full_name, password } = await req.json();

  // Mettre à jour full_name dans admin_users
  if (full_name !== undefined) {
    const { error } = await createAdminClient()
      .from("admin_users")
      .update({ full_name })
      .eq("id", user.id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Mettre à jour le mot de passe si fourni
  if (password) {
    if (password.length < 8) {
      return NextResponse.json({ error: "Mot de passe trop court (8 caractères min)" }, { status: 400 });
    }
    const { error } = await supabase.auth.updateUser({ password });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
