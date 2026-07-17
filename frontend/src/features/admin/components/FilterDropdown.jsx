import { ChevronDown } from "lucide-react";

const FilterDropdown = ({
  label,
  value,
  onChange,
  options,
  className = "",
}) => (
  <div className={`relative ${className}`}>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        w-full
        appearance-none
        rounded-2xl
        border
        border-stone-300
        bg-white
        px-5
        py-3
        pr-12
        text-sm
        font-medium
        text-stone-700
        shadow-sm
        transition
        duration-200
        cursor-pointer
        hover:border-stone-400
        focus:outline-none
        focus:ring-4
        focus:ring-stone-200
        focus:border-stone-500
      "
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <option value="">{label}</option>

      {options.map((option) => (
        <option
          key={option.value ?? option}
          value={option.value ?? option}
        >
          {option.label ?? option}
        </option>
      ))}
    </select>

    <ChevronDown
      className="
        absolute
        right-4
        top-1/2
        -translate-y-1/2
        h-5
        w-5
        text-stone-400
        pointer-events-none
      "
      strokeWidth={2}
    />
  </div>
);

export default FilterDropdown;