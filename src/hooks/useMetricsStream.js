import { useState, useEffect } from "react";

function useMetricsStream() {
    const [metrics, setMetrics] = useState([]);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const eventSource = new EventSource("/chart-stream");

        eventSource.onopen = () => {
            console.log("SSE connected");
            setConnected(true);
        };

        eventSource.onmessage = (e) => {
            const metric = JSON.parse(e.data);
            console.log("New metric:", metric);
            setMetrics((prev) => [...prev, metric].slice(-100));
        };

        eventSource.onerror = () => { 
            console.log("SSE disconnected");
            setConnected(false);
        };

        return () => eventSource.close();

    }, []);

    return { metrics, connected };
}

export default useMetricsStream;