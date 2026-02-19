import { createAdminClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, phone, company, subject, message } = await request.json();

    if (!name?.trim()) {
      return NextResponse.json({ error: "Le nom est requis" }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }
    if (!message?.trim()) {
      return NextResponse.json({ error: "Le message est requis" }, { status: 400 });
    }

    const userAgent = request.headers.get("user-agent") ?? undefined;

    const { error } = await createAdminClient()
      .from("contacts")
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        company: company?.trim() || null,
        subject: subject?.trim() || null,
        message: message.trim(),
        source: "contact_page",
        user_agent: userAgent,
        status: "new",
      });

    if (error) {
      console.error("Supabase insert contact error:", error);
      return NextResponse.json({ error: "Erreur lors de l'envoi" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
