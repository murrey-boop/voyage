import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // Avoid SSR mismatch

  function toggleTheme() {
    // fallback to 'light' if resolvedTheme is undefined
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }

  return (
    <button
      className="flex items-center p-2 rounded transition border bg-white/10 hover:bg-white/20 border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
      aria-label="Toggle theme"
      type="button"
      onClick={toggleTheme}
      tabIndex={0}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}