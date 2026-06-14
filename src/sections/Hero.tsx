import { useEffect, useRef } from "react";
import gsap from "gsap";
import DigitFallClock from "../components/DigitFallClock";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  const handleScrollToWork = () => {
    const el = document.querySelector("#work");
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
      className="relative min-h-[100dvh] dark:bg-background bg-white overflow-hidden flex transition-colors duration-300"
    >
      {/* Left content - 40% */}
      <div className="relative z-10 w-full lg:w-[40%] flex flex-col justify-center px-6 sm:px-10 lg:px-12 py-24">
        <div className="max-w-xl">
          <p className="hero-label font-mono text-xs uppercase tracking-[0.2em] dark:text-muted-foreground text-gray-600 mb-6">
            Flutter Developer / Software Engineer
          </p>

          <h1 className="hero-name font-grotesk font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-[72px] dark:text-foreground text-black leading-[1.1] mb-4">
            Muhammad
            <br />
            Haneef
          </h1>

          <h2 className="hero-title font-mono font-normal text-xl sm:text-2xl lg:text-[32px] text-primary mb-8">
            Flutter Developer
          </h2>

          <p className="hero-description text-base sm:text-lg dark:text-muted-foreground text-gray-600 leading-relaxed max-w-lg mb-10">
            I build scalable mobile applications serving{" "}
            <span className="text-primary font-medium">20K+ users</span>.
            Specializing in offline-first architecture, AI-driven platforms, and
            performance optimization — turning complex problems into elegant,
            high-impact solutions.
          </p>

          <button
            onClick={handleScrollToWork}
            className="hero-button inline-flex items-center gap-2 bg-primary text-primary-foreground font-grotesk font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded hover:bg-primary/90 transition-colors hover-lift"
          >
            View My Work
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 3v10M3 8l5 5 5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Right canvas clock - 60% */}
      <div className="hidden lg:block absolute top-0 right-0 w-[60%] h-full">
        <DigitFallClock />
      </div>

      {/* Mobile: clock on top */}
      <div className="lg:hidden absolute top-16 left-0 right-0 h-[50vh]">
        <DigitFallClock />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 dark:bg-gradient-to-t dark:from-background dark:to-transparent bg-gradient-to-t from-white to-transparent pointer-events-none z-20" />
    </section>
  );
}
