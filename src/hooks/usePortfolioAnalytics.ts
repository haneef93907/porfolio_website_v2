import { useEffect } from "react";
import { trackEvent } from "../lib/analytics";

const SECTION_IDS = ["work", "services", "skills", "experience", "blog", "contact"];

export function usePortfolioAnalytics() {
  useEffect(() => {
    trackEvent("page_load", "Home page loaded");

    const viewed = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting && id && !viewed.has(id)) {
            viewed.add(id);
            trackEvent("section_view", id);
          }
        }
      },
      { threshold: 0.45 }
    );

    for (const id of SECTION_IDS) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const clickable = target?.closest("a,button") as HTMLElement | null;
      if (!clickable) return;

      const label =
        clickable.getAttribute("data-track") ||
        clickable.getAttribute("aria-label") ||
        clickable.textContent?.trim().replace(/\s+/g, " ").slice(0, 80) ||
        "Unknown click";
      const href = clickable instanceof HTMLAnchorElement ? clickable.href : "";

      if (href.includes("Muhammad-Haneef-CV.pdf")) {
        trackEvent("resume_download", "Resume download", { href });
      } else if (href.includes("/projects/")) {
        trackEvent("project_click", label, { href });
      } else if (href.includes("wa.me") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        trackEvent("contact_action", label, { href });
      } else {
        trackEvent("click", label, { href });
      }
    };

    document.addEventListener("click", handleClick, { passive: true });

    return () => {
      observer.disconnect();
      document.removeEventListener("click", handleClick);
    };
  }, []);
}
