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
import { SITE_URL } from "../config/site";

export default function Home() {
  return (
    <>
      <SEO
        title="Muhammad Haneef | Flutter Developer for Production-Ready Mobile Apps"
        description="Hire Muhammad Haneef, a Flutter Developer with 3.5+ years of experience building production-ready Android and iOS apps with Firebase, REST APIs, Stripe, real-time features, and store deployment."
        canonical={SITE_URL}
        schema={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Muhammad Haneef",
          jobTitle: "Flutter Developer",
          url: SITE_URL,
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
