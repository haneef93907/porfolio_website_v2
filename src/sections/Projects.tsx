import { useRef, useEffect, useState } from "react";
import { getProjects, type Project } from "../data/projects";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="project-card group relative bg-[#111111] border border-saffron/15 rounded overflow-hidden transition-all duration-300 hover:border-saffron/40"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            hovered ? "scale-105" : "scale-100"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] text-cyan bg-cyan/10 px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-grotesk font-semibold text-xl sm:text-2xl text-off-white group-hover:text-saffron transition-colors">
            {project.title}
          </h3>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 mt-1 p-1.5 text-slate hover:text-saffron bg-white/5 hover:bg-saffron/10 rounded transition-all"
              aria-label="View project"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>

        <p className="text-sm text-slate leading-relaxed mb-3 line-clamp-3">
          {project.description}
        </p>

        {project.impact && (
          <p className="text-xs font-mono text-saffron uppercase tracking-wider">
            {project.impact}
          </p>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current || projects.length === 0) return;

    const cards = gridRef.current.querySelectorAll(".project-card");
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Simple fade-in for mobile
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    } else {
      // Cylinder reveal effect for desktop
      gsap.fromTo(
        cards,
        { rotationX: 70, z: -800, opacity: 0, yPercent: 100 },
        {
          rotationX: -10,
          z: 0,
          opacity: 1,
          yPercent: 0,
          ease: "power2.inOut",
          stagger: 0.06,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: `+=${window.innerHeight * (projects.length * 0.08)}`,
            scrub: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [projects]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative bg-navy py-24 sm:py-32 lg:py-40"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate mb-4">
          SELECTED WORK
        </p>
        <h2 className="font-grotesk font-bold text-3xl sm:text-4xl lg:text-5xl text-off-white mb-12 lg:mb-16">
          Featured Projects
        </h2>

        <div
          ref={gridRef}
          className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          style={{ perspective: "1000px" }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
