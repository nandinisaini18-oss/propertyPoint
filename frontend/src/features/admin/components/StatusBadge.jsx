// ─── StatusBadge ───────────────────────────────────────────────────────────────
// Neutral grey-scale badges only — matches 360Views design language.

const CONFIG = {
  pending:   { bg: "bg-gray-100",   text: "text-gray-600",  dot: "bg-gray-400",  label: "Pending"   },
  approved:  { bg: "bg-gray-900",   text: "text-white",     dot: "bg-white",     label: "Approved"  },
  rejected:  { bg: "bg-gray-200",   text: "text-gray-700",  dot: "bg-gray-500",  label: "Rejected"  },
  available: { bg: "bg-gray-100",   text: "text-gray-700",  dot: "bg-gray-500",  label: "Available" },
  sold:      { bg: "bg-gray-200",   text: "text-gray-600",  dot: "bg-gray-400",  label: "Sold"      },
  contacted: { bg: "bg-stone-200",  text: "text-stone-700", dot: "bg-stone-500", label: "Contacted" },
  closed:    { bg: "bg-gray-900",   text: "text-white",     dot: "bg-white",     label: "Closed"    },
};

const StatusBadge = ({ status, size = "sm" }) => {
  const key = status?.toLowerCase();
  const c   = CONFIG[key] ?? CONFIG.pending;

  const sizeClass = size === "lg"
    ? "px-3 py-1.5 text-xs gap-1.5"
    : "px-2.5 py-1 text-[11px] gap-1";

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-lg tracking-wide ${c.bg} ${c.text} ${sizeClass}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
      {c.label}
    </span>
  );
};

export default StatusBadge;
