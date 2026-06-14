import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
  title: string;
  items: string[];
}

const skills: SkillCategory[] = [
  {
    title: "Flutter & Dart",
    items: [
      "Cross-Platform Development",
      "Offline-First Architecture",
      "State Management: BLoC, Riverpod, Provider, GetX",
    ],
  },
  {
    title: "Backend & APIs",
    items: ["Node.js", "FastAPI", "Express", "REST APIs", "GraphQL"],
  },
  {
    title: "Databases",
    items: ["Firebase Firestore", "MongoDB", "SQLite", "Hive", "Supabase"],
  },
  {
    title: "Cloud & DevOps",
    items: ["AWS", "Azure", "CI/CD", "Codemagic", "Bitrise", "Fastlane"],
  },
  {
    title: "Mobile Native",
    items: ["Android Native", "SwiftUI"],
  },
  {
    title: "Testing",
    items: [
      "Unit Testing",
      "Widget Testing",
      "Integration Testing",
      "Mockito",
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

    // Strikethrough reveal animation
    tl.fromTo(
      headingRef.current,
      { color: "#555", opacity: 0 },
      {
        color: "#F8F8F8",
        opacity: 1,
        duration: 0.75,
        ease: "power2.inOut",
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
        className="font-grotesk font-semibold text-xl sm:text-2xl lg:text-[28px] text-off-white mb-4"
        style={{ color: "#555" }}
      >
        {skill.title}
      </h3>
      <div ref={itemsRef} className="flex flex-wrap gap-2">
        {skill.items.map((item) => (
          <span
            key={item}
            className="text-sm text-slate bg-white/5 border border-white/10 px-3 py-1.5 rounded"
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
      className="relative bg-void py-24 sm:py-32 lg:py-40"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16">
          {/* Left sticky heading */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate mb-4">
              SKILLS
            </p>
            <h2 className="font-grotesk font-bold text-3xl sm:text-4xl lg:text-5xl text-off-white mb-4">
              Technical
              <br />
              Arsenal
            </h2>
            <p className="text-slate text-base leading-relaxed">
              What I bring to the table — a comprehensive skill set built over 3+
              years of building production-grade mobile applications.
            </p>
          </div>

          {/* Right scrolling skills */}
          <div>
            {skills.map((skill) => (
              <SkillItem key={skill.title} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
