import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function LatencyBreakdown({ metrics, theme = "dark" }) {
  const isDark = theme === "dark";

  const latestByUrl = new Map();

  metrics.forEach((metric) => {
    latestByUrl.set(metric.url, metric);
  });

  const chartData = Array.from(latestByUrl.values()).map((metric) => ({
    url: metric.url,
    dns: metric.dns ?? 0,
    tcp: metric.tcp ?? 0,
    tls: metric.tls ?? 0,
    ttfb: metric.ttfb ?? 0,
  }));

  const gridColor = isDark ? "#27272a" : "#e4e4e7";
  const tickColor = isDark ? "#a1a1aa" : "#52525b";

  return (
    <div
      className={`mt-6 rounded-xl border p-5 transition-colors ${
        isDark
          ? "border-zinc-800 bg-[#0c0c0f]"
          : "border-zinc-200 bg-white"
      }`}
    >
      <h2
        className={`text-sm font-semibold ${
          isDark ? "text-zinc-200" : "text-zinc-800"
        }`}
      >
        Latency Breakdown
      </h2>

      <p className="mt-1 text-xs text-zinc-500">
        Breakdown of request latency across DNS, TCP, TLS, and TTFB.
      </p>

      <div className="mt-5">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
            >
              <CartesianGrid
                horizontal={false}
                strokeDasharray="3 3"
                stroke={gridColor}
              />

              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: tickColor }}
                tickFormatter={(value) => `${value} ms`}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                type="category"
                dataKey="url"
                width={150}
                tick={{ fontSize: 11, fill: tickColor }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                formatter={(value, name) => [`${value} ms`, name]}
                contentStyle={{
                  backgroundColor: isDark ? "#18181b" : "#ffffff",
                  border: `1px solid ${
                    isDark ? "#3f3f46" : "#d4d4d8"
                  }`,
                  borderRadius: "8px",
                  color: isDark ? "#f4f4f5" : "#18181b",
                }}
                labelStyle={{
                  color: isDark ? "#e4e4e7" : "#27272a",
                  marginBottom: "6px",
                }}
                itemStyle={{
                  color: isDark ? "#f4f4f5" : "#18181b",
                }}
              />

              <Bar
                dataKey="dns"
                name="DNS"
                stackId="latency"
                fill="#60a5fa"
              />
              <Bar
                dataKey="tcp"
                name="TCP"
                stackId="latency"
                fill="#34d399"
              />
              <Bar
                dataKey="tls"
                name="TLS"
                stackId="latency"
                fill="#fbbf24"
              />
              <Bar
                dataKey="ttfb"
                name="TTFB"
                stackId="latency"
                fill="#a78bfa"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Static legend below the chart */}
        <div className="mt-3 flex justify-center">
          <div
            className={`flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs ${
              isDark ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-sm bg-blue-400" />
              <span>DNS</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-sm bg-emerald-400" />
              <span>TCP</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-sm bg-amber-400" />
              <span>TLS</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-sm bg-violet-400" />
              <span>TTFB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LatencyBreakdown;