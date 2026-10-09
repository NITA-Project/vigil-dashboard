import { Wifi, WifiOff, Sun, Moon } from "lucide-react";

function Header({ connected, theme, onToggleTheme }) {
  const isDark = theme === "dark";

  return (
    <header
      className={`sticky top-0 z-10 flex h-16 items-center justify-between border-b px-6 backdrop-blur ${
        isDark
          ? "border-zinc-800 bg-[#09090b]/90"
          : "border-zinc-200 bg-white/90"
      }`}
    >
      {/* Page title */}
      <div>
        <h1
          className={`text-lg font-semibold ${
            isDark ? "text-zinc-100" : "text-zinc-900"
          }`}
        >
          Monitoring Overview
        </h1>

        <p className="mt-0.5 text-xs text-zinc-500">
          Real-time endpoint health
        </p>
      </div>

      {/* Theme toggle and SSE status */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          title={`Switch to ${isDark ? "light" : "dark"} mode`}
          className={`rounded-lg border p-2 transition-colors ${
            isDark
              ? "border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800"
              : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100"
          }`}
        >
          {isDark ? (
            <Sun size={18} aria-hidden="true" />
          ) : (
            <Moon size={18} aria-hidden="true" />
          )}
        </button>

        {/* SSE connection status */}
        <div
          className={`flex items-center gap-2 rounded-full border px-3 py-1.5 ${
            isDark
              ? "border-zinc-800 bg-zinc-900/60"
              : "border-zinc-200 bg-white/80"
          }`}
        >
          {connected ? (
            <Wifi size={14} className="text-emerald-500" />
          ) : (
            <WifiOff size={14} className="text-red-500" />
          )}

          <span
            className={`text-xs ${
              isDark ? "text-zinc-300" : "text-zinc-700"
            }`}
          >
            {connected ? "Live" : "Disconnected"}
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;