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

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      <Sidebar />

      <main className="lg:ml-64">
        <Header connected={connected} />

        <div className="p-6">
          <DashboardStats metrics={metrics} />

          <div className="mt-6">
            <AddEndpoint />
          </div>

          <EndpointTable metrics={metrics} />
          <RecentChecks metrics={metrics} />
          <ResponseTimeChart metrics={metrics} />
          <LatencyBreakdown metrics={metrics} />
        </div>
      </main>
    </div>
  );
}

export default App;