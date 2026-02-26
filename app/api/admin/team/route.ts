import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { full_name, position, email, photo_url, linkedin_url, status, order_position } = body;

  if (!full_name || !position) {
    return NextResponse.json({ error: "Nom et poste requis" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("team_members")
    .insert({
      full_name,
      position,
      email,
      photo_url,
      linkedin_url,
      status: status ?? "published",
      order_position: order_position ?? 0,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, data });
}
