function EndpointTable({ metrics }) {
    const latestByUrl = new Map();
    for(const metric of metrics) {
        latestByUrl.set(metric.url, metric)
    }
    const endpoints = Array.from(latestByUrl.values());
    return (
        <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800 bg-[#0c0c0f]">
            <div className="border-b border-zinc-800 px-5 py-4">
                <h2 className="text-sm font-semibold text-zinc-200">Endpoints</h2>
                <p className="mt-1 text-xs text-zinc-500">Current status of monitored endpoints</p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-zinc-800">
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
                                <tr key={metric.url} className="border-b border-zinc-800/60 last:border-0">
                                    <td className="px-5 py-4 text-zinc-300">{metric.url}</td>
                                    <td className="px-5 py-4">{metric.isUp ? ( <span className="text-emerald-400">● UP</span> ) : ( <span className="text-red-400">● DOWN</span> )}</td>
                                    <td className="px-5 py-4 text-zinc-400"> {metric.responseTime != null ? `${metric.responseTime} ms` : "—"}</td>
                                    <td className="px-5 py-4 text-zinc-400">{metric.ttfb != null ? `${metric.ttfb} ms` : "—"}</td>
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