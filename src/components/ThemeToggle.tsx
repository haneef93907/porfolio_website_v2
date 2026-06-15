import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="group fixed right-20 top-3 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-background/90 text-foreground shadow-sm backdrop-blur transition-all duration-300 animate-fade-in hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_28px_hsl(var(--primary)/0.28)] md:right-4 md:top-4"
      aria-label="Toggle theme"
    >
      <span className="absolute inset-[-5px] rounded-full border border-primary/20 opacity-70 transition duration-300 group-hover:scale-110 group-hover:opacity-100" />
      <span className="absolute inset-[-9px] rounded-full border border-dashed border-primary/25 animate-spin [animation-duration:9s] group-hover:border-primary/55" />
      {theme === 'dark' ? (
        <Sun className="relative h-5 w-5" />
      ) : (
        <Moon className="relative h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
