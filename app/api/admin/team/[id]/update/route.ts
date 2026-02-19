import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { full_name, position, email, photo_url, linkedin_url, status, order_position } = body;

  if (!full_name || !position) {
    return NextResponse.json({ error: "Nom et poste requis" }, { status: 400 });
  }

  const { error } = await supabase
    .from("team_members")
    .update({ full_name, position, email, photo_url, linkedin_url, status, order_position })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
