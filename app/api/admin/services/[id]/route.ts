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
  const { title, short_description, full_description, icon, features, order_position } = body;

  if (!title) {
    return NextResponse.json({ error: "Titre requis" }, { status: 400 });
  }

  const { error } = await supabase
    .from("services")
    .update({ title, short_description, full_description, icon, features, order_position })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
