# Plan d'implémentation — Dashboard Admin
## Bridge Technologies Solutions

> Document de référence pour le développement du côté admin.
> **État actuel : côté admin COMPLET** (hors blog et projets — reportés).
> Dernière mise à jour : 18 février 2026

---

## Résumé

Le dashboard admin permet à l'équipe BTS de gérer le contenu du site web :
messages de contact, abonnés newsletter, articles blog, projets, équipe et services.
L'accès est protégé par authentification email/mot de passe via Supabase Auth.

**Stack** : Next.js 16 · TypeScript · Tailwind CSS · Supabase · Google Analytics 4

---

## Ordre d'implémentation

```
Phase 1 — Accès (PRIORITÉ ABSOLUE)
  └── 1.1  Page Login + LoginForm
  └── 1.2  Layout Admin (Sidebar + Header)

Phase 2 — Dashboard
  └── 2.1  Cartes statistiques (contacts, newsletter, blog, projets)
  └── 2.2  Widget Google Analytics (visiteurs, pages vues)
  └── 2.3  Derniers messages reçus

Phase 3 — Gestion des données
  └── 3.1  Contacts
  └── 3.2  Newsletter
  └── 3.3  Blog
  └── 3.4  Projets
  └── 3.5  Équipe
  └── 3.6  Services

Phase 4 — Paramètres
  └── 4.1  Paramètres du site
```

---

## Phase 1 — Accès

### 1.1 Page Login (`app/login/page.tsx` + `components/forms/LoginForm.tsx`)

**Rendu attendu :**
- Page centrée, fond gris clair
- Logo BTS en haut (visible obligatoire)
- Carte blanche avec formulaire
- Champ email + champ mot de passe
- Bouton "Se connecter" (bleu BTS)
- Spinner pendant la connexion
- Message d'erreur si identifiants incorrects
- Redirection vers `/admin` après succès

**Logique :**
```ts
import { signInWithEmail } from "@/lib/auth/auth-client";

const { success, error } = await signInWithEmail(email, password);
if (success) {
  router.push("/admin");
  router.refresh();
}
```

**Composants UI à utiliser :** `Input`, `Button`, `Label` de `components/ui/`

---

### 1.2 Layout Admin (`app/admin/layout.tsx`)

**Structure :**
```
┌─────────────────────────────────────────────┐
│  SIDEBAR (fixe, 240px)  │  CONTENU (flex-1) │
│                         │                   │
│  [Logo BTS]             │  [Header admin]   │
│                         │                   │
│  Dashboard              │  <children />     │
│  Contacts       (badge) │                   │
│  Newsletter             │                   │
│  Blog                   │                   │
│  Projets                │                   │
│  Équipe                 │                   │
│  Services               │                   │
│  Paramètres             │                   │
│                         │                   │
│  [Déconnexion]          │                   │
└─────────────────────────────────────────────┘
```

**Fonctionnalités sidebar :**
- Logo BTS cliquable (→ `/`)
- Liens de navigation avec icônes Lucide
- Lien actif mis en surbrillance (détecté via `usePathname`)
- Badge rouge sur "Contacts" indiquant le nombre de messages non lus
- Bouton déconnexion en bas (appelle `signOut()` puis redirige vers `/login`)
- Collapse sur mobile (hamburger dans le header)

**Header admin (bande en haut du contenu) :**
- Titre de la page courante
- Avatar / nom de l'utilisateur connecté (récupéré depuis Supabase Auth)
- Bouton déconnexion (visible aussi ici sur mobile)

**Icônes Lucide à utiliser :**
```
Dashboard   → LayoutDashboard
Contacts    → Mail
Newsletter  → Bell
Blog        → FileText
Projets     → FolderKanban
Équipe      → Users
Services    → Briefcase
Paramètres  → Settings
Déconnexion → LogOut
```

**Auth :** Ce layout est un `"use client"`. La protection des routes est assurée
par `middleware.ts` (déjà en place) et `requireAuth()` dans chaque page.

---

## Phase 2 — Dashboard (`app/admin/page.tsx`)

### 2.1 Cartes statistiques

4 cartes avec compteurs récupérés depuis Supabase :

| Carte | Table Supabase | Filtre |
|-------|---------------|--------|
| Messages reçus | `contacts` | tous |
| Non lus | `contacts` | `status = 'unread'` |
| Abonnés newsletter | `newsletters` | `status = 'active'` |
| Articles publiés | `blog_posts` | `status = 'published'` |

**Requête exemple :**
```ts
const { count: totalContacts } = await supabase
  .from("contacts")
  .select("*", { count: "exact", head: true });
```

### 2.2 Widget Google Analytics

**Ce qu'on affiche dans le dashboard :**

| Métrique | Description |
|----------|-------------|
| Visiteurs ce mois | Utilisateurs uniques sur les 30 derniers jours |
| Pages vues ce mois | Total des pages vues |
| Pages les plus visitées | Top 5 des pages |
| Bouton | Lien vers Google Analytics complet |

**Comment intégrer Google Analytics 4 :**

#### Étape 1 — Créer la propriété GA4
1. Aller sur [analytics.google.com](https://analytics.google.com)
2. Créer un compte → Créer une propriété → choisir "Web"
3. Entrer l'URL du site
4. Récupérer l'**ID de mesure** (format : `G-XXXXXXXXXX`)

#### Étape 2 — Installer le tracking sur le site
Ajouter dans `app/layout.tsx` le script Google Analytics :

```tsx
// app/layout.tsx
import Script from "next/script";

// Dans le <head> ou avant </body> :
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
  `}
</Script>
```

Ajouter dans `.env.local` :
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

#### Étape 3 — API GA4 pour le dashboard (optionnel, avancé)
Pour afficher les chiffres directement dans le dashboard sans quitter le site,
on utilise la **Google Analytics Data API** :

Variables d'environnement supplémentaires :
```env
GA_PROPERTY_ID=123456789          # ID numérique de la propriété GA4
GA_SERVICE_ACCOUNT_EMAIL=xxx@xxx.iam.gserviceaccount.com
GA_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
```

> **Alternative simple** : afficher juste un bouton "Voir les analytics"
> qui ouvre Google Analytics dans un nouvel onglet. Moins de complexité,
> mêmes données. Recommandé pour commencer.

### 2.3 Derniers messages

Liste des 5 derniers messages de contact reçus :
- Nom, email, sujet, date, badge lu/non lu
- Lien "Voir tous" → `/admin/contacts`

---

## Phase 3 — Gestion des données

### 3.1 Contacts (`/admin/contacts`)

**Table Supabase :** `contacts`
```
id, name, email, phone, subject, message, status, created_at
status : 'unread' | 'read' | 'archived'
```

**Fonctionnalités :**
- Tableau paginé (20 par page)
- Colonnes : nom · email · sujet · date · statut (badge coloré)
- Clic sur une ligne → modal avec le message complet
- Action : marquer comme lu (`status = 'read'`)
- Action : supprimer (avec confirmation)
- Filtre : Tous / Non lus / Lus

**Composants nécessaires :**
- `ContactsTable` (Server Component → lit les données)
- `ContactModal` (Client Component → modal de détail)
- `MarkAsReadButton` (Client Component → bouton action)
- `DeleteContactButton` (Client Component → bouton suppression)

---

### 3.2 Newsletter (`/admin/newsletter`)

**Table Supabase :** `newsletters`
```
id, email, status, source, subscribed_at
status : 'active' | 'unsubscribed'
```

**Fonctionnalités :**
- 3 stats : Actifs · Désabonnés · Total
- Tableau : email · statut · date inscription · source
- Action : supprimer un abonné
- Bouton **Export CSV** (génère un fichier `.csv` téléchargeable avec tous les emails actifs)

**Export CSV (logique) :**
```ts
// Route API : app/api/admin/newsletter/export/route.ts
const { data } = await supabase
  .from("newsletters")
  .select("email, subscribed_at")
  .eq("status", "active");

const csv = "Email,Date inscription\n" +
  data.map(r => `${r.email},${r.subscribed_at}`).join("\n");

return new Response(csv, {
  headers: {
    "Content-Type": "text/csv",
    "Content-Disposition": 'attachment; filename="newsletter.csv"',
  },
});
```

---

### 3.3 Blog (`/admin/blog`)

**Table Supabase :** `blog_posts`
```
id, title, slug, excerpt, content, cover_image,
category, tags, status, published_at, views_count, created_at
status : 'draft' | 'published'
```

**Fonctionnalités liste :**
- Tableau : titre · catégorie · statut · date · vues
- Bouton "Nouvel article" → `/admin/blog/new`
- Action : publier / dépublier (toggle status)
- Action : supprimer (avec confirmation)

**Formulaire création/édition (`/admin/blog/new` et `/admin/blog/[id]/edit`) :**
```
Champs :
- Titre (Input)
- Slug (auto-généré depuis le titre, modifiable)
- Catégorie (Select)
- Extrait / Resume (Textarea, 2-3 lignes)
- Contenu (Textarea rich, ou simple Textarea)
- Image de couverture (Input URL ou upload)
- Tags (Input tags, séparés par virgule)
- Statut (Select : brouillon / publié)
```

---

### 3.4 Projets (`/admin/projects`)

**Table Supabase :** `projects`
```
id, title, slug, client_name, short_description,
description, technologies, category, status, is_featured, created_at
status : 'in_progress' | 'completed'
```

**Fonctionnalités :**
- Tableau : titre · client · catégorie · statut · date
- Bouton "Nouveau projet"
- Action : modifier, supprimer
- Badge "En vedette" pour les projets marqués `is_featured`

**Formulaire :**
```
- Titre du projet
- Client
- Catégorie (Select)
- Description courte
- Description complète
- Technologies (tags séparés par virgule)
- Statut (en cours / terminé)
- Mettre en vedette (checkbox)
```

---

### 3.5 Équipe (`/admin/team`)

**Table Supabase :** `team_members`
```
id, full_name, role, bio, photo_url, linkedin_url,
email, display_order, is_active
```

**Fonctionnalités :**
- Tableau : photo · nom · poste · email · statut
- Bouton "Nouveau membre"
- Action : activer / désactiver (`is_active`)
- Action : supprimer

**Formulaire :**
```
- Nom complet
- Poste / Rôle
- Email
- Biographie (Textarea)
- URL photo (ou upload)
- URL LinkedIn
- Ordre d'affichage (numéro)
- Actif (checkbox)
```

---

### 3.6 Services (`/admin/services`)

**Table Supabase :** `services`
```
id, title, slug, short_description, full_description,
icon, features, is_active, display_order
```

**Fonctionnalités :**
- Tableau des 6 services BTS avec statut actif/inactif
- Pas de création (les 6 services sont fixes)
- Action : activer / désactiver
- Action : modifier le contenu

**Formulaire édition :**
```
- Titre
- Description courte (affichée dans les cartes)
- Description complète (affichée sur la page détail)
- Fonctionnalités (liste à puces, une par ligne)
- Actif (checkbox)
```

---

## Phase 4 — Paramètres (`/admin/settings`)

**Table Supabase :** `site_settings`
```
id, key, value, type, description
```

**Sections du formulaire :**

```
Informations générales :
  - Nom du site
  - Description / Meta description
  - Email de contact
  - Téléphone 1
  - Téléphone 2
  - Adresse

Réseaux sociaux :
  - URL Facebook
  - URL LinkedIn

Apparence :
  - URL Logo
  - URL Favicon
```

Sauvegarder via `UPSERT` Supabase (insert ou update si la clé existe) :
```ts
await supabase.from("site_settings").upsert(
  { key: "contact_email", value: email, type: "string" },
  { onConflict: "key" }
);
```

---

## Google Analytics — Variables d'environnement

Ajouter dans `.env.local` :

```env
# Google Analytics (obligatoire pour le tracking)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optionnel — pour afficher les stats dans le dashboard via API GA4
GA_PROPERTY_ID=123456789
GA_SERVICE_ACCOUNT_EMAIL=service@projet.iam.gserviceaccount.com
GA_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
```

Ajouter aussi dans `.env.example` pour que les autres sachent quoi remplir.

---

## Fichiers à créer / modifier

```
MODIFIER :
  app/layout.tsx                     → Ajouter script Google Analytics
  app/login/page.tsx                 → Implémenter la page login
  app/admin/layout.tsx               → Sidebar + Header admin
  app/admin/page.tsx                 → Dashboard complet
  app/admin/contacts/page.tsx        → Gestion contacts
  app/admin/newsletter/page.tsx      → Gestion newsletter
  app/admin/blog/page.tsx            → Liste articles
  app/admin/projects/page.tsx        → Liste projets
  app/admin/team/page.tsx            → Liste équipe
  app/admin/services/page.tsx        → Liste services
  app/admin/settings/page.tsx        → Formulaire paramètres
  components/forms/LoginForm.tsx     → Formulaire de connexion
  .env.local                         → Ajouter NEXT_PUBLIC_GA_ID
  .env.example                       → Ajouter NEXT_PUBLIC_GA_ID

CRÉER :
  app/admin/blog/new/page.tsx               → Formulaire nouvel article
  app/admin/blog/[id]/edit/page.tsx         → Formulaire édition article
  app/admin/projects/new/page.tsx           → Formulaire nouveau projet
  app/admin/projects/[id]/edit/page.tsx     → Formulaire édition projet
  app/admin/team/new/page.tsx               → Formulaire nouveau membre
  app/admin/team/[id]/edit/page.tsx         → Formulaire édition membre
  app/admin/services/[id]/edit/page.tsx     → Formulaire édition service
  app/api/admin/newsletter/export/route.ts  → Export CSV newsletter
```

---

## Règles importantes

1. **Chaque page admin** doit commencer par `await requireAuth()` (Server Components)
2. **Toute action** (supprimer, modifier) doit être dans un Client Component séparé
3. **Pas de `"use client"`** sur les pages qui lisent les données — utiliser des sous-composants client
4. **Confirmer avant suppression** — toujours afficher une confirmation (window.confirm ou modal)
5. **Google Analytics ID** ne jamais hardcoder — toujours passer par `process.env.NEXT_PUBLIC_GA_ID`

---

## État d'avancement

### ✅ Implémenté (côté admin complet)

| Page | Statut | Fichier |
|------|--------|---------|
| Login | ✅ | `app/login/page.tsx` + `components/forms/LoginForm.tsx` |
| Layout Admin (sidebar) | ✅ | `app/admin/layout.tsx` |
| Dashboard | ✅ | `app/admin/page.tsx` |
| Contacts | ✅ | `app/admin/contacts/page.tsx` + `ContactsTable.tsx` |
| Newsletter | ✅ | `app/admin/newsletter/page.tsx` + `NewsletterTable.tsx` |
| Équipe | ✅ | `app/admin/team/page.tsx` + `TeamTable.tsx` + new/edit |
| Services | ✅ | `app/admin/services/page.tsx` + `ServicesTable.tsx` + edit |
| Paramètres | ✅ | `app/admin/settings/page.tsx` + `SettingsForm.tsx` |

### ✅ API Routes implémentées

| Route | Méthode | Action |
|-------|---------|--------|
| `/api/admin/contacts/unread-count` | GET | Compter les non lus |
| `/api/admin/contacts/[id]/read` | PATCH | Marquer comme lu |
| `/api/admin/contacts/[id]` | DELETE | Supprimer |
| `/api/admin/newsletter/[id]` | DELETE | Supprimer abonné |
| `/api/admin/newsletter/export` | GET | Export CSV |
| `/api/admin/team` | POST | Ajouter membre |
| `/api/admin/team/[id]` | DELETE | Supprimer membre |
| `/api/admin/team/[id]/toggle` | PATCH | Activer/désactiver |
| `/api/admin/team/[id]/update` | PUT | Modifier membre |
| `/api/admin/services/[id]` | PUT | Modifier service |
| `/api/admin/services/[id]/toggle` | PATCH | Activer/désactiver |
| `/api/admin/settings` | GET + PUT | Lire/sauver paramètres |

### ⏸ Reporté (à faire plus tard)

- Blog (`/admin/blog`) — table `blog_posts`
- Projets (`/admin/projects`) — table `projects`

## Checklist de déploiement

- [ ] Compte Google Analytics 4 créé pour BTS
- [ ] ID de mesure GA4 récupéré (`G-XXXXXXXXXX`)
- [ ] `.env.local` configuré avec les clés Supabase + GA4
- [ ] Schema SQL exécuté dans Supabase (`bridge_db_schema.sql`)
- [ ] Premier utilisateur admin créé dans Supabase Auth + table `admin_users`

---

*Document créé le 18 février 2026 — Bridge Technologies Solutions*
