import { requireAuth } from "@/lib/auth/auth";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  Mail,
  Bell,
  Users,
  Briefcase,
  TrendingUp,
  ExternalLink,
  ChevronRight,
  Clock,
  Inbox,
} from "lucide-react";

export const metadata = { title: "Dashboard — Admin BTS" };

export default async function AdminDashboard() {
  await requireAuth();

  const supabase = await createClient();

  // Stats depuis Supabase
  const [
    { count: totalContacts },
    { count: unreadContacts },
    { count: totalNewsletter },
    { count: activeNewsletter },
    { count: totalTeam },
    { data: recentContacts },
    { count: unreadThisWeek },
    { data: newsletterSubscriptions },
  ] = await Promise.all([
    supabase.from("contacts").select("*", { count: "exact", head: true }),
    supabase.from("contacts").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("newsletters").select("*", { count: "exact", head: true }),
    supabase.from("newsletters").select("*", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("team_members").select("*", { count: "exact", head: true }).eq("status", "published"),
    supabase
      .from("contacts")
      .select("id, name, email, subject, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    // Contacts non lus cette semaine
    supabase
      .from("contacts")
      .select("*", { count: "exact", head: true })
      .eq("status", "new")
      .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
    // Abonnements 30 derniers jours
    supabase
      .from("newsletters")
      .select("subscribed_at")
      .gte("subscribed_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
  ]);

  // Calculer les données du graphique (30 jours glissants)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dayMap = new Map<string, number>();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    dayMap.set(d.toISOString().slice(0, 10), 0);
  }
  for (const sub of newsletterSubscriptions ?? []) {
    const key = (sub.subscribed_at as string).slice(0, 10);
    if (dayMap.has(key)) dayMap.set(key, (dayMap.get(key) ?? 0) + 1);
  }
  const chartData = Array.from(dayMap.entries()); // [["2025-01-01", 2], ...]
  const chartMax = Math.max(1, ...chartData.map(([, v]) => v));

  const stats = [
    {
      label: "Messages reçus",
      value: totalContacts ?? 0,
      sub: `${unreadContacts ?? 0} non lu${(unreadContacts ?? 0) > 1 ? "s" : ""}`,
      icon: Mail,
      href: "/admin/contacts",
      color: "text-[#0088C1]",
      bg: "bg-[#0088C1]/10",
      urgent: (unreadContacts ?? 0) > 0,
    },
    {
      label: "Abonnés newsletter",
      value: activeNewsletter ?? 0,
      sub: `${totalNewsletter ?? 0} au total`,
      icon: Bell,
      href: "/admin/newsletter",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      urgent: false,
    },
    {
      label: "Membres de l'équipe",
      value: totalTeam ?? 0,
      sub: "membres actifs",
      icon: Users,
      href: "/admin/team",
      color: "text-violet-600",
      bg: "bg-violet-50",
      urgent: false,
    },
    {
      label: "Services actifs",
      value: 6,
      sub: "services BTS",
      icon: Briefcase,
      href: "/admin/services",
      color: "text-amber-600",
      bg: "bg-amber-50",
      urgent: false,
    },
  ];

  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <div className="space-y-8 max-w-6xl">

      {/* En-tête */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Bonjour 👋</h2>
        <p className="text-gray-500 text-sm mt-1">
          Voici un aperçu de votre site Bridge Technologies Solutions.
        </p>
      </div>

      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-gray-200 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <span className={`flex items-center justify-center w-10 h-10 rounded-xl ${stat.bg} ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </span>
                {stat.urgent && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    Urgent
                  </span>
                )}
              </div>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm font-medium text-gray-700 mt-0.5">{stat.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{stat.sub}</p>
              <div className="flex items-center gap-1 mt-3 text-xs font-medium text-gray-400 group-hover:text-[#0088C1] transition-colors">
                Gérer <ChevronRight className="w-3 h-3" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Card non lus cette semaine + Graphique abonnements 30j */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Card non lus cette semaine */}
        <Link
          href="/admin/contacts"
          className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-gray-200 transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-50 text-red-500">
              <Inbox className="w-5 h-5" />
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{unreadThisWeek ?? 0}</p>
          <p className="text-sm font-medium text-gray-700 mt-0.5">Non lus cette semaine</p>
          <p className="text-xs text-gray-400 mt-0.5">Messages sans réponse (7j)</p>
          <div className="flex items-center gap-1 mt-3 text-xs font-medium text-gray-400 group-hover:text-[#0088C1] transition-colors">
            Voir les contacts <ChevronRight className="w-3 h-3" />
          </div>
        </Link>

        {/* Graphique abonnements newsletter 30j */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </span>
            <div>
              <p className="text-sm font-bold text-gray-900">Abonnements newsletter</p>
              <p className="text-xs text-gray-400">30 derniers jours</p>
            </div>
          </div>
          <svg viewBox="0 0 600 80" className="w-full" aria-hidden="true">
            {chartData.map(([date, count], i) => {
              const barW = 14;
              const gap = 6;
              const x = i * (barW + gap);
              const barH = count === 0 ? 2 : Math.max(4, Math.round((count / chartMax) * 64));
              const y = 70 - barH;
              const isFirst = i === 0;
              const isMid = i === 14;
              const isLast = i === 29;
              return (
                <g key={date}>
                  {/* Fond */}
                  <rect x={x} y={6} width={barW} height={64} rx={3} fill="#f3f4f6" />
                  {/* Barre */}
                  <rect x={x} y={y} width={barW} height={barH} rx={3} fill="#10b981" />
                  {/* Labels axe X */}
                  {(isFirst || isMid || isLast) && (
                    <text
                      x={x + barW / 2}
                      y={78}
                      textAnchor="middle"
                      fontSize={8}
                      fill="#9ca3af"
                    >
                      {new Date(date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
          <p className="text-xs text-gray-400 mt-1">
            {(newsletterSubscriptions ?? []).length} nouvel{(newsletterSubscriptions ?? []).length > 1 ? "s" : ""} abonné{(newsletterSubscriptions ?? []).length > 1 ? "s" : ""} ce mois
          </p>
        </div>
      </div>

      {/* Section Google Analytics + Messages récents */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Google Analytics widget */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-50 text-orange-500">
                <TrendingUp className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-bold text-gray-900">Google Analytics</h3>
            </div>
          </div>

          {gaId ? (
            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <p className="text-xs text-gray-500 leading-relaxed">
                  Les statistiques de visites (visiteurs, pages vues, sources de trafic)
                  sont disponibles dans Google Analytics.
                </p>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-1">
                    ID de mesure
                  </p>
                  <p className="text-sm font-mono font-semibold text-gray-700">{gaId}</p>
                </div>
              </div>
              <a
                href={`https://analytics.google.com/analytics/web/#/p${process.env.GA_PROPERTY_ID ?? ""}/reports/intelligenthome`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-colors"
                style={{ backgroundColor: '#0088C1', color: '#ffffff' }}
              >
                Ouvrir Google Analytics
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center mb-3">
                <TrendingUp className="w-6 h-6 text-orange-400" />
              </div>
              <p className="text-sm font-semibold text-gray-700 mb-1">Google Analytics non configuré</p>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Ajoutez <code className="bg-gray-100 px-1 rounded text-[10px]">NEXT_PUBLIC_GA_ID</code> dans votre fichier <code className="bg-gray-100 px-1 rounded text-[10px]">.env.local</code>
              </p>
              <a
                href="https://analytics.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#0088C1] hover:text-[#014B6A] flex items-center gap-1 transition-colors"
              >
                Créer un compte GA4 <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>

        {/* Derniers messages */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900">Derniers messages</h3>
            <Link
              href="/admin/contacts"
              className="text-xs font-semibold text-[#0088C1] hover:text-[#014B6A] flex items-center gap-1 transition-colors"
            >
              Voir tout <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          {recentContacts && recentContacts.length > 0 ? (
            <div className="space-y-2">
              {recentContacts.map((contact) => (
                <Link
                  key={contact.id}
                  href="/admin/contacts"
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  {/* Avatar initiale */}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0088C1]/10 text-[#0088C1] text-xs font-bold shrink-0">
                    {contact.name?.[0]?.toUpperCase() ?? "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-800 truncate">{contact.name}</p>
                      {contact.status === "new" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0088C1] shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate">{contact.subject ?? contact.email}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
                    <Clock className="w-3 h-3" />
                    {new Date(contact.created_at).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                    })}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Mail className="w-8 h-8 text-gray-200 mb-2" />
              <p className="text-sm text-gray-400">Aucun message reçu pour le moment</p>
            </div>
          )}
        </div>
      </div>

      {/* Accès rapides */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-3">Accès rapides</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Gérer les contacts", href: "/admin/contacts" },
            { label: "Voir les abonnés", href: "/admin/newsletter" },
            { label: "Gérer l'équipe", href: "/admin/team" },
            { label: "Gérer les services", href: "/admin/services" },
            { label: "Paramètres du site", href: "/admin/settings" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 bg-white border border-gray-100 hover:border-[#0088C1] hover:text-[#0088C1] transition-colors"
            >
              {link.label}
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
