import { useEffect } from "react";
import Lenis from "lenis";
import Navigation from "../sections/Navigation";
import Hero from "../sections/Hero";
import Projects from "../sections/Projects";
import Services from "../sections/Services";
import Skills from "../sections/Skills";
import Experience from "../sections/Experience";
import WhyHireMe from "../sections/WhyHireMe";
import Blog from "../sections/Blog";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";
import SEO from "../components/SEO";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <SEO
        title="Muhammad Haneef | Flutter Developer for Production-Ready Mobile Apps"
        description="Hire Muhammad Haneef, a Flutter Developer with 3.5+ years of experience building production-ready Android and iOS apps with Firebase, REST APIs, Stripe, real-time features, and store deployment."
        canonical="https://mhaneef.vercel.app/"
        schema={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Muhammad Haneef",
          jobTitle: "Flutter Developer",
          url: "https://mhaneef.vercel.app/",
          sameAs: ["https://www.linkedin.com/in/muhammad-haneef-flutterdev/"],
          knowsAbout: [
            "Flutter",
            "Firebase",
            "REST API Integration",
            "Stripe Integration",
            "Android Apps",
            "iOS Apps",
          ],
        }}
      />
      <Navigation />
      <Hero />
      <Projects />
      <Services />
      <Skills />
      <Experience />
      <WhyHireMe />
      <Blog />
      <Contact />
      <Footer />
    </>
  );
}
