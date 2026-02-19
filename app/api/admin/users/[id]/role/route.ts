import { createClient, createAdminClient } from "@/lib/supabase/server";
import { getAdminRecord } from "@/lib/auth/auth";
import { NextResponse } from "next/server";

// PATCH — Changer le rôle d'un admin (super_admin uniquement)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const adminRecord = await getAdminRecord(user.id);
  if (!adminRecord || adminRecord.role !== "super_admin") {
    return NextResponse.json({ error: "Forbidden — super admin requis" }, { status: 403 });
  }

  const { role } = await req.json();

  const validRoles = ["super_admin", "admin", "editor", "viewer"];
  if (!validRoles.includes(role)) {
    return NextResponse.json({ error: "Rôle invalide" }, { status: 400 });
  }

  const { error } = await createAdminClient()
    .from("admin_users")
    .update({ role })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
