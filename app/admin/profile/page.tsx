import { requireAuth } from "@/lib/auth/auth";
import { createAdminClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/components/admin/ProfileForm";

export const metadata = { title: "Mon profil — Admin BTS" };

export default async function AdminProfilePage() {
  const { user, adminRecord } = await requireAuth();

  // Récupérer l'email depuis auth.users via le client admin
  const { data: authUser } = await createAdminClient()
    .auth.admin.getUserById(user.id);

  const email = authUser?.user?.email ?? user.email ?? "";

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <p className="text-sm text-gray-500 mt-1">
          Modifiez votre nom ou votre mot de passe. Votre email et votre rôle ne peuvent être changés que par un super admin.
        </p>
      </div>

      <ProfileForm
        fullName={adminRecord.full_name ?? ""}
        email={email}
        role={adminRecord.role}
      />
    </div>
  );
}
