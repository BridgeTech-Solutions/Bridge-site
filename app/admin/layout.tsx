/**
 * LAYOUT ADMIN - Bridge Technologies Solutions
 *
 * TODO Stagiaire 3 :
 * - Sidebar avec navigation (liens vers toutes les pages admin)
 * - Header avec nom de l'utilisateur connecté et bouton déconnexion
 * - Menu responsive (hamburger sur mobile)
 * - Utiliser signOut() de lib/auth/auth-client.ts pour la déconnexion
 * - Redirection vers /login après déconnexion
 *
 * Pages admin à lier dans la sidebar :
 * - /admin (Dashboard)
 * - /admin/contacts (Gestion contacts)
 * - /admin/newsletter (Gestion newsletter)
 * - /admin/blog (Gestion blog)
 * - /admin/projects (Gestion projets)
 * - /admin/team (Gestion équipe)
 * - /admin/services (Gestion services)
 * - /admin/settings (Paramètres)
 *
 * Icônes suggérées (Lucide React) :
 * LayoutDashboard, Mail, Users, FileText, FolderKanban, Briefcase, Settings, LogOut
 *
 * IMPORTANT : C'est un Client Component ("use client")
 */

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* TODO: Sidebar + Header */}
      <main className="p-6">{children}</main>
    </div>
  );
}
