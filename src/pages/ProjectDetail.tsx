import { Link, useParams } from "react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getProjectBySlug } from "../data/projects";
import Navigation from "../sections/Navigation";
import Footer from "../sections/Footer";
import Contact from "../sections/Contact";
import SEO from "../components/SEO";

export default function ProjectDetail() {
  const { slug = "" } = useParams();
  const project = getProjectBySlug(slug);

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
  ].filter(([, href]) => href);

  return (
    <>
      <SEO
        title={project.seoTitle}
        description={project.seoDescription}
        image={project.image}
        canonical={`https://mhaneef.vercel.app/#/projects/${project.slug}`}
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
              <img
                src={project.image}
                alt={project.title}
                className="aspect-[4/3] w-full rounded border border-border object-cover shadow-2xl"
                loading="eager"
              />
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-secondary/40 px-6 py-14">
          <div className="mx-auto grid max-w-[1100px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Role", project.role],
              ["Timeline", project.date],
              ["Stack", project.technologies.slice(0, 4).join(", ")],
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
              {project.features.map((feature) => (
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
              {project.screenshots.map((screenshot) => (
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
