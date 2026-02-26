import { createClient, createAdminClient } from "@/lib/supabase/server";
import { getAdminRecord } from "@/lib/auth/auth";
import { NextResponse } from "next/server";

// GET — Liste des admins (super_admin, admin uniquement)
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const adminRecord = await getAdminRecord(user.id);
  if (!adminRecord || !["super_admin", "admin"].includes(adminRecord.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const adminClient = createAdminClient();

  const [{ data: adminUsers }, { data: authData }] = await Promise.all([
    adminClient.from("admin_users").select("*").order("created_at", { ascending: true }),
    adminClient.auth.admin.listUsers(),
  ]);

  const authMap = Object.fromEntries(
    (authData?.users ?? []).map((u) => [u.id, u])
  );

  const merged = (adminUsers ?? []).map((admin) => ({
    ...admin,
    email: authMap[admin.id]?.email ?? "—",
    last_sign_in_at: authMap[admin.id]?.last_sign_in_at ?? null,
  }));

  return NextResponse.json(merged);
}

// POST — Inviter un nouvel admin (super_admin, admin uniquement)
export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const adminRecord = await getAdminRecord(user.id);
  if (!adminRecord || !["super_admin", "admin"].includes(adminRecord.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { email, full_name, role } = await req.json();

  if (!email || !role) {
    return NextResponse.json({ error: "Email et rôle requis" }, { status: 400 });
  }

  const adminClient = createAdminClient();

  const { data: invited, error: inviteError } = await adminClient.auth.admin.inviteUserByEmail(email, {
    data: { full_name },
  });

  if (inviteError) {
    return NextResponse.json({ error: inviteError.message }, { status: 500 });
  }

  const { error: insertError } = await adminClient
    .from("admin_users")
    .insert({ id: invited.user.id, full_name, role, is_active: true });

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
