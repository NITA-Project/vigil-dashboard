import { useEffect, useRef, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import metricsTransform from "../utils/metricsTransform";
import formatTime from "../utils/formatTime";

function ResponseTimeChart({ metrics, theme = "dark" }) {
    const chartData = metricsTransform(metrics);
    const urls = [...new Set(metrics.map((metric) => metric.url))];

    const isDark = theme === "dark";

    const scrollRef = useRef(null);
    const isAtRightRef = useRef(true);

    const isDraggingRef = useRef(false);
    const dragStartXRef = useRef(0);
    const dragStartScrollLeftRef = useRef(0);

    const [containerWidth, setContainerWidth] = useState(0);

    const POINT_WIDTH = 80;

    const chartWidth = Math.max(
        containerWidth,
        chartData.length * POINT_WIDTH
    );

    const gridColor = isDark ? "#27272a" : "#e4e4e7";
    const axisColor = isDark ? "#71717a" : "#71717a";

    useEffect(() => {
        const container = scrollRef.current;

        if (!container) return;

        const updateWidth = () => {
            setContainerWidth(container.clientWidth);
        };

        updateWidth();

        const observer = new ResizeObserver(updateWidth);
        observer.observe(container);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const container = scrollRef.current;

        if (!container || !isAtRightRef.current) return;

        requestAnimationFrame(() => {
            container.scrollLeft = container.scrollWidth;
        });
    }, [chartData.length]);

    const handleScroll = () => {
        const container = scrollRef.current;

        if (!container) return;

        const distanceFromRight =
            container.scrollWidth -
            container.clientWidth -
            container.scrollLeft;

        isAtRightRef.current = distanceFromRight <= 20;
    };

    const handleMouseDown = (event) => {
        // Only initiate dragging with the primary mouse button.
        if (event.button !== 0) return;

        const container = scrollRef.current;
        if (!container) return;

        isDraggingRef.current = true;
        dragStartXRef.current = event.clientX;
        dragStartScrollLeftRef.current = container.scrollLeft;

        container.style.cursor = "grabbing";
        container.style.userSelect = "none";
    };

    const handleMouseMove = (event) => {
        if (!isDraggingRef.current) return;

        const container = scrollRef.current;
        if (!container) return;

        const distance = event.clientX - dragStartXRef.current;

        container.scrollLeft =
            dragStartScrollLeftRef.current - distance;
    };

    const stopDragging = () => {
        if (!isDraggingRef.current) return;

        isDraggingRef.current = false;

        const container = scrollRef.current;
        if (!container) return;

        container.style.cursor = "grab";
        container.style.userSelect = "auto";
    };

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
                Response Time
            </h2>

            <p
                className={`mt-1 text-xs ${
                    isDark ? "text-zinc-500" : "text-zinc-500"
                }`}
            >
                Response latency across monitored endpoints
            </p>

            <div
                ref={scrollRef}
                className={`mt-5 h-80 cursor-grab overflow-x-auto overflow-y-hidden
                    [&::-webkit-scrollbar]:h-1.5
                    [&::-webkit-scrollbar-track]:rounded-full
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    ${
                        isDark
                            ? "[&::-webkit-scrollbar-track]:bg-[#18181b] [&::-webkit-scrollbar-thumb]:bg-[#3f3f46] hover:[&::-webkit-scrollbar-thumb]:bg-[#52525b]"
                            : "[&::-webkit-scrollbar-track]:bg-zinc-100 [&::-webkit-scrollbar-thumb]:bg-zinc-300 hover:[&::-webkit-scrollbar-thumb]:bg-zinc-400"
                    }`}
                onScroll={handleScroll}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={stopDragging}
                onMouseLeave={stopDragging}
            >
                <div
                    style={{
                        width: `${chartWidth}px`,
                        height: "100%",
                    }}
                >
                    <LineChart
                        width={chartWidth}
                        height={320}
                        data={chartData.map((item, index) => ({
                            ...item,
                            index,
                        }))}
                        margin={{
                            top: 5,
                            right: 20,
                            left: 5,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid
                            stroke={gridColor}
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="index"
                            tickFormatter={(index) =>
                                chartData[index]?.timestamp
                                    ? formatTime(chartData[index].timestamp)
                                    : ""
                            }
                            tick={{
                                fill: axisColor,
                                fontSize: 12,
                            }}
                            axisLine={{ stroke: gridColor }}
                            tickLine={false}
                            minTickGap={30}
                        />

                        <YAxis
                            tick={{
                                fill: axisColor,
                                fontSize: 12,
                            }}
                            axisLine={{ stroke: gridColor }}
                            tickLine={false}
                            unit=" ms"
                        />

                        <Tooltip
                            labelFormatter={(index) =>
                                chartData[index]?.timestamp
                                    ? formatTime(chartData[index].timestamp)
                                    : ""
                            }
                            formatter={(value) => [`${value} ms`]}
                            contentStyle={{
                                backgroundColor: isDark
                                    ? "#18181b"
                                    : "#ffffff",
                                border: `1px solid ${
                                    isDark ? "#3f3f46" : "#d4d4d8"
                                }`,
                                borderRadius: "8px",
                                color: isDark ? "#f4f4f5" : "#18181b",
                            }}
                            labelStyle={{
                                color: isDark ? "#a1a1aa" : "#52525b",
                                marginBottom: "6px",
                            }}
                            itemStyle={{
                                color: isDark ? "#f4f4f5" : "#18181b",
                            }}
                        />

                        {urls.map((url, index) => {
                            const hue = (index * 137.5) % 360;

                            return (
                                <Line
                                    key={url}
                                    type="monotone"
                                    dataKey={url}
                                    stroke={`hsl(${hue}, 70%, 55%)`}
                                    strokeWidth={2}
                                    dot={false}
                                    connectNulls
                                    activeDot={{ r: 4 }}
                                />
                            );
                        })}
                    </LineChart>
                </div>
            </div>

            <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2">
                {urls.map((url, index) => {
                    const hue = (index * 137.5) % 360;

                    return (
                        <div
                            key={url}
                            className={`flex items-center gap-2 text-xs ${
                                isDark ? "text-zinc-400" : "text-zinc-600"
                            }`}
                        >
                            <span
                                className="h-2 w-2 shrink-0 rounded-full"
                                style={{
                                    backgroundColor: `hsl(${hue}, 70%, 55%)`,
                                }}
                            />
                            <span>{url}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ResponseTimeChart;