// ─── StatCard ──────────────────────────────────────────────────────────────────
// Monochrome premium card — matches 360Views stone/slate palette.
// NO coloured backgrounds or gradients.

const StatCard = ({ title, value, icon: Icon, change, delay = 0 }) => (
  <div
    className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-4
      hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-default"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-start justify-between">
      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          {title}
        </p>
        <p
          className="text-4xl font-bold text-gray-900 tabular-nums leading-none"
          style={{ fontFamily: "'Manrope', 'Inter', sans-serif" }}
        >
          {typeof value === "number" ? value.toLocaleString("en-IN") : value}
        </p>
        {change && (
          <p className="text-xs text-gray-400 font-medium">{change}</p>
        )}
      </div>

      {/* Monochrome icon container */}
      <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-gray-500" strokeWidth={1.8} />
      </div>
    </div>
  </div>
);

export default StatCard;
