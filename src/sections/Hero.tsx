import DigitFallClock from "../components/DigitFallClock";
import { defaultSiteContent, type SiteContent } from "../data/siteContent";
import { ArrowDown, CalendarCheck, Download, Send } from "lucide-react";

export default function Hero({ content = defaultSiteContent.hero }: { content?: SiteContent["hero"] }) {
  const handleScrollToWork = () => {
    const el = document.querySelector("#work");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
  const consultationUrl = `${content.whatsappUrl}${content.whatsappUrl.includes("?") ? "&" : "?"}text=${encodeURIComponent("Hi Haneef, I want to book a free consultation for a Flutter app.")}`;

  return (
    <section
      className="hero-surface relative min-h-[100dvh] overflow-hidden flex"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,hsl(var(--primary)/0.11),transparent_28%),radial-gradient(circle_at_84%_66%,hsl(var(--accent)/0.11),transparent_34%)]" />

      <div className="relative z-10 w-full lg:w-[48%] flex flex-col justify-center px-5 sm:px-10 lg:px-12 xl:px-16 pb-16 pt-24 sm:py-24">
        <div className="max-w-3xl">
          <p className="hero-label inline-flex max-w-full items-center gap-2 text-balance font-mono text-[10px] uppercase tracking-[0.14em] text-primary mb-5 sm:text-[11px] sm:tracking-[0.18em]">
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_24px_hsl(var(--primary))]" />
            {content.label}
          </p>

          <h1 className="hero-name max-w-3xl text-balance font-grotesk text-[2.35rem] font-bold leading-[1.06] text-black dark:text-foreground sm:text-5xl xl:text-6xl">
            {content.title}
          </h1>

          <p className="hero-description mb-7 mt-5 max-w-2xl text-pretty text-base leading-relaxed text-gray-600 dark:text-muted-foreground sm:mb-8 sm:text-lg">
            {content.description}
          </p>

          <div className="hero-button grid gap-3 mb-5 sm:grid-cols-2">
            <button
              onClick={handleScrollToContact}
              data-track="Hero hire me"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-primary px-4 py-3.5 text-center font-grotesk text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-primary/90 hover-lift sm:px-6 sm:text-sm"
            >
              <Send size={16} />
              Hire Me
            </button>
            <button
              onClick={handleScrollToWork}
              data-track="Hero view projects"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded border border-border bg-card/80 px-4 py-3.5 text-center font-grotesk text-xs font-semibold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-primary/50 hover:text-primary sm:px-6 sm:text-sm"
            >
              <ArrowDown size={16} />
              View My Apps
            </button>
            <a
              href={content.resumeUrl}
              data-track="Hero resume download"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded border border-border bg-card/80 px-4 py-3.5 text-center font-grotesk text-xs font-semibold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-primary/50 hover:text-primary sm:px-6 sm:text-sm"
            >
              <Download size={16} />
              Download CV
            </a>
            <a
              href={consultationUrl}
              data-track="Hero free consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded border border-primary/45 bg-primary/10 px-4 py-3.5 text-center font-grotesk text-xs font-semibold uppercase tracking-[0.12em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:px-6 sm:text-sm"
            >
              <CalendarCheck size={16} />
              Book a Free Consultation
            </a>
          </div>

          <div className="hero-button grid grid-cols-2 gap-3 border-y border-border/70 py-4 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-4 sm:py-5">
            {content.stats.map(({ value, label }) => (
              <div
                key={label}
                className="min-w-0 rounded border border-border/40 bg-card/35 px-3 py-3 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0"
              >
                <p className="break-words font-grotesk text-lg font-bold leading-tight text-foreground sm:text-2xl">
                  {value}
                </p>
                <p className="mt-1 text-[10px] uppercase leading-snug tracking-[0.12em] text-muted-foreground sm:text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-visual hidden lg:block absolute inset-y-0 left-[54%] right-0 opacity-90">
        <DigitFallClock />
      </div>

      <div className="hero-visual lg:hidden absolute top-10 right-0 left-0 h-[34vh] opacity-20 sm:h-[42vh] sm:opacity-30">
        <DigitFallClock />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />
    </section>
  );
}
