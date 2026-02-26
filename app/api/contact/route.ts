import { createAdminClient } from "@/lib/supabase/server";
import { sendContactNotification } from "@/lib/mail";
import { NextResponse } from "next/server";

/* Limites de longueur des champs */
const LIMITS = {
  name:    100,
  email:   254,
  phone:    20,
  company: 100,
  subject: 200,
  message: 5000,
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, subject, message } = body;

    // Validation présence
    if (!name?.trim()) {
      return NextResponse.json({ error: "Le nom est requis" }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }
    if (!message?.trim()) {
      return NextResponse.json({ error: "Le message est requis" }, { status: 400 });
    }

    // Validation longueurs
    if (name.trim().length > LIMITS.name) {
      return NextResponse.json({ error: "Nom trop long (max 100 caractères)" }, { status: 400 });
    }
    if (email.length > LIMITS.email) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }
    if (phone && phone.trim().length > LIMITS.phone) {
      return NextResponse.json({ error: "Numéro de téléphone invalide" }, { status: 400 });
    }
    if (company && company.trim().length > LIMITS.company) {
      return NextResponse.json({ error: "Nom d'entreprise trop long (max 100 caractères)" }, { status: 400 });
    }
    if (subject && subject.trim().length > LIMITS.subject) {
      return NextResponse.json({ error: "Sujet trop long (max 200 caractères)" }, { status: 400 });
    }
    if (message.trim().length > LIMITS.message) {
      return NextResponse.json({ error: "Message trop long (max 5000 caractères)" }, { status: 400 });
    }

    const userAgent = request.headers.get("user-agent") ?? undefined;

    const { error } = await createAdminClient()
      .from("contacts")
      .insert({
        name:       name.trim(),
        email:      email.trim().toLowerCase(),
        phone:      phone?.trim() || null,
        company:    company?.trim() || null,
        subject:    subject?.trim() || null,
        message:    message.trim(),
        source:     "contact_page",
        user_agent: userAgent,
        status:     "new",
      });

    if (error) {
      console.error("Supabase insert contact error:", error);
      return NextResponse.json({ error: "Erreur lors de l'envoi" }, { status: 500 });
    }

    // Notification email (non bloquant)
    sendContactNotification({
      name:    name.trim(),
      email:   email.trim(),
      phone:   phone?.trim() || null,
      company: company?.trim() || null,
      subject: subject?.trim() || null,
      message: message.trim(),
    }).catch((err) => console.error("Email notification error:", err));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
