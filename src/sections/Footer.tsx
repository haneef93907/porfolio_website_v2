import { Link } from "react-router";
import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-void border-t border-[#222]">
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate">
            &copy; {new Date().getFullYear()} Muhammad Haneef. All rights
            reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link
              to="/admin"
              className="flex items-center gap-1.5 text-xs font-mono text-slate/50 hover:text-saffron transition-colors"
            >
              <Shield size={12} />
              Admin
            </Link>
            <span className="text-xs text-slate/30">
              Designed &amp; Built with Flutter Precision
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
