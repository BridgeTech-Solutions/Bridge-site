import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { sendAdminReply } from "@/lib/mail";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { subject, body } = await req.json();
  if (!subject || !body) {
    return NextResponse.json({ error: "Missing subject or body" }, { status: 400 });
  }

  // Récupérer le contact
  const { data: contact, error: fetchError } = await supabase
    .from("contacts")
    .select("id, email, name, subject")
    .eq("id", id)
    .single();

  if (fetchError || !contact) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }

  // Envoyer l'email de réponse
  await sendAdminReply(contact.email, subject, body);

  // Mettre à jour le statut
  const { error } = await supabase
    .from("contacts")
    .update({ status: "replied", replied_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
