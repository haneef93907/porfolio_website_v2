import { useState, useRef, useEffect } from "react";
import {
  Linkedin,
  Github,
  Phone,
  Mail,
  Send,
  MessageCircle,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SubmitStatus = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "MVP Development",
    budget: "$1k - $3k",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const elements = sectionRef.current.querySelectorAll(".contact-animate");
    gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, projectType, budget, message } = formData;
    const payload = {
      name,
      email,
      projectType,
      budget,
      message,
      _subject: `Flutter Project Inquiry from ${name}`,
      _template: "table",
      _captcha: "false",
    };

    setSubmitStatus("sending");

    try {
      const response = await fetch("https://formsubmit.co/ajax/haneef93907@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Message could not be sent.");
      }

      setSubmitStatus("sent");
      setFormData({
        name: "",
        email: "",
        projectType: "MVP Development",
        budget: "$1k - $3k",
        message: "",
      });
      setTimeout(() => setSubmitStatus("idle"), 4500);
    } catch {
      const subject = `Flutter Project Inquiry from ${name}`;
      const body = `Name: ${name}\nEmail: ${email}\nProject Type: ${projectType}\nBudget Range: ${budget}\n\nMessage:\n${message}`;
      window.location.href = `mailto:haneef93907@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const buttonLabel =
    submitStatus === "sending"
      ? "Sending..."
      : submitStatus === "sent"
        ? "Message Sent"
        : submitStatus === "error"
          ? "Opened Email App"
          : "Send Message";

  const ButtonIcon =
    submitStatus === "sending"
      ? Loader2
      : submitStatus === "sent"
        ? CheckCircle2
        : submitStatus === "error"
          ? AlertCircle
          : Send;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-background py-24 sm:py-32 lg:py-40 border-t border-border"
    >
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="contact-animate text-center mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Contact
          </p>
          <h2 className="font-grotesk font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6">
            Have a Flutter app to build, fix, or launch?
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Send the project details and I will respond with a clear next step.
            I am available for Flutter development, MVPs, Firebase apps,
            integrations, optimization, and store deployment.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <aside className="contact-animate rounded border border-border bg-card p-6">
            <h3 className="font-grotesk text-xl font-semibold text-foreground">
              Direct contact
            </h3>
            <div className="mt-6 space-y-4">
              <a
                href="mailto:haneef93907@gmail.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary"
              >
                <Mail size={18} />
                haneef93907@gmail.com
              </a>
              <a
                href="tel:+923030038699"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary"
              >
                <Phone size={18} />
                +92 303 0038699
              </a>
              <a
                href="https://wa.me/923030038699"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-emerald-500 hover:text-emerald-400"
              >
                <MessageCircle size={18} />
                WhatsApp Me
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-haneef-flutterdev/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
            </div>
            <div className="mt-8 rounded bg-secondary/70 p-4 text-sm leading-relaxed text-muted-foreground">
              Best fit: startups, founders, agencies, and businesses that need
              a reliable Flutter developer for real production apps.
            </div>
          </aside>

        <form onSubmit={handleSubmit} className="contact-animate text-left space-y-4 rounded border border-border bg-card p-6">
          <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm text-muted-foreground mb-1.5">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-background border border-border rounded px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1.5">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full bg-background border border-border rounded px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none transition-colors"
              placeholder="your@email.com"
            />
          </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Project Type</label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full bg-background border border-border rounded px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors"
              >
                <option>MVP Development</option>
                <option>Flutter App Development</option>
                <option>Firebase App</option>
                <option>API / Stripe Integration</option>
                <option>Bug Fixing / Optimization</option>
                <option>Store Deployment</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Budget Range</label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full bg-background border border-border rounded px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors"
              >
                <option>$1k - $3k</option>
                <option>$3k - $7k</option>
                <option>$7k - $15k</option>
                <option>$15k+</option>
                <option>Need estimate</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1.5">Message</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full bg-background border border-border rounded px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none transition-colors resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <button
            type="submit"
            disabled={submitStatus === "sending"}
            className="group relative w-full overflow-hidden rounded bg-primary py-4 font-grotesk text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 disabled:cursor-wait disabled:opacity-90"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            <span className="absolute inset-0 animate-pulse bg-white/0 group-hover:bg-white/5" />
            <span className="relative inline-flex items-center justify-center gap-2">
              <ButtonIcon
                size={18}
                className={`transition-transform duration-300 ${
                  submitStatus === "sending"
                    ? "animate-spin"
                    : "group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                }`}
              />
              {buttonLabel}
            </span>
          </button>
          {submitStatus === "sent" && (
            <p className="text-center text-sm text-emerald-500">
              Thanks. Your message was submitted successfully.
            </p>
          )}
          {submitStatus === "error" && (
            <p className="text-center text-sm text-muted-foreground">
              Direct sending was blocked, so I opened your email app as a fallback.
            </p>
          )}
        </form>
        </div>

        {/* Social links */}
        <div className="contact-animate flex items-center justify-center gap-6 mt-12">
          <a
            href="https://www.linkedin.com/in/muhammad-haneef-flutterdev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <Github size={24} />
          </a>
          <a
            href="tel:+923030038699"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Phone"
          >
            <Phone size={24} />
          </a>
        </div>
      </div>
    </section>
  );
}
