import { CheckCircle2, Headphones, ShieldCheck, Timer, Truck, Wrench } from "lucide-react";
import { defaultSiteContent, type SiteContent } from "../data/siteContent";

const reasonIcons = { CheckCircle2, Headphones, ShieldCheck, Timer, Truck, Wrench };

export default function WhyHireMe({ content = defaultSiteContent.whyHireMe }: { content?: SiteContent["whyHireMe"] }) {
  return (
    <section className="bg-secondary/40 py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-12 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            {content.eyebrow}
          </p>
          <h2 className="font-grotesk text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            {content.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {content.description}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.items.map((reason) => {
            const Icon = reasonIcons[reason.icon as keyof typeof reasonIcons] || ShieldCheck;
            return (
              <article
                key={reason.title}
                className="rounded border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-primary/45"
              >
                <Icon className="mb-4 text-primary" size={24} />
                <h3 className="font-grotesk text-lg font-semibold text-foreground">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
