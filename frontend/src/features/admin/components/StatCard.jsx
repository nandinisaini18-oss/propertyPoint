const StatCard = ({
  title,
  value,
  icon: Icon,
  change,
  delay = 0,
}) => (
  <div
    className="
      group
      bg-white
      border border-stone-200
      rounded-3xl
      p-7
      transition-all duration-300
      hover:border-stone-300
      hover:shadow-lg
      hover:-translate-y-1
    "
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-start justify-between">

      <div className="space-y-3">

        <p className="text-[11px] uppercase tracking-[3px] text-stone-500 font-semibold">
          {title}
        </p>

        <h2
          className="text-5xl font-bold text-stone-900 leading-none"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          {typeof value === "number"
            ? value.toLocaleString("en-IN")
            : value}
        </h2>

        {change && (
          <p className="text-sm text-stone-500">
            {change}
          </p>
        )}

      </div>

      <div
        className="
          w-14
          h-14
          rounded-2xl
          bg-stone-100
          border border-stone-200
          flex
          items-center
          justify-center
          transition-all
          duration-300
          group-hover:bg-stone-900
          group-hover:border-stone-900
        "
      >
        <Icon
          className="
            w-6
            h-6
            text-stone-600
            group-hover:text-white
            transition-colors
          "
          strokeWidth={1.8}
        />
      </div>

    </div>
  </div>
);

export default StatCard;