const Skel = ({ className = "" }) => (
  <div
    className={`animate-pulse rounded-2xl bg-stone-200 ${className}`}
  />
);

// ─── Stat Card ───────────────────────────────────────────
export const StatCardSkeleton = () => (
  <div className="bg-white border border-stone-200 rounded-3xl p-7 shadow-sm">
    <div className="flex justify-between items-start">
      <div className="space-y-4">
        <Skel className="h-3 w-24" />
        <Skel className="h-10 w-20" />
        <Skel className="h-3 w-32" />
      </div>

      <Skel className="h-14 w-14 rounded-2xl" />
    </div>
  </div>
);

// ─── Table Row ───────────────────────────────────────────
export const TableRowSkeleton = ({ cols = 6 }) => (
  <tr className="border-b border-stone-100">
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} className="px-6 py-5">
        <Skel className="h-4 w-full" />
      </td>
    ))}
  </tr>
);

// ─── Property Card ───────────────────────────────────────
export const CardSkeleton = () => (
  <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">

    <Skel className="h-56 w-full rounded-none" />

    <div className="space-y-4 p-6">
      <Skel className="h-5 w-3/4" />
      <Skel className="h-4 w-1/2" />

      <div className="flex gap-3 pt-3">
        <Skel className="h-11 flex-1 rounded-xl" />
        <Skel className="h-11 flex-1 rounded-xl" />
      </div>
    </div>

  </div>
);

// ─── Wrapper ─────────────────────────────────────────────
const LoadingSkeleton = ({
  type = "cards",
  count = 6,
  cols = 6,
}) => {
  if (type === "cards") {
    return (
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (type === "table") {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <TableRowSkeleton key={i} cols={cols} />
        ))}
      </>
    );
  }

  return null;
};

export default LoadingSkeleton;