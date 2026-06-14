import { CheckCircle2, Headphones, ShieldCheck, Timer, Truck, Wrench } from "lucide-react";

const reasons = [
  {
    title: "Clean and scalable code",
    description: "Feature structure, state management, API layers, and maintainable patterns.",
    icon: ShieldCheck,
  },
  {
    title: "Production-ready development",
    description: "Release-minded builds with performance, error states, and edge cases handled.",
    icon: CheckCircle2,
  },
  {
    title: "Fast communication",
    description: "Clear updates, quick decisions, and practical delivery conversations.",
    icon: Timer,
  },
  {
    title: "End-to-end app delivery",
    description: "Screens, APIs, Firebase, payments, notifications, testing, and release prep.",
    icon: Truck,
  },
  {
    title: "Store deployment experience",
    description: "Android and iOS build signing, release assets, review prep, and launch support.",
    icon: Wrench,
  },
  {
    title: "Long-term support after delivery",
    description: "Post-launch fixes, optimization, feature iteration, and product stability.",
    icon: Headphones,
  },
];

export default function WhyHireMe() {
  return (
    <section className="bg-secondary/40 py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-12 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Why Hire Me
          </p>
          <h2 className="font-grotesk text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            I build apps like products, not just screens.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            You get a Flutter developer who understands launch pressure,
            product quality, communication, and the engineering details that
            keep mobile apps stable after release.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;
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
