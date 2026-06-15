import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/useTheme';
import { Button } from './ui/button';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="fixed right-20 top-3 z-50 h-10 w-10 rounded-full border border-border/70 bg-background/90 shadow-sm backdrop-blur hover:bg-accent/10 transition-all duration-300 animate-fade-in md:right-4 md:top-4"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
