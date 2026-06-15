import { defaultSiteContent, type SiteContent } from "../data/siteContent";
import { safeArray } from "../lib/utils";

function SkillItem({ skill }: { skill: SiteContent["skills"]["items"][number] }) {
  return (
    <div className="mb-10 last:mb-0">
      <h3
        className="font-grotesk font-semibold text-xl sm:text-2xl lg:text-[28px] text-foreground mb-4"
      >
        {skill.title}
      </h3>
      <div className="flex flex-wrap gap-2">
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

export default function Skills({ content = defaultSiteContent.skills }: { content?: SiteContent["skills"] }) {
  return (
    <section
      id="skills"
      className="relative bg-background py-24 sm:py-32 lg:py-40"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16">
          {/* Left sticky heading */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              {content.eyebrow}
            </p>
            <h2 className="font-grotesk font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
              {content.title.split("\n").map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              {content.description}
            </p>
          </div>

          {/* Right scrolling skills */}
          <div>
            {safeArray(content.items).map((skill) => (
              <SkillItem key={skill.title} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
