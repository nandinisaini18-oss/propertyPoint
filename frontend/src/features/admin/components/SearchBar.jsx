// ─── SearchBar ─────────────────────────────────────────────────────────────────
import { Search, X } from "lucide-react";

const SearchBar = ({ value, onChange, placeholder = "Search…", className = "" }) => (
  <div className={`relative flex items-center ${className}`}>
    <Search className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full pl-10 pr-9 py-2.5 text-sm bg-white border border-gray-200 rounded-xl
        text-gray-800 placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-all"
      style={{ fontFamily: "'Inter', sans-serif" }}
    />
    {value && (
      <button
        onClick={() => onChange("")}
        className="absolute right-3 text-gray-400 hover:text-gray-700 transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    )}
  </div>
);

export default SearchBar;
