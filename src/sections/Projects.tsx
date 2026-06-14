import { useRef, useEffect, useState } from "react";
import { Link } from "react-router";
import { getPublishedProjects, type Project } from "../data/projects";
import { safeArray } from "../lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ExternalLink, Store } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="project-card group relative bg-card border border-border rounded overflow-hidden transition-all duration-300 hover:border-primary/50 motion-card"
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
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
        {project.featured && (
          <span className="absolute left-4 top-4 rounded bg-primary px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-primary-foreground">
            Featured
          </span>
        )}
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
            {project.category}
          </span>
          <span className="text-xs text-muted-foreground">{project.date}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {safeArray(project.technologies).slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] text-accent bg-accent/10 px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-grotesk font-semibold text-xl sm:text-2xl text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          {(project.links.website || project.links.playStore || project.links.appStore || project.link) && (
            <a
              href={project.links.website || project.links.playStore || project.links.appStore || project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 mt-1 p-1.5 text-muted-foreground hover:text-primary bg-muted hover:bg-primary/10 rounded transition-all"
              aria-label="View project"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        <p className="text-sm text-foreground mb-4">
          <span className="text-muted-foreground">My role:</span> {project.role}
        </p>

        <ul className="space-y-2 mb-5">
          {safeArray(project.features).slice(0, 3).map((feature) => (
            <li key={feature} className="flex gap-2 text-sm text-muted-foreground">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="line-clamp-2">{feature}</span>
            </li>
          ))}
        </ul>

        {project.impact && (
          <p className="text-xs font-mono text-primary uppercase tracking-wider mb-5">
            {project.impact}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded bg-primary px-4 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition hover:bg-primary/90"
          >
            View Case Study
            <ArrowRight size={15} />
          </Link>
          {(project.links.playStore || project.links.appStore) && (
            <a
              href={project.links.playStore || project.links.appStore}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded border border-border px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:text-primary"
            >
              <Store size={15} />
              Store
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [projects] = useState<Project[]>(() => getPublishedProjects());

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
      className="relative bg-secondary/40 py-24 sm:py-32 lg:py-40"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
          SELECTED CASE STUDIES
        </p>
        <h2 className="font-grotesk font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
          Flutter apps built for production, growth, and real users.
        </h2>
        <p className="max-w-3xl text-muted-foreground text-base sm:text-lg leading-relaxed mb-12 lg:mb-16">
          Each project is shaped around business goals: stable architecture,
          clean UI, API reliability, payments, real-time features, and store
          readiness.
        </p>

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
