function RecentChecks({ metrics, theme = "dark" }) {
  const isDark = theme === "dark";
  const recentChecks = [...metrics].reverse().slice(0, 10);

  return (
    <div
      className={`mt-6 overflow-hidden rounded-xl border ${
        isDark
          ? "border-zinc-800 bg-[#0c0c0f]"
          : "border-zinc-200 bg-white"
      }`}
    >
      {/* Header */}
      <div
        className={`border-b px-5 py-4 ${
          isDark ? "border-zinc-800" : "border-zinc-200"
        }`}
      >
        <h2
          className={`text-sm font-semibold ${
            isDark ? "text-zinc-200" : "text-zinc-800"
          }`}
        >
          Recent Checks
        </h2>

        <p className="mt-1 text-xs text-zinc-500">
          Latest monitoring activity
        </p>
      </div>

      {/* Recent check entries */}
      <div>
        {recentChecks.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-zinc-500">
            No checks recorded yet.
          </div>
        ) : (
          recentChecks.map((metric, index) => (
            <div
              key={`${metric.timestamp}-${metric.url}-${index}`}
              className={`border-b px-5 py-4 last:border-0 ${
                isDark
                  ? "border-zinc-800/60 hover:bg-zinc-900/40"
                  : "border-zinc-100 hover:bg-zinc-50"
              }`}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                {/* Endpoint details */}
                <div className="min-w-0">
                  <p
                    className={`break-all text-sm ${
                      isDark ? "text-zinc-300" : "text-zinc-700"
                    }`}
                  >
                    {metric.url}
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    {metric.statusText || "No status"}
                  </p>
                </div>

                {/* Check results */}
                <div className="flex flex-wrap items-center gap-4 text-xs">
                  <span
                    className={
                      metric.isUp
                        ? "text-emerald-500"
                        : "text-red-500"
                    }
                  >
                    ● {metric.isUp ? "UP" : "DOWN"}
                  </span>

                  <span
                    className={
                      isDark ? "text-zinc-400" : "text-zinc-600"
                    }
                  >
                    {metric.status ?? "—"}
                  </span>

                  <span
                    className={
                      isDark ? "text-zinc-400" : "text-zinc-600"
                    }
                  >
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