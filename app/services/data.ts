import { SERVICES as CONST_SERVICES } from "@/lib/constants";

export interface FeatureSubSection {
  heading: string;
  items: string[];
}

export interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
  items: string[];
  subSections?: FeatureSubSection[]; // sous-groupes avec titres (ex: infrastructure "Offres")
}

export interface ServiceHighlight {
  label: string;
}

export interface CompatibilityGroup {
  heading: string;
  items: string[];
}

export interface CloudType {
  title: string;
  desc: string;
}

export interface Service {
  slug: string;
  num: string;
  icon: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  intro: string;
  features: ServiceFeature[];
  /** "Pourquoi nous choisir" — grille de badges (infrastructure) */
  highlights?: ServiceHighlight[];
  /** Types de cloud — banderole sombre (cloud) */
  cloudTypes?: CloudType[];
  /** Table de compatibilité (protection) */
  compatibility?: CompatibilityGroup[];
  /** Outils de supervision (protection) */
  supervisionTools?: string[];
}

const SERVICE_DETAILS: Record<string, Omit<Service, "slug"|"num"|"icon"|"title"|"subtitle"|"shortDesc">> = {

  /* ══════════════════════════════════════════════════════════
     01 — GESTION DES PROJETS
  ══════════════════════════════════════════════════════════ */
  "gestion-projets": {
    intro: "Nous vous accompagnons au quotidien dans l'exploitation des solutions que nous vous délivrons, grâce à une gamme complète de services et d'expertises informatiques. Nous donnons à vos projets un cadre de référence solide et veillons à les mener à leurs termes dans le respect des objectifs de planification.",
    features: [
      {
        icon: "/images/help.png",
        title: "Conseil",
        description: "Nous vous conseillons dans la conception de vos projets IT et intégrons vos services et applications au sein de plateformes de Cloud privé ou de Cloud public. Notre équipe d'experts vous accompagne de la définition du besoin jusqu'à la mise en production.",
        items: [
          "Conception et cadrage de vos projets IT",
          "Intégration sur plateformes Cloud privé ou public",
          "Accompagnement personnalisé de A à Z",
          "Choix des solutions techniques adaptées",
        ],
      },
      {
        icon: "/images/cloudnet.png",
        title: "Exploitation",
        description: "Nous exploitons, infogérons et réalisons le maintien en conditions opérationnelles (MCO) de vos applications grâce aux services cloud que nous proposons sur les différentes plateformes. Un suivi rigoureux et des rapports réguliers garantissent la performance de votre SI.",
        items: [
          "Infogérance et maintien en conditions opérationnelles (MCO)",
          "Gestion des applications sur les plateformes cloud",
          "Reporting et suivi de performance",
          "Gestion des mises à jour et correctifs",
        ],
      },
      {
        icon: "/images/insurance.png",
        title: "Sécurité",
        description: "BTS garantit la sécurité de votre SI en auditant et testant sa solidité, du code aux infrastructures jusqu'aux réseaux informatiques et télécoms. Nous mettons en place des dispositifs de protection adaptés à vos risques métier.",
        items: [
          "Audit et tests de solidité du SI",
          "Sécurisation du code aux infrastructures",
          "Couverture réseau informatique et télécom",
          "Gestion des vulnérabilités et correctifs de sécurité",
        ],
      },
      {
        icon: "/images/customer-service.png",
        title: "Support",
        description: "BTS accompagne ses clients dans la résolution d'incidents grâce à des équipes support disponibles par email, téléphone et contrôle à distance. Nos techniciens interviennent rapidement pour garantir la continuité de votre activité.",
        items: [
          "Équipes disponibles par email et téléphone",
          "Contrôle à distance et intervention sur site",
          "Résolution d'incidents en temps réel",
          "Suivi et traçabilité des interventions",
        ],
      },
      {
        icon: "/images/exchange.png",
        title: "Migration",
        description: "BTS prend en charge la migration de l'ensemble de vos applicatifs et de vos données vers la plateforme cloud de votre choix, sans interruption de service. Notre méthode éprouvée garantit une transition transparente pour vos utilisateurs.",
        items: [
          "Migration vers la plateforme cloud de votre choix",
          "Zéro interruption de service garantie",
          "Migration complète applicatifs et données",
          "Tests de validation avant bascule définitive",
        ],
      },
      {
        icon: "/images/settings.png",
        title: "BTS c'est aussi",
        description: "Au-delà des services classiques, BTS apporte une dimension humaine et organisationnelle à vos projets. Nous optimisons vos procédures de travail et formons vos équipes aux méthodologies agiles pour une meilleure efficacité collective.",
        items: [
          "Optimisation des procédures",
          "Éducation et adoption de la méthode AGILE",
          "Mise à disposition des outils de gestion",
          "Formation en Gestion de Projet",
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     02 — INFRASTRUCTURE
  ══════════════════════════════════════════════════════════ */
  "infrastructure": {
    intro: "Nos offres de fibre optique entreprise et Radio sont accessibles sur tout le territoire via un réseau d'opérateurs partenaires. Bénéficiez d'un réseau internet très haut débit, fiable et adapté à l'activité de votre entreprise — Fibre Optique, Radio, 4G, Vsat, VPN, Téléphonie IP...",
    features: [
      {
        icon: "/images/tasklist.png",
        title: "Offres réseaux",
        description: "Nous déployons des solutions de connectivité complètes couvrant tous les types de liaisons. Nos offres sont accessibles sur l'ensemble du territoire via notre réseau d'opérateurs partenaires, avec des engagements de qualité de service stricts.",
        items: [],
        subSections: [
          {
            heading: "Liens Internet",
            items: [
              "Offre fibre optique entreprise sécurisée",
              "Offre Radio",
              "Offre 4G",
              "Offre Vsat",
            ],
          },
          {
            heading: "VPN MPLS",
            items: [
              "Interconnexion multi-sites via un réseau privé sécurisé",
            ],
          },
          {
            heading: "Téléphonie IP",
            items: [
              "Téléphonie hébergée",
              "Téléphone sur IP — Trunk IP (raccordement PABX vers IP)",
            ],
          },
        ],
      },
      {
        icon: "/images/advantages.png",
        title: "Avantages",
        description: "Grâce à notre réseau d'opérateurs partenaires couvrant l'ensemble du territoire, nous vous offrons des engagements de qualité de service stricts. Nos liens de secours automatiques garantissent la continuité de vos activités même en cas de panne.",
        items: [
          "Couverture complète du territoire via nos opérateurs partenaires",
          "Garantie de Temps de Rétablissement (GTR) de 4 heures",
          "Liens de secours Fibre / Radio / 4G / Vsat",
          "Débit symétrique 100% garanti jusqu'à 1 Gbps",
        ],
      },
      {
        icon: "/images/customer-service.png",
        title: "Accompagnement & installation",
        description: "Nos équipes prennent en charge l'installation complète de vos liens internet, réseaux sécurisés et centres de téléphonie. Un service de supervision et un support technique dédiés assurent la disponibilité permanente de votre infrastructure.",
        items: [
          "Installation sur site de vos liens internet et réseaux sécurisés",
          "Centre de téléphonie IP déployé et configuré par nos équipes",
          "Service de supervision proactive",
          "Support technique disponible par email et téléphone",
        ],
      },
      {
        icon: "/images/customer-service.png",
        title: "Virtualisation & Stockage",
        description: "La préservation de vos données est un enjeu stratégique pour le déroulement de votre activité. Nous déployons des solutions de sauvegarde fiables, simples et évolutives, garantissant une restauration rapide de vos données en cas d'incident.",
        items: [
          "Solution de sauvegarde de données en ligne de référence",
          "Adaptée aux TPE, PME et grands comptes",
          "Fonctionne sous Windows (postes individuels et serveurs)",
          "Temps de sauvegarde et restauration très courts (mode Delta Bloc)",
          "Sauvegarde de tous les types de fichiers bureautiques",
          "Abandon total des supports physiques de sauvegarde",
        ],
      },
      {
        icon: "/images/insurance.png",
        title: "PCA / PRA — Plan de reprise d'activité",
        description: "L'association de Veeam Cloud Connect et Veeam Backup & Replication est une solution fiable pour la réalisation de votre Plan de Reprise d'Activité informatique. Vos services sont rétablis en quelques minutes depuis notre infrastructure cloud sécurisée.",
        items: [
          "Reprise après incident à la demande (DRaaS) rapide via le cloud",
          "Réplication à partir de fichiers de sauvegarde sans impact sur la production",
          "Réplication avancée des VMs en mode image",
          "Basculement de site complet/partiel via portail web en libre-service",
          "Plans de basculement avec orchestration intégrée en 1 clic",
          "Basculements programmés — zéro perte de données",
        ],
      },
    ],
    highlights: [
      { label: "Très haut débit jusqu'à 1 Gbps" },
      { label: "Débit symétrique 100% garanti" },
      { label: "Fiabilité & stabilité SLA 99,9%" },
      { label: "Transit IP protégé anti-DDoS" },
      { label: "GTR 4 heures" },
      { label: "Liens de secours Radio / 4G / Vsat / Fibre" },
      { label: "Service d'installation sur site" },
      { label: "Supervision & support 24/7" },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     03 — CLOUD
  ══════════════════════════════════════════════════════════ */
  "cloud": {
    intro: "Avec la technologie cloud, vos fichiers sont stockés de manière virtuelle, accessibles partout et toujours disponibles. BTS vous propose des solutions cloud adaptées à chaque réalité d'entreprise, avec un accompagnement professionnel complet à chaque étape.",
    cloudTypes: [
      { title: "Cloud Public",  desc: "Flexibilité maximale, paiement à l'usage, scalabilité immédiate" },
      { title: "Cloud Privé",   desc: "Sécurité renforcée, contrôle total de vos données et ressources" },
      { title: "Cloud Hybride", desc: "Le meilleur des deux mondes — flexibilité et sécurité combinées" },
    ],
    features: [
      {
        icon: "/images/tasklist.png",
        title: "Audit, Conseil & Sécurité",
        description: "Confiez-nous l'étude de votre projet et tirez parti de notre accompagnement personnalisé. Nous analysons en profondeur votre environnement existant, réalisons un audit de sécurité complet et vous recommandons les solutions techniques les mieux adaptées à votre contexte.",
        items: [
          "Analyse de vos services et de vos besoins",
          "Audit de sécurité et préconisations",
          "Choix des solutions techniques adaptées",
          "Étude de faisabilité et planning de migration",
        ],
      },
      {
        icon: "/images/speed.png",
        title: "Optimisation des ressources",
        description: "Optimisez vos infrastructures et exploitez pleinement les ressources de votre cloud pour booster la performance de vos services. Notre approche vise à réduire vos coûts d'infrastructure tout en améliorant les performances et la disponibilité.",
        items: [
          "Étude et migration vers le Cloud",
          "Implémentation de vos applications et intégration des données",
          "Optimisation des coûts d'infrastructures",
          "Mise en place de politiques d'auto-scaling",
        ],
      },
      {
        icon: "/images/pie.png",
        title: "Services managés",
        description: "Disposez d'un cloud opérationnel, agile et sécurisé grâce à nos nombreux services managés. Nous prenons en charge la gestion quotidienne de vos environnements cloud, du déploiement initial à la maintenance continue.",
        items: [
          "Préparation et management des comptes",
          "Déploiement et maintenance des services",
          "Monitoring 24/7, gestion des alertes et des incidents",
          "Rapports de performance et optimisation continue",
        ],
      },
      {
        icon: "/images/cloudnet.png",
        title: "Infrastructure Data Center",
        description: "Notre Data Center Tier III offre des solutions d'hébergement physique avec les plus hauts niveaux de disponibilité et de sécurité. Certifié ISO 27001 et HDS, il garantit la conformité de vos données sensibles.",
        items: [
          "Location de baies serveurs : 1U, 1/2 baie, baie complète, suite privative",
          "Services de PRA / PCA",
          "Location de baies de stockage et équipements télécom",
          "Certifié Tier III, ISO 27001 et HDS — Environnement PCI DSS",
          "Réseau électrique entièrement redondé",
          "Infrastructures supervisées 24h/24",
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     04 — PROTECTION DES DONNÉES
  ══════════════════════════════════════════════════════════ */
  "protection-donnees": {
    intro: "La protection des données personnelles nécessite de prendre des mesures rigoureuses. Nous déployons des solutions de sauvegarde et de supervision couvrant l'ensemble de votre parc informatique, pour tous vos environnements physiques, virtuels, cloud et applicatifs.",
    features: [
      {
        icon: "/images/scheme.png",
        title: "Solution de sauvegarde et restauration",
        description: "Nos solutions de sauvegarde couvrent l'ensemble de vos environnements, qu'ils soient physiques, virtuels, cloud ou mobiles. Vos données sont protégées contre les pertes accidentelles, les pannes matérielles et les cyberattaques.",
        items: [],
        subSections: [],
      },
      {
        icon: "/images/settings.png",
        title: "Solution de supervision réseau",
        description: "Notre plateforme de supervision surveille en permanence l'état de santé de votre réseau, de vos serveurs et de vos équipements. Dès qu'un incident est détecté, nos équipes sont alertées en temps réel pour intervenir avant que votre activité ne soit impactée.",
        items: [],
        subSections: [],
      },
    ],
    compatibility: [
      {
        heading: "Physique",
        items: ["Windows Server", "Windows Server Essentials", "Linux"],
      },
      {
        heading: "Virtuel",
        items: [
          "VMware vSphere", "Microsoft Hyper-V", "Netapp",
          "Citrix XenServer", "Red Hat Virtualization",
          "Linux KVM", "Oracle VM Server",
        ],
      },
      {
        heading: "Applications",
        items: [
          "Microsoft Exchange", "Microsoft SQL Server",
          "Microsoft SharePoint", "Microsoft Active Directory",
          "Base de données Oracle", "NAS",
        ],
      },
      {
        heading: "Mobile",
        items: ["iPhone / iPad", "Android"],
      },
      {
        heading: "Cloud",
        items: ["Microsoft 365", "Microsoft Azure", "AWS"],
      },
      {
        heading: "Terminaux",
        items: ["PC Windows", "MAC"],
      },
    ],
    supervisionTools: [
      "SolarWinds Orion",
      "PRTG",
      "Centreon",
      "Nagios® XI™",
      "WhatsUp Gold",
    ],
  },

  /* ══════════════════════════════════════════════════════════
     05 — DSI EXTERNE
  ══════════════════════════════════════════════════════════ */
  "dsi-externe": {
    intro: "Nos DSI expérimentés sont issus de grands groupes. Par des missions d'audit, de conseil et de pilotage stratégique, ils garantissent la réussite de la transformation digitale de votre SI. Faites appel à un DSI de haut niveau sans les contraintes d'un recrutement à temps plein.",
    features: [
      {
        icon: "/images/share.png",
        title: "DSI en temps partagé",
        description: "Bénéficiez des compétences d'un Directeur des Systèmes d'Information expérimenté, issu de grands groupes, sans les contraintes d'un recrutement à temps plein. Nos DSI partagés pilotent votre SI avec la même implication qu'un DSI interne, pour un coût maîtrisé.",
        items: [
          "Schémas directeurs & alignement stratégique",
          "Pilotage, organisation et contrôle des SI",
          "Sécurisation & continuité des SI",
          "Gestion de vos projets métiers",
          "Tableaux de bord et suivi des indicateurs",
          "Calcul de ROI sur vos projets",
          "Pilotage des ressources internes et externes",
        ],
      },
      {
        icon: "/images/3d.png",
        title: "Transformation digitale",
        description: "Nos consultants vous accompagnent dans la transformation digitale de votre entreprise, de la définition de la stratégie jusqu'à la mise en œuvre opérationnelle. Nous veillons à l'adhésion de vos collaborateurs pour assurer le succès du changement.",
        items: [
          "Diagnostic intégral du SI",
          "Détection de dysfonctionnements organisationnels et techniques",
          "Conduite d'entretiens & animation de groupes",
          "Processus d'assistance au changement et adoption des nouveaux usages",
          "Formations personnalisées",
          "Déclinaison de la stratégie digitale",
        ],
      },
      {
        icon: "/images/research.png",
        title: "Diagnostic complet du SI",
        description: "Nous réalisons un état des lieux exhaustif de votre système d'information couvrant les dimensions techniques, fonctionnelles et organisationnelles. Ce diagnostic permet d'identifier les axes d'amélioration prioritaires et de définir une feuille de route claire.",
        items: [
          "État des lieux du SI sur les axes techniques, fonctionnels et organisationnels",
          "Identification et qualification des projets",
          "Anticipation des différents scénarios d'évolution",
          "Mesure des indicateurs de maturité du SI",
          "Synthèse des coûts cachés",
          "Plan d'actions et préconisations",
        ],
      },
      {
        icon: "/images/benefits.png",
        title: "Bénéfices directs pour votre organisation",
        description: "Faire appel à BTS pour votre DSI externe, c'est bénéficier d'une vision globale et objective de votre système d'information. Nos interventions se traduisent par des gains concrets et mesurables pour votre organisation.",
        items: [
          "Vision 360° du SI sur les axes techniques, fonctionnels et organisationnels",
          "Identification et qualification rapide des projets prioritaires",
          "Anticipation des scénarios d'évolution et des risques",
          "Mesure des indicateurs de maturité du SI",
          "Synthèse et réduction des coûts cachés",
          "Plan d'actions concret et préconisations actionnables",
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     06 — CONSEILS / CONSULTANTS
  ══════════════════════════════════════════════════════════ */
  "conseils-consultants": {
    intro: "Pour tous vos besoins de conseil informatique ou de prestations spécifiques, BTS met à la disposition de ses clients l'expérience et les compétences de ses ingénieurs et administrateurs réseaux. Ses activités s'orientent vers l'audit, le diagnostic, l'installation, la maintenance, la prévention et la réparation de matériels informatiques ainsi que les périphériques.",
    features: [
      {
        icon: "/images/advice.png",
        title: "Soutien technique & conseil",
        description: "BTS, spécialiste en conseil et maintenance informatique, aide les entreprises à renforcer la sécurité stratégique de leurs systèmes informatiques, la communication et les réseaux. Nous fournissons un service de conseil de haut niveau et une assistance proactive à l'expression des besoins et risques métiers, ainsi qu'une analyse des solutions les plus adaptées au contexte économique de chaque entreprise.",
        items: [
          "Audit et diagnostic des systèmes informatiques",
          "Installation et maintenance du matériel",
          "Conseil en sécurité stratégique des systèmes",
          "Conseil en communication et réseaux",
          "Assistance proactive à l'expression des besoins",
        ],
      },
      {
        icon: "/images/audit.png",
        title: "Administration & maintenance",
        description: "L'audit des ressources organisationnelles, matérielles et humaines peut amener BTS à intervenir à la demande de l'entreprise pour l'administration à distance ou sur site des installations informatiques, et la maintenance logicielle des produits installés. BTS s'engage à mettre en œuvre des solutions informatiques fiables et performantes.",
        items: [
          "Administration à distance et sur site des installations",
          "Maintenance logicielle des produits installés",
          "Audit des ressources organisationnelles et humaines",
          "Prévention et réparation de matériels informatiques",
          "Maintenance des périphériques",
        ],
      },
      {
        icon: "/images/certificate.png",
        title: "Notre engagement",
        description: "BTS s'engage à mettre en œuvre des solutions informatiques fiables, performantes, avec une assistance, des conseils et une maintenance de qualité. Notre approche préventive limite les risques d'incidents et garantit la pérennité de votre système d'information sur le long terme.",
        items: [
          "Solutions informatiques fiables et performantes",
          "Audit des ressources organisationnelles et humaines",
          "Prévention des risques informatiques",
          "Accompagnement continu de vos équipes",
        ],
      },
      {
        icon: "/images/customer-service.png",
        title: "Domaines d'intervention",
        description: "Nos consultants interviennent dans tous les domaines du système d'information : sécurité, réseaux, conformité et formation. Nous adaptons notre approche à votre secteur d'activité et à la maturité de votre organisation IT.",
        items: [
          "Sécurité stratégique des systèmes informatiques",
          "Réseaux et télécommunications",
          "Audit de conformité et bonnes pratiques",
          "Formation et transfert de compétences",
        ],
      },
    ],
  },
};

export const SERVICES: Service[] = CONST_SERVICES.map((s) => ({
  slug: s.slug,
  num: s.num,
  icon: s.image,
  title: s.title,
  subtitle: s.subtitle,
  shortDesc: s.shortDesc,
  intro:    SERVICE_DETAILS[s.slug]?.intro    ?? s.shortDesc,
  features: SERVICE_DETAILS[s.slug]?.features ?? [],
  highlights:       SERVICE_DETAILS[s.slug]?.highlights,
  cloudTypes:       SERVICE_DETAILS[s.slug]?.cloudTypes,
  compatibility:    SERVICE_DETAILS[s.slug]?.compatibility,
  supervisionTools: SERVICE_DETAILS[s.slug]?.supervisionTools,
}));
