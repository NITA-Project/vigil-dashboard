function RecentChecks({ metrics }) {
  const recentChecks = [...metrics].reverse().slice(0, 10);

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800 bg-[#0c0c0f]">
      <div className="border-b border-zinc-800 px-5 py-4">
        <h2 className="text-sm font-semibold text-zinc-200">
          Recent Checks
        </h2>

        <p className="mt-1 text-xs text-zinc-500">
          Latest monitoring activity
        </p>
      </div>

      <div>
        {recentChecks.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-zinc-500">
            No checks recorded yet.
          </div>
        ) : (
          recentChecks.map((metric, index) => (
            <div
              key={`${metric.timestamp}-${metric.url}-${index}`}
              className="border-b border-zinc-800/60 px-5 py-4 last:border-0"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
  <div>
    <p className="text-sm text-zinc-300">
      {metric.url}
    </p>

    <p className="mt-1 text-xs text-zinc-500">
      {metric.statusText || "No status"}
    </p>
  </div>

  <div className="flex items-center gap-4 text-xs">
  <span
    className={
      metric.isUp
        ? "text-emerald-400"
        : "text-red-400"
    }
  >
    ● {metric.isUp ? "UP" : "DOWN"}
  </span>

  <span className="text-zinc-400">
    {metric.status ?? "—"}
  </span>

  <span className="text-zinc-400">
    {metric.responseTime != null
      ? `${metric.responseTime} ms`
      : "—"}
  </span>

  <span className="text-zinc-500">
    {new Date(metric.timestamp).toLocaleTimeString()}
  </span>
</div>
</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecentChecks;