const CONFIG = {
  pending: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
    border: "border-amber-200",
    label: "Pending",
  },

  approved: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    border: "border-emerald-200",
    label: "Approved",
  },

  rejected: {
    bg: "bg-red-50",
    text: "text-red-700",
    dot: "bg-red-500",
    border: "border-red-200",
    label: "Rejected",
  },

  available: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-500",
    border: "border-blue-200",
    label: "Available",
  },

  sold: {
    bg: "bg-stone-100",
    text: "text-stone-700",
    dot: "bg-stone-500",
    border: "border-stone-200",
    label: "Sold",
  },

  contacted: {
    bg: "bg-violet-50",
    text: "text-violet-700",
    dot: "bg-violet-500",
    border: "border-violet-200",
    label: "Contacted",
  },

  closed: {
    bg: "bg-gray-900",
    text: "text-white",
    dot: "bg-white",
    border: "border-gray-900",
    label: "Closed",
  },
};

const StatusBadge = ({ status, size = "sm" }) => {
  const key = status?.toLowerCase();
  const c = CONFIG[key] || CONFIG.pending;

  const sizeClass =
    size === "lg"
      ? "px-3.5 py-1.5 text-xs"
      : "px-3 py-1 text-[11px]";

  return (
    <span
      className={`
        inline-flex items-center gap-2
        rounded-full
        border
        font-semibold
        ${sizeClass}
        ${c.bg}
        ${c.text}
        ${c.border}
      `}
    >
      <span
        className={`w-2 h-2 rounded-full ${c.dot}`}
      />
      {c.label}
    </span>
  );
};

export default StatusBadge;