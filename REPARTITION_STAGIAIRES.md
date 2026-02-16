# Repartition des Taches - Equipe de 3 Stagiaires

## Projet : Bridge Technologies Solutions - Site Next.js 15

**Stack** : Next.js 15, TypeScript, Tailwind CSS, Supabase, Lucide Icons

---

## AVANT DE COMMENCER

### 1. Chaque stagiaire doit installer l'environnement

```bash
# Cloner le projet
git clone <url-du-repo>
cd bridge-site

# Installer les dependances
npm install

# Copier les variables d'environnement
cp .env.example .env.local
# Remplir avec les vraies valeurs Supabase

# Lancer le serveur
npm run dev
```

### 2. Organisation Git (IMPORTANT)

Chaque stagiaire travaille sur sa propre branche :

```bash
# Stagiaire 1 (Admin Dashboard)
git checkout -b feature/admin-dashboard

# Stagiaire 2 (Admin CRUD)
git checkout -b feature/admin-crud

# Stagiaire 3 (Contenu Dynamique + Finitions)
git checkout -b feature/dynamic-content
```

**Regles Git :**
- Toujours faire `git pull origin main` avant de commencer
- Commit regulierement avec messages clairs
- Faire une Pull Request quand la tache est terminee
- Ne JAMAIS push directement sur `main`

---

## STAGIAIRE 1 : Admin Dashboard + Blog + Projets

**Nom :** _______________
**Branche Git :** `feature/admin-dashboard`

### Fichiers a modifier/creer :

| # | Tache | Fichier | Statut |
|---|-------|---------|--------|
| 1 | Page dashboard admin (stats) | `app/admin/page.tsx` | FAIT |
| 2 | Page gestion blog - Liste articles | `app/admin/blog/page.tsx` | A FAIRE |
| 3 | Page creation article blog | `app/admin/blog/new/page.tsx` | A FAIRE |
| 4 | Page edition article blog | `app/admin/blog/[id]/edit/page.tsx` | A FAIRE |
| 5 | Page gestion projets - Liste | `app/admin/projects/page.tsx` | A FAIRE |
| 6 | Page creation projet | `app/admin/projects/new/page.tsx` | A FAIRE |
| 7 | Page edition projet | `app/admin/projects/[id]/edit/page.tsx` | A FAIRE |

### Details techniques :

#### Tache 2 : Page admin/blog (Liste articles)
```
Fichier : app/admin/blog/page.tsx

Ce qu'il faut faire :
- Appeler Supabase pour recuperer tous les blog_posts
- Afficher un tableau avec colonnes : Titre, Statut, Date, Actions
- Bouton "Nouvel article" qui redirige vers /admin/blog/new
- Boutons actions : Modifier (lien vers /admin/blog/[id]/edit), Supprimer
- Afficher le statut avec des badges colores (draft = gris, published = vert)

Modele a suivre : app/admin/contacts/page.tsx (meme structure)

Requete Supabase :
const { data: posts } = await supabase
  .from("blog_posts")
  .select("*")
  .order("created_at", { ascending: false });
```

#### Tache 3 : Page creation article blog
```
Fichier : app/admin/blog/new/page.tsx

Ce qu'il faut faire :
- Creer un formulaire avec les champs :
  - Titre (input text, obligatoire)
  - Slug (input text, genere automatiquement depuis le titre)
  - Extrait/excerpt (textarea, court resume)
  - Contenu (textarea grand, le texte complet de l'article)
  - Image URL (input text)
  - Tags (input text, separes par des virgules)
  - Statut (select : draft ou published)
- Bouton "Publier" qui insere dans Supabase
- Rediriger vers /admin/blog apres creation

Requete Supabase pour inserer :
const { data, error } = await supabase
  .from("blog_posts")
  .insert({
    title,
    slug,
    excerpt,
    content,
    featured_image_url: imageUrl,
    tags: tags.split(",").map(t => t.trim()),
    status: "draft", // ou "published"
  })
  .select()
  .single();
```

#### Tache 5-6 : Pages admin/projects (meme logique que blog)
```
Table Supabase : projects
Champs du formulaire :
  - Titre, Slug, Client, Description courte, Description complete
  - Image principale (URL), Technologies (tags)
  - Statut (draft/published), Featured (oui/non)

Meme structure que blog mais avec les champs specifiques aux projets.
```

### Conseils pour Stagiaire 1 :
- Commence par la page blog liste (tache 2), c'est la plus simple
- Copie la structure de `app/admin/contacts/page.tsx` comme modele
- Pour les formulaires, utilise les composants `Input` et `Button` de `components/ui/`
- N'oublie pas `await requireAuth()` en debut de chaque page
- Teste toujours avec `npm run build` avant de commit

---

## STAGIAIRE 2 : Admin Equipe + Services + Parametres

**Nom :** _______________
**Branche Git :** `feature/admin-crud`

### Fichiers a modifier/creer :

| # | Tache | Fichier | Statut |
|---|-------|---------|--------|
| 1 | Page gestion equipe - Liste | `app/admin/team/page.tsx` | A FAIRE |
| 2 | Page ajout membre equipe | `app/admin/team/new/page.tsx` | A FAIRE |
| 3 | Page edition membre equipe | `app/admin/team/[id]/edit/page.tsx` | A FAIRE |
| 4 | Page gestion services - Liste | `app/admin/services/page.tsx` | A FAIRE |
| 5 | Page creation service | `app/admin/services/new/page.tsx` | A FAIRE |
| 6 | Page edition service | `app/admin/services/[id]/edit/page.tsx` | A FAIRE |
| 7 | Page parametres du site | `app/admin/settings/page.tsx` | A FAIRE |

### Details techniques :

#### Tache 1 : Page admin/team (Liste membres)
```
Fichier : app/admin/team/page.tsx

Ce qu'il faut faire :
- Appeler Supabase pour recuperer tous les team_members
- Afficher un tableau avec : Photo, Nom, Poste, Statut, Actions
- Bouton "Ajouter un membre"
- Actions : Modifier, Supprimer

Requete Supabase :
const { data: members } = await supabase
  .from("team_members")
  .select("*")
  .order("order_position", { ascending: true });
```

#### Tache 2 : Page ajout membre equipe
```
Fichier : app/admin/team/new/page.tsx

Champs du formulaire :
  - Nom complet (obligatoire)
  - Poste/Fonction (obligatoire)
  - Bio (textarea)
  - URL photo (input text)
  - Email, Telephone
  - LinkedIn URL
  - Ordre d'affichage (number)
  - Membre vedette ? (checkbox)
  - Statut (draft/published)

Requete Supabase :
const { data, error } = await supabase
  .from("team_members")
  .insert({
    full_name: name,
    position,
    bio,
    photo_url: photoUrl,
    email,
    phone,
    linkedin_url: linkedin,
    order_position: order,
    is_featured: isFeatured,
    status: "published",
  });
```

#### Tache 4 : Page admin/services
```
Table Supabase : services
Afficher : Titre, Slug, Icone, Statut, Ordre
Actions : Modifier, Supprimer, Changer l'ordre
```

#### Tache 7 : Page parametres
```
Fichier : app/admin/settings/page.tsx

Ce qu'il faut faire :
- Charger les parametres depuis la table site_settings
- Afficher un formulaire avec sections :
  - Informations generales (nom du site, tagline)
  - Contact (email, telephone, adresse)
  - Reseaux sociaux (Facebook, LinkedIn, Twitter URLs)
  - Mode maintenance (on/off)
- Bouton "Sauvegarder" qui update dans Supabase

Requete Supabase pour lire :
const { data: settings } = await supabase
  .from("site_settings")
  .select("*");

Requete pour sauvegarder (upsert) :
await supabase
  .from("site_settings")
  .upsert({ key: "site_name", value: '"nouveau nom"' });
```

### Conseils pour Stagiaire 2 :
- Commence par la page equipe (tache 1), copie le modele de contacts
- Pour les formulaires, le composant est "use client" (cote client)
- Utilise `useRouter()` pour la redirection apres creation/modification
- Pour supprimer, utilise `.delete().eq("id", id)`
- Teste chaque page individuellement avant de passer a la suivante

---

## STAGIAIRE 3 : Contenu Dynamique + Integration + Finitions

**Nom :** _______________
**Branche Git :** `feature/dynamic-content`

### Fichiers a modifier :

| # | Tache | Fichier | Statut |
|---|-------|---------|--------|
| 1 | Blog public - Charger depuis Supabase | `app/blog/page.tsx` | A FAIRE |
| 2 | Blog detail - Charger depuis Supabase | `app/blog/[slug]/page.tsx` | A FAIRE |
| 3 | Projets public - Charger depuis Supabase | `app/projets/page.tsx` | A FAIRE |
| 4 | Projets detail - Charger depuis Supabase | `app/projets/[slug]/page.tsx` | A FAIRE |
| 5 | Equipe public - Charger depuis Supabase | `app/equipe/page.tsx` | A FAIRE |
| 6 | Temoignages homepage - Charger depuis Supabase | `components/home/TestimonialsCarousel.tsx` | A FAIRE |
| 7 | Connecter footer newsletter a l'API | `components/layout/Footer.tsx` | A FAIRE |

### Details techniques :

#### Tache 1 : Blog public dynamique
```
Fichier : app/blog/page.tsx

Ce qu'il faut faire :
- REMPLACER les donnees statiques par des donnees Supabase
- Garder le design actuel (ne pas changer le HTML/CSS)
- Charger uniquement les articles "published"

Ajouter en haut du fichier :
import { createClient } from "@/lib/supabase/server";

Dans la fonction du composant :
const supabase = await createClient();
const { data: posts } = await supabase
  .from("blog_posts")
  .select("*")
  .eq("status", "published")
  .order("published_at", { ascending: false });

// Si aucun article, afficher un message "Aucun article pour le moment"
// Sinon, mapper les articles dans les cartes existantes
```

#### Tache 2 : Blog detail dynamique
```
Fichier : app/blog/[slug]/page.tsx

Ce qu'il faut faire :
- Recuperer l'article par son slug
- Afficher le contenu complet
- Si article non trouve, afficher page 404

const { data: post } = await supabase
  .from("blog_posts")
  .select("*")
  .eq("slug", slug)
  .eq("status", "published")
  .single();

if (!post) {
  notFound(); // import { notFound } from "next/navigation"
}
```

#### Tache 3-4 : Projets dynamiques (meme logique que blog)
```
Table : projects
Filtrer : status = "published"
Trier : order_position ASC ou created_at DESC
Detail : recuperer par slug
```

#### Tache 5 : Equipe dynamique
```
Fichier : app/equipe/page.tsx

const { data: members } = await supabase
  .from("team_members")
  .select("*")
  .eq("status", "published")
  .order("order_position", { ascending: true });

Mapper les membres dans les cartes existantes.
Garder le design actuel.
```

#### Tache 7 : Connecter newsletter du footer
```
Fichier : components/layout/Footer.tsx

Le formulaire newsletter du footer doit appeler /api/newsletter
Ajouter un state pour l'email et le status
Faire un fetch POST vers /api/newsletter avec l'email
Afficher un message de succes ou d'erreur
```

### Conseils pour Stagiaire 3 :
- Tu modifies des fichiers EXISTANTS, ne supprime pas le design
- Remplace seulement les donnees statiques par des appels Supabase
- Garde toujours un fallback (message si aucune donnee)
- Teste avec `npm run build` pour verifier qu'il n'y a pas d'erreur
- Si une table est vide, la page doit quand meme s'afficher correctement

---

## PLANNING SUGGERE

### Semaine 1 : Prise en main + Premieres taches

| Jour | Stagiaire 1 | Stagiaire 2 | Stagiaire 3 |
|------|-------------|-------------|-------------|
| Lun  | Installation + Comprendre le code | Installation + Comprendre le code | Installation + Comprendre le code |
| Mar  | Admin Blog - Liste | Admin Equipe - Liste | Blog public dynamique |
| Mer  | Admin Blog - Creation | Admin Equipe - Creation | Blog detail dynamique |
| Jeu  | Admin Blog - Edition | Admin Equipe - Edition | Projets public dynamique |
| Ven  | Tests + Debug blog | Tests + Debug equipe | Projets detail dynamique |

### Semaine 2 : Avancement + Integration

| Jour | Stagiaire 1 | Stagiaire 2 | Stagiaire 3 |
|------|-------------|-------------|-------------|
| Lun  | Admin Projets - Liste | Admin Services - Liste | Equipe public dynamique |
| Mar  | Admin Projets - Creation | Admin Services - Creation | Temoignages dynamiques |
| Mer  | Admin Projets - Edition | Admin Services - Edition | Newsletter footer |
| Jeu  | Tests + Debug projets | Page parametres | Tests + Debug |
| Ven  | Pull Request + Review | Pull Request + Review | Pull Request + Review |

---

## REFERENCES UTILES

### Structure des fichiers importants
```
bridge-site/
  app/
    admin/
      page.tsx              <- Dashboard (FAIT)
      contacts/page.tsx     <- Gestion contacts (FAIT - BON MODELE)
      newsletter/page.tsx   <- Gestion newsletter (FAIT - BON MODELE)
      blog/page.tsx         <- Stagiaire 1
      projects/page.tsx     <- Stagiaire 1
      team/page.tsx         <- Stagiaire 2
      services/page.tsx     <- Stagiaire 2
      settings/page.tsx     <- Stagiaire 2
    blog/page.tsx           <- Stagiaire 3
    projets/page.tsx        <- Stagiaire 3
    equipe/page.tsx         <- Stagiaire 3
  lib/
    supabase/
      server.ts             <- Client Supabase (import dans Server Components)
      client.ts             <- Client Supabase (import dans Client Components)
    auth/
      auth.ts               <- requireAuth() pour proteger pages admin
      auth-client.ts        <- signIn/signOut pour composants client
  components/
    ui/                     <- Composants reutilisables (Button, Input, etc.)
    admin/                  <- Composants admin (StatsCard, etc.)
```

### Comment proteger une page admin
```typescript
// En haut de chaque page admin :
import { requireAuth } from "@/lib/auth/auth";
import { createClient } from "@/lib/supabase/server";

export default async function MaPageAdmin() {
  await requireAuth(); // Redirige vers /login si pas connecte

  const supabase = await createClient();
  // ... requetes Supabase
}
```

### Comment creer un formulaire (Client Component)
```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client"; // CLIENT (pas server)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MonFormulaire() {
  const router = useRouter();
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();

    const { error } = await supabase
      .from("ma_table")
      .insert({ title });

    if (!error) {
      router.push("/admin/ma-page");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      <Button type="submit">Enregistrer</Button>
    </form>
  );
}
```

### Tables Supabase principales
```
blog_posts    : id, slug, title, excerpt, content, featured_image_url, status, tags, published_at
projects      : id, slug, title, client_name, short_description, full_description, technologies, status
team_members  : id, full_name, position, bio, photo_url, email, linkedin_url, order_position, status
services      : id, slug, title, short_description, full_description, icon, status, order_position
site_settings : id, key, value, category
contacts      : id, name, email, phone, subject, message, status
newsletters   : id, email, status, source, subscribed_at
```

---

## REGLES D'EQUIPE

1. **Ne modifie JAMAIS un fichier d'un autre stagiaire** sans en parler d'abord
2. **Commit souvent** avec des messages clairs : `"feat: ajout page admin blog"`
3. **Teste avant de push** : `npm run build` doit passer sans erreur
4. **Demande de l'aide** si tu es bloque plus de 30 minutes
5. **Documente** : ajoute un commentaire en haut de chaque fichier cree
6. **Ne supprime rien** sans autorisation - commente le code si necessaire

---

## CHECKLIST FINALE (avant Pull Request)

- [ ] `npm run build` passe sans erreur
- [ ] Toutes les pages s'affichent correctement
- [ ] Les formulaires fonctionnent (creation, modification, suppression)
- [ ] Les pages admin sont protegees (requireAuth)
- [ ] Le design est coherent avec le reste du site
- [ ] Pas de console.error dans le navigateur
- [ ] Les messages sont en francais
- [ ] Le code est propre et commente

---

*Document cree le 16 fevrier 2026 - Bridge Technologies Solutions*
