import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, ExternalLink, PlayCircle } from "lucide-react";
import { defaultProjects, getProjectBySlug, type Project } from "../data/projects";
import { loadContent } from "../lib/contentApi";
import Navigation from "../sections/Navigation";
import Footer from "../sections/Footer";
import Contact from "../sections/Contact";
import SEO from "../components/SEO";
import { safeArray } from "../lib/utils";
import { SITE_URL } from "../config/site";

function getYouTubeEmbedUrl(value?: string) {
  if (!value) return "";

  try {
    const url = new URL(value);
    const hostname = url.hostname.replace(/^www\./, "");
    let videoId = "";

    if (hostname === "youtu.be") {
      videoId = url.pathname.split("/").filter(Boolean)[0] || "";
    }

    if (hostname === "youtube.com" || hostname === "m.youtube.com" || hostname === "youtube-nocookie.com") {
      if (url.pathname === "/watch") {
        videoId = url.searchParams.get("v") || "";
      } else {
        const [prefix, id] = url.pathname.split("/").filter(Boolean);
        if (["embed", "shorts", "live"].includes(prefix)) {
          videoId = id || "";
        }
      }
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  } catch {
    return "";
  }
}

function isDirectVideoUrl(value?: string) {
  return Boolean(value && /\.(mp4|webm|ogg|mov)(\?.*)?(#.*)?$/i.test(value));
}

export default function ProjectDetail() {
  const { slug = "" } = useParams();
  const [project, setProject] = useState<Project | undefined>(() => getProjectBySlug(slug));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    void loadContent<Project[]>("projects", defaultProjects).then((result) => {
      if (!active) return;
      setProject(result.data.find((item) => item.published && (item.slug === slug || item.id === slug)));
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [slug]);

  if (!project && loading) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-background px-6 py-32 text-center">
          <p className="text-muted-foreground">Loading project...</p>
        </main>
      </>
    );
  }

  if (!project) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-background px-6 py-32 text-center">
          <h1 className="font-grotesk text-4xl font-bold">Project not found</h1>
          <Link to="/" className="mt-6 inline-flex text-primary">
            Back to home
          </Link>
        </main>
      </>
    );
  }

  const links = [
    ["Play Store", project.links.playStore],
    ["App Store", project.links.appStore],
    ["Website", project.links.website],
    ["Case Study", project.links.caseStudy || project.link],
    ["Demo Video", project.links.demoVideo],
  ].filter(([, href]) => href);
  const projectImages = (safeArray(project.screenshots).length ? safeArray(project.screenshots) : [project.image]).filter(Boolean);
  const demoVideo = project.links.demoVideo?.trim();
  const youtubeEmbedUrl = getYouTubeEmbedUrl(demoVideo);

  return (
    <>
      <SEO
        title={project.seoTitle}
        description={project.seoDescription}
        image={project.image}
        canonical={`${SITE_URL}/projects/${project.slug}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          creator: { "@type": "Person", name: "Muhammad Haneef" },
        }}
      />
      <Navigation />
      <main className="bg-background">
        <section className="px-6 pb-16 pt-28 sm:pt-32">
          <div className="mx-auto max-w-[1100px]">
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
            >
              <ArrowLeft size={16} />
              Back to portfolio
            </Link>
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                  {project.category} Case Study
                </p>
                <h1 className="mt-4 font-grotesk text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                  {project.title}
                </h1>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {project.overview}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  {links.map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:text-primary"
                    >
                      {label}
                      <ExternalLink size={15} />
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="aspect-[4/3] w-full rounded border border-border object-cover shadow-2xl"
                  loading="eager"
                />
                {projectImages.length > 1 && (
                  <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                    {projectImages.map((image) => (
                      <img
                        key={image}
                        src={image}
                        alt={`${project.title} preview`}
                        className="h-20 w-28 shrink-0 rounded border border-border object-cover"
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {demoVideo && (
          <section className="border-y border-border bg-secondary/40 px-6 py-16">
            <div className="mx-auto max-w-[1100px]">
              <div className="mb-6 flex items-center gap-3">
                <PlayCircle className="text-primary" size={24} />
                <h2 className="font-grotesk text-3xl font-bold text-foreground">
                  Demo Video
                </h2>
              </div>
              <div className="aspect-video overflow-hidden rounded border border-border bg-card">
                {youtubeEmbedUrl ? (
                  <iframe
                    src={youtubeEmbedUrl}
                    title={`${project.title} demo video`}
                    className="h-full w-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : isDirectVideoUrl(demoVideo) ? (
                  <video
                    src={demoVideo}
                    className="h-full w-full bg-black object-contain"
                    controls
                    preload="metadata"
                  />
                ) : (
                  <a
                    href={demoVideo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full w-full items-center justify-center gap-2 px-6 text-sm font-semibold text-primary transition hover:text-primary/80"
                  >
                    Open Demo Video
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          </section>
        )}

        <section className="border-y border-border bg-secondary/40 px-6 py-14">
          <div className="mx-auto grid max-w-[1100px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Role", project.role],
              ["Timeline", project.date],
              ["Stack", safeArray(project.technologies).slice(0, 4).join(", ")],
              ["Result", project.impact || project.result],
            ].map(([label, value]) => (
              <div key={label} className="rounded border border-border bg-card p-5">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {label}
                </p>
                <p className="mt-3 text-sm font-medium leading-relaxed text-foreground">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto grid max-w-[1100px] gap-8 lg:grid-cols-3">
            {[
              ["Problem", project.problem],
              ["Solution", project.solution],
              ["Result / Impact", project.result],
            ].map(([title, body]) => (
              <article key={title} className="rounded border border-border bg-card p-6">
                <h2 className="font-grotesk text-2xl font-semibold text-foreground">
                  {title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-secondary/40 px-6 py-20">
          <div className="mx-auto max-w-[1100px]">
            <h2 className="font-grotesk text-3xl font-bold text-foreground">
              Features Developed
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {safeArray(project.features).map((feature) => (
                <div key={feature} className="rounded border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-[1100px]">
            <h2 className="font-grotesk text-3xl font-bold text-foreground">
              Screenshots
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {projectImages.map((screenshot) => (
                <img
                  key={screenshot}
                  src={screenshot}
                  alt={`${project.title} screenshot`}
                  className="aspect-video w-full rounded border border-border object-cover"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Contact />
      <Footer />
    </>
  );
}
