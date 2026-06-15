export interface SiteContent {
  hero: {
    label: string;
    title: string;
    description: string;
    resumeUrl: string;
    whatsappUrl: string;
    stats: Array<{ value: string; label: string }>;
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{ title: string; description: string; icon: string }>;
  };
  skills: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{ title: string; items: string[] }>;
  };
  experience: {
    eyebrow: string;
    title: string;
    items: Array<{
      company: string;
      role: string;
      period: string;
      location: string;
      highlights: string[];
      align: "left" | "right";
    }>;
  };
  whyHireMe: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{ title: string; description: string; icon: string }>;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    email: string;
    phone: string;
    whatsappUrl: string;
    linkedinUrl: string;
    githubUrl: string;
    resumeUrl: string;
    bestFit: string;
    projectTypes: string[];
    budgetRanges: string[];
  };
  footer: {
    owner: string;
    tagline: string;
  };
}

export const defaultSiteContent: SiteContent = {
  hero: {
    label: "Muhammad Haneef - Senior Flutter Developer",
    title: "I build production-ready Flutter apps for startups, agencies, and businesses.",
    description:
      "I'm Muhammad Haneef, a Flutter Developer with 3.5+ years of experience delivering scalable Android and iOS apps using Flutter, Firebase, REST APIs, real-time features, payments, and clean architecture.",
    resumeUrl: "/Muhammad-Haneef-CV.pdf",
    whatsappUrl: "https://wa.me/923030038699",
    stats: [
      { value: "3.5+", label: "Years Experience" },
      { value: "40+", label: "Apps Delivered" },
      { value: "Android & iOS", label: "Apps" },
      { value: "Play Store / App Store", label: "Deployments" },
    ],
  },
  services: {
    eyebrow: "What I Can Build For You",
    title: "Flutter app development for real product launches.",
    description:
      "I help startups, agencies, and businesses turn app ideas into reliable Flutter products with clean architecture, backend integrations, payments, and store-ready releases.",
    items: [
      {
        title: "Flutter Mobile App Development",
        description: "Production-ready Android and iOS apps built with Flutter, clean code, and scalable feature structure.",
        icon: "Code2",
      },
      {
        title: "Firebase App Development",
        description: "Authentication, Firestore, Storage, Cloud Messaging, real-time updates, and Firebase-backed workflows.",
        icon: "Cloud",
      },
      {
        title: "MVP Development",
        description: "Fast, founder-friendly MVP builds with focused scope, clear user flows, and launch-ready foundations.",
        icon: "Rocket",
      },
      {
        title: "API Integration",
        description: "Reliable API layers, error handling, pagination, auth tokens, and data sync.",
        icon: "ServerCog",
      },
      {
        title: "App Store & Play Store Deployment",
        description: "Release builds, signing, store assets, review preparation, and launch support.",
        icon: "Store",
      },
      {
        title: "Subscriptions & In-App Purchases",
        description: "Secure subscription flows, in-app purchases, payment states, and revenue-focused app experiences.",
        icon: "CreditCard",
      },
      {
        title: "Bug Fixing & App Optimization",
        description: "Performance tuning, crash fixes, UI cleanup, state bugs, and release hardening.",
        icon: "Bug",
      },
      {
        title: "UI Implementation from Figma",
        description: "Pixel-conscious Flutter UI implementation from Figma designs with responsive layouts and polished states.",
        icon: "Smartphone",
      },
    ],
  },
  skills: {
    eyebrow: "SKILLS",
    title: "Technical\nArsenal",
    description:
      "What I bring to the table - a CV-aligned skill set built around production-grade Flutter apps, clean architecture, API integrations, performance, deployment, and long-term app quality.",
    items: [
      {
        title: "Core Flutter Expertise",
        items: [
          "Flutter 4.x / 5.x",
          "Dart",
          "Object-Oriented Programming",
          "Cross-Platform Development",
          "Android, iOS & Web Apps",
          "Scalable App Architecture",
          "Release Management",
          "Production-Grade Delivery",
          "Git Version Control",
        ],
      },
      {
        title: "Architecture & Design Principles",
        items: [
          "Clean Architecture",
          "SOLID Principles",
          "Design Patterns",
          "Modular Architecture",
          "MVC",
          "MVVM",
          "Dependency Injection",
          "Separation of Concerns",
        ],
      },
      { title: "State Management", items: ["BLoC", "Riverpod", "Provider", "GetX"] },
      {
        title: "Backend, APIs & Security",
        items: ["REST APIs", "GraphQL", "Python FastAPI", "Node.js Express", "OAuth 2", "JWT Authentication", "Token-Based Security"],
      },
      { title: "Databases", items: ["Firebase Firestore", "MongoDB", "SQLite", "Hive", "Shared Preferences", "Supabase"] },
      { title: "Testing & Quality Assurance", items: ["Unit Testing", "Widget Testing", "Integration Testing", "Mockito", "Debugging Strategies"] },
      {
        title: "Performance Optimization",
        items: ["App Size Optimization", "Lazy Loading", "Memory Optimization", "UI Rendering Optimization", "Flutter DevTools Profiling"],
      },
      {
        title: "Cloud & DevOps",
        items: ["Firebase", "AWS", "Azure", "DigitalOcean", "Codemagic", "Bitrise", "Fastlane", "GitHub Actions", "CI/CD Pipelines", "Automated Build Deployment"],
      },
      { title: "Tools & Platforms", items: ["Git", "GitHub", "Bitbucket", "Visual Studio Code", "Android Studio", "Xcode"] },
      { title: "Notifications & Real-Time Messaging", items: ["Firebase Cloud Messaging", "OneSignal", "WebSocket", "Push Notification Systems"] },
      { title: "Monitoring & Analytics", items: ["Crashlytics", "Crash Reporting", "Firebase Analytics", "Firebase Services"] },
      {
        title: "Agile & Collaboration",
        items: ["Agile / Scrum", "Sprint Planning", "Kanban", "Jira", "Trello", "Code Reviews", "Technical Documentation", "Team Collaboration"],
      },
    ],
  },
  experience: {
    eyebrow: "EXPERIENCE",
    title: "Work History",
    items: [
      {
        company: "Emblem Technology",
        role: "Flutter Developer / Software Engineer",
        period: "Jan 2023 - Present",
        location: "Lahore, Pakistan",
        align: "right",
        highlights: [
          "Owned end-to-end delivery of 5+ client products serving 20K+ users",
          "Architected backend services using Node.js, FastAPI, and Firebase",
          "Established CI/CD pipelines reducing release cycles by 30%",
          "Led and mentored a cross-functional team of 20+ engineers",
          "Designed offline-first architectures achieving near 100% availability",
          "Reduced cloud infrastructure costs by 98%",
        ],
      },
      {
        company: "DigitalUx",
        role: "Flutter Developer",
        period: "Jun 2022 - Jan 2023",
        location: "Lahore, Pakistan",
        align: "left",
        highlights: [
          "Delivered 4+ production-grade Flutter apps published on Play Store and App Store",
          "Implemented real-time features: live chat, push notifications, in-app purchases, NFC payments",
          "Developed internal Jira-style ticket management system",
          "Collaborated with clients, PMs, and designers for scalable mobile UI/UX",
        ],
      },
    ],
  },
  whyHireMe: {
    eyebrow: "Why Clients Choose Me",
    title: "Reliable Flutter development from idea to store release.",
    description:
      "Clients work with me because I care about product quality, communication, clean architecture, and the details that keep apps stable after launch.",
    items: [
      { title: "Clean and scalable code", description: "Feature structure, state management, API layers, and maintainable patterns.", icon: "ShieldCheck" },
      { title: "Production-ready Flutter architecture", description: "Release-minded builds with performance, error states, and edge cases handled.", icon: "CheckCircle2" },
      { title: "Fast communication", description: "Clear updates, quick decisions, and practical delivery conversations.", icon: "Timer" },
      { title: "40+ apps delivered", description: "Hands-on experience across MVPs, marketplaces, payments, internal tools, and production apps.", icon: "Truck" },
      { title: "Store deployment experience", description: "Android and iOS build signing, release assets, review prep, and launch support.", icon: "Wrench" },
      { title: "Long-term support after delivery", description: "Post-launch fixes, optimization, feature iteration, and product stability.", icon: "Headphones" },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Have an app idea? Let's build it.",
    description:
      "Tell me what you want to build, fix, or launch. I will respond with a clear next step for your Flutter app.",
    email: "haneef93907@gmail.com",
    phone: "+92 303 0038699",
    whatsappUrl: "https://wa.me/923030038699",
    linkedinUrl: "https://www.linkedin.com/in/muhammad-haneef-flutterdev/",
    githubUrl: "https://github.com",
    resumeUrl: "/Muhammad-Haneef-CV.pdf",
    bestFit: "Best fit: startups, founders, agencies, and businesses that need a reliable Flutter developer for real production apps.",
    projectTypes: ["MVP Development", "Flutter App Development", "Firebase App", "API / Stripe Integration", "Bug Fixing / Optimization", "Store Deployment"],
    budgetRanges: ["$1k - $3k", "$3k - $7k", "$7k - $15k", "$15k+", "Need estimate"],
  },
  footer: {
    owner: "Muhammad Haneef",
    tagline: "Designed & Built with Flutter Precision",
  },
};
