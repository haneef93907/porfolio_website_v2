import { useEffect } from "react";
import Lenis from "lenis";
import Navigation from "../sections/Navigation";
import Hero from "../sections/Hero";
import Projects from "../sections/Projects";
import Skills from "../sections/Skills";
import Experience from "../sections/Experience";
import Blog from "../sections/Blog";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";

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
      <Navigation />
      <Hero />
      <Projects />
      <Skills />
      <Experience />
      <Blog />
      <Contact />
      <Footer />
    </>
  );
}
