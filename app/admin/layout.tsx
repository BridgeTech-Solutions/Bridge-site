"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  Bell,
  Users,
  Briefcase,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  UserCog,
  UserCircle,
} from "lucide-react";
import { signOut } from "@/lib/auth/auth-client";

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  roles: string[] | null; // null = accessible à tous les rôles
};

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard",    href: "/admin",             icon: LayoutDashboard, roles: null },
  { label: "Contacts",     href: "/admin/contacts",    icon: Mail,            roles: null },
  { label: "Newsletter",   href: "/admin/newsletter",  icon: Bell,            roles: null },
  { label: "Équipe",       href: "/admin/team",        icon: Users,           roles: null },
  { label: "Services",     href: "/admin/services",    icon: Briefcase,       roles: null },
  { label: "Utilisateurs", href: "/admin/users",       icon: UserCog,         roles: ["super_admin", "admin"] },
  { label: "Paramètres",   href: "/admin/settings",    icon: Settings,        roles: null },
];

const ROLE_LABELS: Record<string, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  editor: "Éditeur",
  viewer: "Lecteur",
};

type CurrentUser = {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
};

function Sidebar({
  onClose,
  unreadCount,
  currentUser,
}: {
  onClose?: () => void;
  unreadCount: number;
  currentUser: CurrentUser | null;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
    router.refresh();
  };

  // Filtrer les nav items selon le rôle
  const visibleItems = NAV_ITEMS.filter(
    (item) => item.roles === null || (currentUser && item.roles.includes(currentUser.role))
  );

  return (
    <aside className="flex flex-col h-full w-60 bg-[#0a1628] text-white">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2" onClick={onClose}>
          <Image
            src="/logo.png"
            alt="BTS"
            width={110}
            height={36}
            className="object-contain h-8 w-auto brightness-0 invert opacity-90"
          />
        </Link>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-white lg:hidden">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Profil utilisateur */}
      {currentUser && (
        <Link
          href="/admin/profile"
          onClick={onClose}
          className="flex items-center gap-3 px-5 py-4 border-b border-white/10 hover:bg-white/5 transition-colors group"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#0088C1]/30 text-[#64C8F0] text-sm font-bold shrink-0">
            {(currentUser.full_name || currentUser.email)?.[0]?.toUpperCase() ?? "?"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white truncate">
              {currentUser.full_name || currentUser.email?.split("@")[0]}
            </p>
            <p className="text-[10px] text-gray-400 font-medium">
              {ROLE_LABELS[currentUser.role] ?? currentUser.role}
            </p>
          </div>
          <UserCircle className="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-300 shrink-0" />
        </Link>
      )}

      {/* Label section */}
      <div className="px-5 pt-4 pb-2">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          Navigation
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? "bg-[#0088C1] text-white"
                  : "text-gray-400 hover:bg-white/8 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon className="w-4 h-4 shrink-0" />
                {item.label}
              </span>
              {item.label === "Contacts" && unreadCount > 0 && (
                <span className="flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-[10px] font-bold bg-red-500 text-white leading-none">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
              {active && <ChevronRight className="w-3.5 h-3.5 opacity-60 shrink-0" />}
            </Link>
          );
        })}
      </nav>

      {/* Déconnexion */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  const pageTitle =
    NAV_ITEMS.find((item) =>
      item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href)
    )?.label ??
    (pathname === "/admin/profile" ? "Mon profil" : "Administration");

  // Récupérer infos utilisateur + messages non lus
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [unreadRes, meRes] = await Promise.all([
          fetch("/api/admin/contacts/unread-count"),
          fetch("/api/admin/me"),
        ]);
        if (unreadRes.ok) {
          const { count } = await unreadRes.json();
          setUnreadCount(count ?? 0);
        }
        if (meRes.ok) {
          const me = await meRes.json();
          setCurrentUser(me);
        }
      } catch {
        // silencieux
      }
    };
    fetchData();
  }, [pathname]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* Sidebar desktop */}
      <div className="hidden lg:flex lg:shrink-0">
        <Sidebar unreadCount={unreadCount} currentUser={currentUser} />
      </div>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full z-50">
            <Sidebar
              onClose={() => setSidebarOpen(false)}
              unreadCount={unreadCount}
              currentUser={currentUser}
            />
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Header */}
        <header className="shrink-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">{pageTitle}</h1>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#0088C1] transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-50"
            >
              Voir le site
              <ChevronRight className="w-3 h-3" />
            </Link>

            {/* Lien profil dans le header */}
            {currentUser && (
              <Link
                href="/admin/profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#0088C1]/10 text-[#0088C1] text-xs font-bold">
                  {(currentUser.full_name || currentUser.email)?.[0]?.toUpperCase() ?? "?"}
                </div>
                <span className="hidden sm:block text-xs font-medium text-gray-700">
                  {currentUser.full_name || currentUser.email?.split("@")[0]}
                </span>
              </Link>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
