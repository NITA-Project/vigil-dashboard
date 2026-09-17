function StatCard({title, value, subtitle, icon, valueClass = "text-zinc-100"}) { 
    return ( 
        <div className="rounded-xl border border-zinc-800 bg-[#0c0c0f] p-5 transition hover:border-zinc-700"> 
            {/* Top row */} 
            <div className="flex items-center justify-between"> 
                <span className="text-sm text-zinc-500"> {title} </span> 
                <div className="rounded-lg bg-zinc-900 p-2 text-zinc-400"> {icon} </div> 
            </div> 
            {/* Value */} 
            <div className={`mt-4 text-2xl font-semibold ${valueClass}`}> {value} </div> 
            {/* Subtitle */} 
            <div className="mt-1 flex items-center gap-1 text-xs text-zinc-600"> 
                <span>{subtitle}</span> 
            </div> 
        </div> 
    ); 
} 
export default StatCard;