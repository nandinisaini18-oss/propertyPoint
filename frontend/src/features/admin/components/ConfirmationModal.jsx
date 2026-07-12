import React from "react";
import { AlertTriangle, X } from "lucide-react";

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to perform this action?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDanger = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/35 backdrop-blur-xs animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white border border-gray-200 rounded-2xl shadow-xl w-full max-w-md z-10 overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Header / Title */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {isDanger && (
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
            )}
            <div>
              <h3 className="text-base font-bold text-gray-900 leading-snug" style={{ fontFamily: "'Manrope', sans-serif" }}>
                {title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-150 transition-colors focus:outline-none"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Body */}
        <div className="px-6 pb-6">
          <p className="text-sm text-gray-650 leading-relaxed">
            {message}
          </p>
        </div>

        {/* Actions Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-750 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-all duration-200"
          >
            {cancelText}
          </button>
          
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-xs font-bold text-white rounded-xl transition-all duration-200 active:scale-[0.98] ${
              isDanger
                ? "bg-red-600 hover:bg-red-700 shadow-xs"
                : "bg-blue-600 hover:bg-blue-700 shadow-xs"
            }`}
          >
            {confirmText}
          </button>
        </div>

      </div>
    </div>
  );
}
