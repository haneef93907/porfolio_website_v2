import {
  Bug,
  Cloud,
  Code2,
  CreditCard,
  Rocket,
  ServerCog,
  Smartphone,
  Store,
} from "lucide-react";
import { defaultSiteContent, type SiteContent } from "../data/siteContent";

const serviceIcons = { Bug, Cloud, Code2, CreditCard, Rocket, ServerCog, Smartphone, Store };

export default function Services({ content = defaultSiteContent.services }: { content?: SiteContent["services"] }) {
  return (
    <section id="services" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
          {content.eyebrow}
        </p>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div>
            <h2 className="font-grotesk text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              {content.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {content.description}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.items.map((service) => {
              const Icon = serviceIcons[service.icon as keyof typeof serviceIcons] || Code2;
              return (
                <article
                  key={service.title}
                  className="service-card group rounded border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-primary/45 hover:shadow-xl"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded bg-primary/10 text-primary">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-grotesk text-lg font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
