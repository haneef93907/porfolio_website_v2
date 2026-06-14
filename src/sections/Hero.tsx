import { useEffect, useRef } from "react";
import gsap from "gsap";
import DigitFallClock from "../components/DigitFallClock";
import { ArrowDown, Download, MessageCircle, Send } from "lucide-react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-label", {
        duration: 0.8,
        y: 20,
        opacity: 0,
        ease: "power2.out",
      });

      gsap.from(".hero-name", {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power2.out",
        delay: 0.1,
      });

      gsap.from(".hero-title", {
        duration: 0.8,
        y: 20,
        opacity: 0,
        ease: "power2.out",
        delay: 0.2,
      });

      gsap.from(".hero-description", {
        duration: 0.8,
        y: 20,
        opacity: 0,
        ease: "power2.out",
        delay: 0.3,
      });

      gsap.from(".hero-button", {
        duration: 0.8,
        y: 20,
        opacity: 0,
        ease: "power2.out",
        delay: 0.4,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] bg-background overflow-hidden flex transition-colors duration-300"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--background))_0%,hsl(var(--secondary)/0.8)_48%,hsl(var(--background))_100%)]" />

      <div className="relative z-10 w-full lg:w-[56%] flex flex-col justify-center px-6 sm:px-10 lg:px-12 xl:px-16 py-24">
        <div className="max-w-3xl">
          <p className="hero-label inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary mb-6">
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_24px_hsl(var(--primary))]" />
            Muhammad Haneef - Flutter Developer
          </p>

          <h1 className="hero-name font-grotesk font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-[72px] dark:text-foreground text-black leading-[1.1] mb-4">
            I Build Production-Ready Flutter Apps for Startups & Businesses
          </h1>

          <p className="hero-description text-base sm:text-lg dark:text-muted-foreground text-gray-600 leading-relaxed max-w-lg mb-10">
            I help businesses turn ideas into scalable Android and iOS
            applications using Flutter, Firebase, REST APIs, Stripe,
            localization, real-time features, and app store deployment.
          </p>

          <div className="hero-button flex flex-col sm:flex-row gap-3 mb-10">
            <button
              onClick={handleScrollToContact}
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-grotesk font-semibold text-sm uppercase tracking-wider px-7 py-4 rounded hover:bg-primary/90 transition-colors hover-lift"
            >
              <Send size={16} />
              Hire Me
            </button>
            <button
              onClick={handleScrollToWork}
              className="inline-flex items-center justify-center gap-2 border border-border bg-card text-foreground font-grotesk font-semibold text-sm uppercase tracking-wider px-7 py-4 rounded hover:border-primary/50 hover:text-primary transition-colors"
            >
              <ArrowDown size={16} />
              View Projects
            </button>
            <a
              href="/Muhammad-Haneef-CV.pdf"
              className="inline-flex items-center justify-center gap-2 border border-border bg-card text-foreground font-grotesk font-semibold text-sm uppercase tracking-wider px-7 py-4 rounded hover:border-primary/50 hover:text-primary transition-colors"
            >
              <Download size={16} />
              Download CV
            </a>
            <a
              href="https://wa.me/923030038699"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 font-grotesk font-semibold text-sm uppercase tracking-wider px-7 py-4 rounded hover:bg-emerald-500/15 transition-colors"
            >
              <MessageCircle size={16} />
              WhatsApp Me
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              ["3.5+", "Years Experience"],
              ["40+", "Apps Delivered"],
              ["Android", "& iOS Apps"],
              ["Flutter", "Firebase / API / Stripe"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="hero-button border border-border bg-card/80 backdrop-blur px-4 py-4 rounded"
              >
                <p className="font-grotesk text-2xl font-bold text-foreground">
                  {value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden lg:block absolute top-0 right-0 w-[48%] h-full opacity-90">
        <DigitFallClock />
      </div>

      <div className="lg:hidden absolute top-12 right-0 left-[20%] h-[42vh] opacity-30">
        <DigitFallClock />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />
    </section>
  );
}
