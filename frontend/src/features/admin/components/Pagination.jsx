// ─── Pagination ────────────────────────────────────────────────────────────────
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end   = Math.min(currentPage * itemsPerPage, totalItems);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  const visible = (() => {
    if (totalPages <= 5) return pages;
    if (currentPage <= 3) return [1, 2, 3, 4, 5];
    if (currentPage >= totalPages - 2) return pages.slice(-5);
    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  })();

  const btnBase = "w-9 h-9 rounded-xl text-sm font-medium transition-all duration-150 flex items-center justify-center";
  const btnInactive = `${btnBase} border border-gray-200 bg-white text-gray-600 hover:bg-gray-50`;
  const btnActive   = `${btnBase} bg-gray-900 text-white border border-gray-900`;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-gray-100 mt-2">
      <p className="text-sm text-gray-400">
        Showing <span className="font-semibold text-gray-700">{start}–{end}</span> of{" "}
        <span className="font-semibold text-gray-700">{totalItems}</span>
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${btnInactive} disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {visible[0] > 1 && (
          <>
            <button onClick={() => onPageChange(1)} className={btnInactive}>1</button>
            {visible[0] > 2 && <span className="px-1 text-gray-400">…</span>}
          </>
        )}

        {visible.map((p) => (
          <button key={p} onClick={() => onPageChange(p)} className={p === currentPage ? btnActive : btnInactive}>
            {p}
          </button>
        ))}

        {visible.at(-1) < totalPages && (
          <>
            {visible.at(-1) < totalPages - 1 && <span className="px-1 text-gray-400">…</span>}
            <button onClick={() => onPageChange(totalPages)} className={btnInactive}>{totalPages}</button>
          </>
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${btnInactive} disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
