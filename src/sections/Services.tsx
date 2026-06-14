import { useEffect, useRef } from "react";
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
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Flutter App Development",
    description: "Clean, scalable Flutter apps with production architecture and polished UI.",
    icon: Code2,
  },
  {
    title: "Android & iOS App Development",
    description: "Cross-platform mobile apps built for consistent Android and iOS experiences.",
    icon: Smartphone,
  },
  {
    title: "Flutter Firebase Apps",
    description: "Auth, Firestore, Storage, push notifications, real-time updates, and cloud workflows.",
    icon: Cloud,
  },
  {
    title: "REST API Integration",
    description: "Reliable API layers, error handling, pagination, auth tokens, and data sync.",
    icon: ServerCog,
  },
  {
    title: "Stripe / Payment Integration",
    description: "Secure payment flows, subscriptions, checkout experiences, and donation apps.",
    icon: CreditCard,
  },
  {
    title: "App Store & Play Store Deployment",
    description: "Release builds, signing, store assets, review prep, and launch support.",
    icon: Store,
  },
  {
    title: "Bug Fixing & App Optimization",
    description: "Performance tuning, crash fixes, UI cleanup, state bugs, and release hardening.",
    icon: Bug,
  },
  {
    title: "MVP Development",
    description: "Founder-friendly MVP delivery with the right scope, fast iteration, and launch focus.",
    icon: Rocket,
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".service-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.07,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <section id="services" ref={sectionRef} className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Services
        </p>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div>
            <h2 className="font-grotesk text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Mobile app development for serious product teams.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              From MVPs to production apps, I help founders and businesses ship
              reliable Flutter products with the features users expect.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
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
