import React, { useState, useEffect, useRef } from "react";
import { MoreVertical, Eye, CheckSquare, Trash2 } from "lucide-react";
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
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-700">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-150 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              <th className="px-6 py-4">Property</th>
              <th className="px-6 py-4">Seller</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">City</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Approval</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {properties.map((p) => {
              const isMenuOpen = activeMenuId === p._id;

              return (
                <tr key={p._id} className="hover:bg-gray-50/70 transition-colors group">
                  {/* Property Image & Title */}
                  <td className="px-6 py-4 max-w-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100&q=75"}
                        alt={p.title}
                        className="w-11 h-11 rounded-xl object-cover border border-gray-100 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 truncate leading-snug hover:text-blue-600 cursor-pointer"
                           onClick={() => onView(p)}>
                          {p.title}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-0.5">ID: {p._id}</p>
                      </div>
                    </div>
                  </td>

                  {/* Seller Name */}
                  <td className="px-6 py-4">
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 leading-none">{p.seller}</p>
                      <p className="text-[10px] text-gray-400 mt-1 truncate">{p.sellerEmail}</p>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 text-gray-655 font-medium">{p.category}</td>

                  {/* City */}
                  <td className="px-6 py-4 text-gray-655 font-medium">{p.city}</td>

                  {/* Price */}
                  <td className="px-6 py-4 font-bold text-gray-950 whitespace-nowrap">{p.price}</td>

                  {/* Property Status (e.g. For Sale, Sold) */}
                  <td className="px-6 py-4">
                    <StatusBadge status={p.status} />
                  </td>

                  {/* Approval Status */}
                  <td className="px-6 py-4">
                    <StatusBadge status={p.approvalStatus || "approved"} />
                  </td>

                  {/* Actions Dropdown */}
                  <td className="px-6 py-4 text-right relative">
                    <button
                      onClick={(e) => toggleMenu(p._id, e)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none"
                    >
                      <MoreVertical className="w-4.5 h-4.5" />
                    </button>

                    {isMenuOpen && (
                      <div
                        ref={menuRef}
                        className="absolute right-6 mt-1 w-44 bg-white border border-gray-250 rounded-xl shadow-lg py-1.5 z-20 text-left animate-in fade-in slide-in-from-top-1 duration-100"
                      >
                        {/* View Details */}
                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            onView(p);
                          }}
                          className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
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
                            className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
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
                            className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
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
