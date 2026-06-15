import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(
    () => typeof window !== "undefined" && window.scrollY > 100
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let frameId = 0;
    let lastScrolled = window.scrollY > 100;

    const handleScroll = () => {
      if (frameId) return;

      frameId = window.requestAnimationFrame(() => {
        const nextScrolled = window.scrollY > 100;
        if (nextScrolled !== lastScrolled) {
          lastScrolled = nextScrolled;
          setScrolled(nextScrolled);
        }
        frameId = 0;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      if (location.pathname !== "/") {
        navigate({ pathname: "/", hash: href });
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        }, 50);
        return;
      }

      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-background shadow-sm"
          : "bg-background/98 shadow-sm"
      } border-b border-border text-foreground`}
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 h-16 flex items-center justify-between animate-slide-down">
        <Link
          to="/"
          className="group relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/35 bg-card text-foreground shadow-sm transition-all duration-300 animate-fade-in hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_28px_hsl(var(--primary)/0.28)]"
          aria-label="Muhammad Haneef home"
        >
          <span className="absolute inset-[-5px] rounded-full border border-primary/20 opacity-70 transition duration-300 group-hover:scale-110 group-hover:opacity-100" />
          <span className="absolute inset-[-9px] rounded-full border border-dashed border-primary/25 animate-spin [animation-duration:9s] group-hover:border-primary/55" />
          <span className="relative font-mono text-sm font-bold tracking-tight">
            MH
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            link.href.startsWith("/") ? (
              <Link
                key={link.href}
                to={link.href}
                className="relative text-sm font-mono uppercase tracking-wider text-foreground/85 transition-colors duration-300 hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="relative text-sm font-mono uppercase tracking-wider text-foreground/85 transition-colors duration-300 hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </button>
            )
          ))}
        </div>

        <button
          onClick={() => handleNavClick("#contact")}
          className="hidden md:inline-flex rounded bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition hover:bg-primary/90"
        >
          Hire Me
        </button>

        {/* Mobile menu button */}
        <button
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded border border-border bg-card text-foreground transition-colors hover:border-primary/50 hover:text-primary md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border animate-slide-down">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              link.href.startsWith("/") ? (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-left text-sm font-mono uppercase tracking-wider text-foreground/85 hover:text-primary transition-colors py-2 duration-300"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-sm font-mono uppercase tracking-wider text-foreground/85 hover:text-primary transition-colors py-2 duration-300"
                >
                  {link.label}
                </button>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
