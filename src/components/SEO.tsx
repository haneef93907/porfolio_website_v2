import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  canonical?: string;
  schema?: Record<string, unknown>;
}

function setMeta(selector: string, attr: "content" | "href", value: string) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;

  if (!element) {
    element = selector.startsWith("link")
      ? document.createElement("link")
      : document.createElement("meta");

    if (selector.includes("property=")) {
      const property = selector.match(/property="([^"]+)"/)?.[1];
      if (property) element.setAttribute("property", property);
    } else if (selector.includes("name=")) {
      const name = selector.match(/name="([^"]+)"/)?.[1];
      if (name) element.setAttribute("name", name);
    } else if (selector.includes("rel=")) {
      const rel = selector.match(/rel="([^"]+)"/)?.[1];
      if (rel) element.setAttribute("rel", rel);
    }

    document.head.appendChild(element);
  }

  element.setAttribute(attr, value);
}

export default function SEO({
  title,
  description,
  keywords = "Flutter developer, mobile app developer, Flutter app development, Firebase apps, Android iOS apps, Stripe integration",
  image = "/project-amanah.jpg",
  canonical = "https://mhaneef.vercel.app/",
  schema,
}: SEOProps) {
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[name="keywords"]', "content", keywords);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:image"]', "content", image);
    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[property="og:url"]', "content", canonical);
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('link[rel="canonical"]', "href", canonical);

    const id = "structured-data";
    document.getElementById(id)?.remove();
    if (schema) {
      const script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [canonical, description, image, keywords, schema, title]);

  return null;
}
