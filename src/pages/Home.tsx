import { useEffect, useState } from "react";
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
import { defaultSiteContent, type SiteContent } from "../data/siteContent";
import { usePortfolioAnalytics } from "../hooks/usePortfolioAnalytics";
import { loadContent } from "../lib/contentApi";

export default function Home() {
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent);
  usePortfolioAnalytics();

  useEffect(() => {
    let active = true;
    void loadContent<SiteContent>("site", defaultSiteContent).then((result) => {
      if (active) setSiteContent(result.data);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <SEO
        title="Muhammad Haneef | Flutter Developer for Android & iOS Apps"
        description="Hire Muhammad Haneef, a Flutter Developer with 3.5+ years of experience building production-ready Android and iOS apps using Flutter, Firebase, REST APIs, payments, subscriptions, maps, and real-time features."
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
      <Hero content={siteContent.hero} />
      <Projects />
      <Services content={siteContent.services} />
      <Skills content={siteContent.skills} />
      <Experience content={siteContent.experience} />
      <WhyHireMe content={siteContent.whyHireMe} />
      <Blog />
      <Contact content={siteContent.contact} />
      <Footer content={siteContent.footer} />
    </>
  );
}
