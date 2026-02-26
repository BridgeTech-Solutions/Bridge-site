"use client";

import { useRouter } from "next/navigation";
import { AdminUsersTable } from "./AdminUsersTable";
import { InviteAdminForm } from "./InviteAdminForm";

type AdminUser = {
  id: string;
  full_name: string;
  email: string;
  role: string;
  is_active: boolean;
  last_sign_in_at: string | null;
  created_at: string;
};

export function AdminUsersClient({
  users,
  currentUserId,
}: {
  users: AdminUser[];
  currentUserId: string;
}) {
  const router = useRouter();

  return (
    <div>
      <div className="px-6 py-3 flex justify-end border-b border-gray-50">
        <InviteAdminForm onInvited={() => router.refresh()} />
      </div>
      <AdminUsersTable users={users} currentUserId={currentUserId} />
    </div>
  );
}
