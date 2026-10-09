import { Activity, Globe2, AlertCircle, Clock3, Settings } from "lucide-react";

function Sidebar({ theme = "dark" }) {
  const isDark = theme === "dark";

  return (
    <aside className={`fixed left-0 top-0 hidden h-screen w-64 border-r lg:block ${isDark ? "border-zinc-800 bg-[#0c0c0f]" : "border-zinc-200 bg-white"}`}>
      {/* Logo */}
      <div className={`flex h-16 items-center gap-3 border-b px-6 ${isDark ? "border-zinc-800" : "border-zinc-200"}`}>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-500">
          <Activity size={18} />
        </div>
        <span className={`text-lg font-semibold ${isDark ? "text-zinc-100" : "text-zinc-900"}`}>
          PulseWatch
        </span>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3">
        <SidebarItem icon={<Activity size={18} />} label="Overview" active isDark={isDark} />
        <SidebarItem icon={<Globe2 size={18} />} label="Endpoints" isDark={isDark} />
        <SidebarItem icon={<AlertCircle size={18} />} label="Incidents" isDark={isDark} />
        <SidebarItem icon={<Clock3 size={18} />} label="History" isDark={isDark} />
        <SidebarItem icon={<Settings size={18} />} label="Settings" isDark={isDark} />
      </nav>

      {/* Monitoring engine */}
      <div className={`absolute bottom-5 left-4 right-4 rounded-xl border p-4 ${isDark ? "border-zinc-800 bg-zinc-900/60" : "border-zinc-200 bg-zinc-50"}`}>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-xs text-zinc-500">Monitoring engine</span>
        </div>
        <p className={`mt-2 text-sm font-medium ${isDark ? "text-zinc-200" : "text-zinc-800"}`}>Operational</p>
      </div>
    </aside>
  );
}

function SidebarItem({ icon, label, active = false, isDark }) {
  const itemClass = active ? "bg-indigo-500/10 text-indigo-500" : (isDark ? "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200" : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900");

  return (
    <button type="button" className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${itemClass}`}>
      {icon}
      {label}
    </button>
  );
}

export default Sidebar;