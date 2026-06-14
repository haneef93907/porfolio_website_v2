import { useState, useRef, useEffect } from "react";
import { Linkedin, Github, Phone, Mail, Send } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const subject = `Portfolio Contact from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    window.location.href = `mailto:haneef93907@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-void py-24 sm:py-32 lg:py-40 border-t border-saffron/20"
    >
      <div className="max-w-[800px] mx-auto px-6 text-center">
        <h2 className="contact-animate font-grotesk font-bold text-3xl sm:text-4xl lg:text-5xl text-off-white mb-6">
          Let&apos;s Build Something Extraordinary
        </h2>

        <p className="contact-animate text-slate text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
          I am currently open to senior Flutter and mobile engineering roles. If
          you have a challenging project, let&apos;s talk.
        </p>

        <a
          href="mailto:haneef93907@gmail.com"
          className="contact-animate inline-flex items-center gap-2 font-mono text-lg sm:text-xl text-saffron hover:underline transition-all mb-12"
        >
          <Mail size={20} />
          haneef93907@gmail.com
        </a>

        <form
          onSubmit={handleSubmit}
          className="contact-animate max-w-lg mx-auto text-left space-y-4"
        >
          <div>
            <label className="block text-sm text-slate mb-1.5">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-[#111] border border-white/10 rounded px-4 py-3 text-off-white placeholder-slate/50 focus:border-saffron focus:outline-none transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm text-slate mb-1.5">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full bg-[#111] border border-white/10 rounded px-4 py-3 text-off-white placeholder-slate/50 focus:border-saffron focus:outline-none transition-colors"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm text-slate mb-1.5">Message</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full bg-[#111] border border-white/10 rounded px-4 py-3 text-off-white placeholder-slate/50 focus:border-saffron focus:outline-none transition-colors resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-saffron text-void font-grotesk font-semibold text-sm uppercase tracking-wider py-4 rounded hover:bg-[#E67D00] transition-colors"
          >
            <Send size={16} />
            {submitted ? "Opening Email..." : "Send Message"}
          </button>
        </form>

        {/* Social links */}
        <div className="contact-animate flex items-center justify-center gap-6 mt-12">
          <a
            href="https://www.linkedin.com/in/muhammad-haneef-flutterdev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate hover:text-saffron transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate hover:text-saffron transition-colors"
            aria-label="GitHub"
          >
            <Github size={24} />
          </a>
          <a
            href="tel:+923030038699"
            className="text-slate hover:text-saffron transition-colors"
            aria-label="Phone"
          >
            <Phone size={24} />
          </a>
        </div>
      </div>
    </section>
  );
}
