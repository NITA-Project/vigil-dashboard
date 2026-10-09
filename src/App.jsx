import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import useMetricsStream from "./hooks/useMetricsStream";
import AddEndpoint from "./components/AddEndpoint";
import EndpointTable from "./components/EndpointTable";
import RecentChecks from "./components/RecentChecks";
import ResponseTimeChart from "./components/ResponseTimeChart";
import LatencyBreakdown from "./components/LatencyBreakdown";

function App() {
  const { metrics, connected } = useMetricsStream();
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#09090b] text-zinc-100" : "bg-zinc-100 text-zinc-900"}`}>
      <Sidebar theme={theme} />
      <main className="lg:ml-64">
        <Header connected={connected} theme={theme} onToggleTheme={toggleTheme} />
        <div className="p-6">
          <DashboardStats metrics={metrics} theme={theme} />
          <div className="mt-6">
            <AddEndpoint theme={theme} />
          </div>
          <EndpointTable metrics={metrics} theme={theme} />
          <RecentChecks metrics={metrics} theme={theme} />
          <ResponseTimeChart metrics={metrics} theme={theme} />
          <LatencyBreakdown metrics={metrics} theme={theme} />
        </div>
      </main>
    </div>
  );
}

export default App;