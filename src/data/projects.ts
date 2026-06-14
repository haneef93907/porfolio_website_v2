export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  overview: string;
  problem: string;
  solution: string;
  role: string;
  technologies: string[];
  category: string;
  date: string;
  features: string[];
  screenshots: string[];
  result: string;
  impact?: string;
  image: string;
  links: {
    playStore?: string;
    appStore?: string;
    website?: string;
    caseStudy?: string;
  };
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
  published: boolean;
  link?: string;
}

const defaultProjects: Project[] = [
  {
    id: "gemini-cms",
    slug: "gemini-cloud-cms",
    title: "Gemini",
    description: "Cloud CMS for managing campaigns, digital signage, and DOOH content across distributed screens.",
    overview: "Gemini is a secure, cloud-based CMS designed to simplify content delivery across digital screens for campaigns, corporate communication, and DOOH advertising.",
    problem: "The client needed centralized control over many digital endpoints, with reliable publishing workflows and a clean operator experience.",
    solution: "I helped build a Flutter experience connected to cloud services, with structured campaign management, secure content distribution, and scalable content delivery workflows.",
    role: "Flutter Developer responsible for mobile architecture, UI implementation, Firebase/cloud integration, and performance-focused delivery.",
    technologies: ["Flutter", "Cloud", "CMS", "DOOH", "Firebase"],
    category: "Enterprise CMS",
    date: "2024 - Present",
    features: [
      "Centralized content management for digital screens and signage",
      "Campaign management for corporate communications and DOOH advertising",
      "Cloud-based architecture for scalable content delivery",
      "Secure content distribution across multiple digital endpoints"
    ],
    screenshots: ["/project-gemini.jpg"],
    result: "Created an enterprise-grade foundation for controlled digital signage operations and campaign delivery.",
    impact: "Enterprise-grade digital signage CMS",
    image: "/project-gemini.jpg",
    links: { caseStudy: "https://www.figma.com/deck/6H2RrjQ4fcSDsjqe3ZtS9s" },
    seoTitle: "Gemini CMS Flutter Case Study | Muhammad Haneef",
    seoDescription: "Cloud CMS and DOOH Flutter app case study by Muhammad Haneef.",
    featured: true,
    published: true,
    link: "https://www.figma.com/deck/6H2RrjQ4fcSDsjqe3ZtS9s"
  },
  {
    id: "amanah-halal",
    slug: "amanah-halal-engine",
    title: "Amanah Halal Engine",
    description: "Multi-role compliance app with AI-assisted verification, audit records, and offline-ready workflows.",
    overview: "Amanah Halal Engine is a compliance platform for slaughterhouse admins, slaughtermen, and end users, combining Flutter workflows with AI-powered verification.",
    problem: "Manual compliance workflows were difficult to audit, slow to verify, and hard to standardize across multiple operational roles.",
    solution: "I contributed a role-based Flutter app with event-driven compliance records, camera/audio verification flows, offline-first edge behavior, and Firebase/FastAPI integrations.",
    role: "Flutter Developer working across role-based UX, Firebase integration, AI workflow screens, and app reliability.",
    technologies: ["Flutter", "Firebase", "FastAPI", "AI/ML", "Computer Vision", "IoT"],
    category: "AI Compliance",
    date: "April 2025 - Present",
    features: [
      "AI-Powered Verification: animal detection, pose validation, knife sharpness check, Takbeer audio detection",
      "Edge + Cloud Architecture: Raspberry Pi-based edge devices with offline-first processing",
      "Slaughter Event System: event-driven workflow with audit-ready compliance records",
      "Identity Compliance: face recognition-based slaughterman authentication"
    ],
    screenshots: ["/project-amanah.jpg"],
    result: "Improved readiness for auditable, government-grade halal compliance workflows.",
    impact: "Government-ready compliance tracking dashboard",
    image: "/project-amanah.jpg",
    links: { caseStudy: "https://www.figma.com/deck/8njTy8rjqqSt2s4ZGl2HNj" },
    seoTitle: "Amanah Halal Engine Flutter Case Study | AI Compliance App",
    seoDescription: "AI-powered halal compliance Flutter app with Firebase, FastAPI, and edge workflows.",
    featured: true,
    published: true,
    link: "https://www.figma.com/deck/8njTy8rjqqSt2s4ZGl2HNj"
  },
  {
    id: "tap-donate",
    slug: "tapdonate-payment-app",
    title: "TapDonate",
    description: "Tap-to-pay donation app with quick amount selection and secure payment processing.",
    overview: "TapDonate makes giving fast by allowing donors to select an amount and tap their card for a frictionless payment experience.",
    problem: "Donation collection needed to be fast, trustworthy, and simple enough for in-person environments.",
    solution: "I built a Flutter payment flow focused on low-friction amount selection, NFC/card interactions, and secure gateway handling.",
    role: "Flutter Developer responsible for donation UX, payment integration screens, state management, and release polish.",
    technologies: ["Flutter", "Dart", "NFC", "Payment Gateway", "Provider"],
    category: "Payments",
    date: "2024",
    features: [
      "Card-tap donation: Users simply tap their card to donate — no manual entry needed",
      "Preset donation amounts for quick one-tap giving",
      "Smooth and intuitive UX designed for frictionless donations",
      "Secure payment processing with automatic fund deduction"
    ],
    screenshots: ["/project-tapdonate.jpg"],
    result: "Reduced donation friction with a polished tap-to-pay mobile experience.",
    impact: "Streamlined donation process with tap-to-pay technology",
    image: "/project-tapdonate.jpg",
    links: {},
    seoTitle: "TapDonate Flutter Payment App Case Study",
    seoDescription: "Flutter NFC payment and donation app case study by Muhammad Haneef.",
    featured: true,
    published: true
  },
  {
    id: "salim",
    slug: "salim-maintenance-services-app",
    title: "Salim",
    description: "Maintenance services marketplace with real-time order tracking and in-app provider chat.",
    overview: "Salim connects individuals and companies with maintenance providers across AC, plumbing, electrical, cleaning, and related services.",
    problem: "Customers needed clearer booking, live status updates, and direct communication once a service request started.",
    solution: "I implemented order lifecycle screens, real-time tracking, chat, notifications, and service category flows in Flutter.",
    role: "Flutter Developer handling app screens, Firebase/REST API flows, real-time chat, and push notification UX.",
    technologies: ["Flutter", "Firebase", "Real-time Chat", "Push Notifications", "REST APIs"],
    category: "Marketplace",
    date: "2023",
    features: [
      "Multi-category maintenance services: Refrigeration, AC, cleaning, plumbing, electrical repairs",
      "Real-time order status tracking from booking to completion",
      "In-app chat feature to engage with service providers once the order starts",
      "Service provider management and order lifecycle updates"
    ],
    screenshots: ["/project-salim.jpg"],
    result: "Delivered a complete service booking flow with live status and provider communication.",
    impact: "All-in-one maintenance service platform with live tracking and chat",
    image: "/project-salim.jpg",
    links: {},
    seoTitle: "Salim Flutter Services Marketplace Case Study",
    seoDescription: "Maintenance services Flutter app with real-time chat, tracking, Firebase, and APIs.",
    featured: true,
    published: true
  },
  {
    id: "more-betters",
    slug: "more-betters-ai-self-improvement-app",
    title: "More Betters",
    description: "AI self-improvement app for career, financial, and personal guidance.",
    overview: "More Betters is an AI-powered self-improvement app that gives mobile-first users conversational guidance across personal and professional growth.",
    problem: "The product needed to make AI guidance feel approachable, structured, and useful for underserved mobile users.",
    solution: "I contributed Flutter app screens, API integrations, Bloc architecture, and polished flows around AI-driven guidance.",
    role: "Flutter Developer focused on clean architecture, API integration, mobile UI, and release iteration.",
    technologies: ["Flutter", "Dart", "Bloc", "Firebase", "AI/ML", "REST APIs", "Figma"],
    category: "AI App",
    date: "Sep 2024 - Present",
    features: [
      "Conversational AI for career, financial, and personal guidance",
      "Mobile-first design tailored for gig workers and mobile users",
      "Integrated professional, educational, financial, and health resources"
    ],
    screenshots: ["/project-morebetters.jpg"],
    result: "Helped improve engagement during early rollout through refined mobile flows.",
    impact: "Improved user engagement by 30% during early-stage product rollout",
    image: "/project-morebetters.jpg",
    links: {},
    seoTitle: "More Betters AI Flutter App Case Study",
    seoDescription: "AI-powered self-improvement Flutter app with Bloc, Firebase, and REST APIs.",
    featured: false,
    published: true
  },
  {
    id: "my-clone",
    slug: "my-clone-offline-queue-scanning-app",
    title: "My Clone",
    description: "Offline-first queue, scan, and order management app with major performance gains.",
    overview: "My Clone is a queue, scan, and order management system built for operational reliability and fast processing.",
    problem: "Scanning workflows were slow, costly, and fragile when network availability changed.",
    solution: "I improved the Flutter architecture with offline-first behavior, optimized sync, and native scanning enhancements.",
    role: "Flutter Developer handling offline-first architecture, performance optimization, Provider state management, and native integrations.",
    technologies: ["Flutter", "Swift", "RealityKit", "Provider"],
    category: "Operations",
    date: "May 2023 - Aug 2024",
    features: [
      "Queue, scan, and order management system with offline-first architecture",
      "Swift and RealityKit integration for enhanced scanning capabilities",
      "Optimized sync architecture for real-time data processing"
    ],
    screenshots: ["/project-myclone.jpg"],
    result: "Reduced scan processing time from 50 minutes to 5-7 minutes and cut cloud costs by 98%.",
    impact: "Reduced scan processing time from 50 min to 5-7 min (86% improvement). Cut cloud costs by 98%.",
    image: "/project-myclone.jpg",
    links: { caseStudy: "https://www.figma.com/deck/iVJzPYSN3d8aFTlNQl1xB8" },
    seoTitle: "My Clone Offline-First Flutter Case Study",
    seoDescription: "Flutter queue and scanning app case study with offline-first architecture and 86% faster processing.",
    featured: true,
    published: true,
    link: "https://www.figma.com/deck/iVJzPYSN3d8aFTlNQl1xB8"
  },
  {
    id: "best-buy-mall",
    slug: "best-buy-mall-ecommerce-app",
    title: "Best Buy Mall",
    description: "E-commerce app with product browsing, store management, and order tracking.",
    overview: "Best Buy Mall is an e-commerce platform built for users and businesses with browsing, ordering, and remote store operations.",
    problem: "The platform needed reliable ordering flows and simple store operations across pickup, dine-in, and delivery.",
    solution: "I developed Flutter app flows for browsing, order tracking, store management, and API-backed commerce actions.",
    role: "Flutter Developer responsible for UI implementation, order flows, Android native integration, and Provider state management.",
    technologies: ["Flutter", "Android Native", "Dart", "Provider", "Bitbucket"],
    category: "E-commerce",
    date: "Jan 2023 - Apr 2023",
    features: [
      "Order tracking system for users and businesses",
      "Store management for remote store operations (pickup, dine-in, delivery)",
      "Search and registration for seamless product browsing and ordering"
    ],
    screenshots: ["/project-bestbuy.jpg"],
    result: "Delivered core e-commerce and store management flows for a multi-mode ordering platform.",
    image: "/project-bestbuy.jpg",
    links: { caseStudy: "https://www.figma.com/deck/8zHN4nf4Sj0oKnYbnMVjJ0" },
    seoTitle: "Best Buy Mall Flutter E-commerce Case Study",
    seoDescription: "Flutter e-commerce app with order tracking, store management, and Android integration.",
    featured: false,
    published: true,
    link: "https://www.figma.com/deck/8zHN4nf4Sj0oKnYbnMVjJ0"
  },
  {
    id: "gtc-app",
    slug: "gtc-social-rewards-app",
    title: "GTC App",
    description: "Social engagement and rewards app with tasks, progress tracking, and Firebase features.",
    overview: "GTC App helps users complete tasks, grow social networks, follow channels, and earn rewards.",
    problem: "The product needed gamified engagement loops that felt simple and reliable on mobile.",
    solution: "I built Flutter screens and Firebase-backed flows for tasks, reward progress, and real-time activity updates.",
    role: "Flutter Developer handling task UX, Bloc architecture, Firebase integration, and UI polish.",
    technologies: ["Flutter", "Bloc", "Firebase"],
    category: "Rewards",
    date: "Jun 2022 - Jan 2023",
    features: [
      "User tasks and reward system",
      "Social integrations and real-time progress tracking",
      "Gamified interactions and reward-driven participation"
    ],
    screenshots: ["/project-gtc.jpg"],
    result: "Improved social engagement through clear task loops and real-time progress tracking.",
    impact: "Enhanced user retention and engagement",
    image: "/project-gtc.jpg",
    links: {},
    seoTitle: "GTC Flutter Social Rewards App Case Study",
    seoDescription: "Flutter rewards app with Firebase, Bloc, tasks, and real-time progress tracking.",
    featured: false,
    published: true
  },
  {
    id: "rock-and-love",
    slug: "rock-and-love-event-app",
    title: "Rock and Love",
    description: "Event management app for bands and fans with commerce and engagement flows.",
    overview: "Rock and Love helps bands and fans organize concerts, manage events, and interact through ticket and merchandise flows.",
    problem: "The client needed a fan-friendly mobile experience that combined events, engagement, and commerce.",
    solution: "I delivered Flutter UI, API integration, event flows, and e-commerce interactions with a scalable Bloc setup.",
    role: "Flutter Developer responsible for event screens, API integration, state management, and app polish.",
    technologies: ["Flutter", "Dart", "Bloc", "GitHub"],
    category: "Events",
    date: "Jun 2022 - Jan 2023",
    features: [
      "Event management for bands and fans",
      "Fan interaction and e-commerce with ticket/merchandise sales",
      "User-friendly interface with robust API integration and real-time updates"
    ],
    screenshots: ["/project-rocklove.jpg"],
    result: "Boosted engagement by 40% through mobile-first event and fan interaction flows.",
    impact: "Boosted engagement by 40%",
    image: "/project-rocklove.jpg",
    links: {},
    seoTitle: "Rock and Love Flutter Event App Case Study",
    seoDescription: "Flutter event app for bands and fans with e-commerce and API integrations.",
    featured: false,
    published: true
  }
];

const STORAGE_KEY = "portfolio-projects-v3";

export function getProjects(): Project[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored).map(normalizeProject);
    }
  } catch {
    // ignore
  }
  return defaultProjects;
}

export function getPublishedProjects(): Project[] {
  return getProjects().filter((project) => project.published);
}

export function getFeaturedProjects(): Project[] {
  return getPublishedProjects().filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getPublishedProjects().find((project) => project.slug === slug || project.id === slug);
}

export function saveProjects(projects: Project[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function addProject(project: Omit<Project, "id">): Project[] {
  const projects = getProjects();
  const newProject: Project = {
    ...project,
    id: `project-${Date.now()}`,
    slug: project.slug || slugify(project.title),
  };
  const updated = [...projects, newProject];
  saveProjects(updated);
  return updated;
}

export function updateProject(id: string, updates: Partial<Project>): Project[] {
  const projects = getProjects();
  const updated = projects.map((p) => (p.id === id ? { ...p, ...updates } : p));
  saveProjects(updated);
  return updated;
}

export function deleteProject(id: string): Project[] {
  const projects = getProjects();
  const updated = projects.filter((p) => p.id !== id);
  saveProjects(updated);
  return updated;
}

export function resetProjects(): Project[] {
  saveProjects(defaultProjects);
  return defaultProjects;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeProject(project: Project): Project {
  return {
    ...project,
    slug: project.slug || slugify(project.title),
    overview: project.overview || project.description,
    problem: project.problem || "The client needed a reliable, production-ready mobile experience.",
    solution: project.solution || project.description,
    role: project.role || "Flutter Developer",
    category: project.category || "Mobile App",
    screenshots: project.screenshots?.length ? project.screenshots : [project.image],
    result: project.result || project.impact || "Delivered a polished production-ready mobile app experience.",
    links: project.links || { website: project.link },
    seoTitle: project.seoTitle || `${project.title} Flutter Case Study | Muhammad Haneef`,
    seoDescription: project.seoDescription || project.description,
    featured: project.featured ?? false,
    published: project.published ?? true,
  };
}
