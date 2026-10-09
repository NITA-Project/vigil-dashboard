function EndpointTable({ metrics, theme = "dark" }) {
  const isDark = theme === "dark";
  const latestByUrl = new Map();

  for (const metric of metrics) {
    latestByUrl.set(metric.url, metric);
  }

  const endpoints = Array.from(latestByUrl.values());

  return (
    <div
      className={`mt-6 overflow-hidden rounded-xl border ${isDark ? "border-zinc-800 bg-[#0c0c0f]" : "border-zinc-200 bg-white"}`}>
      {/* Header */}
      <div className={`border-b px-5 py-4 ${isDark ? "border-zinc-800" : "border-zinc-200"}`}>
        <h2 className={`text-sm font-semibold ${isDark ? "text-zinc-200" : "text-zinc-800"}`}>Endpoints</h2>
        <p className="mt-1 text-xs text-zinc-500">Current status of monitored endpoints</p>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className={`border-b ${isDark ? "border-zinc-800" : "border-zinc-200"}`}>
            <tr className="text-xs text-zinc-500">
              <th className="px-5 py-3 font-medium">Endpoint</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Response</th>
              <th className="px-5 py-3 font-medium">TTFB</th>
              <th className="px-5 py-3 font-medium">Last checked</th>
            </tr>
          </thead>
          <tbody>
            {endpoints.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-5 py-10 text-center text-sm text-zinc-500">No endpoints are being monitored yet.</td>
              </tr>
            ) : (
              endpoints.map((metric) => (
                <tr key={metric.url} className={`border-b last:border-0 ${isDark ? "border-zinc-800/60 hover:bg-zinc-900/40" : "border-zinc-100 hover:bg-zinc-50"}`}>
                  <td className={`px-5 py-4 ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>{metric.url}</td>
                  <td className="px-5 py-4">{metric.isUp ? (<span className="text-emerald-500">● UP</span>) : (<span className="text-red-500">● DOWN</span>)}</td>
                  <td className={`px-5 py-4 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{metric.responseTime != null ? `${metric.responseTime} ms` : "—"}</td>
                  <td className={`px-5 py-4 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{metric.ttfb != null ? `${metric.ttfb} ms` : "—"}</td>
                  <td className="px-5 py-4 text-zinc-500">{new Date(metric.timestamp).toLocaleTimeString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EndpointTable;