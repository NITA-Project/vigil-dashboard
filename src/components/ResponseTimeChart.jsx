import { useEffect, useRef, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import metricsTransform from "../utils/metricsTransform";
import formatTime from "../utils/formatTime";

function ResponseTimeChart({ metrics }) {
    const chartData = metricsTransform(metrics);
    const urls = [...new Set(metrics.map((metric) => metric.url))];

    const scrollRef = useRef(null);

    // Whether the user is currently viewing the latest/rightmost data
    const isAtRightRef = useRef(true);

    // Mouse-drag state
    const isDraggingRef = useRef(false);
    const dragStartXRef = useRef(0);
    const dragStartScrollLeftRef = useRef(0);

    // Width of the visible chart area
    const [containerWidth, setContainerWidth] = useState(0);

    
    // Each data point gets a fixed amount of horizontal space.

    // Therefore:
    // point 0 -> x = 0
    // point 1 -> x = 80
    // point 2 -> x = 160
    // ...

    // The actual timestamp does not affect the spacing.
    
    const POINT_WIDTH = 80;

    const chartWidth = Math.max(
        containerWidth,
        chartData.length * POINT_WIDTH
    );

    // Measure the visible container.
    useEffect(() => {
        const container = scrollRef.current;

        if (!container) {
            return;
        }

        const updateWidth = () => {
            setContainerWidth(container.clientWidth);
        };

        updateWidth();

        const observer = new ResizeObserver(updateWidth);
        observer.observe(container);

        return () => {
            observer.disconnect();
        };
    }, []);

    
    // Whenever new metrics arrive:
    // - If the user was already at the right side,
    // automatically move to the new right side.
    // - If the user manually moved left,
    // preserve their current position.
    useEffect(() => {
        const container = scrollRef.current;

        if (!container || !isAtRightRef.current) {
            return;
        }

        requestAnimationFrame(() => {
            container.scrollLeft = container.scrollWidth;
        });
    }, [chartData.length]);

    // Track whether the user is near the right side.
    const handleScroll = () => {
        const container = scrollRef.current;

        if (!container) return;

        const distanceFromRight =
            container.scrollWidth -
            container.clientWidth -
            container.scrollLeft;

        // Small tolerance because of fractional pixel differences
        isAtRightRef.current = distanceFromRight <= 20;
    };

    // Start mouse dragging.
    const handleMouseDown = (event) => {
        const container = scrollRef.current;

        if (!container) return;

        isDraggingRef.current = true;
        dragStartXRef.current = event.clientX;
        dragStartScrollLeftRef.current = container.scrollLeft;

        container.style.cursor = "grabbing";
        container.style.userSelect = "none";
    };

    // Move chart horizontally while dragging.
    const handleMouseMove = (event) => {
        if (!isDraggingRef.current) return;

        const container = scrollRef.current;

        if (!container) return;

        const distance = event.clientX - dragStartXRef.current;

        container.scrollLeft =
            dragStartScrollLeftRef.current - distance;
    };

    // Stop dragging.
    const stopDragging = () => {
        if (!isDraggingRef.current) {
            return;
        }
        isDraggingRef.current = false;
        const container = scrollRef.current;
        if (!container) {
            return;
        }
        container.style.cursor = "grab";
        container.style.userSelect = "auto";
    };

    return (
        <div className="mt-6 rounded-xl border border-zinc-800 bg-[#0c0c0f] p-5">
            <h2 className="text-sm font-semibold text-zinc-200">Response Time</h2>
            <p className="mt-1 text-xs text-zinc-500">Response latency across monitored endpoints</p>
            <div ref={scrollRef} className="mt-5 h-80 overflow-x-auto overflow-y-hidden cursor-grab [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#18181b] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#3f3f46] hover:[&::-webkit-scrollbar-thumb]:bg-[#52525b]" onScroll={handleScroll} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={stopDragging} onMouseLeave={stopDragging}>
                <div style={{ width: `${chartWidth}px`, height: "100%" }}>
                    <LineChart width={chartWidth} height={320} data={chartData.map((item, index) => ({ ...item, index }))} margin={{ top: 5, right: 20, left: 5, bottom: 5 }}>
                        <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
                        <XAxis dataKey="index" tickFormatter={(index) => (chartData[index]?.timestamp) ? formatTime(chartData[index]?.timestamp) : ""} tick={{ fill: "#71717a", fontSize: 12 }} axisLine={{ stroke: "#27272a" }} tickLine={false} minTickGap={30} />
                        <YAxis tick={{ fill: "#71717a", fontSize: 12 }} axisLine={{ stroke: "#27272a" }} tickLine={false} unit=" ms" />
                        <Tooltip labelFormatter={(index) => (chartData[index]?.timestamp) ? formatTime(chartData[index]?.timestamp) : ""} formatter={(value) => [`${value} ms`]} contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "8px" }} labelStyle={{ color: "#a1a1aa", marginBottom: "6px"}} />
                        {urls.map((url, index) => {
                            const hue = (index * 137.5) % 360;
                            return (
                                <Line key={url} type="monotone" dataKey={url} stroke={`hsl(${hue}, 70%, 55%)`} strokeWidth={2} dot={false} connectNulls={true} activeDot={{ r: 4 }} />
                            );
                        })}
                    </LineChart>
                </div>
            </div>
            <div className="mt-3 flex justify-center gap-x-6 gap-y-2 flex-wrap">
                {urls.map((url, index) => {
                    const hue = (index * 137.5) % 360;
                    return (
                        <div key={url} className="flex items-center gap-2 text-xs text-zinc-400">
                            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: `hsl(${hue}, 70%, 55%)` }} />
                            <span>{url}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ResponseTimeChart;