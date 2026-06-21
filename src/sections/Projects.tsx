import { memo, useEffect, useState } from "react";
import { Link } from "react-router";
import { defaultProjects, getPublishedProjects, type Project } from "../data/projects";
import { loadContent } from "../lib/contentApi";
import { safeArray } from "../lib/utils";
import { ArrowRight, ExternalLink, PlayCircle, Store } from "lucide-react";

const ProjectCard = memo(function ProjectCard({ project }: { project: Project }) {
  const projectImages = safeArray(project.screenshots).length ? safeArray(project.screenshots) : [project.image];

  return (
    <article
      className="project-card group relative flex h-full min-h-0 flex-col bg-card border border-border rounded overflow-hidden transition-all duration-300 hover:border-primary/50 motion-card"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          width={1344}
          height={768}
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
        {project.featured && (
          <span className="absolute left-4 top-4 rounded bg-primary px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-primary-foreground">
            Featured
          </span>
        )}
        {projectImages.length > 1 && (
          <span className="absolute bottom-4 right-4 rounded bg-background/90 px-2.5 py-1 text-[11px] font-mono text-foreground">
            {projectImages.length} images
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-6">
        {projectImages.length > 1 && (
          <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
            {projectImages.map((image) => (
              <img
                key={image}
                src={image}
                alt={`${project.title} preview`}
                className="h-14 w-20 shrink-0 rounded border border-border object-cover"
                loading="lazy"
              />
            ))}
          </div>
        )}

        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-primary break-words">
            {project.category}
          </span>
          <span className="text-xs text-muted-foreground shrink-0">{project.date}</span>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {safeArray(project.technologies).slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="max-w-full break-words rounded border border-accent/20 bg-accent/10 px-2.5 py-1 font-mono text-[10px] leading-snug text-accent sm:text-[11px]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="min-w-0 text-balance font-grotesk text-xl font-semibold leading-tight text-foreground transition-colors break-words group-hover:text-primary sm:text-2xl">
            {project.title}
          </h3>
          {(project.links.website || project.links.playStore || project.links.appStore || project.links.demoVideo || project.link) && (
            <a
              href={project.links.website || project.links.playStore || project.links.appStore || project.links.demoVideo || project.link}
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

        <p className="mb-4 text-sm leading-relaxed text-muted-foreground sm:line-clamp-3">
          {project.overview || project.description}
        </p>

        <div className="mb-4 rounded border border-border/80 bg-secondary/45 px-3 py-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">My role</p>
          <p className="mt-1 text-sm font-medium text-foreground break-words">{project.role}</p>
        </div>

        <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Key features
        </div>
        <ul className="mb-5 space-y-2">
          {safeArray(project.features).slice(0, 3).map((feature) => (
            <li key={feature} className="flex gap-2 text-sm text-muted-foreground">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="line-clamp-2 break-words">{feature}</span>
            </li>
          ))}
        </ul>

        {project.impact && (
          <p className="text-xs font-mono text-primary uppercase tracking-wider mb-5">
            {project.impact}
          </p>
        )}

        <div className="mt-auto grid gap-3 sm:grid-cols-[1fr_auto]">
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded bg-primary px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground transition hover:bg-primary/90 sm:text-sm"
          >
            View Case Study
            <ArrowRight size={15} />
          </Link>
          {(project.links.playStore || project.links.appStore) && (
            <a
              href={project.links.playStore || project.links.appStore}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded border border-border px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:text-primary"
            >
              <Store size={15} />
              Store
            </a>
          )}
          {project.links.demoVideo && (
            <a
              href={project.links.demoVideo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded border border-border px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:text-primary"
            >
              <PlayCircle size={15} />
              Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
});

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(() => getPublishedProjects());

  useEffect(() => {
    let active = true;
    void loadContent<Project[]>("projects", defaultProjects).then((result) => {
      if (!active) return;
      setProjects(result.data.filter((project) => project.published));
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      id="work"
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

        <div className="projects-grid relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
