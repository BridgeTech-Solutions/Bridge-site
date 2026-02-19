import { createAdminClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const supabase = createAdminClient();

    // Vérifier si l'email existe déjà
    const { data: existing } = await supabase
      .from("newsletters")
      .select("id, status")
      .eq("email", normalizedEmail)
      .single();

    if (existing) {
      if (existing.status === "active") {
        // Déjà abonné — on renvoie success sans dupliquer
        return NextResponse.json({ success: true, already: true });
      }
      // Désabonné ou bounced → réactiver
      const { error } = await supabase
        .from("newsletters")
        .update({ status: "active", unsubscribed_at: null })
        .eq("id", existing.id);

      if (error) {
        console.error("Newsletter reactivate error:", error);
        return NextResponse.json({ error: "Erreur lors de l'inscription" }, { status: 500 });
      }
      return NextResponse.json({ success: true, reactivated: true });
    }

    // Nouvel abonné
    const { error } = await supabase
      .from("newsletters")
      .insert({
        email: normalizedEmail,
        status: "active",
        source: source ?? "footer",
      });

    if (error) {
      console.error("Newsletter insert error:", error);
      return NextResponse.json({ error: "Erreur lors de l'inscription" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Newsletter API error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
