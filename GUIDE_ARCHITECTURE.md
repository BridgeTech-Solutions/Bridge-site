# Guide d'Architecture - Bridge Technologies Solutions

## Document pour les stagiaires

Ce document explique l'architecture complete du projet, ce qui a ete fait, et comment tout fonctionne ensemble. Lisez-le entierement avant de commencer a coder.

---

## 1. Presentation du Projet

### Qui est BTS ?

Bridge Technologies Solutions (BTS) est une entreprise de solutions technologiques basee a Douala, Cameroun. Elle propose 6 services :

| # | Service | Slug URL |
|---|---------|----------|
| 1 | Gestion des projets | gestion-projets |
| 2 | Infrastructure informatique | infrastructure |
| 3 | Solutions cloud computing | cloud |
| 4 | Protection / Securite des donnees | protection-donnees |
| 5 | DSI externe | dsi-externe |
| 6 | Conseils / Consultants | conseil-consulting |

### Informations de contact

- **Email** : contact@bridgetech-solutions.com
- **Telephones** : +237 679 289 166 / +237 692 143 811
- **Adresse** : Bonamoussadi, DLA, Douala, Cameroun
- **Facebook** : facebook.com/people/Bridge-Technologies-Solutions/100093075549355/
- **LinkedIn** : linkedin.com/company/bridgetechnologies-solutions/

### Charte graphique

- **Couleur principale** : `#0088C1` (bleu cyan)
- **Couleur sombre** : `#014B6A`
- **Couleur claire** : `#78C2E1`
- **Police** : Montserrat (Google Fonts)

---

## 2. Stack Technique

### Technologies utilisees

| Technologie | Version | Role |
|-------------|---------|------|
| **Next.js** | 15+ | Framework React (App Router) |
| **TypeScript** | 5+ | Langage (typage statique) |
| **Tailwind CSS** | 3+ | Styles (classes utilitaires) |
| **Supabase** | - | Base de donnees PostgreSQL + Auth |
| **Lucide React** | - | Icones (SVG) |
| **Framer Motion** | - | Animations |
| **date-fns** | - | Formatage des dates |

### Pourquoi ces choix ?

- **Next.js 15** : Framework React moderne avec rendu serveur (SSR), App Router, et API Routes integrees
- **Supabase** : Alternative open-source a Firebase, fournit une base PostgreSQL, authentification, et API REST automatique
- **Tailwind CSS** : Permet de styler directement dans le HTML sans ecrire de CSS separe
- **TypeScript** : Ajoute le typage au JavaScript pour eviter les bugs

---

## 3. Architecture du Projet

### 3.1 Structure des dossiers

```
projet-stagiaires/
│
├── app/                          # PAGES DE L'APPLICATION
│   ├── layout.tsx                # Layout principal (HTML, fonts, metadata)
│   ├── page.tsx                  # Page d'accueil (/)
│   ├── globals.css               # Styles globaux (Tailwind + variables CSS)
│   │
│   ├── contact/page.tsx          # Page contact (/contact)
│   ├── entreprise/page.tsx       # Page a propos (/entreprise)
│   ├── equipe/page.tsx           # Page equipe (/equipe)
│   ├── services/page.tsx         # Page services (/services)
│   ├── blog/page.tsx             # Page blog (/blog)
│   ├── faq/page.tsx              # Page FAQ (/faq)
│   ├── projets/page.tsx          # Page portfolio (/projets)
│   ├── login/page.tsx            # Page connexion admin (/login)
│   │
│   ├── admin/                    # DASHBOARD ADMIN (protege)
│   │   ├── layout.tsx            # Layout admin (sidebar + navigation)
│   │   ├── page.tsx              # Dashboard principal
│   │   ├── contacts/page.tsx     # Gestion des messages
│   │   ├── newsletter/page.tsx   # Gestion des abonnes
│   │   ├── blog/page.tsx         # Gestion des articles
│   │   ├── projects/page.tsx     # Gestion des projets
│   │   ├── team/page.tsx         # Gestion de l'equipe
│   │   ├── services/page.tsx     # Gestion des services
│   │   └── settings/page.tsx     # Parametres du site
│   │
│   └── api/                      # ROUTES API (backend)
│       ├── contact/route.ts      # POST - formulaire contact
│       ├── newsletter/route.ts   # POST - inscription newsletter
│       └── quote/route.ts        # POST - demande de devis
│
├── components/                   # COMPOSANTS REUTILISABLES
│   ├── ui/                       # Composants de base (shadcn/ui)
│   │   ├── button.tsx            # Bouton
│   │   ├── input.tsx             # Champ texte
│   │   ├── textarea.tsx          # Zone de texte
│   │   ├── label.tsx             # Label
│   │   ├── card.tsx              # Carte
│   │   ├── dialog.tsx            # Modal / Popup
│   │   ├── select.tsx            # Menu deroulant
│   │   ├── accordion.tsx         # Accordeon (FAQ)
│   │   ├── tabs.tsx              # Onglets
│   │   ├── skeleton.tsx          # Placeholder de chargement
│   │   ├── toast.tsx             # Notification
│   │   └── dropdown-menu.tsx     # Menu deroulant
│   ├── layout/                   # Header, Footer, PageHeader (A CREER)
│   ├── home/                     # Composants de la homepage (A CREER)
│   └── admin/                    # Composants du dashboard (A CREER)
│
├── lib/                          # UTILITAIRES ET CONFIGURATION
│   ├── supabase/
│   │   ├── client.ts             # Client Supabase NAVIGATEUR
│   │   └── server.ts             # Client Supabase SERVEUR
│   ├── auth/
│   │   ├── auth.ts               # Auth SERVEUR (requireAuth, getSession)
│   │   └── auth-client.ts        # Auth CLIENT (signIn, signOut)
│   ├── utils.ts                  # Fonction cn() pour les classes CSS
│   └── constants.ts              # Toutes les constantes (couleurs, services, nav)
│
├── middleware.ts                 # Protection des routes /admin
├── bridge_db_schema.sql          # Schema SQL complet (21 tables)
├── .env.example                  # Template des variables d'environnement
├── tailwind.config.ts            # Configuration Tailwind (couleurs BTS)
├── components.json               # Configuration shadcn/ui
├── REPARTITION_STAGIAIRES.md     # Repartition des taches
└── public/
    └── logo.png                  # Logo Bridge Technologies Solutions
```

### 3.2 Comment Next.js App Router fonctionne

Next.js utilise le systeme de fichiers pour creer les routes :

```
Fichier                          →  URL
─────────────────────────────────────────────────
app/page.tsx                     →  /
app/contact/page.tsx             →  /contact
app/blog/page.tsx                →  /blog
app/admin/page.tsx               →  /admin
app/admin/contacts/page.tsx      →  /admin/contacts
app/api/contact/route.ts         →  POST /api/contact
```

**Regles :**
- Chaque dossier = un segment d'URL
- Le fichier `page.tsx` = la page affichee
- Le fichier `layout.tsx` = le layout qui entoure les pages enfants
- Le fichier `route.ts` = une API Route (backend)

### 3.3 Server Components vs Client Components

C'est LE concept le plus important a comprendre dans Next.js 15.

#### Server Components (par defaut)

```tsx
// app/blog/page.tsx - C'est un Server Component (par defaut)

import { createClient } from "@/lib/supabase/server";  // ← import SERVER

export default async function BlogPage() {
  // On peut faire des requetes directement ici
  const supabase = await createClient();
  const { data: posts } = await supabase.from("blog_posts").select("*");

  return (
    <div>
      {posts?.map(post => <h2 key={post.id}>{post.title}</h2>)}
    </div>
  );
}
```

**Caracteristiques :**
- S'executent sur le serveur uniquement
- Peuvent acceder directement a la base de donnees
- Peuvent utiliser `async/await` dans le composant
- Ne peuvent PAS utiliser `useState`, `useEffect`, `onClick`
- Importent `@/lib/supabase/server`

#### Client Components

```tsx
// components/ContactForm.tsx - C'est un Client Component
"use client";  // ← OBLIGATOIRE en premiere ligne

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";  // ← import CLIENT

export default function ContactForm() {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    // Appeler l'API ou Supabase directement
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Envoyer</button>
    </form>
  );
}
```

**Caracteristiques :**
- Ont `"use client"` en premiere ligne
- S'executent dans le navigateur
- Peuvent utiliser `useState`, `useEffect`, `onClick`, etc.
- Importent `@/lib/supabase/client`

#### PIEGE A EVITER

```
ERREUR COURANTE :
❌ Importer "@/lib/supabase/server" dans un Client Component
❌ Importer "@/lib/auth/auth" dans un Client Component
   → Ces fichiers utilisent `cookies()` de Next.js qui ne marche que serveur

SOLUTION :
✅ Dans un Client Component ("use client"), utiliser :
   - "@/lib/supabase/client" pour Supabase
   - "@/lib/auth/auth-client" pour l'authentification
```

---

## 4. Supabase - Base de Donnees

### 4.1 C'est quoi Supabase ?

Supabase est un service qui fournit :
- Une **base de donnees PostgreSQL** hebergee dans le cloud
- Une **API REST automatique** pour lire/ecrire les donnees
- Un systeme d'**authentification** (email/password, OAuth)
- Du **stockage de fichiers** (images, documents)
- Des **regles de securite** (Row Level Security - RLS)

### 4.2 Les tables de la base de donnees

Le fichier `bridge_db_schema.sql` contient le schema complet. Voici les tables principales :

| Table | Description | Champs principaux |
|-------|-------------|-------------------|
| `contacts` | Messages du formulaire contact | name, email, phone, subject, message, status |
| `newsletters` | Abonnes newsletter | email, status (active/unsubscribed), source |
| `quote_requests` | Demandes de devis | company_name, contact_name, email, service_type, description |
| `blog_posts` | Articles de blog | title, slug, excerpt, content, cover_image, status, tags |
| `projects` | Projets du portfolio | title, slug, client_name, description, technologies, status |
| `team_members` | Membres de l'equipe | full_name, role/position, bio, photo_url, linkedin_url |
| `services` | Services de l'entreprise | title, slug, short_description, full_description, icon |
| `testimonials` | Temoignages clients | author_name, company, content, rating |
| `partners` | Logos partenaires | name, logo_url, website_url |
| `site_settings` | Parametres du site | key, value, type |
| `admin_users` | Utilisateurs admin | id (lien vers auth), role, full_name, is_active |
| `faqs` | Questions frequentes | question, answer, category, display_order |

### 4.3 Comment utiliser Supabase dans le code

#### Lire des donnees (SELECT)

```typescript
// Server Component
const supabase = await createClient();

// Recuperer tous les articles publies
const { data: posts, error } = await supabase
  .from("blog_posts")
  .select("*")
  .eq("status", "published")              // WHERE status = 'published'
  .order("published_at", { ascending: false }) // ORDER BY published_at DESC
  .limit(10);                               // LIMIT 10
```

#### Inserer des donnees (INSERT)

```typescript
const { data, error } = await supabase
  .from("contacts")
  .insert({
    name: "Jean Dupont",
    email: "jean@example.com",
    subject: "Demande info",
    message: "Bonjour...",
  })
  .select()     // Retourner la ligne inseree
  .single();    // Un seul resultat
```

#### Modifier des donnees (UPDATE)

```typescript
const { error } = await supabase
  .from("blog_posts")
  .update({ status: "published", published_at: new Date().toISOString() })
  .eq("id", postId);  // WHERE id = postId
```

#### Supprimer des donnees (DELETE)

```typescript
const { error } = await supabase
  .from("contacts")
  .delete()
  .eq("id", contactId);  // WHERE id = contactId
```

#### Compter des lignes (COUNT)

```typescript
const { count } = await supabase
  .from("contacts")
  .select("*", { count: "exact", head: true });
// count = nombre total de contacts
```

### 4.4 Configuration Supabase

Les stagiaires doivent creer un fichier `.env.local` a la racine du projet :

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...
```

- `NEXT_PUBLIC_*` = accessible cote client (navigateur)
- `SUPABASE_SERVICE_ROLE_KEY` = cle admin, JAMAIS exposee au client

---

## 5. Systeme d'Authentification

### 5.1 Comment ca marche

```
Utilisateur → /login → Email + Password → Supabase Auth → Cookie de session
                                                              ↓
                                          middleware.ts verifie le cookie
                                                              ↓
                                          Si valide → acces a /admin
                                          Si invalide → redirection /login
```

### 5.2 Les 3 couches de protection

#### Couche 1 : Middleware (`middleware.ts`)

Le middleware intercepte TOUTES les requetes vers `/admin/*` :
1. Verifie si un cookie de session existe
2. Verifie si la session est valide dans Supabase
3. Verifie si l'utilisateur est dans la table `admin_users` et actif
4. Si tout est OK → laisse passer
5. Sinon → redirige vers `/login`

#### Couche 2 : requireAuth() (`lib/auth/auth.ts`)

Chaque page admin appelle `await requireAuth()` en debut de composant :
```typescript
export default async function AdminPage() {
  await requireAuth();  // Redirige vers /login si pas admin
  // ... reste du composant
}
```

C'est une double protection au cas ou le middleware serait contourne.

#### Couche 3 : Row Level Security (RLS) dans Supabase

Les regles RLS dans la base de donnees empechent l'acces direct aux donnees meme si quelqu'un a la cle API.

### 5.3 Fichiers d'authentification

| Fichier | Utilisation | Fonctions |
|---------|-------------|-----------|
| `lib/auth/auth.ts` | Server Components uniquement | `getSession()`, `getUser()`, `isAdmin()`, `requireAuth()` |
| `lib/auth/auth-client.ts` | Client Components uniquement | `signInWithEmail()`, `signOut()` |
| `middleware.ts` | Automatique (chaque requete) | Verification session + admin |

### 5.4 Creer le premier admin

Apres avoir configure Supabase :

1. Dans Supabase Dashboard → Authentication → Users → Creer un utilisateur (email + password)
2. Copier l'UUID de l'utilisateur
3. Dans SQL Editor :
```sql
INSERT INTO admin_users (id, role, full_name, is_active)
VALUES ('uuid-copie-ici', 'super_admin', 'Nom Admin', true);
```

---

## 6. Ce Qui a Deja Ete Fait

### 6.1 Configuration du projet (100%)

| Element | Statut | Description |
|---------|--------|-------------|
| Projet Next.js 15 | FAIT | Cree avec `create-next-app`, TypeScript, Tailwind |
| Dependances | FAIT | Supabase, Lucide, date-fns, Framer Motion, shadcn/ui |
| Tailwind Config | FAIT | Couleurs BTS, fonts, animations personnalisees |
| Variables CSS | FAIT | Variables de couleur dans `globals.css` |
| Composants UI | FAIT | 12 composants shadcn/ui (Button, Input, Card, etc.) |
| Constantes | FAIT | Couleurs, services, navigation, metriques dans `constants.ts` |

### 6.2 Backend / Infrastructure (100%)

| Element | Statut | Description |
|---------|--------|-------------|
| Client Supabase serveur | FAIT | `lib/supabase/server.ts` avec gestion cookies |
| Client Supabase client | FAIT | `lib/supabase/client.ts` pour le navigateur |
| Client Admin Supabase | FAIT | `createAdminClient()` avec service_role_key |
| Middleware | FAIT | Protection routes `/admin/*` avec verification session + admin |
| Auth serveur | FAIT | `requireAuth()`, `getSession()`, `getUser()`, `isAdmin()` |
| Auth client | FAIT | `signInWithEmail()`, `signOut()` |
| Schema SQL | FAIT | 21 tables avec index, RLS, triggers |
| Variables d'env | FAIT | `.env.example` avec les 3 cles Supabase |

### 6.3 API Routes (structure seulement)

| Route | Statut | Description |
|-------|--------|-------------|
| `POST /api/contact` | STRUCTURE | Route creee, logique a implementer |
| `POST /api/newsletter` | STRUCTURE | Route creee, logique a implementer |
| `POST /api/quote` | STRUCTURE | Route creee, logique a implementer |

### 6.4 Pages (structure seulement)

Toutes les pages existent avec des TODO detailles mais le contenu est a implementer :

| Page | URL | Statut |
|------|-----|--------|
| Homepage | `/` | PLACEHOLDER avec TODO |
| Contact | `/contact` | PLACEHOLDER avec TODO |
| Entreprise | `/entreprise` | PLACEHOLDER avec TODO |
| Equipe | `/equipe` | PLACEHOLDER avec TODO |
| Services | `/services` | PLACEHOLDER avec TODO |
| Blog | `/blog` | PLACEHOLDER avec TODO |
| FAQ | `/faq` | PLACEHOLDER avec TODO |
| Projets | `/projets` | PLACEHOLDER avec TODO |
| Login | `/login` | PLACEHOLDER avec TODO |
| Admin Dashboard | `/admin` | PLACEHOLDER avec requireAuth() |
| Admin Contacts | `/admin/contacts` | PLACEHOLDER avec requireAuth() |
| Admin Newsletter | `/admin/newsletter` | PLACEHOLDER avec requireAuth() |
| Admin Blog | `/admin/blog` | PLACEHOLDER avec requireAuth() |
| Admin Projects | `/admin/projects` | PLACEHOLDER avec requireAuth() |
| Admin Team | `/admin/team` | PLACEHOLDER avec requireAuth() |
| Admin Services | `/admin/services` | PLACEHOLDER avec requireAuth() |
| Admin Settings | `/admin/settings` | PLACEHOLDER avec requireAuth() |
| Admin Layout | `/admin/*` | PLACEHOLDER (sidebar a creer) |

---

## 7. Comment Travailler sur le Projet

### 7.1 Installation

```bash
# 1. Cloner le projet
git clone <url-du-repo>
cd projet-stagiaires

# 2. Installer les dependances
npm install

# 3. Configurer l'environnement
cp .env.example .env.local
# Editer .env.local avec les vraies valeurs Supabase

# 4. Executer le schema SQL dans Supabase
# Copier le contenu de bridge_db_schema.sql dans SQL Editor de Supabase

# 5. Lancer le serveur de developpement
npm run dev
# Ouvrir http://localhost:3000
```

### 7.2 Workflow Git

```bash
# 1. Creer sa branche depuis main
git checkout main
git pull origin main
git checkout -b feature/ma-fonctionnalite

# 2. Coder...

# 3. Verifier que ca compile
npm run build

# 4. Commit
git add app/ma-page/page.tsx components/mon-composant.tsx
git commit -m "feat: ajout page ma-fonctionnalite"

# 5. Push sa branche
git push origin feature/ma-fonctionnalite

# 6. Creer une Pull Request sur GitHub
```

**Conventions de commit :**
- `feat: ...` → nouvelle fonctionnalite
- `fix: ...` → correction de bug
- `style: ...` → changement de style/CSS
- `refactor: ...` → reorganisation du code

### 7.3 Creer une nouvelle page publique

Exemple : creer la page Blog (`/blog`)

```tsx
// app/blog/page.tsx

import { createClient } from "@/lib/supabase/server";

export default async function BlogPage() {
  // 1. Recuperer les donnees depuis Supabase
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return (
    <main className="pt-20 px-4">
      {/* 2. Titre de la page */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>

        {/* 3. Grille d'articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600">{post.excerpt}</p>
              </article>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center py-12">
              Aucun article pour le moment
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
```

### 7.4 Creer une page admin

Exemple : creer la page Gestion Blog

```tsx
// app/admin/blog/page.tsx

import { requireAuth } from "@/lib/auth/auth";
import { createClient } from "@/lib/supabase/server";
import { FileText, Plus, Trash2, Edit } from "lucide-react";
import Link from "next/link";

export default async function AdminBlogPage() {
  // 1. TOUJOURS verifier l'authentification
  await requireAuth();

  // 2. Recuperer les donnees
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      {/* 3. Header avec bouton d'ajout */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gestion Blog</h1>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#0088C1] text-white rounded-lg"
        >
          <Plus className="w-4 h-4" /> Nouvel article
        </Link>
      </div>

      {/* 4. Tableau des donnees */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Titre
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Statut
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {posts?.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{post.title}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    post.status === "published"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {post.status === "published" ? "Publie" : "Brouillon"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link href={`/admin/blog/${post.id}/edit`}>
                      <Edit className="w-4 h-4 text-blue-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

### 7.5 Creer un formulaire (Client Component)

Exemple : formulaire de creation d'article

```tsx
// app/admin/blog/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";  // ← CLIENT !
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function NewBlogPost() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Generer le slug depuis le titre
  const generateSlug = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.from("blog_posts").insert({
      title,
      slug: generateSlug(title),
      content,
      status: "draft",
    });

    if (error) {
      alert("Erreur: " + error.message);
    } else {
      router.push("/admin/blog");
      router.refresh();  // Rafraichir les donnees
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Nouvel Article</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Titre</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="content">Contenu</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            required
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </form>
    </div>
  );
}
```

---

## 8. Composants UI Disponibles

Les composants suivants sont deja installes dans `components/ui/` et prets a utiliser :

### Bouton

```tsx
import { Button } from "@/components/ui/button";

<Button>Cliquer</Button>
<Button variant="outline">Contour</Button>
<Button variant="destructive">Supprimer</Button>
<Button disabled>Desactive</Button>
```

### Input / Champ texte

```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

<Label htmlFor="email">Email</Label>
<Input id="email" type="email" placeholder="votre@email.com" />
```

### Textarea / Zone de texte

```tsx
import { Textarea } from "@/components/ui/textarea";

<Textarea placeholder="Votre message..." rows={5} />
```

### Card / Carte

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Titre</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Contenu de la carte</p>
  </CardContent>
</Card>
```

### Accordion / Accordeon (pour FAQ)

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

<Accordion type="single" collapsible>
  <AccordionItem value="q1">
    <AccordionTrigger>Quelle est la question ?</AccordionTrigger>
    <AccordionContent>Voici la reponse.</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Icones (Lucide React)

```tsx
import { Mail, Phone, MapPin, ChevronRight, Plus, Trash2, Edit, Search } from "lucide-react";

<Mail className="w-5 h-5 text-[#0088C1]" />
<Phone className="w-4 h-4" />
```

Liste complete des icones : https://lucide.dev/icons/

---

## 9. Constantes Importantes

Le fichier `lib/constants.ts` contient toutes les informations reutilisables :

```typescript
import { COMPANY, SERVICES, COLORS, NAV_ITEMS, METRICS, VALUES } from "@/lib/constants";

// Utilisation
<h1>{COMPANY.name}</h1>                    // "Bridge Technologies Solutions"
<p>{COMPANY.email}</p>                      // "contact@bridgetech-solutions.com"
<p>{COMPANY.phones[0]}</p>                  // "+237 679 289 166"
<p style={{ color: COLORS.primary }}></p>   // couleur #0088C1

// Boucler sur les services
{SERVICES.map(service => (
  <div key={service.id}>
    <h3>{service.title}</h3>
    <p>{service.description}</p>
  </div>
))}

// Navigation
{NAV_ITEMS.map(item => (
  <a href={item.href}>{item.label}</a>
))}

// Chiffres cles
{METRICS.map(metric => (
  <div key={metric.key}>
    <p>{metric.value}</p>
    <p>{metric.label}</p>
  </div>
))}
```

---

## 10. Classes Tailwind CSS les Plus Utilisees

```
LAYOUT :
  max-w-7xl mx-auto          → Conteneur centre, max 1280px
  px-4 sm:px-6 lg:px-8       → Padding horizontal responsive
  pt-20                       → Padding top 80px (pour le header fixe)
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  → Grille responsive

TEXTE :
  text-4xl font-bold          → Titre principal
  text-xl font-semibold       → Sous-titre
  text-gray-600               → Texte secondaire
  text-sm                     → Petit texte

COULEURS BTS :
  bg-[#0088C1]                → Fond bleu BTS
  text-[#0088C1]              → Texte bleu BTS
  hover:bg-[#014B6A]          → Fond sombre au survol
  bg-primary                  → Utilise la variable Tailwind (si configuree)

CARTES :
  bg-white rounded-xl shadow-sm border border-gray-100 p-6  → Carte standard
  hover:shadow-md transition-shadow  → Effet au survol

BOUTONS :
  px-6 py-3 bg-[#0088C1] text-white rounded-lg hover:bg-[#014B6A] transition-colors

BADGES :
  px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700  → Badge vert
  px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700    → Badge gris

RESPONSIVE :
  hidden md:block             → Cache sur mobile, visible sur desktop
  md:grid-cols-2              → 2 colonnes a partir de 768px
  lg:grid-cols-3              → 3 colonnes a partir de 1024px
```

---

## 11. Commandes Utiles

```bash
npm run dev       # Lancer le serveur de developpement (http://localhost:3000)
npm run build     # Compiler pour la production (TOUJOURS tester avant de push)
npm run lint      # Verifier la qualite du code
npm run start     # Lancer la version de production (apres build)
```

---

## 12. Erreurs Courantes et Solutions

### Erreur : "Cannot find module 'clsx'"
```bash
npm install clsx tailwind-merge
```

### Erreur : "cookies() is not allowed in Client Components"
Tu importes `@/lib/supabase/server` dans un Client Component.
→ Utilise `@/lib/supabase/client` a la place.

### Erreur : "useRouter only works in Client Components"
Tu utilises `useRouter` sans `"use client"`.
→ Ajoute `"use client"` en premiere ligne du fichier.

### Erreur : "Text content did not match"
Probleme d'hydratation. Le serveur et le client rendent un contenu different.
→ Utilise `useEffect` pour les donnees qui changent cote client.

### Erreur : Build echoue avec "Type error"
```bash
# Verifier le type exact de l'erreur
npm run build
# Lire le message d'erreur et corriger le fichier indique
```

### Page admin accessible sans connexion
Verifie que tu as bien `await requireAuth()` au debut de ta page admin.

### Les donnees ne s'affichent pas
1. Verifie que la table existe dans Supabase
2. Verifie le nom de la table (orthographe exacte)
3. Verifie que les donnees existent dans la table
4. Ajoute un `console.log(error)` apres la requete pour voir l'erreur

---

## 13. Ressources

- **Next.js** : https://nextjs.org/docs
- **Supabase** : https://supabase.com/docs
- **Tailwind CSS** : https://tailwindcss.com/docs
- **Lucide Icons** : https://lucide.dev/icons/
- **TypeScript** : https://www.typescriptlang.org/docs/
- **Framer Motion** : https://www.framer.com/motion/

---

*Document cree le 16 fevrier 2026 - Bridge Technologies Solutions*
*Pour toute question, contacter le responsable du projet.*
