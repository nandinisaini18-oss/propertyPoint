import React, { useState, useEffect, useRef } from "react";
import { MoreVertical, Eye, CheckSquare, Trash2 } from "lucide-react";
import { formatPrice } from "../../../utils/formatPrice";
import StatusBadge from "./StatusBadge";

export default function PropertyTable({ properties, onView, onMarkSold, onDelete }) {
  const [activeMenuId, setActiveMenuId] = useState(null);
  const menuRef = useRef(null);

  // Close menu on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setActiveMenuId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50">
              <th className="px-8 py-5 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Property</th>
              <th className="px-8 py-5 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Seller</th>
              <th className="px-8 py-5 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Category</th>
              <th className="px-8 py-5 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">City</th>
              <th className="px-8 py-5 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Price</th>
              <th className="px-8 py-5 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Status</th>
              <th className="px-8 py-5 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Approval</th>
              <th className="py-8 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {properties.map((p) => {
              const isMenuOpen = activeMenuId === p._id;
              console.log(p);
console.log("seller:", p.seller);
console.log("createdBy:", p.createdBy);

              return (
                <tr key={p._id} className="group transition hover:bg-stone-50">
                  {/* Property Image & Title */}
                  <td className="py-8 py-6 max-w-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          p.propertyImages?.length
                            ? p.propertyImages[0]
                            : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"
                        }
                        alt={p.title}
                        className="w-16 h-16 rounded-2xl object-cover border border-stone-200 shadow-sm"
                      />
                      <div className="min-w-0">
                        <p
                          className="
                          text-[15px]
                          font-semibold
                          text-stone-900
                          cursor-pointer
                          transition
                          group-hover:text-black
                          "
                           onClick={() => onView(p)}>
                          {p.title}
                        </p>
                        {/* <p className="text-xs text-stone-400 mt-1">ID: {p._id}</p> */}
                      </div>
                    </div>
                  </td>

                  {/* Seller Name */}
                  <td className="px-8 py-6">
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center font-semibold text-stone-700">
      {p.createdBy?.fullname?.charAt(0) || "U"}
    </div>

    <div>
      <p className="font-medium text-stone-900">
        {p.createdBy?.fullname}
      </p>

      <p className="text-xs text-stone-500">
        {p.createdBy?.email}
      </p>
    </div>
  </div>
</td>

                  {/* Category */}
                  <td className="py-8 py-6 text-stone-700 font-medium">{p.category}</td>

                  {/* City */}
                  <td className="py-8 py-6 text-gray-700 font-medium">{p.city}</td>

                  {/* Price */}
                  <td className="py-8 py-6 font-bold text-gray-950 whitespace-nowrap">{formatPrice(p.price)}</td>

                  {/* Property Status (e.g. For Sale, Sold) */}
                  <td className="py-8 py-6">
                    <StatusBadge status={p.status} />
                  </td>

                  {/* Approval Status */}
                  <td className="py-8 py-6">
                    <StatusBadge status={p.approvalStatus || "approved"} />
                  </td>

                  {/* Actions Dropdown */}
                  <td className="py-8 py-6 text-right relative">
                    <button
                      onClick={(e) => toggleMenu(p._id, e)}
                      className="
w-10
h-10
rounded-xl
flex
items-center
justify-center
hover:bg-stone-100
transition
"
                    >
                      <MoreVertical className="w-4.5 h-4.5" />
                    </button>

                    {isMenuOpen && (
                      <div
                        ref={menuRef}
                        className="absolute right-6 mt-1 w-44 bg-white border border-gray-250 rounded-2xl shadow-xl py-2 z-20 text-left animate-in fade-in slide-in-from-top-1 duration-100"
                      >
                        {/* View Details */}
                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            onView(p);
                          }}
                          className="w-full flex items-center gap-2 px-5 py-3 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Eye className="w-4 h-4 text-gray-400" />
                          View Details
                        </button>

                        {/* Mark Sold */}
                        {p.status !== "Sold" && onMarkSold && (
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              onMarkSold(p._id);
                            }}
                            className="w-full flex items-center gap-2 px-5 py-3 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <CheckSquare className="w-4 h-4 text-gray-400" />
                            Mark Sold
                          </button>
                        )}

                        {/* Delete */}
                        {onDelete && (
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              onDelete(p._id);
                            }}
                            className="w-full flex items-center gap-2 px-5 py-3 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                            Delete Property
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
