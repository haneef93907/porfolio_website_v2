import DigitFallClock from "../components/DigitFallClock";
import { ArrowDown, Download, MessageCircle, Send } from "lucide-react";

export default function Hero() {
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

  return (
    <section
      className="hero-surface relative min-h-[100dvh] overflow-hidden flex"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,hsl(var(--primary)/0.11),transparent_28%),radial-gradient(circle_at_84%_66%,hsl(var(--accent)/0.11),transparent_34%)]" />

      <div className="relative z-10 w-full lg:w-[48%] flex flex-col justify-center px-6 sm:px-10 lg:px-12 xl:px-16 py-24">
        <div className="max-w-3xl">
          <p className="hero-label inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-primary mb-5">
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_24px_hsl(var(--primary))]" />
            Muhammad Haneef - Senior Flutter Developer
          </p>

          <h1 className="hero-name font-grotesk font-bold text-4xl sm:text-5xl xl:text-6xl dark:text-foreground text-black leading-[1.04] mb-5 max-w-3xl">
            Production-Ready Flutter Apps for Startups & Businesses
          </h1>

          <p className="hero-description text-base sm:text-lg dark:text-muted-foreground text-gray-600 leading-relaxed max-w-2xl mb-8">
            I design and develop scalable Android and iOS apps with Flutter,
            Firebase, REST APIs, Stripe payments, localization, real-time
            features, and app store deployment.
          </p>

          <div className="hero-button flex flex-col sm:flex-row gap-3 mb-5">
            <button
              onClick={handleScrollToContact}
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-grotesk font-semibold text-sm uppercase tracking-wider px-6 py-3.5 rounded hover:bg-primary/90 transition-colors hover-lift"
            >
              <Send size={16} />
              Hire Me
            </button>
            <button
              onClick={handleScrollToWork}
              className="inline-flex items-center justify-center gap-2 border border-border bg-card/80 text-foreground font-grotesk font-semibold text-sm uppercase tracking-wider px-6 py-3.5 rounded hover:border-primary/50 hover:text-primary transition-colors"
            >
              <ArrowDown size={16} />
              View Projects
            </button>
          </div>

          <div className="hero-button mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-muted-foreground">
            <a
              href="/Muhammad-Haneef-CV.pdf"
              className="inline-flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Download size={15} />
              Download CV
            </a>
            <a
              href="https://wa.me/923030038699"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-emerald-500 transition-colors hover:text-emerald-400"
            >
              <MessageCircle size={15} />
              WhatsApp
            </a>
          </div>

          <div className="hero-button grid grid-cols-2 gap-x-6 gap-y-4 border-y border-border/70 py-5 sm:grid-cols-4">
            {[
              ["3.5+", "Years"],
              ["40+", "Apps"],
              ["Android/iOS", "Mobile"],
              ["Flutter", "Firebase/API"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="min-w-0"
              >
                <p className="font-grotesk text-xl font-bold text-foreground sm:text-2xl">
                  {value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-visual hidden lg:block absolute inset-y-0 left-[54%] right-0 opacity-90">
        <DigitFallClock />
      </div>

      <div className="hero-visual lg:hidden absolute top-12 right-0 left-0 h-[42vh] opacity-30">
        <DigitFallClock />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />
    </section>
  );
}
