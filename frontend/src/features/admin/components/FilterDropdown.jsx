// ─── FilterDropdown ────────────────────────────────────────────────────────────
import { ChevronDown } from "lucide-react";

const FilterDropdown = ({ label, value, onChange, options, className = "" }) => (
  <div className={`relative ${className}`}>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-9
        text-sm text-gray-700 cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-all"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <option value="">{label}</option>
      {options.map((o) => (
        <option key={o.value ?? o} value={o.value ?? o}>
          {o.label ?? o}
        </option>
      ))}
    </select>
    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
  </div>
);

export default FilterDropdown;
