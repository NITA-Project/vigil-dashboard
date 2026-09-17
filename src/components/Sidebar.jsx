import {Activity, Globe2, AlertCircle, Clock3, Settings} from "lucide-react";

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-zinc-800 bg-[#0c0c0f] lg:block">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-zinc-800 px-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-400"><Activity size={18} /></div>
            <span className="text-lg font-semibold text-zinc-100">PulseWatch</span>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
            <SidebarItem icon={<Activity size={18} />} label="Overview" active/>
            <SidebarItem icon={<Globe2 size={18} />} label="Endpoints"/>
            <SidebarItem icon={<AlertCircle size={18} />} label="Incidents"/>
            <SidebarItem icon={<Clock3 size={18} />} label="History"/>
            <SidebarItem icon={<Settings size={18} />} label="Settings"/>
        </nav>

        {/* Monitoring engine */}
        <div className="absolute bottom-5 left-4 right-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
            <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-xs text-zinc-400">Monitoring engine</span>
            </div>
            <p className="mt-2 text-sm font-medium text-zinc-200">Operational</p>
        </div>
    </aside>
  );
}

function SidebarItem({ icon, label, active = false }) {
  return (
    <button className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${active ? "bg-indigo-500/10 text-indigo-400" : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200"}`}>
        {icon}
        {label}
    </button>
  );
}

export default Sidebar;