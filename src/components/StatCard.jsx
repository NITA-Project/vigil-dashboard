function StatCard({
  title,
  value,
  subtitle,
  icon,
  valueClass,
  theme = "dark",
}) {
  const isDark = theme === "dark";

  const defaultValueClass = isDark
    ? "text-zinc-100"
    : "text-zinc-900";

  return (
    <div
      className={`rounded-xl border p-5 transition ${
        isDark
          ? "border-zinc-800 bg-[#0c0c0f] hover:border-zinc-700"
          : "border-zinc-200 bg-white hover:border-zinc-300"
      }`}
    >
      {/* Top row */}
      <div className="flex items-center justify-between">
        <span
          className={`text-sm ${
            isDark ? "text-zinc-500" : "text-zinc-500"
          }`}
        >
          {title}
        </span>

        <div
          className={`rounded-lg p-2 ${
            isDark
              ? "bg-zinc-900 text-zinc-400"
              : "bg-zinc-100 text-zinc-600"
          }`}
        >
          {icon}
        </div>
      </div>

      {/* Value */}
      <div
        className={`mt-4 text-2xl font-semibold ${
          valueClass ?? defaultValueClass
        }`}
      >
        {value}
      </div>

      {/* Subtitle */}
      <div
        className={`mt-1 flex items-center gap-1 text-xs ${
          isDark ? "text-zinc-600" : "text-zinc-500"
        }`}
      >
        <span>{subtitle}</span>
      </div>
    </div>
  );
}

export default StatCard;