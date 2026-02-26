import { createClient, createAdminClient } from "@/lib/supabase/server";
import { getAdminRecord } from "@/lib/auth/auth";
import { NextResponse } from "next/server";

// DELETE — Retirer les droits admin (super_admin, admin uniquement)
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const adminRecord = await getAdminRecord(user.id);
  if (!adminRecord || !["super_admin", "admin"].includes(adminRecord.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (id === user.id) {
    return NextResponse.json({ error: "Impossible de supprimer votre propre compte" }, { status: 403 });
  }

  const { error } = await createAdminClient()
    .from("admin_users")
    .delete()
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
