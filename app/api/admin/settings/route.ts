import { createClient } from "@/lib/supabase/server";
import { getAdminRecord } from "@/lib/auth/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("site_settings")
    .select("key, value");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const settings = Object.fromEntries((data ?? []).map((s) => [s.key, s.value]));

  return NextResponse.json(settings);
}

export async function PUT(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const adminRecord = await getAdminRecord(user.id);
  if (!adminRecord || !["super_admin", "admin"].includes(adminRecord.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();

  const upserts = Object.entries(body).map(([key, value]) => ({
    key,
    value: JSON.stringify(value),
  }));

  const { error } = await supabase
    .from("site_settings")
    .upsert(upserts, { onConflict: "key" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
