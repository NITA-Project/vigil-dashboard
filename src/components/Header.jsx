import { Wifi, WifiOff } from "lucide-react";

function Header({ connected }) {
    return (
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-zinc-800 bg-[#09090b]/90 px-6 backdrop-blur">
            {/* Page title */}
            <div>
                <h1 className="text-lg font-semibold text-zinc-100">Monitoring Overview</h1>
                <p className="mt-0.5 text-xs text-zinc-500">Real-time endpoint health</p>
            </div>
            {/* SSE status */}
            <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5">
                {connected ? (<Wifi size={14} className="text-emerald-400"/>) : (<WifiOff size={14} className="text-red-400"/>)}
                <span className="text-xs text-zinc-300">{connected ? "Live" : "Disconnected"}</span>
            </div>
        </header>
    );
}

export default Header;