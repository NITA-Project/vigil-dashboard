import { Sun, Moon } from "lucide-react";

function ThemeToggle({ theme, onToggle }) {
    const isDark = theme === "dark";
    return (
        <button type="button" onClick={onToggle} aria-label={`Switch to ${isDark ? "light" : "dark"} mode`} title={`Switch to ${isDark ? "light" : "dark"} mode`} className="flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2 text-[var(--text)] transition-colors hover">
            {isDark ? (<Sun size={18} aria-hidden="true" />) : (<Moon size={18} aria-hidden="true" />)}
        </button>
    );
}

export default ThemeToggle;