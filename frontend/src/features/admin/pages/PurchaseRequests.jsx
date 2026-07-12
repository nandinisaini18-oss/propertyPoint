import React, { useState, useEffect, useMemo } from "react";
import { X, Calendar, Mail, Phone, MessageSquare } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import PurchaseRequestTable from "../components/PurchaseRequestTable";
import ConfirmationModal from "../components/ConfirmationModal";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";
import useAdmin from "../hook/useAdmin";

const STATUS_OPTIONS = [
  { label: "Pending", value: "pending" },
  { label: "Contacted", value: "contacted" },
  { label: "Closed", value: "closed" },
];

export default function PurchaseRequests() {
  const {
    inquiries,
    handleGetAllInquiries,
    handleUpdateInquiryStatus,
  } = useAdmin();

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Selected Detail Modal State
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // Confirmation modal state
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: "", // "contacted" or "closed"
    inquiryId: null,
  });

  useEffect(() => {
    async function loadInquiries() {
      setLoading(true);
      await handleGetAllInquiries();
      setLoading(false);
    }
    loadInquiries();
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  // Filter inquiries
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !search ||
        inq.buyer.toLowerCase().includes(q) ||
        inq.seller.toLowerCase().includes(q) ||
        inq.property.toLowerCase().includes(q);
      const matchesStatus = !statusFilter || inq.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [inquiries, search, statusFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);
  const paginatedInquiries = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredInquiries.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredInquiries, currentPage, itemsPerPage]);

  const triggerContacted = (id) => {
    setConfirmModal({
      isOpen: true,
      type: "contacted",
      inquiryId: id,
    });
  };

  const triggerClose = (id) => {
    setConfirmModal({
      isOpen: true,
      type: "closed",
      inquiryId: id,
    });
  };

  const handleConfirmAction = async () => {
    const { type, inquiryId } = confirmModal;
    if (!inquiryId) return;

    setLoading(true);
    await handleUpdateInquiryStatus(inquiryId, type);
    setLoading(false);
    setConfirmModal({ isOpen: false, type: "", inquiryId: null });
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left animate-in fade-in duration-300">
        
        {/* Header Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Purchase Requests
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track and manage purchase expressions of interest submitted by registered buyers.
          </p>
        </div>

        {/* Filters Row */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row gap-3">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search buyer, seller, property..."
            className="flex-1"
          />
          <FilterDropdown
            label="All Statuses"
            value={statusFilter}
            onChange={setStatusFilter}
            options={STATUS_OPTIONS}
            className="sm:w-44"
          />
        </div>

        {/* Count Indicator */}
        {!loading && (
          <p className="text-sm font-semibold text-gray-500 px-1 leading-none">
            Showing <span className="text-gray-900 font-bold">{filteredInquiries.length}</span> purchase requests
          </p>
        )}

        {/* Table / List View */}
        {loading ? (
          <div className="flex justify-center items-center py-24 bg-white border border-gray-200 rounded-2xl">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xs">
            <EmptyState
              icon={MessageSquare}
              title="No purchase requests"
              description="Try adjusting your filters or search terms."
              action={{
                label: "Clear All Filters",
                onClick: () => {
                  setSearch("");
                  setStatusFilter("");
                },
              }}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <PurchaseRequestTable
              inquiries={paginatedInquiries}
              onView={setSelectedInquiry}
              onContacted={triggerContacted}
              onCloseRequest={triggerClose}
            />

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-2 pt-2 text-xs">
                <p className="text-gray-400 font-medium">
                  Page <span className="font-bold text-gray-850">{currentPage}</span> of{" "}
                  <span className="font-bold text-gray-850">{totalPages}</span>
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((c) => Math.max(c - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3.5 py-2 border border-gray-200 bg-white hover:bg-gray-50 rounded-xl text-gray-700 font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage((c) => Math.min(c + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3.5 py-2 border border-gray-200 bg-white hover:bg-gray-50 rounded-xl text-gray-700 font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* ─── Detail Modal ─── */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/35 backdrop-blur-xs" onClick={() => setSelectedInquiry(null)} />
          <div className="relative bg-white border border-gray-200 rounded-2xl shadow-xl w-full max-w-md z-10 overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Purchase Request Details
              </h3>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5 text-left text-sm">
              
              {/* Status & Date */}
              <div className="flex items-center justify-between">
                <StatusBadge status={selectedInquiry.status} />
                <span className="text-xs text-gray-400 font-semibold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {selectedInquiry.date}
                </span>
              </div>

              {/* Property Details */}
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Interested Property</p>
                <p className="font-bold text-gray-800">{selectedInquiry.property}</p>
                <p className="text-xs text-gray-400">Seller: {selectedInquiry.seller}</p>
              </div>

              {/* Message */}
              <div className="space-y-1 bg-gray-50 border border-gray-100 rounded-xl p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Buyer Message</p>
                <p className="text-xs text-gray-600 leading-relaxed italic">
                  "{selectedInquiry.message || "No custom message provided."}"
                </p>
              </div>

              {/* Buyer Contact details */}
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Buyer Contact Information</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center font-bold text-blue-600 text-xs border border-blue-150">
                    {selectedInquiry.buyer.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">{selectedInquiry.buyer}</p>
                    <div className="text-[10px] text-gray-400 space-y-0.5 mt-0.5">
                      <p className="flex items-center gap-1 truncate">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        {selectedInquiry.buyerEmail || `${selectedInquiry.buyer.toLowerCase().replace(/\s+/g, ".")}@example.com`}
                      </p>
                      <p className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        {selectedInquiry.buyerPhone || "+91 91234 56789"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ─── Confirmation Modal ─── */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, type: "", inquiryId: null })}
        onConfirm={handleConfirmAction}
        title={confirmModal.type === "contacted" ? "Mark as Contacted" : "Close Purchase Request"}
        message={
          confirmModal.type === "contacted"
            ? "Are you sure you want to mark this request as Contacted? This indicates that you or the seller have initiated outreach to the buyer."
            : "Are you sure you want to close this purchase request? This will archive the inquiry and mark it as resolved."
        }
        confirmText={confirmModal.type === "contacted" ? "Yes, Mark Contacted" : "Yes, Close Request"}
        cancelText="Cancel"
        isDanger={false}
      />
    </AdminLayout>
  );
}
