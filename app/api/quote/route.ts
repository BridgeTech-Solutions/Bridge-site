import { createAdminClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const VALID_BUDGETS = ["under_10k", "10k_50k", "50k_100k", "100k_plus"];
const VALID_TIMELINES = ["urgent", "1_month", "3_months", "6_months_plus"];

export async function POST(request: Request) {
  try {
    const {
      name,
      email,
      phone,
      company,
      service_id,
      budget_range,
      timeline,
      project_description,
    } = await request.json();

    if (!name?.trim()) {
      return NextResponse.json({ error: "Le nom est requis" }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }
    if (!project_description?.trim()) {
      return NextResponse.json({ error: "La description du projet est requise" }, { status: 400 });
    }
    if (budget_range && !VALID_BUDGETS.includes(budget_range)) {
      return NextResponse.json({ error: "Budget invalide" }, { status: 400 });
    }
    if (timeline && !VALID_TIMELINES.includes(timeline)) {
      return NextResponse.json({ error: "Délai invalide" }, { status: 400 });
    }

    const { error } = await createAdminClient()
      .from("quote_requests")
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        company: company?.trim() || null,
        service_id: service_id || null,
        budget_range: budget_range || null,
        timeline: timeline || null,
        project_description: project_description.trim(),
        status: "new",
      });

    if (error) {
      console.error("Quote insert error:", error);
      return NextResponse.json({ error: "Erreur lors de l'envoi" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Quote API error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
