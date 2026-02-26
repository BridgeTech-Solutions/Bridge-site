import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { sendNewsletter } from "@/lib/mail";

export async function POST(req: Request) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { subject, body } = await req.json();
  if (!subject || !body) {
    return NextResponse.json({ error: "Missing subject or body" }, { status: 400 });
  }

  // Récupérer les abonnés actifs
  const { data: subscribers, error } = await supabase
    .from("newsletters")
    .select("id, email")
    .eq("status", "active");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const result = await sendNewsletter(subscribers ?? [], subject, body);

  return NextResponse.json({
    sent: result.sent,
    failed: result.failed,
    total: (subscribers ?? []).length,
  });
}
