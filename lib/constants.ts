/**
 * Constantes du projet Bridge Technologies Solutions
 * Respecte la charte graphique et les informations de l'entreprise
 */

// ============================================================================
// COULEURS (Charte Graphique)
// ============================================================================
export const COLORS = {
  primary: "#0088C1",
  primaryDark: "#014B6A",
  primaryLight: "#78C2E1",
  primaryLighter: "#D6F2FE",
  black: "#000000",
  gray: "#878786",
  white: "#FFFFFF",
} as const;

// ============================================================================
// INFORMATIONS ENTREPRISE
// ============================================================================
export const COMPANY = {
  name: "Bridge Technologies Solutions",
  shortName: "BTS",
  tagline: "We drive your digital transformation",
  description:
    "Fournisseur de solutions technologiques pour les entreprises au Cameroun",
  email: "contact@bridgetech-solutions.com",
  phones: ["+237 679 289 166", "+237 692 143 811"],
  address: "Bonamoussadi, DLA, Douala, Cameroun",
  social: {
    facebook: "https://www.facebook.com/people/Bridge-Technologies-Solutions/100093075549355/",
    linkedin: "https://www.linkedin.com/company/bridgetechnologies-solutions/",
  },
} as const;

// ============================================================================
// SERVICES
// ============================================================================
export const SERVICES = [
  {
    id: "gestion-projets",
    slug: "gestion-projets",
    title: "Gestion des projets",
    description:
      "Nous donnons à vos projets un cadre de référence solide et veillons à mener vos projets à leurs termes dans le respect des objectifs de planification.",
    image: "/images/tasklist.png",
    icon: "folder-kanban",
  },
  {
    id: "infrastructure",
    slug: "infrastructure",
    title: "Infrastructure informatique",
    description:
      "Un système informatique performant nécessite une infrastructure solide et intelligemment conçue selon vos activités. Nous pouvons vous recommander les solutions les plus efficaces et s'occuper de concevoir et installer vos systèmes.",
    image: "/images/infrastructure.png",
    icon: "server",
  },
  {
    id: "cloud",
    slug: "cloud",
    title: "Solutions cloud computing",
    description:
      "Avec la technologie de cloud computing, vos fichiers sont stockés de manière virtuelle. Ils sont accessibles depuis n'importe quel ordinateur ou appareil mobile connecté à Internet, et doté d'une application de cloud.",
    image: "/images/cloud.png",
    icon: "cloud",
  },
  {
    id: "protection",
    slug: "protection",
    title: "Protection | Sécurité des données",
    description:
      "La protection des données personnelles nécessite de prendre des mesures techniques et organisationnelles appropriées afin de garantir un niveau de sécurité adapté au risque.",
    image: "/images/insurance.png",
    icon: "shield-check",
  },
  {
    id: "dsi-externe",
    slug: "dsi-externe",
    title: "DSI externe",
    description:
      "Un accompagnement indépendant pour vous permettre de prendre les bonnes décisions, un DSI adapté aux besoins et au budget des petites entreprises.",
    image: "/images/responsive.png",
    icon: "users",
  },
  {
    id: "conseils",
    slug: "conseils",
    title: "Conseils | Consultants",
    description:
      "Bénéficiez d'un soutien technique pour faire évoluer votre système informatique. Nous vous apportons des solutions adaptées à votre infrastructure.",
    image: "/images/businessman.png",
    icon: "lightbulb",
  },
] as const;

// ============================================================================
// VALEURS ENTREPRISE
// ============================================================================
export const VALUES = [
  {
    id: "quality",
    title: "Qualité",
    description:
      "Respect de nos engagements et priorisation de la satisfaction client",
    image: "/images/quality.png",
    icon: "award",
  },
  {
    id: "collaboration",
    title: "Collaboration",
    description:
      "Professionnalisme et transparence vis-à-vis de nos partenaires",
    image: "/images/friendship.png",
    icon: "handshake",
  },
  {
    id: "accomplishment",
    title: "Accomplissement",
    description:
      "Développement des compétences de nos employés pour une qualité de service unique",
    image: "/images/certificate.png",
    icon: "trophy",
  },
] as const;

// ============================================================================
// PARTENAIRES (Technologies)
// ============================================================================
export const PARTNERS = {
  cloud: ["AWS", "Azure", "gcp", "VMware", "Hyper-V"],
  security: ["Cisco", "Fortinet", "Palo_Alto", "Juniper"],
  infrastructure: ["mshyperv", "Dell", "Huawei", "Synology", "NetApp"],
  other: ["Veeam", "Hikvision"],
} as const;

// ============================================================================
// NAVIGATION
// ============================================================================
export const NAV_ITEMS = [
  { label: "Accueil", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: SERVICES.map((s) => ({
      label: s.title,
      href: `/services/${s.slug}`,
      icon: s.icon,
    })),
  },
  { label: "L'entreprise", href: "/entreprise" },
  { label: "Contact", href: "/contact" },
  { label: "Assent", href: "/assent", badge: "New" },
] as const;

// ============================================================================
// MÉTRIQUES / CHIFFRES CLÉS
// ============================================================================
export const METRICS = [
  {
    key: "years_experience",
    value: "10+",
    label: "Années d'expérience",
    icon: "calendar",
  },
  {
    key: "clients_served",
    value: "50+",
    label: "Clients satisfaits",
    icon: "users",
  },
  {
    key: "projects_completed",
    value: "100+",
    label: "Projets réalisés",
    icon: "check-circle",
  },
  {
    key: "team_members",
    value: "15+",
    label: "Experts qualifiés",
    icon: "user-check",
  },
] as const;

// ============================================================================
// CONFIGURATION
// ============================================================================
export const CONFIG = {
  siteName: COMPANY.name,
  siteUrl: "https://bridgetech-solutions.com",
  defaultLocale: "fr",
  locales: ["fr", "en"],
  postsPerPage: 10,
  maxUploadSize: 5 * 1024 * 1024, // 5MB
} as const;

// ============================================================================
// ANIMATIONS
// ============================================================================
export const ANIMATION = {
  duration: {
    fast: 0.15,
    base: 0.3,
    slow: 0.5,
  },
  ease: {
    smooth: [0.4, 0, 0.2, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
  },
} as const;
export const IMAGES = [
  {
    key: "infogerance",
    title: "Infogérance",
    description:
      "Optimisez votre productivité en nous confiant la gestion de votre système informatique, car votre succès est notre priorité.",
    image: "/images/noc.jpg",
  },
  {
    key: "infrastructure",
    title: "Infrastructure Informatique",
    description:
      "Nous vous recommandons les solutions les plus efficaces pour concevoir et installer vos systèmes informatiques.",
    image: "/images/iminfinf2.png",
  },
  {
    key: "consulting",
    title: "Conseils | Consultants",
    description:
      "Bénéficiez d'un soutien technique pour faire évoluer votre système informatique.",
    image: "/images/consulting.png",
  },
  {
    key: "bridge",
    title: "Bridge Technologies Solutions",
    description: "We drive your digital transformation.",
    image: "/images/btshomeimage.jpg",
  },
  {
    key: "gestion_projets",
    title: "Gestion des Projets",
    description:
      "Nous donnons à vos projets un cadre de référence solide.",
    image: "/images/gestproj.png",
  },
] as const;

