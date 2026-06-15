import { useRef } from "react";
import { useNavigate } from "react-router";

export default function Footer() {
  const navigate = useNavigate();
  const clickCount = useRef(0);

  const openAdmin = () => {
    clickCount.current += 1;
    if (clickCount.current >= 5) {
      navigate("/admin");
      clickCount.current = 0;
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={openAdmin}
            className="text-left text-sm text-muted-foreground"
            aria-label="Copyright"
          >
            &copy; {new Date().getFullYear()} Muhammad Haneef. All rights
            reserved.
          </button>

          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground/70">
              Designed &amp; Built with Flutter Precision
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
