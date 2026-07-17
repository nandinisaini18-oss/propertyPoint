import { Search, X } from "lucide-react";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search properties...",
  className = "",
}) => (
  <div className={`relative w-full ${className}`}>
    <Search
      className="
        absolute
        left-5
        top-1/2
        -translate-y-1/2
        w-5
        h-5
        text-stone-400
      "
      strokeWidth={1.8}
    />

    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="
        w-full
        h-14
        rounded-2xl
        border
        border-stone-200
        bg-white
        pl-14
        pr-12
        text-[15px]
        text-stone-800
        placeholder:text-stone-400
        shadow-sm
        transition-all
        duration-300
        focus:outline-none
        focus:border-stone-900
        focus:ring-4
        focus:ring-stone-100
      "
      style={{ fontFamily: "'Inter', sans-serif" }}
    />

    {value && (
      <button
        onClick={() => onChange("")}
        className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          w-8
          h-8
          rounded-full
          flex
          items-center
          justify-center
          text-stone-400
          hover:bg-stone-100
          hover:text-stone-700
          transition-all
        "
      >
        <X className="w-4 h-4" />
      </button>
    )}
  </div>
);

export default SearchBar;