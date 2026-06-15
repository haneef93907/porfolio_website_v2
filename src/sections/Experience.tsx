import { defaultSiteContent, type SiteContent } from "../data/siteContent";
import { safeArray } from "../lib/utils";

function ExperienceCard({ entry }: { entry: SiteContent["experience"]["items"][number] }) {
  return (
    <div
      className={`relative bg-card border border-border border-l-[3px] border-l-primary p-6 sm:p-8 rounded shadow-lg ${
        entry.align === "left" ? "lg:mr-auto" : "lg:ml-auto"
      } lg:max-w-[700px]`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
        <div>
          <h3 className="font-grotesk font-bold text-xl sm:text-2xl text-foreground">
            {entry.company}
          </h3>
          <p className="text-primary font-medium text-sm mt-1">{entry.role}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-mono text-xs text-accent">{entry.period}</p>
          <p className="text-xs text-muted-foreground mt-1">{entry.location}</p>
        </div>
      </div>

      <ul className="space-y-2">
        {safeArray(entry.highlights).map((highlight, i) => (
          <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
            <span className="text-primary mt-1 shrink-0">-</span>
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Experience({ content = defaultSiteContent.experience }: { content?: SiteContent["experience"] }) {
  return (
    <section
      id="experience"
      className="relative bg-secondary/40 py-24 sm:py-32 lg:py-40"
    >
      <div className="max-w-[1000px] mx-auto px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 text-center">
          {content.eyebrow}
        </p>
        <h2 className="font-grotesk font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-12 lg:mb-16 text-center">
          {content.title}
        </h2>

        <div className="relative space-y-8 lg:space-y-12">
          {safeArray(content.items).map((entry) => (
            <ExperienceCard key={entry.company} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}
