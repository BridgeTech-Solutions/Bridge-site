/**
 * Constantes du projet Bridge Technologies Solutions
 * Source de vérité unique — importer depuis ici, ne jamais réécrire.
 */

// ============================================================================
// COULEURS (Charte Graphique)
// ============================================================================
export const COLORS = {
  primary:       "#0088C1",
  primaryDark:   "#014B6A",
  primaryLight:  "#78C2E1",
  primaryLighter:"#D6F2FE",
  darkBg:        "#0a1628",
  darkBg2:       "#071020",
  darkBg3:       "#012a45",
  black:         "#000000",
  gray:          "#878786",
  white:         "#FFFFFF",
} as const;

// ============================================================================
// INFORMATIONS ENTREPRISE
// ============================================================================
export const COMPANY = {
  name:      "Bridge Technologies Solutions",
  shortName: "BTS",
  tagline:   "We drive your digital transformation",
  description:
    "Fournisseur de solutions technologiques pour les entreprises au Cameroun",
  email:   "contact@bridgetech-solutions.com",
  phones:  ["+237 679 289 166", "+237 692 143 811"] as const,
  address: {
    street:  "Bonamoussadi",
    city:    "Douala",
    region:  "DLA",
    country: "Cameroun",
    full:    "Bonamoussadi, Douala, Cameroun",
  },
  social: {
    facebook: "https://www.facebook.com/people/Bridge-Technologies-Solutions/100093075549355/",
    linkedin: "https://www.linkedin.com/company/bridgetechnologies-solutions/",
  },
  logo: "/images/logo.png",
} as const;

// ============================================================================
// SERVICES
// Slugs canoniques — utiliser partout (pages, BD, navigation)
// ============================================================================
export const SERVICES = [
  {
    slug:      "gestion-projets",
    title:     "Gestion des projets",
    subtitle:  "Accompagnement dans vos projets IT",
    shortDesc: "Nous donnons à vos projets un cadre de référence solide et veillons à les mener à terme dans le respect de vos objectifs de planification.",
    icon:      "FolderKanban",   // Lucide icon name (PascalCase)
    image:     "/images/tasklist.png",
    num:       "01",
  },
  {
    slug:      "infrastructure",
    title:     "Infrastructure informatique",
    subtitle:  "Réseaux, virtualisation & stockage",
    shortDesc: "Un système informatique performant nécessite une infrastructure solide. Fibre optique, VPN, virtualisation et fourniture de matériel.",
    icon:      "Server",
    image:     "/images/infrastructure.png",
    num:       "02",
  },
  {
    slug:      "cloud",
    title:     "Solutions Cloud Computing",
    subtitle:  "Hébergez vos services dans les meilleures conditions",
    shortDesc: "Cloud public, privé ou hybride — stockez vos données de manière virtuelle, accessibles partout, sécurisées et toujours disponibles.",
    icon:      "Cloud",
    image:     "/images/cloud.png",
    num:       "03",
  },
  {
    slug:      "protection-donnees",
    title:     "Protection & Sécurité des données",
    subtitle:  "Sauvegarde, restauration et supervision",
    shortDesc: "Des mesures rigoureuses pour protéger vos données personnelles et professionnelles. Sauvegarde, restauration et supervision réseau.",
    icon:      "ShieldCheck",
    image:     "/images/insurance.png",
    num:       "04",
  },
  {
    slug:      "dsi-externe",
    title:     "DSI Externe",
    subtitle:  "Pilotage stratégique de votre système d'information",
    shortDesc: "Un accompagnement indépendant pour prendre les bonnes décisions IT. Nos DSI expérimentés pilotent votre transformation digitale.",
    icon:      "Users",
    image:     "/images/responsive.png",
    num:       "05",
  },
  {
    slug:      "conseils-consultants",
    title:     "Conseils & Consultants",
    subtitle:  "Expertise technique et accompagnement stratégique",
    shortDesc: "Bénéficiez d'un soutien technique expert pour faire évoluer votre système informatique avec agilité et sécurité.",
    icon:      "Lightbulb",
    image:     "/images/businessman.png",
    num:       "06",
  },
] as const;

// ============================================================================
// VALEURS ENTREPRISE
// ============================================================================
export const VALUES = [
  {
    id:          "quality",
    title:       "Qualité",
    description: "Respect de nos engagements et priorisation de la satisfaction client à chaque étape de nos projets.",
    image:       "/images/quality.png",
  },
  {
    id:          "collaboration",
    title:       "Collaboration",
    description: "Professionnalisme et transparence vis-à-vis de nos partenaires pour bâtir des relations durables.",
    image:       "/images/friendship.png",
  },
  {
    id:          "accomplishment",
    title:       "Accomplissement",
    description: "Développement continu des compétences de nos équipes pour une qualité de service unique et sans compromis.",
    image:       "/images/certificate.png",
  },
] as const;

// ============================================================================
// PARTENAIRES — liste plate avec logo
// ============================================================================
export const PARTNERS = [
  { name: "Cisco",     logo: "/images/partners/cisco.png"     },
  { name: "Fortinet",  logo: "/images/partners/fortinet.png"  },
  { name: "Huawei",    logo: "/images/partners/huawei.png"    },
  { name: "Hikvision", logo: "/images/partners/hikvision.png" },
  { name: "Juniper",   logo: "/images/partners/juniper.png"   },
  { name: "Palo Alto", logo: "/images/partners/paloalto.png"  },
  { name: "HPE",       logo: "/images/partners/hpe.png"       },
  { name: "AWS",       logo: "/images/partners/aws.png"       },
  { name: "Dell",      logo: "/images/partners/dell.png"      },
  { name: "Microsoft", logo: "/images/partners/microsoft.png" },
  { name: "VMware",    logo: "/images/partners/vmware.png"    },
  { name: "Veeam",     logo: "/images/partners/veeam.png"     },
  { name: "NetApp",    logo: "/images/partners/netapp.png"    },
  { name: "Azure",     logo: "/images/partners/azure.png"     },
  { name: "GCP",       logo: "/images/partners/gcp.png"       },
  { name: "Synology",  logo: "/images/partners/Synology.png"  },
] as const;

// ============================================================================
// NAVIGATION
// ============================================================================
export const NAV_ITEMS = [
  { label: "Accueil",      href: "/" },
  { label: "Services",     href: "/services" },
  { label: "L'entreprise", href: "/entreprise" },
  { label: "Contact",      href: "/contact" },
  { label: "Assent",       href: "/assent", badge: "New" },
] as const;

// Liens services pour footer/header
export const SERVICE_NAV = SERVICES.map((s) => ({
  label: s.title,
  href:  `/services/${s.slug}`,
}));

// ============================================================================
// MÉTRIQUES / CHIFFRES CLÉS
// ============================================================================
export const METRICS = [
  { value: "10+",  label: "Années d'expérience",     icon: "Award"      },
  { value: "50+",  label: "Entreprises accompagnées", icon: "Briefcase"  },
  { value: "100+", label: "Projets réalisés",         icon: "TrendingUp" },
  { value: "6",    label: "Domaines d'expertise",     icon: "Globe"      },
] as const;

// ============================================================================
// SERVICE IMAGES (homepage thumbnails)
// ============================================================================
export const SERVICE_IMAGES: Record<string, string> = {
  "gestion-projets":    "/images/gestproj.png",
  "infrastructure":     "/images/iminfinf2.png",
  "cloud":              "/images/cloud.png",
  "protection-donnees": "/images/security.jpeg",
  "dsi-externe":        "/images/noc.jpg",
  "conseils-consultants": "/images/consulting.png",
};

// ============================================================================
// CONFIGURATION
// ============================================================================
export const CONFIG = {
  siteName:      COMPANY.name,
  siteUrl:       "https://bridgetech-solutions.com",
  defaultLocale: "fr",
  postsPerPage:  10,
  maxUploadSize: 5 * 1024 * 1024, // 5MB
} as const;

// ============================================================================
// ANIMATIONS
// ============================================================================
export const ANIMATION = {
  duration: { fast: 0.15, base: 0.3, slow: 0.5 },
  ease: {
    smooth: [0.4, 0, 0.2, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
  },
} as const;
