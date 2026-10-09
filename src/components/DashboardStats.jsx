import {
  Globe2,
  CheckCircle2,
  AlertCircle,
  Clock3,
} from "lucide-react";

import StatCard from "./StatCard";

function DashboardStats({ metrics, theme = "dark" }) {
  const latestByUrl = new Map();

  for (const metric of metrics) {
    latestByUrl.set(metric.url, metric);
  }

  const latestMetrics = Array.from(latestByUrl.values());

  const totalEndpoints = latestMetrics.length;
  const healthyEndpoints = latestMetrics.filter(
    (metric) => metric.isUp
  ).length;

  const incidentEndpoints = totalEndpoints - healthyEndpoints;

  const averageResponse =
    totalEndpoints > 0
      ? latestMetrics.reduce(
          (sum, metric) => sum + metric.responseTime,
          0
        ) / totalEndpoints
      : 0;

  const healthPercentage =
    totalEndpoints > 0
      ? ((healthyEndpoints / totalEndpoints) * 100).toFixed(1)
      : "0.0";

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Endpoints"
        value={totalEndpoints}
        subtitle="Currently monitored"
        icon={<Globe2 size={18} />}
        theme={theme}
      />

      <StatCard
        title="Healthy"
        value={healthyEndpoints}
        subtitle={`${healthPercentage}% of endpoints`}
        icon={<CheckCircle2 size={18} />}
        valueClass="text-emerald-400"
        theme={theme}
      />

      <StatCard
        title="Incidents"
        value={incidentEndpoints}
        subtitle="Currently unavailable"
        icon={<AlertCircle size={18} />}
        valueClass="text-red-400"
        theme={theme}
      />

      <StatCard
        title="Avg response"
        value={`${Math.round(averageResponse)} ms`}
        subtitle="Latest measurements"
        icon={<Clock3 size={18} />}
        theme={theme}
      />
    </div>
  );
}

export default DashboardStats;