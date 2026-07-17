import { PackageOpen } from "lucide-react";

const EmptyState = ({
  icon: Icon = PackageOpen,
  title = "Nothing Found",
  description = "",
  action,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-stone-200 py-20 px-8 flex flex-col items-center justify-center text-center">

      {/* Icon */}
      <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center mb-8">
        <Icon
          className="w-10 h-10 text-stone-500"
          strokeWidth={1.8}
        />
      </div>

      {/* Heading */}
      <h2
        className="text-2xl font-bold text-stone-900"
        style={{ fontFamily: "'Manrope', sans-serif" }}
      >
        {title}
      </h2>

      {/* Description */}
      <p className="mt-3 max-w-md text-stone-500 leading-7">
        {description}
      </p>

      {/* Button */}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-8 px-7 py-3 rounded-xl bg-stone-900 text-white font-semibold hover:bg-stone-800 transition"
        >
          {action.label}
        </button>
      )}

    </div>
  );
};

export default EmptyState;