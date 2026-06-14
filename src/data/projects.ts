export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  date: string;
  features: string[];
  impact?: string;
  image: string;
  link?: string;
}

const defaultProjects: Project[] = [
  {
    id: "gemini-cms",
    title: "Gemini",
    description: "Secure, Scalable, and Cloud-based CMS designed to simplify content delivery across digital screens. Centralizes control for managing campaigns, corporate communications, and DOOH Advertising.",
    technologies: ["Flutter", "Cloud", "CMS", "DOOH", "Firebase"],
    date: "2024 - Present",
    features: [
      "Centralized content management for digital screens and signage",
      "Campaign management for corporate communications and DOOH advertising",
      "Cloud-based architecture for scalable content delivery",
      "Secure content distribution across multiple digital endpoints"
    ],
    impact: "Enterprise-grade digital signage CMS",
    image: "/project-gemini.jpg",
    link: "https://www.figma.com/deck/6H2RrjQ4fcSDsjqe3ZtS9s"
  },
  {
    id: "amanah-halal",
    title: "Amanah Halal Engine",
    description: "Multi-role Flutter app for Slaughterhouse Admin, Slaughterman, and End Users to manage halal compliance workflows with AI-powered verification.",
    technologies: ["Flutter", "Firebase", "FastAPI", "AI/ML", "Computer Vision", "IoT"],
    date: "April 2025 - Present",
    features: [
      "AI-Powered Verification: animal detection, pose validation, knife sharpness check, Takbeer audio detection",
      "Edge + Cloud Architecture: Raspberry Pi-based edge devices with offline-first processing",
      "Slaughter Event System: event-driven workflow with audit-ready compliance records",
      "Identity Compliance: face recognition-based slaughterman authentication"
    ],
    impact: "Government-ready compliance tracking dashboard",
    image: "/project-amanah.jpg",
    link: "https://www.figma.com/deck/8njTy8rjqqSt2s4ZGl2HNj"
  },
  {
    id: "tap-donate",
    title: "TapDonate",
    description: "Seamless donation collection app that enables users to select donation amounts and tap their card — funds are automatically deducted. Intuitive, smooth, and straightforward user experience.",
    technologies: ["Flutter", "Dart", "NFC", "Payment Gateway", "Provider"],
    date: "2024",
    features: [
      "Card-tap donation: Users simply tap their card to donate — no manual entry needed",
      "Preset donation amounts for quick one-tap giving",
      "Smooth and intuitive UX designed for frictionless donations",
      "Secure payment processing with automatic fund deduction"
    ],
    impact: "Streamlined donation process with tap-to-pay technology",
    image: "/project-tapdonate.jpg"
  },
  {
    id: "salim",
    title: "Salim",
    description: "Comprehensive maintenance services platform for individuals and companies. Users get services across AC, plumbing, electrical, cleaning, and more — with real-time order tracking and in-app chat with service providers.",
    technologies: ["Flutter", "Firebase", "Real-time Chat", "Push Notifications", "REST APIs"],
    date: "2023",
    features: [
      "Multi-category maintenance services: Refrigeration, AC, cleaning, plumbing, electrical repairs",
      "Real-time order status tracking from booking to completion",
      "In-app chat feature to engage with service providers once the order starts",
      "Service provider management and order lifecycle updates"
    ],
    impact: "All-in-one maintenance service platform with live tracking and chat",
    image: "/project-salim.jpg"
  },
  {
    id: "more-betters",
    title: "More Betters",
    description: "AI-powered self-improvement app with conversational AI providing career, financial, and personal guidance for underserved users.",
    technologies: ["Flutter", "Dart", "Bloc", "Firebase", "AI/ML", "REST APIs", "Figma"],
    date: "Sep 2024 - Present",
    features: [
      "Conversational AI for career, financial, and personal guidance",
      "Mobile-first design tailored for gig workers and mobile users",
      "Integrated professional, educational, financial, and health resources"
    ],
    impact: "Improved user engagement by 30% during early-stage product rollout",
    image: "/project-morebetters.jpg"
  },
  {
    id: "my-clone",
    title: "My Clone",
    description: "Queue, scan, and order management system with offline-first architecture and significant performance improvements.",
    technologies: ["Flutter", "Swift", "RealityKit", "Provider"],
    date: "May 2023 - Aug 2024",
    features: [
      "Queue, scan, and order management system with offline-first architecture",
      "Swift and RealityKit integration for enhanced scanning capabilities",
      "Optimized sync architecture for real-time data processing"
    ],
    impact: "Reduced scan processing time from 50 min to 5-7 min (86% improvement). Cut cloud costs by 98%.",
    image: "/project-myclone.jpg",
    link: "https://www.figma.com/deck/iVJzPYSN3d8aFTlNQl1xB8"
  },
  {
    id: "best-buy-mall",
    title: "Best Buy Mall",
    description: "E-commerce platform with order tracking, store management, and seamless product browsing for users and businesses.",
    technologies: ["Flutter", "Android Native", "Dart", "Provider", "Bitbucket"],
    date: "Jan 2023 - Apr 2023",
    features: [
      "Order tracking system for users and businesses",
      "Store management for remote store operations (pickup, dine-in, delivery)",
      "Search and registration for seamless product browsing and ordering"
    ],
    image: "/project-bestbuy.jpg",
    link: "https://www.figma.com/deck/8zHN4nf4Sj0oKnYbnMVjJ0"
  },
  {
    id: "gtc-app",
    title: "GTC App",
    description: "Task-based social engagement app enabling users to grow networks, follow channels, and complete activities for rewards.",
    technologies: ["Flutter", "Bloc", "Firebase"],
    date: "Jun 2022 - Jan 2023",
    features: [
      "User tasks and reward system",
      "Social integrations and real-time progress tracking",
      "Gamified interactions and reward-driven participation"
    ],
    impact: "Enhanced user retention and engagement",
    image: "/project-gtc.jpg"
  },
  {
    id: "rock-and-love",
    title: "Rock and Love",
    description: "Event management app for bands and fans to organize concerts and events with e-commerce capabilities.",
    technologies: ["Flutter", "Dart", "Bloc", "GitHub"],
    date: "Jun 2022 - Jan 2023",
    features: [
      "Event management for bands and fans",
      "Fan interaction and e-commerce with ticket/merchandise sales",
      "User-friendly interface with robust API integration and real-time updates"
    ],
    impact: "Boosted engagement by 40%",
    image: "/project-rocklove.jpg"
  }
];

const STORAGE_KEY = "portfolio-projects-v3";

export function getProjects(): Project[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // ignore
  }
  return defaultProjects;
}

export function saveProjects(projects: Project[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function addProject(project: Omit<Project, "id">): Project[] {
  const projects = getProjects();
  const newProject: Project = {
    ...project,
    id: `project-${Date.now()}`,
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
