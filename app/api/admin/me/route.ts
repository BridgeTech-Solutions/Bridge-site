import { createClient, createAdminClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: adminRecord } = await createAdminClient()
    .from("admin_users")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  return NextResponse.json({
    id: user.id,
    email: user.email,
    full_name: adminRecord?.full_name ?? null,
    role: adminRecord?.role ?? "admin",
  });
}
