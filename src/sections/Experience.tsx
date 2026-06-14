import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  align: "left" | "right";
}

const experiences: ExperienceEntry[] = [
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
];

function ExperienceCard({ entry }: { entry: ExperienceEntry }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative bg-[#111111] border-l-[3px] border-saffron p-6 sm:p-8 rounded-r shadow-lg ${
        entry.align === "left" ? "lg:mr-auto" : "lg:ml-auto"
      } lg:max-w-[700px]`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
        <div>
          <h3 className="font-grotesk font-bold text-xl sm:text-2xl text-off-white">
            {entry.company}
          </h3>
          <p className="text-saffron font-medium text-sm mt-1">{entry.role}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-mono text-xs text-cyan">{entry.period}</p>
          <p className="text-xs text-slate mt-1">{entry.location}</p>
        </div>
      </div>

      <ul className="space-y-2">
        {entry.highlights.map((highlight, i) => (
          <li key={i} className="flex gap-3 text-sm text-slate leading-relaxed">
            <span className="text-saffron mt-1 shrink-0">-</span>
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative bg-navy py-24 sm:py-32 lg:py-40"
    >
      <div className="max-w-[1000px] mx-auto px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate mb-4 text-center">
          EXPERIENCE
        </p>
        <h2 className="font-grotesk font-bold text-3xl sm:text-4xl lg:text-5xl text-off-white mb-12 lg:mb-16 text-center">
          Work History
        </h2>

        <div className="relative space-y-8 lg:space-y-12">
          {experiences.map((entry) => (
            <ExperienceCard key={entry.company} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}
