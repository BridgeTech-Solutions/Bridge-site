import { createClient, createAdminClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type AdminRecord = {
  id: string;
  role: string;
  full_name: string | null;
  is_active: boolean;
};

/**
 * Récupérer l'utilisateur Supabase Auth courant (sécurisé)
 */
export async function getUser() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) return null;
  return user;
}

/** @deprecated Utiliser getUser() */
export async function getSession() {
  const user = await getUser();
  return user ? { user } : null;
}

/**
 * Récupérer la ligne admin_users d'un utilisateur (via service role → ignore RLS)
 */
export async function getAdminRecord(userId: string): Promise<AdminRecord | null> {
  const { data, error } = await createAdminClient()
    .from("admin_users")
    .select("id, role, full_name, is_active")
    .eq("id", userId)
    .eq("is_active", true)
    .single();

  if (error || !data) return null;
  return data as AdminRecord;
}

/**
 * Vérifier si l'utilisateur est un admin actif
 */
export async function isAdmin(userId: string): Promise<boolean> {
  const record = await getAdminRecord(userId);
  return record !== null;
}

/**
 * Protéger une route — redirige vers /login si non authentifié ou non admin.
 * Retourne { user, adminRecord } pour que les pages puissent utiliser le rôle.
 */
export async function requireAuth() {
  const user = await getUser();
  if (!user) redirect("/login");

  const adminRecord = await getAdminRecord(user.id);
  if (!adminRecord) redirect("/login?error=unauthorized");

  return { user, adminRecord };
}

/**
 * Protéger une route selon le rôle.
 * Utilisation : await requireRole(["super_admin"])
 *
 * Rôles disponibles : super_admin > admin > editor > viewer
 */
export async function requireRole(allowedRoles: string[]) {
  const { user, adminRecord } = await requireAuth();

  if (!allowedRoles.includes(adminRecord.role)) {
    redirect("/admin?error=forbidden");
  }

  return { user, adminRecord };
}

/**
 * Vérifier si l'utilisateur est authentifié (sans redirection)
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getUser();
  return user !== null;
}
