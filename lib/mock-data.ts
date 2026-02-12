// Types pour les données mockées
export type UserRole = "SUPER_ADMIN" | "ADMIN_PARTNER" | "COACH" | "USER"
export type TenantStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED"
export type PlanType = "FREE" | "BASIC" | "PROFESSIONAL" | "ENTERPRISE"

export interface MockUser {
  id: string
  email: string
  name: string | null
  role: UserRole
  status: string
  tenantId: string | null
  createdAt: Date
}

export interface MockTenant {
  id: string
  name: string
  slug: string
  domain: string | null
  status: TenantStatus
  planType: PlanType
  logo: string | null
  primaryColor: string
  secondaryColor: string
  fontFamily: string | null
  maxUsers: number
  maxStorage: number
  maxModules: number
  currentUsers: number
  currentStorage: number
  currentModules: number
  aboutText: string | null
  contactEmail: string | null
  contactPhone: string | null
  legalMentions: string | null
  createdAt: Date
  updatedAt: Date
  _count?: {
    users: number
    modules: number
    programs: number
  }
}

export interface MockProgram {
  id: string
  tenantId: string
  title: string
  description: string | null
  image: string | null
  order: number
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export interface MockModule {
  id: string
  tenantId: string
  programId: string | null
  title: string
  description: string | null
  image: string | null
  level: string | null
  duration: number | null
  order: number
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export interface MockLesson {
  id: string
  moduleId: string
  title: string
  description: string | null
  videoUrl: string | null
  content: string | null
  order: number
  duration: number | null
  createdAt: Date
  updatedAt: Date
}

export interface MockQuiz {
  id: string
  moduleId: string
  title: string
  description: string | null
  passingScore: number
  createdAt: Date
  updatedAt: Date
}

export interface MockQuestion {
  id: string
  quizId: string
  question: string
  type: string
  order: number
  points: number
  createdAt: Date
  updatedAt: Date
}

export interface MockAnswer {
  id: string
  questionId: string
  text: string
  isCorrect: boolean
  order: number
  createdAt: Date
}

export interface MockEnrollment {
  id: string
  userId: string
  moduleId: string
  accessType: string
  code: string | null
  enrolledAt: Date
  completedAt: Date | null
}

export interface MockLessonProgress {
  id: string
  userId: string
  lessonId: string
  completed: boolean
  progress: number
  lastPosition: number | null
  completedAt: Date | null
  updatedAt: Date
}

// Données mockées
export const mockTenants: MockTenant[] = [
  {
    id: "1",
    name: "CIAI Vert",
    slug: "ciaivert",
    domain: null,
    status: "ACTIVE",
    planType: "BASIC",
    logo: null,
    primaryColor: "#10B981",
    secondaryColor: "#059669",
    fontFamily: "Inter",
    maxUsers: 500,
    maxStorage: 5120,
    maxModules: 200,
    currentUsers: 127,
    currentStorage: 2340,
    currentModules: 45,
    aboutText: "Plateforme de formation en développement durable",
    contactEmail: "contact@ciaivert.sn",
    contactPhone: "+221 77 123 45 67",
    legalMentions: null,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-12-01"),
    _count: {
      users: 127,
      modules: 45,
      programs: 8,
    },
  },
  {
    id: "2",
    name: "Microfinance Academy",
    slug: "microfinance",
    domain: null,
    status: "ACTIVE",
    planType: "PROFESSIONAL",
    logo: null,
    primaryColor: "#3B82F6",
    secondaryColor: "#2563EB",
    fontFamily: "Inter",
    maxUsers: 2000,
    maxStorage: 20480,
    maxModules: 1000,
    currentUsers: 892,
    currentStorage: 12340,
    currentModules: 234,
    aboutText: "Formation en microfinance et inclusion financière",
    contactEmail: "info@microfinance.sn",
    contactPhone: "+221 77 234 56 78",
    legalMentions: null,
    createdAt: new Date("2024-02-20"),
    updatedAt: new Date("2024-12-01"),
    _count: {
      users: 892,
      modules: 234,
      programs: 15,
    },
  },
  {
    id: "3",
    name: "Sécurité Routière",
    slug: "securite-routiere",
    domain: null,
    status: "ACTIVE",
    planType: "FREE",
    logo: null,
    primaryColor: "#EF4444",
    secondaryColor: "#DC2626",
    fontFamily: "Inter",
    maxUsers: 100,
    maxStorage: 1024,
    maxModules: 50,
    currentUsers: 45,
    currentStorage: 320,
    currentModules: 12,
    aboutText: "Formation à la sécurité routière",
    contactEmail: "contact@securite-routiere.sn",
    contactPhone: "+221 77 345 67 89",
    legalMentions: null,
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-11-28"),
    _count: {
      users: 45,
      modules: 12,
      programs: 3,
    },
  },
  {
    id: "4",
    name: "Green Tech Academy",
    slug: "greentech",
    domain: null,
    status: "INACTIVE",
    planType: "BASIC",
    logo: null,
    primaryColor: "#22C55E",
    secondaryColor: "#16A34A",
    fontFamily: "Inter",
    maxUsers: 500,
    maxStorage: 5120,
    maxModules: 200,
    currentUsers: 0,
    currentStorage: 0,
    currentModules: 0,
    aboutText: null,
    contactEmail: "info@greentech.sn",
    contactPhone: null,
    legalMentions: null,
    createdAt: new Date("2024-04-05"),
    updatedAt: new Date("2024-11-15"),
    _count: {
      users: 0,
      modules: 0,
      programs: 0,
    },
  },
]

export const mockUsers: MockUser[] = [
  {
    id: "1",
    email: "admin@fined.app",
    name: "Super Admin FinEd",
    role: "SUPER_ADMIN",
    status: "ACTIVE",
    tenantId: null,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    email: "admin@ciaivert.sn",
    name: "Admin CIAI Vert",
    role: "ADMIN_PARTNER",
    status: "ACTIVE",
    tenantId: "1",
    createdAt: new Date("2024-01-16"),
  },
  {
    id: "3",
    email: "user1@ciaivert.sn",
    name: "Jean Dupont",
    role: "USER",
    status: "ACTIVE",
    tenantId: "1",
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "4",
    email: "admin@microfinance.sn",
    name: "Admin Microfinance",
    role: "ADMIN_PARTNER",
    status: "ACTIVE",
    tenantId: "2",
    createdAt: new Date("2024-02-21"),
  },
  {
    id: "5",
    email: "user1@microfinance.sn",
    name: "Marie Diop",
    role: "USER",
    status: "ACTIVE",
    tenantId: "2",
    createdAt: new Date("2024-02-25"),
  },
  {
    id: "6",
    email: "user2@ciaivert.sn",
    name: "Amadou Ba",
    role: "USER",
    status: "ACTIVE",
    tenantId: "1",
    createdAt: new Date("2024-02-10"),
  },
  {
    id: "7",
    email: "user3@ciaivert.sn",
    name: "Fatou Sall",
    role: "USER",
    status: "ACTIVE",
    tenantId: "1",
    createdAt: new Date("2024-02-15"),
  },
  {
    id: "8",
    email: "user2@microfinance.sn",
    name: "Ibrahima Diallo",
    role: "USER",
    status: "ACTIVE",
    tenantId: "2",
    createdAt: new Date("2024-03-05"),
  },
  {
    id: "9",
    email: "user1@securite-routiere.sn",
    name: "Ousmane Ndiaye",
    role: "USER",
    status: "ACTIVE",
    tenantId: "3",
    createdAt: new Date("2024-04-05"),
  },
  {
    id: "10",
    email: "user2@securite-routiere.sn",
    name: "Aissatou Fall",
    role: "USER",
    status: "ACTIVE",
    tenantId: "3",
    createdAt: new Date("2024-04-10"),
  },
  {
    id: "11",
    email: "user1@greentech.sn",
    name: "Moussa Traoré",
    role: "USER",
    status: "ACTIVE",
    tenantId: "4",
    createdAt: new Date("2024-05-01"),
  },
]

export const mockPrograms: MockProgram[] = [
  {
    id: "1",
    tenantId: "1",
    title: "Développement Durable",
    description: "Programme complet sur le développement durable",
    image: null,
    order: 0,
    published: true,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "2",
    tenantId: "2",
    title: "Microfinance de Base",
    description: "Introduction à la microfinance",
    image: null,
    order: 0,
    published: true,
    createdAt: new Date("2024-02-25"),
    updatedAt: new Date("2024-11-01"),
  },
]

export const mockModules: MockModule[] = [
  // CIAI Vert - Module 1
  {
    id: "1",
    tenantId: "1",
    programId: "1",
    title: "Introduction au Développement Durable",
    description: "Découvrez les bases du développement durable",
    image: null,
    level: "débutant",
    duration: 120,
    order: 0,
    published: true,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-11-01"),
  },
  // CIAI Vert - Module 2
  {
    id: "2",
    tenantId: "1",
    programId: "1",
    title: "Énergies Renouvelables",
    description: "Comprendre les énergies renouvelables",
    image: null,
    level: "intermédiaire",
    duration: 180,
    order: 1,
    published: true,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-11-01"),
  },
  // CIAI Vert - Module 3
  {
    id: "4",
    tenantId: "1",
    programId: "1",
    title: "Gestion des Déchets",
    description: "Apprenez à réduire et recycler vos déchets",
    image: null,
    level: "débutant",
    duration: 150,
    order: 2,
    published: true,
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-11-01"),
  },
  // CIAI Vert - Module 4
  {
    id: "5",
    tenantId: "1",
    programId: "1",
    title: "Agriculture Durable",
    description: "Techniques d'agriculture respectueuses de l'environnement",
    image: null,
    level: "intermédiaire",
    duration: 200,
    order: 3,
    published: true,
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-11-01"),
  },
  // Microfinance - Module 1
  {
    id: "3",
    tenantId: "2",
    programId: "2",
    title: "Principes de la Microfinance",
    description: "Les fondamentaux de la microfinance",
    image: null,
    level: "débutant",
    duration: 90,
    order: 0,
    published: true,
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-11-01"),
  },
  // Microfinance - Module 2
  {
    id: "6",
    tenantId: "2",
    programId: "2",
    title: "Gestion de Crédit",
    description: "Comment gérer efficacement les crédits en microfinance",
    image: null,
    level: "intermédiaire",
    duration: 120,
    order: 1,
    published: true,
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-11-01"),
  },
  // Microfinance - Module 3
  {
    id: "7",
    tenantId: "2",
    programId: "2",
    title: "Épargne et Investissement",
    description: "Stratégies d'épargne et d'investissement pour les micro-entrepreneurs",
    image: null,
    level: "intermédiaire",
    duration: 150,
    order: 2,
    published: true,
    createdAt: new Date("2024-03-20"),
    updatedAt: new Date("2024-11-01"),
  },
  // Sécurité Routière - Module 1
  {
    id: "8",
    tenantId: "3",
    programId: null,
    title: "Code de la Route",
    description: "Règles fondamentales du code de la route",
    image: null,
    level: "débutant",
    duration: 180,
    order: 0,
    published: true,
    createdAt: new Date("2024-04-01"),
    updatedAt: new Date("2024-11-01"),
  },
  // Sécurité Routière - Module 2
  {
    id: "9",
    tenantId: "3",
    programId: null,
    title: "Conduite Préventive",
    description: "Techniques de conduite pour éviter les accidents",
    image: null,
    level: "intermédiaire",
    duration: 120,
    order: 1,
    published: true,
    createdAt: new Date("2024-04-10"),
    updatedAt: new Date("2024-11-01"),
  },
]

export const mockLessons: MockLesson[] = [
  // Module 1 (DD) - 4 leçons
  {
    id: "1",
    moduleId: "1",
    title: "Qu'est-ce que le développement durable ?",
    description: "Introduction aux concepts de base",
    videoUrl: "https://www.youtube.com/watch?v=demo1",
    content: "Le développement durable est un développement qui répond aux besoins du présent sans compromettre la capacité des générations futures. Il repose sur trois piliers fondamentaux : l'environnement, le social et l'économique.",
    order: 0,
    duration: 15,
    createdAt: new Date("2024-01-26"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "2",
    moduleId: "1",
    title: "Les 3 piliers du développement durable",
    description: "Environnement, Social, Économie",
    videoUrl: "https://www.youtube.com/watch?v=demo2",
    content: "Les trois piliers sont l'environnement, le social et l'économique. Chaque pilier est essentiel et ils doivent être en équilibre pour un développement véritablement durable.",
    order: 1,
    duration: 20,
    createdAt: new Date("2024-01-27"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "3",
    moduleId: "1",
    title: "Les Objectifs de Développement Durable (ODD)",
    description: "Découvrez les 17 ODD des Nations Unies",
    videoUrl: "https://www.youtube.com/watch?v=demo3",
    content: "Les Objectifs de Développement Durable (ODD) sont 17 objectifs mondiaux adoptés par les Nations Unies en 2015. Ils couvrent des domaines allant de l'élimination de la pauvreté à la lutte contre le changement climatique.",
    order: 2,
    duration: 25,
    createdAt: new Date("2024-01-28"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "4",
    moduleId: "1",
    title: "L'Agenda 2030",
    description: "Le plan d'action pour le développement durable",
    videoUrl: "https://www.youtube.com/watch?v=demo4",
    content: "L'Agenda 2030 est le plan d'action adopté par tous les États membres des Nations Unies pour transformer notre monde. Il fixe 17 objectifs à atteindre d'ici 2030.",
    order: 3,
    duration: 18,
    createdAt: new Date("2024-01-29"),
    updatedAt: new Date("2024-11-01"),
  },
  // Module 2 (Énergies) - 5 leçons
  {
    id: "5",
    moduleId: "2",
    title: "Introduction aux énergies renouvelables",
    description: "Panorama des différentes sources d'énergie renouvelable",
    videoUrl: "https://www.youtube.com/watch?v=demo5",
    content: "Les énergies renouvelables proviennent de sources naturelles inépuisables : le soleil, le vent, l'eau, la biomasse et la géothermie. Elles représentent l'avenir de notre approvisionnement énergétique.",
    order: 0,
    duration: 20,
    createdAt: new Date("2024-02-02"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "6",
    moduleId: "2",
    title: "L'énergie solaire",
    description: "Comment fonctionne l'énergie solaire",
    videoUrl: "https://www.youtube.com/watch?v=demo6",
    content: "L'énergie solaire utilise les rayons du soleil pour produire de l'électricité via des panneaux photovoltaïques ou de la chaleur via des capteurs solaires thermiques.",
    order: 1,
    duration: 18,
    createdAt: new Date("2024-02-03"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "7",
    moduleId: "2",
    title: "L'énergie éolienne",
    description: "Comprendre l'énergie du vent",
    videoUrl: "https://www.youtube.com/watch?v=demo7",
    content: "L'énergie éolienne transforme la force du vent en électricité grâce à des éoliennes. C'est une source d'énergie propre et abondante.",
    order: 2,
    duration: 22,
    createdAt: new Date("2024-02-04"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "8",
    moduleId: "2",
    title: "L'énergie hydraulique",
    description: "L'énergie de l'eau",
    videoUrl: "https://www.youtube.com/watch?v=demo8",
    content: "L'énergie hydraulique utilise la force de l'eau en mouvement pour produire de l'électricité. C'est l'une des plus anciennes sources d'énergie renouvelable.",
    order: 3,
    duration: 20,
    createdAt: new Date("2024-02-05"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "9",
    moduleId: "2",
    title: "La biomasse et la géothermie",
    description: "Autres sources d'énergie renouvelable",
    videoUrl: "https://www.youtube.com/watch?v=demo9",
    content: "La biomasse utilise les matières organiques pour produire de l'énergie. La géothermie exploite la chaleur de la Terre. Ces deux sources complètent le mix énergétique renouvelable.",
    order: 4,
    duration: 19,
    createdAt: new Date("2024-02-06"),
    updatedAt: new Date("2024-11-01"),
  },
  // Module 4 (Déchets) - 4 leçons
  {
    id: "10",
    moduleId: "4",
    title: "Les 3R : Réduire, Réutiliser, Recycler",
    description: "Les principes de base de la gestion des déchets",
    videoUrl: "https://www.youtube.com/watch?v=demo10",
    content: "La règle des 3R est fondamentale : Réduire la production de déchets, Réutiliser les objets avant de les jeter, et Recycler les matériaux.",
    order: 0,
    duration: 15,
    createdAt: new Date("2024-02-11"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "11",
    moduleId: "4",
    title: "Le compostage",
    description: "Transformer vos déchets organiques en engrais",
    videoUrl: "https://www.youtube.com/watch?v=demo11",
    content: "Le compostage permet de transformer les déchets organiques (restes de nourriture, feuilles, etc.) en compost riche en nutriments pour le jardin.",
    order: 1,
    duration: 18,
    createdAt: new Date("2024-02-12"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "12",
    moduleId: "4",
    title: "Le tri sélectif",
    description: "Comment bien trier ses déchets",
    videoUrl: "https://www.youtube.com/watch?v=demo12",
    content: "Le tri sélectif consiste à séparer les déchets selon leur nature (plastique, verre, papier, métal) pour faciliter leur recyclage.",
    order: 2,
    duration: 16,
    createdAt: new Date("2024-02-13"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "13",
    moduleId: "4",
    title: "Réduire les déchets à la source",
    description: "Stratégies pour produire moins de déchets",
    videoUrl: "https://www.youtube.com/watch?v=demo13",
    content: "Réduire les déchets à la source passe par l'achat en vrac, l'évitement du suremballage, le choix de produits durables et la réparation plutôt que le remplacement.",
    order: 3,
    duration: 17,
    createdAt: new Date("2024-02-14"),
    updatedAt: new Date("2024-11-01"),
  },
  // Module 5 (Agriculture) - 4 leçons
  {
    id: "14",
    moduleId: "5",
    title: "Introduction à l'agriculture durable",
    description: "Les principes de l'agriculture respectueuse de l'environnement",
    videoUrl: "https://www.youtube.com/watch?v=demo14",
    content: "L'agriculture durable vise à produire des aliments tout en préservant l'environnement, en maintenant la fertilité des sols et en respectant la biodiversité.",
    order: 0,
    duration: 20,
    createdAt: new Date("2024-02-16"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "15",
    moduleId: "5",
    title: "La rotation des cultures",
    description: "Technique pour préserver la fertilité du sol",
    videoUrl: "https://www.youtube.com/watch?v=demo15",
    content: "La rotation des cultures consiste à alterner différents types de plantes sur une même parcelle pour éviter l'épuisement du sol et réduire les maladies.",
    order: 1,
    duration: 18,
    createdAt: new Date("2024-02-17"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "16",
    moduleId: "5",
    title: "L'agriculture biologique",
    description: "Les méthodes de l'agriculture bio",
    videoUrl: "https://www.youtube.com/watch?v=demo16",
    content: "L'agriculture biologique interdit l'utilisation de pesticides et d'engrais chimiques de synthèse, privilégiant des méthodes naturelles.",
    order: 2,
    duration: 22,
    createdAt: new Date("2024-02-18"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "17",
    moduleId: "5",
    title: "La permaculture",
    description: "Un système de design écologique",
    videoUrl: "https://www.youtube.com/watch?v=demo17",
    content: "La permaculture est un système de design qui s'inspire de la nature pour créer des écosystèmes agricoles durables et productifs.",
    order: 3,
    duration: 21,
    createdAt: new Date("2024-02-19"),
    updatedAt: new Date("2024-11-01"),
  },
  // Module 3 (Microfinance) - 4 leçons
  {
    id: "18",
    moduleId: "3",
    title: "Qu'est-ce que la microfinance ?",
    description: "Introduction à la microfinance",
    videoUrl: "https://www.youtube.com/watch?v=demo18",
    content: "La microfinance consiste à fournir des services financiers (crédit, épargne, assurance) aux personnes exclues du système bancaire traditionnel.",
    order: 0,
    duration: 15,
    createdAt: new Date("2024-03-02"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "19",
    moduleId: "3",
    title: "Les institutions de microfinance",
    description: "Les différents acteurs de la microfinance",
    videoUrl: "https://www.youtube.com/watch?v=demo19",
    content: "Les institutions de microfinance (IMF) peuvent être des ONG, des coopératives, des banques spécialisées ou des fintechs.",
    order: 1,
    duration: 18,
    createdAt: new Date("2024-03-03"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "20",
    moduleId: "3",
    title: "Les produits de microfinance",
    description: "Crédit, épargne, assurance",
    videoUrl: "https://www.youtube.com/watch?v=demo20",
    content: "Les principaux produits de microfinance sont le microcrédit, la micro-épargne et la micro-assurance, adaptés aux besoins des micro-entrepreneurs.",
    order: 2,
    duration: 20,
    createdAt: new Date("2024-03-04"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "21",
    moduleId: "3",
    title: "L'impact de la microfinance",
    description: "Comment la microfinance transforme les communautés",
    videoUrl: "https://www.youtube.com/watch?v=demo21",
    content: "La microfinance a un impact positif sur la réduction de la pauvreté, l'autonomisation des femmes, la création d'emplois et le développement économique local.",
    order: 3,
    duration: 19,
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2024-11-01"),
  },
  // Module 6 (Crédit) - 4 leçons
  {
    id: "22",
    moduleId: "6",
    title: "Évaluer sa capacité de remboursement",
    description: "Comment calculer ce que vous pouvez emprunter",
    videoUrl: "https://www.youtube.com/watch?v=demo22",
    content: "Avant de contracter un crédit, il est essentiel d'évaluer sa capacité de remboursement en analysant ses revenus et ses dépenses.",
    order: 0,
    duration: 16,
    createdAt: new Date("2024-03-11"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "23",
    moduleId: "6",
    title: "Les différents types de crédit",
    description: "Crédit individuel, crédit de groupe, crédit solidaire",
    videoUrl: "https://www.youtube.com/watch?v=demo23",
    content: "Il existe plusieurs types de crédits en microfinance : le crédit individuel, le crédit de groupe où les membres se garantissent mutuellement, et le crédit solidaire.",
    order: 1,
    duration: 19,
    createdAt: new Date("2024-03-12"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "24",
    moduleId: "6",
    title: "Gérer son remboursement",
    description: "Stratégies pour rembourser efficacement",
    videoUrl: "https://www.youtube.com/watch?v=demo24",
    content: "Une bonne gestion du remboursement passe par la planification, la discipline et la communication avec l'institution de microfinance en cas de difficulté.",
    order: 2,
    duration: 17,
    createdAt: new Date("2024-03-13"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "25",
    moduleId: "6",
    title: "Négocier les conditions de crédit",
    description: "Comment obtenir les meilleures conditions",
    videoUrl: "https://www.youtube.com/watch?v=demo25",
    content: "Il est important de comparer les offres, de négocier le taux d'intérêt et les modalités de remboursement, et de bien comprendre tous les frais associés.",
    order: 3,
    duration: 18,
    createdAt: new Date("2024-03-14"),
    updatedAt: new Date("2024-11-01"),
  },
  // Module 7 (Épargne) - 4 leçons
  {
    id: "26",
    moduleId: "7",
    title: "Pourquoi épargner ?",
    description: "L'importance de l'épargne",
    videoUrl: "https://www.youtube.com/watch?v=demo26",
    content: "L'épargne permet de faire face aux imprévus, de réaliser des projets et de créer un capital pour investir dans son activité.",
    order: 0,
    duration: 14,
    createdAt: new Date("2024-03-21"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "27",
    moduleId: "7",
    title: "Stratégies d'épargne",
    description: "Comment épargner efficacement",
    videoUrl: "https://www.youtube.com/watch?v=demo27",
    content: "Pour épargner efficacement, il faut fixer des objectifs, automatiser l'épargne, réduire les dépenses inutiles et épargner régulièrement même de petites sommes.",
    order: 1,
    duration: 18,
    createdAt: new Date("2024-03-22"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "28",
    moduleId: "7",
    title: "Investir dans son activité",
    description: "Comment utiliser l'épargne pour développer son entreprise",
    videoUrl: "https://www.youtube.com/watch?v=demo28",
    content: "L'investissement dans son activité peut prendre plusieurs formes : achat d'équipement, formation, stock, marketing, etc. Il faut prioriser les investissements les plus rentables.",
    order: 2,
    duration: 20,
    createdAt: new Date("2024-03-23"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "29",
    moduleId: "7",
    title: "Gérer son épargne à long terme",
    description: "Planification financière pour l'avenir",
    videoUrl: "https://www.youtube.com/watch?v=demo29",
    content: "Une bonne gestion de l'épargne à long terme nécessite de diversifier ses placements, de réinvestir les bénéfices et de planifier pour les périodes difficiles.",
    order: 3,
    duration: 19,
    createdAt: new Date("2024-03-24"),
    updatedAt: new Date("2024-11-01"),
  },
  // Module 8 (Code Route) - 5 leçons
  {
    id: "30",
    moduleId: "8",
    title: "Les panneaux de signalisation",
    description: "Comprendre les différents types de panneaux",
    videoUrl: "https://www.youtube.com/watch?v=demo30",
    content: "Les panneaux de signalisation sont essentiels pour la sécurité routière. Il existe trois types : les panneaux d'interdiction (rouges), d'obligation (bleus) et d'indication (blancs).",
    order: 0,
    duration: 25,
    createdAt: new Date("2024-04-02"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "31",
    moduleId: "8",
    title: "Les règles de priorité",
    description: "Qui a la priorité à une intersection ?",
    videoUrl: "https://www.youtube.com/watch?v=demo31",
    content: "Les règles de priorité déterminent qui peut passer en premier à une intersection. La priorité à droite est la règle de base, sauf indication contraire.",
    order: 1,
    duration: 22,
    createdAt: new Date("2024-04-03"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "32",
    moduleId: "8",
    title: "Les limitations de vitesse",
    description: "Les vitesses autorisées selon les routes",
    videoUrl: "https://www.youtube.com/watch?v=demo32",
    content: "Les limitations de vitesse varient selon le type de route : 50 km/h en ville, 90 km/h sur route, 110 km/h sur voie rapide, 130 km/h sur autoroute.",
    order: 2,
    duration: 18,
    createdAt: new Date("2024-04-04"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "33",
    moduleId: "8",
    title: "Le stationnement",
    description: "Où et comment stationner correctement",
    videoUrl: "https://www.youtube.com/watch?v=demo33",
    content: "Le stationnement doit respecter les règles : ne pas gêner la circulation, respecter les zones interdites, utiliser les places de parking désignées.",
    order: 3,
    duration: 16,
    createdAt: new Date("2024-04-05"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "34",
    moduleId: "8",
    title: "Les feux de circulation",
    description: "Comprendre les feux tricolores",
    videoUrl: "https://www.youtube.com/watch?v=demo34",
    content: "Les feux de circulation régulent le trafic : rouge = arrêt obligatoire, orange = arrêt sauf si déjà engagé, vert = passage autorisé. Il faut toujours respecter ces signaux.",
    order: 4,
    duration: 17,
    createdAt: new Date("2024-04-06"),
    updatedAt: new Date("2024-11-01"),
  },
  // Module 9 (Conduite) - 4 leçons
  {
    id: "35",
    moduleId: "9",
    title: "La distance de sécurité",
    description: "Maintenir une distance suffisante avec le véhicule devant",
    videoUrl: "https://www.youtube.com/watch?v=demo35",
    content: "La distance de sécurité doit être au minimum de 2 secondes avec le véhicule qui précède. Elle augmente avec la vitesse et les conditions météorologiques.",
    order: 0,
    duration: 15,
    createdAt: new Date("2024-04-11"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "36",
    moduleId: "9",
    title: "Anticiper les dangers",
    description: "Repérer les situations à risque",
    videoUrl: "https://www.youtube.com/watch?v=demo36",
    content: "La conduite préventive consiste à anticiper les dangers potentiels : piétons, véhicules qui changent de voie, intersections, virages, etc.",
    order: 1,
    duration: 20,
    createdAt: new Date("2024-04-12"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "37",
    moduleId: "9",
    title: "Conduire par mauvais temps",
    description: "Adapter sa conduite aux conditions météorologiques",
    videoUrl: "https://www.youtube.com/watch?v=demo37",
    content: "Par mauvais temps (pluie, brouillard, neige), il faut réduire sa vitesse, augmenter les distances de sécurité, allumer les feux et être encore plus vigilant.",
    order: 2,
    duration: 18,
    createdAt: new Date("2024-04-13"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "38",
    moduleId: "9",
    title: "La conduite défensive",
    description: "Techniques pour éviter les accidents",
    videoUrl: "https://www.youtube.com/watch?v=demo38",
    content: "La conduite défensive consiste à toujours être prêt à réagir aux erreurs des autres conducteurs, à maintenir une vitesse adaptée et à rester concentré.",
    order: 3,
    duration: 19,
    createdAt: new Date("2024-04-14"),
    updatedAt: new Date("2024-11-01"),
  },
]

export const mockQuizzes: MockQuiz[] = [
  {
    id: "1",
    moduleId: "1",
    title: "Quiz - Introduction au Développement Durable",
    description: "Testez vos connaissances sur le développement durable",
    passingScore: 70,
    createdAt: new Date("2024-01-28"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "2",
    moduleId: "2",
    title: "Quiz - Énergies Renouvelables",
    description: "Évaluez votre compréhension des énergies renouvelables",
    passingScore: 70,
    createdAt: new Date("2024-02-06"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "3",
    moduleId: "4",
    title: "Quiz - Gestion des Déchets",
    description: "Testez vos connaissances sur la gestion des déchets",
    passingScore: 70,
    createdAt: new Date("2024-02-14"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "4",
    moduleId: "5",
    title: "Quiz - Agriculture Durable",
    description: "Évaluez vos connaissances en agriculture durable",
    passingScore: 70,
    createdAt: new Date("2024-02-19"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "5",
    moduleId: "3",
    title: "Quiz - Principes de la Microfinance",
    description: "Testez votre compréhension de la microfinance",
    passingScore: 70,
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "6",
    moduleId: "6",
    title: "Quiz - Gestion de Crédit",
    description: "Évaluez vos connaissances en gestion de crédit",
    passingScore: 70,
    createdAt: new Date("2024-03-14"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "7",
    moduleId: "7",
    title: "Quiz - Épargne et Investissement",
    description: "Testez vos connaissances sur l'épargne et l'investissement",
    passingScore: 70,
    createdAt: new Date("2024-03-24"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "8",
    moduleId: "8",
    title: "Quiz - Code de la Route",
    description: "Évaluez vos connaissances du code de la route",
    passingScore: 75,
    createdAt: new Date("2024-04-06"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "9",
    moduleId: "9",
    title: "Quiz - Conduite Préventive",
    description: "Testez vos connaissances en conduite préventive",
    passingScore: 75,
    createdAt: new Date("2024-04-14"),
    updatedAt: new Date("2024-11-01"),
  },
]

export const mockQuestions: MockQuestion[] = [
  // Quiz 1 - DD
  {
    id: "1",
    quizId: "1",
    question: "Qu'est-ce que le développement durable ?",
    type: "multiple_choice",
    order: 0,
    points: 1,
    createdAt: new Date("2024-01-28"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "2",
    quizId: "1",
    question: "Combien y a-t-il de piliers dans le développement durable ?",
    type: "multiple_choice",
    order: 1,
    points: 1,
    createdAt: new Date("2024-01-28"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "3",
    quizId: "1",
    question: "Quel est l'objectif principal de l'Agenda 2030 ?",
    type: "multiple_choice",
    order: 2,
    points: 1,
    createdAt: new Date("2024-01-28"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "4",
    quizId: "1",
    question: "Combien y a-t-il d'Objectifs de Développement Durable (ODD) ?",
    type: "multiple_choice",
    order: 3,
    points: 1,
    createdAt: new Date("2024-01-28"),
    updatedAt: new Date("2024-11-01"),
  },
  // Quiz 2 - Énergies
  {
    id: "5",
    quizId: "2",
    question: "Quelle est la source d'énergie renouvelable la plus utilisée dans le monde ?",
    type: "multiple_choice",
    order: 0,
    points: 1,
    createdAt: new Date("2024-02-06"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "6",
    quizId: "2",
    question: "Comment fonctionnent les panneaux photovoltaïques ?",
    type: "multiple_choice",
    order: 1,
    points: 1,
    createdAt: new Date("2024-02-06"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "7",
    quizId: "2",
    question: "Quel est l'avantage principal des énergies renouvelables ?",
    type: "multiple_choice",
    order: 2,
    points: 1,
    createdAt: new Date("2024-02-06"),
    updatedAt: new Date("2024-11-01"),
  },
  // Quiz 3 - Déchets
  {
    id: "8",
    quizId: "3",
    question: "Que signifie l'acronyme 3R ?",
    type: "multiple_choice",
    order: 0,
    points: 1,
    createdAt: new Date("2024-02-14"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "9",
    quizId: "3",
    question: "Quel type de déchet peut être composté ?",
    type: "multiple_choice",
    order: 1,
    points: 1,
    createdAt: new Date("2024-02-14"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "10",
    quizId: "3",
    question: "Combien de temps faut-il en moyenne pour qu'un sac plastique se décompose ?",
    type: "multiple_choice",
    order: 2,
    points: 1,
    createdAt: new Date("2024-02-14"),
    updatedAt: new Date("2024-11-01"),
  },
  // Quiz 4 - Agriculture
  {
    id: "11",
    quizId: "4",
    question: "Qu'est-ce que la rotation des cultures ?",
    type: "multiple_choice",
    order: 0,
    points: 1,
    createdAt: new Date("2024-02-19"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "12",
    quizId: "4",
    question: "L'agriculture biologique interdit l'utilisation de :",
    type: "multiple_choice",
    order: 1,
    points: 1,
    createdAt: new Date("2024-02-19"),
    updatedAt: new Date("2024-11-01"),
  },
  // Quiz 5 - Microfinance
  {
    id: "13",
    quizId: "5",
    question: "Qu'est-ce que la microfinance ?",
    type: "multiple_choice",
    order: 0,
    points: 1,
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "14",
    quizId: "5",
    question: "Quel est le principal produit de la microfinance ?",
    type: "multiple_choice",
    order: 1,
    points: 1,
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "15",
    quizId: "5",
    question: "Quel est l'impact principal de la microfinance ?",
    type: "multiple_choice",
    order: 2,
    points: 1,
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2024-11-01"),
  },
  // Quiz 6 - Crédit
  {
    id: "16",
    quizId: "6",
    question: "Avant de contracter un crédit, il faut :",
    type: "multiple_choice",
    order: 0,
    points: 1,
    createdAt: new Date("2024-03-14"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "17",
    quizId: "6",
    question: "Qu'est-ce qu'un crédit solidaire ?",
    type: "multiple_choice",
    order: 1,
    points: 1,
    createdAt: new Date("2024-03-14"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "18",
    quizId: "6",
    question: "En cas de difficulté de remboursement, il faut :",
    type: "multiple_choice",
    order: 2,
    points: 1,
    createdAt: new Date("2024-03-14"),
    updatedAt: new Date("2024-11-01"),
  },
  // Quiz 7 - Épargne
  {
    id: "19",
    quizId: "7",
    question: "Pourquoi est-il important d'épargner ?",
    type: "multiple_choice",
    order: 0,
    points: 1,
    createdAt: new Date("2024-03-24"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "20",
    quizId: "7",
    question: "Quelle est la meilleure stratégie d'épargne ?",
    type: "multiple_choice",
    order: 1,
    points: 1,
    createdAt: new Date("2024-03-24"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "21",
    quizId: "7",
    question: "L'investissement dans son activité peut inclure :",
    type: "multiple_choice",
    order: 2,
    points: 1,
    createdAt: new Date("2024-03-24"),
    updatedAt: new Date("2024-11-01"),
  },
  // Quiz 8 - Code Route
  {
    id: "22",
    quizId: "8",
    question: "Quelle est la vitesse maximale autorisée en ville ?",
    type: "multiple_choice",
    order: 0,
    points: 1,
    createdAt: new Date("2024-04-06"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "23",
    quizId: "8",
    question: "À une intersection sans signalisation, qui a la priorité ?",
    type: "multiple_choice",
    order: 1,
    points: 1,
    createdAt: new Date("2024-04-06"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "24",
    quizId: "8",
    question: "Que signifie un feu orange ?",
    type: "multiple_choice",
    order: 2,
    points: 1,
    createdAt: new Date("2024-04-06"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "25",
    quizId: "8",
    question: "Quelle est la distance de sécurité minimale recommandée ?",
    type: "multiple_choice",
    order: 3,
    points: 1,
    createdAt: new Date("2024-04-06"),
    updatedAt: new Date("2024-11-01"),
  },
  // Quiz 9 - Conduite
  {
    id: "26",
    quizId: "9",
    question: "Qu'est-ce que la conduite préventive ?",
    type: "multiple_choice",
    order: 0,
    points: 1,
    createdAt: new Date("2024-04-14"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "27",
    quizId: "9",
    question: "Par mauvais temps, il faut :",
    type: "multiple_choice",
    order: 1,
    points: 1,
    createdAt: new Date("2024-04-14"),
    updatedAt: new Date("2024-11-01"),
  },
  {
    id: "28",
    quizId: "9",
    question: "La distance de sécurité doit être d'au moins :",
    type: "multiple_choice",
    order: 2,
    points: 1,
    createdAt: new Date("2024-04-14"),
    updatedAt: new Date("2024-11-01"),
  },
]

export const mockAnswers: MockAnswer[] = [
  // Quiz 1 - Q1
  {
    id: "1",
    questionId: "1",
    text: "Un développement qui répond aux besoins du présent sans compromettre l'avenir",
    isCorrect: true,
    order: 0,
    createdAt: new Date("2024-01-28"),
  },
  {
    id: "2",
    questionId: "1",
    text: "Un développement économique uniquement",
    isCorrect: false,
    order: 1,
    createdAt: new Date("2024-01-28"),
  },
  {
    id: "3",
    questionId: "1",
    text: "Un développement environnemental uniquement",
    isCorrect: false,
    order: 2,
    createdAt: new Date("2024-01-28"),
  },
  // Quiz 1 - Q2
  {
    id: "4",
    questionId: "2",
    text: "2",
    isCorrect: false,
    order: 0,
    createdAt: new Date("2024-01-28"),
  },
  {
    id: "5",
    questionId: "2",
    text: "3",
    isCorrect: true,
    order: 1,
    createdAt: new Date("2024-01-28"),
  },
  {
    id: "6",
    questionId: "2",
    text: "4",
    isCorrect: false,
    order: 2,
    createdAt: new Date("2024-01-28"),
  },
  // Quiz 1 - Q3
  {
    id: "7",
    questionId: "3",
    text: "Transformer le monde d'ici 2030",
    isCorrect: true,
    order: 0,
    createdAt: new Date("2024-01-28"),
  },
  {
    id: "8",
    questionId: "3",
    text: "Réduire la pauvreté uniquement",
    isCorrect: false,
    order: 1,
    createdAt: new Date("2024-01-28"),
  },
  {
    id: "9",
    questionId: "3",
    text: "Protéger l'environnement uniquement",
    isCorrect: false,
    order: 2,
    createdAt: new Date("2024-01-28"),
  },
  // Quiz 1 - Q4
  {
    id: "10",
    questionId: "4",
    text: "15",
    isCorrect: false,
    order: 0,
    createdAt: new Date("2024-01-28"),
  },
  {
    id: "11",
    questionId: "4",
    text: "17",
    isCorrect: true,
    order: 1,
    createdAt: new Date("2024-01-28"),
  },
  {
    id: "12",
    questionId: "4",
    text: "20",
    isCorrect: false,
    order: 2,
    createdAt: new Date("2024-01-28"),
  },
  // Quiz 2 - Q1
  {
    id: "13",
    questionId: "5",
    text: "L'énergie hydraulique",
    isCorrect: true,
    order: 0,
    createdAt: new Date("2024-02-06"),
  },
  {
    id: "14",
    questionId: "5",
    text: "L'énergie solaire",
    isCorrect: false,
    order: 1,
    createdAt: new Date("2024-02-06"),
  },
  {
    id: "15",
    questionId: "5",
    text: "L'énergie éolienne",
    isCorrect: false,
    order: 2,
    createdAt: new Date("2024-02-06"),
  },
  // Quiz 2 - Q2
  {
    id: "16",
    questionId: "6",
    text: "Ils convertissent la lumière du soleil en électricité",
    isCorrect: true,
    order: 0,
    createdAt: new Date("2024-02-06"),
  },
  {
    id: "17",
    questionId: "6",
    text: "Ils stockent l'énergie du vent",
    isCorrect: false,
    order: 1,
    createdAt: new Date("2024-02-06"),
  },
  {
    id: "18",
    questionId: "6",
    text: "Ils produisent de la chaleur uniquement",
    isCorrect: false,
    order: 2,
    createdAt: new Date("2024-02-06"),
  },
  // Quiz 2 - Q3
  {
    id: "19",
    questionId: "7",
    text: "Elles sont inépuisables et respectueuses de l'environnement",
    isCorrect: true,
    order: 0,
    createdAt: new Date("2024-02-06"),
  },
  {
    id: "20",
    questionId: "7",
    text: "Elles sont moins chères que les énergies fossiles",
    isCorrect: false,
    order: 1,
    createdAt: new Date("2024-02-06"),
  },
  {
    id: "21",
    questionId: "7",
    text: "Elles ne nécessitent pas d'infrastructure",
    isCorrect: false,
    order: 2,
    createdAt: new Date("2024-02-06"),
  },
  // Quiz 3 - Q1
  {
    id: "22",
    questionId: "8",
    text: "Réduire, Réutiliser, Recycler",
    isCorrect: true,
    order: 0,
    createdAt: new Date("2024-02-14"),
  },
  {
    id: "23",
    questionId: "8",
    text: "Réduire, Réparer, Recycler",
    isCorrect: false,
    order: 1,
    createdAt: new Date("2024-02-14"),
  },
  {
    id: "24",
    questionId: "8",
    text: "Réutiliser, Réparer, Recycler",
    isCorrect: false,
    order: 2,
    createdAt: new Date("2024-02-14"),
  },
  // Quiz 3 - Q2
  {
    id: "25",
    questionId: "9",
    text: "Les déchets organiques (restes de nourriture, feuilles)",
    isCorrect: true,
    order: 0,
    createdAt: new Date("2024-02-14"),
  },
  {
    id: "26",
    questionId: "9",
    text: "Les déchets plastiques",
    isCorrect: false,
    order: 1,
    createdAt: new Date("2024-02-14"),
  },
  {
    id: "27",
    questionId: "9",
    text: "Les déchets métalliques",
    isCorrect: false,
    order: 2,
    createdAt: new Date("2024-02-14"),
  },
  // Quiz 3 - Q3
  {
    id: "28",
    questionId: "10",
    text: "100 ans",
    isCorrect: false,
    order: 0,
    createdAt: new Date("2024-02-14"),
  },
  {
    id: "29",
    questionId: "10",
    text: "400 ans",
    isCorrect: true,
    order: 1,
    createdAt: new Date("2024-02-14"),
  },
  {
    id: "30",
    questionId: "10",
    text: "10 ans",
    isCorrect: false,
    order: 2,
    createdAt: new Date("2024-02-14"),
  },
  // Quiz 4 - Q1
  {
    id: "31",
    questionId: "11",
    text: "Alterner différents types de plantes sur une même parcelle",
    isCorrect: true,
    order: 0,
    createdAt: new Date("2024-02-19"),
  },
  {
    id: "32",
    questionId: "11",
    text: "Planter toujours la même culture",
    isCorrect: false,
    order: 1,
    createdAt: new Date("2024-02-19"),
  },
  {
    id: "33",
    questionId: "11",
    text: "Utiliser beaucoup d'engrais",
    isCorrect: false,
    order: 2,
    createdAt: new Date("2024-02-19"),
  },
  // Quiz 4 - Q2
  {
    id: "34",
    questionId: "12",
    text: "Pesticides et engrais chimiques de synthèse",
    isCorrect: true,
    order: 0,
    createdAt: new Date("2024-02-19"),
  },
  {
    id: "35",
    questionId: "12",
    text: "Tous les produits naturels",
    isCorrect: false,
    order: 1,
    createdAt: new Date("2024-02-19"),
  },
  {
    id: "36",
    questionId: "12",
    text: "L'eau d'irrigation",
    isCorrect: false,
    order: 2,
    createdAt: new Date("2024-02-19"),
  },
  // Quiz 5 - Q1
  {
    id: "37",
    questionId: "13",
    text: "Fournir des services financiers aux personnes exclues du système bancaire",
    isCorrect: true,
    order: 0,
    createdAt: new Date("2024-03-05"),
  },
  {
    id: "38",
    questionId: "13",
    text: "Prêter de l'argent uniquement aux entreprises",
    isCorrect: false,
    order: 1,
    createdAt: new Date("2024-03-05"),
  },
  {
    id: "39",
    questionId: "13",
    text: "Gérer les comptes bancaires",
    isCorrect: false,
    order: 2,
    createdAt: new Date("2024-03-05"),
  },
  // Quiz 5 - Q2
  {
    id: "40",
    questionId: "14",
    text: "Le microcrédit",
    isCorrect: true,
    order: 0,
    createdAt: new Date("2024-03-05"),
  },
  {
    id: "41",
    questionId: "14",
    text: "Les prêts immobiliers",
    isCorrect: false,
    order: 1,
    createdAt: new Date("2024-03-05"),
  },
  {
    id: "42",
    questionId: "14",
    text: "Les crédits automobiles",
    isCorrect: false,
    order: 2,
    createdAt: new Date("2024-03-05"),
  },
  // Quiz 5 - Q3
  {
    id: "43",
    questionId: "15",
    text: "Réduction de la pauvreté et autonomisation",
    isCorrect: true,
    order: 0,
    createdAt: new Date("2024-03-05"),
  },
  {
    id: "44",
    questionId: "15",
    text: "Augmentation des taux d'intérêt",
    isCorrect: false,
    order: 1,
    createdAt: new Date("2024-03-05"),
  },
  {
    id: "45",
    questionId: "15",
    text: "Réduction de l'emploi",
    isCorrect: false,
    order: 2,
    createdAt: new Date("2024-03-05"),
  },
  // Quiz 6 - Q1
  {
    id: "46",
    questionId: "16",
    text: "Évaluer sa capacité de remboursement",
    isCorrect: true,
    order: 0,
    createdAt: new Date("2024-03-14"),
  },
  {
    id: "47",
    questionId: "16",
    text: "Emprunter le maximum possible",
    isCorrect: false,
    order: 1,
    createdAt: new Date("2024-03-14"),
  },
  {
    id: "48",
    questionId: "16",
    text: "Ignorer les conditions",
    isCorrect: false,
    order: 2,
    createdAt: new Date("2024-03-14"),
  },
  // Quiz 6 - Q2
  {
    id: "49",
    questionId: "17",
    text: "Un crédit où les membres se garantissent mutuellement",
    isCorrect: true,
    order: 0,
    createdAt: new Date("2024-03-14"),
  },
  {
    id: "50",
    questionId: "17",
    text: "Un crédit individuel",
    isCorrect: false,
    order: 1,
    createdAt: new Date("2024-03-14"),
  },
  {
    id: "51",
    questionId: "17",
    text: "Un crédit sans intérêt",
    isCorrect: false,
    order: 2,
    createdAt: new Date("2024-03-14"),
  },
  // Quiz 6 - Q3
  {
    id: "52",
    questionId: "18",
    text: "Communiquer avec l'institution de microfinance",
    isCorrect: true,
    order: 0,
    createdAt: new Date("2024-03-14"),
  },
  {
    id: "53",
    questionId: "18",
    text: "Ignorer le problème",
    isCorrect: false,
    order: 1,
    createdAt: new Date("2024-03-14"),
  },
  {
    id: "54",
    questionId: "18",
    text: "Arrêter de rembourser",
    isCorrect: false,
    order: 2,
    createdAt: new Date("2024-03-14"),
  },
  // Quiz 7 - Q1
  {
    id: "55",
    questionId: "19",
    text: "Faire face aux imprévus et réaliser des projets",
    isCorrect: true,
    order: 0,
    createdAt: new Date("2024-03-24"),
  },
  {
    id: "56",
    questionId: "19",
    text: "Dépenser plus",
    isCorrect: false,
    order: 1,
    createdAt: new Date("2024-03-24"),
  },
  {
    id: "57",
    questionId: "19",
    text: "Éviter les banques",
    isCorrect: false,
    order: 2,
    createdAt: new Date("2024-03-24"),
  },
  // Quiz 7 - Q2
  {
    id: "58",
    questionId: "20",
    text: "Épargner régulièrement même de petites sommes",
    isCorrect: true,
    order: 0,
    createdAt: new Date("2024-03-24"),
  },
  {
    id: "59",
    questionId: "20",
    text: "Épargner uniquement de grandes sommes",
    isCorrect: false,
    order: 1,
    createdAt: new Date("2024-03-24"),
  },
  {
    id: "60",
    questionId: "20",
    text: "Ne jamais épargner",
    isCorrect: false,
    order: 2,
    createdAt: new Date("2024-03-24"),
  },
  // Quiz 7 - Q3
  {
    id: "61",
    questionId: "21",
    text: "Achat d'équipement, formation, stock, marketing",
    isCorrect: true,
    order: 0,
    createdAt: new Date("2024-03-24"),
  },
  {
    id: "62",
    questionId: "21",
    text: "Dépenses personnelles uniquement",
    isCorrect: false,
    order: 1,
    createdAt: new Date("2024-03-24"),
  },
  {
    id: "63",
    questionId: "21",
    text: "Rien",
    isCorrect: false,
    order: 2,
    createdAt: new Date("2024-03-24"),
  },
  // Quiz 8 - Q1
  {
    id: "64",
    questionId: "22",
    text: "50 km/h",
    isCorrect: true,
    order: 0,
    createdAt: new Date("2024-04-06"),
  },
  {
    id: "65",
    questionId: "22",
    text: "60 km/h",
    isCorrect: false,
    order: 1,
    createdAt: new Date("2024-04-06"),
  },
  {
    id: "66",
    questionId: "22",
    text: "70 km/h",
    isCorrect: false,
    order: 2,
    createdAt: new Date("2024-04-06"),
  },
  // Quiz 8 - Q2
  {
    id: "67",
    questionId: "23",
    text: "La priorité à droite",
    isCorrect: true,
    order: 0,
    createdAt: new Date("2024-04-06"),
  },
  {
    id: "68",
    questionId: "23",
    text: "Le véhicule le plus rapide",
    isCorrect: false,
    order: 1,
    createdAt: new Date("2024-04-06"),
  },
  {
    id: "69",
    questionId: "23",
    text: "Le véhicule le plus gros",
    isCorrect: false,
    order: 2,
    createdAt: new Date("2024-04-06"),
  },
  // Quiz 8 - Q3
  {
    id: "70",
    questionId: "24",
    text: "Arrêt obligatoire sauf si déjà engagé",
    isCorrect: true,
    order: 0,
    createdAt: new Date("2024-04-06"),
  },
  {
    id: "71",
    questionId: "24",
    text: "Passage autorisé",
    isCorrect: false,
    order: 1,
    createdAt: new Date("2024-04-06"),
  },
  {
    id: "72",
    questionId: "24",
    text: "Arrêt obligatoire",
    isCorrect: false,
    order: 2,
    createdAt: new Date("2024-04-06"),
  },
  // Quiz 8 - Q4
  {
    id: "73",
    questionId: "25",
    text: "2 secondes",
    isCorrect: true,
    order: 0,
    createdAt: new Date("2024-04-06"),
  },
  {
    id: "74",
    questionId: "25",
    text: "1 seconde",
    isCorrect: false,
    order: 1,
    createdAt: new Date("2024-04-06"),
  },
  {
    id: "75",
    questionId: "25",
    text: "3 secondes",
    isCorrect: false,
    order: 2,
    createdAt: new Date("2024-04-06"),
  },
  // Quiz 9 - Q1
  {
    id: "76",
    questionId: "26",
    text: "Anticiper les dangers et être prêt à réagir",
    isCorrect: true,
    order: 0,
    createdAt: new Date("2024-04-14"),
  },
  {
    id: "77",
    questionId: "26",
    text: "Conduire très vite",
    isCorrect: false,
    order: 1,
    createdAt: new Date("2024-04-14"),
  },
  {
    id: "78",
    questionId: "26",
    text: "Ignorer les autres conducteurs",
    isCorrect: false,
    order: 2,
    createdAt: new Date("2024-04-14"),
  },
  // Quiz 9 - Q2
  {
    id: "79",
    questionId: "27",
    text: "Réduire sa vitesse et augmenter les distances",
    isCorrect: true,
    order: 0,
    createdAt: new Date("2024-04-14"),
  },
  {
    id: "80",
    questionId: "27",
    text: "Conduire normalement",
    isCorrect: false,
    order: 1,
    createdAt: new Date("2024-04-14"),
  },
  {
    id: "81",
    questionId: "27",
    text: "Accélérer pour sortir plus vite",
    isCorrect: false,
    order: 2,
    createdAt: new Date("2024-04-14"),
  },
  // Quiz 9 - Q3
  {
    id: "82",
    questionId: "28",
    text: "2 secondes",
    isCorrect: true,
    order: 0,
    createdAt: new Date("2024-04-14"),
  },
  {
    id: "83",
    questionId: "28",
    text: "1 seconde",
    isCorrect: false,
    order: 1,
    createdAt: new Date("2024-04-14"),
  },
  {
    id: "84",
    questionId: "28",
    text: "3 secondes",
    isCorrect: false,
    order: 2,
    createdAt: new Date("2024-04-14"),
  },
]

export const mockEnrollments: MockEnrollment[] = [
  // Client CIAI Vert - Inscriptions
  {
    id: "1",
    userId: "3",
    moduleId: "1",
    accessType: "free",
    code: null,
    enrolledAt: new Date("2024-02-01"),
    completedAt: null,
  },
  {
    id: "2",
    userId: "3",
    moduleId: "2",
    accessType: "free",
    code: null,
    enrolledAt: new Date("2024-02-10"),
    completedAt: new Date("2024-02-15"),
  },
  {
    id: "3",
    userId: "3",
    moduleId: "4",
    accessType: "free",
    code: null,
    enrolledAt: new Date("2024-02-20"),
    completedAt: null,
  },
  // Client Microfinance - Inscriptions
  {
    id: "4",
    userId: "5",
    moduleId: "3",
    accessType: "free",
    code: null,
    enrolledAt: new Date("2024-03-05"),
    completedAt: null,
  },
  {
    id: "5",
    userId: "5",
    moduleId: "6",
    accessType: "free",
    code: null,
    enrolledAt: new Date("2024-03-12"),
    completedAt: null,
  },
  {
    id: "6",
    userId: "5",
    moduleId: "7",
    accessType: "free",
    code: null,
    enrolledAt: new Date("2024-03-25"),
    completedAt: null,
  },
]

export const mockLessonProgress: MockLessonProgress[] = [
  // Client CIAI Vert - Module 1 - Progression
  {
    id: "1",
    userId: "3",
    lessonId: "1",
    completed: true,
    progress: 100,
    lastPosition: null,
    completedAt: new Date("2024-02-02"),
    updatedAt: new Date("2024-02-02"),
  },
  {
    id: "2",
    userId: "3",
    lessonId: "2",
    completed: false,
    progress: 45,
    lastPosition: 540,
    completedAt: null,
    updatedAt: new Date("2024-02-03"),
  },
  {
    id: "3",
    userId: "3",
    lessonId: "3",
    completed: false,
    progress: 0,
    lastPosition: null,
    completedAt: null,
    updatedAt: new Date("2024-02-03"),
  },
  // Client CIAI Vert - Module 2 - Progression
  {
    id: "4",
    userId: "3",
    lessonId: "5",
    completed: true,
    progress: 100,
    lastPosition: null,
    completedAt: new Date("2024-02-11"),
    updatedAt: new Date("2024-02-11"),
  },
  {
    id: "5",
    userId: "3",
    lessonId: "6",
    completed: true,
    progress: 100,
    lastPosition: null,
    completedAt: new Date("2024-02-12"),
    updatedAt: new Date("2024-02-12"),
  },
  {
    id: "6",
    userId: "3",
    lessonId: "7",
    completed: true,
    progress: 100,
    lastPosition: null,
    completedAt: new Date("2024-02-13"),
    updatedAt: new Date("2024-02-13"),
  },
  {
    id: "7",
    userId: "3",
    lessonId: "8",
    completed: true,
    progress: 100,
    lastPosition: null,
    completedAt: new Date("2024-02-14"),
    updatedAt: new Date("2024-02-14"),
  },
  {
    id: "8",
    userId: "3",
    lessonId: "9",
    completed: true,
    progress: 100,
    lastPosition: null,
    completedAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15"),
  },
  // Client CIAI Vert - Module 4 - Progression
  {
    id: "9",
    userId: "3",
    lessonId: "10",
    completed: true,
    progress: 100,
    lastPosition: null,
    completedAt: new Date("2024-02-21"),
    updatedAt: new Date("2024-02-21"),
  },
  {
    id: "10",
    userId: "3",
    lessonId: "11",
    completed: false,
    progress: 60,
    lastPosition: 648,
    completedAt: null,
    updatedAt: new Date("2024-02-22"),
  },
  {
    id: "11",
    userId: "3",
    lessonId: "12",
    completed: false,
    progress: 0,
    lastPosition: null,
    completedAt: null,
    updatedAt: new Date("2024-02-22"),
  },
  {
    id: "12",
    userId: "3",
    lessonId: "13",
    completed: false,
    progress: 0,
    lastPosition: null,
    completedAt: null,
    updatedAt: new Date("2024-02-22"),
  },
  // Client Microfinance - Module 3 - Progression
  {
    id: "13",
    userId: "5",
    lessonId: "18",
    completed: true,
    progress: 100,
    lastPosition: null,
    completedAt: new Date("2024-03-06"),
    updatedAt: new Date("2024-03-06"),
  },
  {
    id: "14",
    userId: "5",
    lessonId: "19",
    completed: true,
    progress: 100,
    lastPosition: null,
    completedAt: new Date("2024-03-07"),
    updatedAt: new Date("2024-03-07"),
  },
  {
    id: "15",
    userId: "5",
    lessonId: "20",
    completed: false,
    progress: 30,
    lastPosition: 324,
    completedAt: null,
    updatedAt: new Date("2024-03-08"),
  },
  {
    id: "16",
    userId: "5",
    lessonId: "21",
    completed: false,
    progress: 0,
    lastPosition: null,
    completedAt: null,
    updatedAt: new Date("2024-03-08"),
  },
  // Client Microfinance - Module 6 - Progression
  {
    id: "17",
    userId: "5",
    lessonId: "22",
    completed: true,
    progress: 100,
    lastPosition: null,
    completedAt: new Date("2024-03-13"),
    updatedAt: new Date("2024-03-13"),
  },
  {
    id: "18",
    userId: "5",
    lessonId: "23",
    completed: false,
    progress: 75,
    lastPosition: 855,
    completedAt: null,
    updatedAt: new Date("2024-03-14"),
  },
  {
    id: "19",
    userId: "5",
    lessonId: "24",
    completed: false,
    progress: 0,
    lastPosition: null,
    completedAt: null,
    updatedAt: new Date("2024-03-14"),
  },
  {
    id: "20",
    userId: "5",
    lessonId: "25",
    completed: false,
    progress: 0,
    lastPosition: null,
    completedAt: null,
    updatedAt: new Date("2024-03-14"),
  },
  // Client Microfinance - Module 7 - Progression
  {
    id: "21",
    userId: "5",
    lessonId: "26",
    completed: true,
    progress: 100,
    lastPosition: null,
    completedAt: new Date("2024-03-26"),
    updatedAt: new Date("2024-03-26"),
  },
  {
    id: "22",
    userId: "5",
    lessonId: "27",
    completed: false,
    progress: 50,
    lastPosition: 540,
    completedAt: null,
    updatedAt: new Date("2024-03-27"),
  },
  {
    id: "23",
    userId: "5",
    lessonId: "28",
    completed: false,
    progress: 0,
    lastPosition: null,
    completedAt: null,
    updatedAt: new Date("2024-03-27"),
  },
  {
    id: "24",
    userId: "5",
    lessonId: "29",
    completed: false,
    progress: 0,
    lastPosition: null,
    completedAt: null,
    updatedAt: new Date("2024-03-27"),
  },
]

// Fonctions mockées pour simuler Prisma
export const mockPrisma = {
  tenant: {
    findMany: async () => mockTenants,
    findUnique: async (args: { where: { id: string } }) => {
      return mockTenants.find((t) => t.id === args.where.id) || null
    },
    count: async (args?: { where?: any }) => {
      if (!args?.where) return mockTenants.length
      if (args.where.status) {
        return mockTenants.filter((t) => t.status === args.where.status).length
      }
      return mockTenants.length
    },
    create: async (args: { data: any }) => {
      const newTenant: MockTenant = {
        id: String(mockTenants.length + 1),
        ...args.data,
        createdAt: new Date(),
        updatedAt: new Date(),
        _count: {
          users: 0,
          modules: 0,
          programs: 0,
        },
      }
      mockTenants.push(newTenant)
      return newTenant
    },
    groupBy: async (args: { by: string[]; _count: any }) => {
      const planTypes = ["FREE", "BASIC", "PROFESSIONAL", "ENTERPRISE"] as PlanType[]
      return planTypes.map((planType) => ({
        planType,
        _count: {
          id: mockTenants.filter((t) => t.planType === planType).length,
        },
      }))
    },
  },
  user: {
    findUnique: async (args: { where: { email: string } }) => {
      return mockUsers.find((u) => u.email === args.where.email) || null
    },
    count: async (args?: { where?: any }) => {
      if (!args?.where) return mockUsers.length
      if (args.where.role) {
        return mockUsers.filter((u) => u.role !== args.where.role.not).length
      }
      return mockUsers.length
    },
    findMany: async (args?: { where?: any }) => {
      if (!args?.where) return mockUsers
      if (args.where.tenantId) {
        return mockUsers.filter((u) => u.tenantId === args.where.tenantId)
      }
      return mockUsers
    },
  },
  module: {
    count: async () => {
      return mockTenants.reduce((sum, t) => sum + (t._count?.modules || 0), 0)
    },
    findMany: async (args?: { where?: any }) => {
      if (!args?.where) return mockModules
      if (args.where.tenantId) {
        return mockModules.filter((m) => m.tenantId === args.where.tenantId)
      }
      return mockModules
    },
    findUnique: async (args: { where: { id: string } }) => {
      return mockModules.find((m) => m.id === args.where.id) || null
    },
  },
  program: {
    findMany: async (args?: { where?: any }) => {
      if (!args?.where) return mockPrograms
      if (args.where.tenantId) {
        return mockPrograms.filter((p) => p.tenantId === args.where.tenantId)
      }
      return mockPrograms
    },
    findUnique: async (args: { where: { id: string } }) => {
      return mockPrograms.find((p) => p.id === args.where.id) || null
    },
  },
  lesson: {
    findMany: async (args?: { where?: any }) => {
      if (!args?.where) return mockLessons
      if (args.where.moduleId) {
        return mockLessons.filter((l) => l.moduleId === args.where.moduleId)
      }
      return mockLessons
    },
  },
  quiz: {
    findUnique: async (args: { where: { moduleId: string } }) => {
      return mockQuizzes.find((q) => q.moduleId === args.where.moduleId) || null
    },
  },
  question: {
    findMany: async (args?: { where?: any }) => {
      if (!args?.where) return mockQuestions
      if (args.where.quizId) {
        return mockQuestions.filter((q) => q.quizId === args.where.quizId)
      }
      return mockQuestions
    },
  },
  answer: {
    findMany: async (args?: { where?: any }) => {
      if (!args?.where) return mockAnswers
      if (args.where.questionId) {
        return mockAnswers.filter((a) => a.questionId === args.where.questionId)
      }
      return mockAnswers
    },
  },
  enrollment: {
    findMany: async (args?: { where?: any }) => {
      if (!args?.where) return mockEnrollments
      if (args.where.userId) {
        return mockEnrollments.filter((e) => e.userId === args.where.userId)
      }
      return mockEnrollments
    },
    findUnique: async (args: { where: { userId_moduleId: { userId: string; moduleId: string } } }) => {
      return mockEnrollments.find(
        (e) => e.userId === args.where.userId_moduleId.userId && e.moduleId === args.where.userId_moduleId.moduleId
      ) || null
    },
  },
  lessonProgress: {
    findMany: async (args?: { where?: any }) => {
      if (!args?.where) return mockLessonProgress
      if (args.where.userId) {
        return mockLessonProgress.filter((p) => p.userId === args.where.userId)
      }
      return mockLessonProgress
    },
    findUnique: async (args: { where: { userId_lessonId: { userId: string; lessonId: string } } }) => {
      return mockLessonProgress.find(
        (p) => p.userId === args.where.userId_lessonId.userId && p.lessonId === args.where.userId_lessonId.lessonId
      ) || null
    },
  },
}
