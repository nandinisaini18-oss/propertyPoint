import React, { useState, useEffect, useRef } from "react";
import { MoreVertical, Eye, PhoneCall, CheckCircle } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function PurchaseRequestTable({ inquiries, onView, onContacted, onCloseRequest }) {
  const [activeMenuId, setActiveMenuId] = useState(null);
  const menuRef = useRef(null);

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
              <th className="px-6 py-4">Buyer</th>
              <th className="px-6 py-4">Property</th>
              <th className="px-6 py-4">Seller</th>
              <th className="px-6 py-4">Message</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {inquiries.map((inq) => {
              const isMenuOpen = activeMenuId === inq._id;

              return (
                <tr key={inq._id} className="hover:bg-gray-50/70 transition-colors group">
                  {/* Buyer Name & Contacts */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 text-xs font-bold text-gray-700 border border-gray-200">
                        {inq.buyer.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 leading-none">{inq.buyer}</p>
                        <p className="text-[10px] text-gray-400 mt-1 truncate">{inq.buyerEmail}</p>
                      </div>
                    </div>
                  </td>

                  {/* Property Name */}
                  <td className="px-6 py-4 max-w-[180px]">
                    <p className="font-medium text-gray-800 line-clamp-2 leading-snug">
                      {inq.property}
                    </p>
                  </td>

                  {/* Seller Name */}
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{inq.seller}</span>
                  </td>

                  {/* Message Snippet */}
                  <td className="px-6 py-4 max-w-xs">
                    <p className="text-gray-500 truncate line-clamp-1 text-xs">
                      {inq.message || "Interested in property..."}
                    </p>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-gray-400 text-xs whitespace-nowrap">
                    {inq.date}
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4">
                    <StatusBadge status={inq.status} />
                  </td>

                  {/* Actions Dropdown */}
                  <td className="px-6 py-4 text-right relative">
                    <button
                      onClick={(e) => toggleMenu(inq._id, e)}
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
                            onView(inq);
                          }}
                          className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Eye className="w-4 h-4 text-gray-400" />
                          View Details
                        </button>

                        {/* Contacted */}
                        {inq.status === "pending" && onContacted && (
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              onContacted(inq._id);
                            }}
                            className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <PhoneCall className="w-4 h-4 text-gray-400" />
                            Mark Contacted
                          </button>
                        )}

                        {/* Close Request */}
                        {inq.status !== "closed" && onCloseRequest && (
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              onCloseRequest(inq._id);
                            }}
                            className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <CheckCircle className="w-4 h-4 text-gray-400" />
                            Close Request
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
