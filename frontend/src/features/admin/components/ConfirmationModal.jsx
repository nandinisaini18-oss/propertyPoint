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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-start justify-between px-8 pt-8">

          <div className="flex gap-4">

            {isDanger && (
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            )}

            <div>
              <h2 className="text-xl font-bold text-stone-900">
                {title}
              </h2>

              <p className="mt-3 text-sm leading-7 text-stone-500">
                {message}
              </p>
            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end gap-3 border-t border-stone-200 bg-stone-50 px-8 py-6">

          <button
            onClick={onClose}
            className="rounded-xl border border-stone-300 bg-white px-5 py-2.5 font-medium text-stone-700 transition hover:bg-stone-100"
          >
            {cancelText}
          </button>

          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`rounded-xl px-5 py-2.5 font-semibold text-white transition ${
              isDanger
                ? "bg-red-600 hover:bg-red-700"
                : "bg-stone-900 hover:bg-stone-800"
            }`}
          >
            {confirmText}
          </button>

        </div>
      </div>
    </div>
  );
}