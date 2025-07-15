import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/use-theme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative inline-flex items-center">
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-transparent bg-white/10 backdrop-blur-sm hover:bg-white/20 dark:bg-gray-800/10 dark:hover:bg-gray-800/20 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        aria-label="Toggle theme"
      >
        <Sun
          className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-500"
          aria-hidden="true"
        />
        <Moon
          className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400"
          aria-hidden="true"
        />
        <span className="sr-only">Toggle theme</span>
      </button>
    </div>
  );
}
