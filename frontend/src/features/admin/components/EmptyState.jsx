// ─── EmptyState ────────────────────────────────────────────────────────────────
import { PackageOpen } from "lucide-react";

const EmptyState = ({ icon: Icon = PackageOpen, title = "Nothing here", description = "", action }) => (
  <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
    <div className="w-16 h-16 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center mb-4">
      <Icon className="w-7 h-7 text-gray-400" strokeWidth={1.6} />
    </div>
    <h3 className="text-base font-semibold text-gray-800 mb-1"
        style={{ fontFamily: "'Manrope', sans-serif" }}>
      {title}
    </h3>
    <p className="text-sm text-gray-400 max-w-xs mb-5">{description}</p>
    {action && (
      <button
        onClick={action.onClick}
        className="px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl
          hover:bg-gray-800 transition-colors"
      >
        {action.label}
      </button>
    )}
  </div>
);

export default EmptyState;
