-- ============================================================
-- INSERT des 6 services BTS dans la table `services`
-- À exécuter dans Supabase SQL Editor
-- ============================================================

INSERT INTO services (title, slug, short_description, full_description, icon, features, status, order_position)
VALUES

(
  'Gestion des projets',
  'gestion-projets',
  'Nous donnons à vos projets un cadre de référence solide et veillons à les mener à terme dans le respect de vos objectifs de planification.',
  'Nous vous accompagnons au quotidien dans l''exploitation des solutions que nous vous délivrons, grâce à une gamme complète de services et d''expertises informatiques. Nous donnons à vos projets un cadre de référence solide.',
  'FolderKanban',
  ARRAY[
    'Conception et cadrage de vos projets IT',
    'Intégration sur plateformes Cloud privé ou public',
    'Infogérance et maintien en conditions opérationnelles',
    'Support disponible par email, téléphone et contrôle à distance',
    'Migration sans interruption de service',
    'Optimisation des procédures et adoption de la méthode AGILE',
    'Mise à disposition des outils de gestion de projet',
    'Formation en Gestion de Projet'
  ],
  'published',
  1
),

(
  'Infrastructure informatique',
  'infrastructure',
  'Un système informatique performant nécessite une infrastructure solide. Fibre optique, VPN, virtualisation et fourniture de matériel.',
  'Nos offres de fibre optique entreprise et Radio sont accessibles sur tout le territoire via un réseau d''opérateurs partenaires. Bénéficiez d''un réseau internet très haut débit, fiable et adapté à l''activité de votre entreprise.',
  'Server',
  ARRAY[
    'Fibre optique entreprise sécurisée',
    'Offres Radio, 4G et Vsat',
    'VPN MPLS – interconnexion multi-sites',
    'Téléphonie IP hébergée',
    'GTR 4 heures garantie',
    'Débit symétrique 100% garanti jusqu''à 1 Gbps',
    'PCA/PRA via Veeam Backup & Cloud Connect',
    'Supervision réseau 24/7'
  ],
  'published',
  2
),

(
  'Solutions Cloud Computing',
  'cloud',
  'Cloud public, privé ou hybride — stockez vos données de manière virtuelle, accessibles partout, sécurisées et toujours disponibles.',
  'Avec la technologie cloud, vos fichiers sont stockés de manière virtuelle, accessibles partout et toujours disponibles. Nous proposons trois modèles adaptés à chaque réalité d''entreprise.',
  'Cloud',
  ARRAY[
    'Cloud public — flexibilité maximale',
    'Cloud privé — sécurité et contrôle total',
    'Cloud hybride — le meilleur des deux mondes',
    'Audit de sécurité et préconisations',
    'Migration vers le cloud sans interruption de service',
    'Optimisation des coûts d''infrastructures',
    'Services managés : déploiement et maintenance',
    'Monitoring 24/7 et gestion des alertes'
  ],
  'published',
  3
),

(
  'Protection & Sécurité des données',
  'protection-donnees',
  'Des mesures rigoureuses pour protéger vos données personnelles et professionnelles. Sauvegarde, restauration et supervision réseau.',
  'La protection des données personnelles nécessite de prendre des mesures rigoureuses. Nous déployons des solutions de sauvegarde et de supervision couvrant l''ensemble de votre parc informatique.',
  'ShieldCheck',
  ARRAY[
    'Sauvegarde Windows Server, Linux et postes individuels',
    'Environnements virtuels : VMware, Hyper-V, Citrix',
    'Cloud : Microsoft 365, Azure, AWS',
    'Applications : Exchange, SQL Server, SharePoint',
    'Supervision avec SolarWinds, PRTG et Centreon',
    'Monitoring 24/7 avec alertes en temps réel',
    'PCA/PRA et plan de reprise d''activité',
    'Audit de sécurité et conformité'
  ],
  'published',
  4
),

(
  'DSI Externe',
  'dsi-externe',
  'Un accompagnement indépendant pour prendre les bonnes décisions IT. Nos DSI expérimentés pilotent votre transformation digitale.',
  'Nos DSI expérimentés sont issus de grands groupes. Par des missions d''audit, de conseil et de pilotage stratégique, ils garantissent la réussite de la transformation digitale de votre SI.',
  'Users',
  ARRAY[
    'Schémas directeurs et alignement stratégique',
    'Pilotage, organisation et contrôle des SI',
    'Sécurisation et continuité des systèmes d''information',
    'Tableaux de bord et suivi des indicateurs de maturité',
    'Calcul de ROI sur vos projets IT',
    'Diagnostic intégral du SI (technique, fonctionnel, organisationnel)',
    'Conduite du changement et formations personnalisées',
    'Déclinaison de la stratégie digitale'
  ],
  'published',
  5
),

(
  'Conseils & Consultants',
  'conseils-consultants',
  'Bénéficiez d''un soutien technique expert pour faire évoluer votre système informatique avec agilité et sécurité.',
  'BTS met à la disposition de ses clients l''expérience et les compétences de ses ingénieurs et administrateurs réseaux. Nos activités s''orientent vers l''audit, le diagnostic, l''installation, la maintenance et la prévention.',
  'Lightbulb',
  ARRAY[
    'Audit et diagnostic des systèmes informatiques',
    'Installation et maintenance du matériel',
    'Administration à distance et sur site',
    'Maintenance logicielle des produits installés',
    'Analyse des besoins et étude des solutions',
    'Renforcement de la sécurité des systèmes',
    'Conseil en communication et réseaux',
    'Formation et transfert de compétences'
  ],
  'published',
  6
);
