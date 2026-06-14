import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { safeArray } from "../lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
  title: string;
  items: string[];
}

const skills: SkillCategory[] = [
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
  {
    title: "State Management",
    items: ["BLoC", "Riverpod", "Provider", "GetX"],
  },
  {
    title: "Backend, APIs & Security",
    items: [
      "REST APIs",
      "GraphQL",
      "Python FastAPI",
      "Node.js Express",
      "OAuth 2",
      "JWT Authentication",
      "Token-Based Security",
    ],
  },
  {
    title: "Databases",
    items: [
      "Firebase Firestore",
      "MongoDB",
      "SQLite",
      "Hive",
      "Shared Preferences",
      "Supabase",
    ],
  },
  {
    title: "Testing & Quality Assurance",
    items: [
      "Unit Testing",
      "Widget Testing",
      "Integration Testing",
      "Mockito",
      "Debugging Strategies",
    ],
  },
  {
    title: "Performance Optimization",
    items: [
      "App Size Optimization",
      "Lazy Loading",
      "Memory Optimization",
      "UI Rendering Optimization",
      "Flutter DevTools Profiling",
    ],
  },
  {
    title: "Cloud & DevOps",
    items: [
      "Firebase",
      "AWS",
      "Azure",
      "DigitalOcean",
      "Codemagic",
      "Bitrise",
      "Fastlane",
      "GitHub Actions",
      "CI/CD Pipelines",
      "Automated Build Deployment",
    ],
  },
  {
    title: "Tools & Platforms",
    items: [
      "Git",
      "GitHub",
      "Bitbucket",
      "Visual Studio Code",
      "Android Studio",
      "Xcode",
    ],
  },
  {
    title: "Notifications & Real-Time Messaging",
    items: [
      "Firebase Cloud Messaging",
      "OneSignal",
      "WebSocket",
      "Push Notification Systems",
    ],
  },
  {
    title: "Monitoring & Analytics",
    items: [
      "Crashlytics",
      "Crash Reporting",
      "Firebase Analytics",
      "Firebase Services",
    ],
  },
  {
    title: "Agile & Collaboration",
    items: [
      "Agile / Scrum",
      "Sprint Planning",
      "Kanban",
      "Jira",
      "Trello",
      "Code Reviews",
      "Technical Documentation",
      "Team Collaboration",
    ],
  },
];

function SkillItem({ skill }: { skill: SkillCategory }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current || !itemsRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power2.out",
      }
    );

    tl.fromTo(
      itemsRef.current.children,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.08,
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.3"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="mb-10 last:mb-0">
      <h3
        ref={headingRef}
        className="font-grotesk font-semibold text-xl sm:text-2xl lg:text-[28px] text-foreground mb-4"
      >
        {skill.title}
      </h3>
      <div ref={itemsRef} className="flex flex-wrap gap-2">
        {safeArray(skill.items).map((item) => (
          <span
            key={item}
            className="text-sm text-muted-foreground bg-card border border-border px-3 py-1.5 rounded"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative bg-background py-24 sm:py-32 lg:py-40"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16">
          {/* Left sticky heading */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              SKILLS
            </p>
            <h2 className="font-grotesk font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
              Technical
              <br />
              Arsenal
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              What I bring to the table — a CV-aligned skill set built around
              production-grade Flutter apps, clean architecture, API
              integrations, performance, deployment, and long-term app quality.
            </p>
          </div>

          {/* Right scrolling skills */}
          <div>
            {safeArray(skills).map((skill) => (
              <SkillItem key={skill.title} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
