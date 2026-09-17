import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function LatencyBreakdown({ metrics }) {
  return (
    <div className="mt-6 rounded-xl border border-zinc-800 bg-[#0c0c0f] p-5">
      <h2 className="text-sm font-semibold text-zinc-200">
        Latency Breakdown
      </h2>

      <p className="mt-1 text-xs text-zinc-500">
        Breakdown of request latency across DNS, TCP, TLS, and TTFB.
      </p>

      <div className="mt-5 h-80">
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={metrics} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="timestamp" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="dns" name="DNS" dot={false} />
                <Line type="monotone" dataKey="tcp" name="TCP" dot={false} />
                <Line type="monotone" dataKey="tls" name="TLS" dot={false} />
                <Line type="monotone" dataKey="ttfb" name="TTFB" dot={false} />
            </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default LatencyBreakdown;