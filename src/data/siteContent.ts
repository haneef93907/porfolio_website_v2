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
    title: "Production-Ready Flutter Apps for Startups & Businesses",
    description:
      "I design and develop scalable Android and iOS apps with Flutter, Firebase, REST APIs, Stripe payments, localization, real-time features, and app store deployment.",
    resumeUrl: "/Muhammad-Haneef-CV.pdf",
    whatsappUrl: "https://wa.me/923030038699",
    stats: [
      { value: "3.5+", label: "Years" },
      { value: "40+", label: "Apps" },
      { value: "Android/iOS", label: "Mobile" },
      { value: "Flutter", label: "Firebase/API" },
    ],
  },
  services: {
    eyebrow: "Services",
    title: "Mobile app development for serious product teams.",
    description:
      "From MVPs to production apps, I help founders and businesses ship reliable Flutter products with the features users expect.",
    items: [
      {
        title: "Flutter App Development",
        description: "Clean, scalable Flutter apps with production architecture and polished UI.",
        icon: "Code2",
      },
      {
        title: "Android & iOS App Development",
        description: "Cross-platform mobile apps built for consistent Android and iOS experiences.",
        icon: "Smartphone",
      },
      {
        title: "Flutter Firebase Apps",
        description: "Auth, Firestore, Storage, push notifications, real-time updates, and cloud workflows.",
        icon: "Cloud",
      },
      {
        title: "REST API Integration",
        description: "Reliable API layers, error handling, pagination, auth tokens, and data sync.",
        icon: "ServerCog",
      },
      {
        title: "Stripe / Payment Integration",
        description: "Secure payment flows, subscriptions, checkout experiences, and donation apps.",
        icon: "CreditCard",
      },
      {
        title: "App Store & Play Store Deployment",
        description: "Release builds, signing, store assets, review prep, and launch support.",
        icon: "Store",
      },
      {
        title: "Bug Fixing & App Optimization",
        description: "Performance tuning, crash fixes, UI cleanup, state bugs, and release hardening.",
        icon: "Bug",
      },
      {
        title: "MVP Development",
        description: "Founder-friendly MVP delivery with the right scope, fast iteration, and launch focus.",
        icon: "Rocket",
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
    eyebrow: "Why Hire Me",
    title: "I build apps like products, not just screens.",
    description:
      "You get a Flutter developer who understands launch pressure, product quality, communication, and the engineering details that keep mobile apps stable after release.",
    items: [
      { title: "Clean and scalable code", description: "Feature structure, state management, API layers, and maintainable patterns.", icon: "ShieldCheck" },
      { title: "Production-ready development", description: "Release-minded builds with performance, error states, and edge cases handled.", icon: "CheckCircle2" },
      { title: "Fast communication", description: "Clear updates, quick decisions, and practical delivery conversations.", icon: "Timer" },
      { title: "End-to-end app delivery", description: "Screens, APIs, Firebase, payments, notifications, testing, and release prep.", icon: "Truck" },
      { title: "Store deployment experience", description: "Android and iOS build signing, release assets, review prep, and launch support.", icon: "Wrench" },
      { title: "Long-term support after delivery", description: "Post-launch fixes, optimization, feature iteration, and product stability.", icon: "Headphones" },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Have a Flutter app to build, fix, or launch?",
    description:
      "Send the project details and I will respond with a clear next step. I am available for Flutter development, MVPs, Firebase apps, integrations, optimization, and store deployment.",
    email: "haneef93907@gmail.com",
    phone: "+92 303 0038699",
    whatsappUrl: "https://wa.me/923030038699",
    linkedinUrl: "https://www.linkedin.com/in/muhammad-haneef-flutterdev/",
    githubUrl: "https://github.com",
    bestFit: "Best fit: startups, founders, agencies, and businesses that need a reliable Flutter developer for real production apps.",
    projectTypes: ["MVP Development", "Flutter App Development", "Firebase App", "API / Stripe Integration", "Bug Fixing / Optimization", "Store Deployment"],
    budgetRanges: ["$1k - $3k", "$3k - $7k", "$7k - $15k", "$15k+", "Need estimate"],
  },
  footer: {
    owner: "Muhammad Haneef",
    tagline: "Designed & Built with Flutter Precision",
  },
};
