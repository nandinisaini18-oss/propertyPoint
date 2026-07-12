// ─── LoadingSkeleton ───────────────────────────────────────────────────────────
// Stone-tone pulse animation matching site palette.

const Skel = ({ className }) => (
  <div className={`rounded-lg bg-gray-200 animate-pulse ${className}`} />
);

export const StatCardSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-4 animate-pulse">
    <div className="flex items-start justify-between">
      <div className="flex flex-col gap-2 flex-1">
        <Skel className="h-3 w-24" />
        <Skel className="h-9 w-20 mt-1" />
        <Skel className="h-3 w-28" />
      </div>
      <Skel className="w-11 h-11 rounded-xl" />
    </div>
  </div>
);

export const TableRowSkeleton = ({ cols = 6 }) => (
  <tr>
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} className="px-4 py-4">
        <Skel className="h-4 w-full" />
      </td>
    ))}
  </tr>
);

export const CardSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden animate-pulse">
    <Skel className="w-full h-48 rounded-none" />
    <div className="p-5 space-y-3">
      <Skel className="h-4 w-3/4" />
      <Skel className="h-3 w-1/2" />
      <div className="flex gap-2 pt-2">
        <Skel className="h-9 flex-1 rounded-xl" />
        <Skel className="h-9 flex-1 rounded-xl" />
      </div>
    </div>
  </div>
);

const LoadingSkeleton = ({ type = "cards", count = 6, cols = 6 }) => {
  if (type === "cards") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {Array.from({ length: count }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    );
  }
  if (type === "table") {
    return (
      <>{Array.from({ length: count }).map((_, i) => <TableRowSkeleton key={i} cols={cols} />)}</>
    );
  }
  return null;
};

export default LoadingSkeleton;
