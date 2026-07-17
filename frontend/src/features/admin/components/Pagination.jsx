import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}) => {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const visible = (() => {
    if (totalPages <= 5) return pages;

    if (currentPage <= 3) return [1, 2, 3, 4, 5];

    if (currentPage >= totalPages - 2)
      return pages.slice(totalPages - 5);

    return [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  })();

  const base =
    "w-11 h-11 flex items-center justify-center rounded-2xl text-sm font-semibold transition";

  const inactive =
    `${base} bg-white border border-stone-200 text-stone-600 hover:border-stone-400 hover:bg-stone-50`;

  const active =
    `${base} bg-stone-900 text-white border border-stone-900 shadow-sm`;

  return (
    <div className="mt-8 flex flex-col gap-5 border-t border-stone-200 pt-6 lg:flex-row lg:items-center lg:justify-between">

      {/* Left */}
      <div className="text-sm text-stone-500">
        Showing{" "}
        <span className="font-semibold text-stone-900">
          {start} – {end}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-stone-900">
          {totalItems}
        </span>{" "}
        properties
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${inactive} disabled:opacity-40 disabled:pointer-events-none`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {visible[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className={inactive}
            >
              1
            </button>

            {visible[0] > 2 && (
              <span className="px-2 text-stone-400">•••</span>
            )}
          </>
        )}

        {visible.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={page === currentPage ? active : inactive}
          >
            {page}
          </button>
        ))}

        {visible[visible.length - 1] < totalPages && (
          <>
            {visible[visible.length - 1] < totalPages - 1 && (
              <span className="px-2 text-stone-400">•••</span>
            )}

            <button
              onClick={() => onPageChange(totalPages)}
              className={inactive}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${inactive} disabled:opacity-40 disabled:pointer-events-none`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

      </div>
    </div>
  );
};

export default Pagination;