import React, { useState, useEffect, useMemo } from "react";
import { X, Building2, Plus, ArrowLeft, Mail, Phone } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import PropertyTable from "../components/PropertyTable";
import ConfirmationModal from "../components/ConfirmationModal";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";
import useAdmin from "../hook/useAdmin";

const CATEGORIES = ["Villa", "Apartment", "House", "Office", "Commercial"];
const CITIES = ["Bhopal", "Indore", "Delhi", "Mumbai", "Pune", "Bangalore"];
const STATUSES = [
  { label: "For Sale", value: "For Sale" },
  { label: "Sold", value: "Sold" },
];

export default function AdminProperties() {
  const {
    allProperties,
    handleGetAllProperties,
    handleMarkPropertyAsSold,
    handleDeleteProperty,
  } = useAdmin();

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Selected Detail Modal
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Confirmation Modals
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: "", // "sold" or "delete"
    propertyId: null,
  });

  useEffect(() => {
    async function loadProperties() {
      setLoading(true);
      await handleGetAllProperties();
      setLoading(false);
    }
    loadProperties();
  }, []);

  // Filtering Logic
  const filteredProperties = useMemo(() => {
    return allProperties.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.seller?.fullname?.toLowerCase().includes(search.toLowerCase()) ||
        p._id.includes(search);
      const matchesCategory = !category || p.category === category;
      const matchesCity = !city || p.city === city;
      const matchesStatus = !status || p.status === status;

      return matchesSearch && matchesCategory && matchesCity && matchesStatus;
    });
  }, [allProperties, search, category, city, status]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProperties.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProperties, currentPage, itemsPerPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, city, status]);

  // Trigger Confirmation Modals
  const triggerMarkSold = (id) => {
    setConfirmModal({
      isOpen: true,
      type: "sold",
      propertyId: id,
    });
  };

  const triggerDelete = (id) => {
    setConfirmModal({
      isOpen: true,
      type: "delete",
      propertyId: id,
    });
  };

  // Perform Actions
  const handleConfirmAction = async () => {
    const { type, propertyId } = confirmModal;
    if (!propertyId) return;

    setLoading(true);
    if (type === "sold") {
      await handleMarkPropertyAsSold(propertyId);
    } else if (type === "delete") {
      await handleDeleteProperty(propertyId);
    }
    setLoading(false);
    setConfirmModal({ isOpen: false, type: "", propertyId: null });
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left animate-in fade-in duration-300">
        
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Properties Management
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Browse, filter, mark as sold, and delete platform properties listings.
            </p>
          </div>
        </div>

        {/* ─── Filters Row ─── */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col md:flex-row gap-3">
          {/* <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search title, seller, ID..."
            className="flex-1"
          /> */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <FilterDropdown
              label="All Categories"
              value={category}
              onChange={setCategory}
              options={CATEGORIES}
              className="w-full sm:w-44"
            />
            <FilterDropdown
              label="All Cities"
              value={city}
              onChange={setCity}
              options={CITIES}
              className="w-full sm:w-40"
            />
            <FilterDropdown
              label="All Statuses"
              value={status}
              onChange={setStatus}
              options={STATUSES}
              className="w-full sm:w-40"
            />
          </div>
        </div>

        {/* Count Indicator */}
        {!loading && (
          <p className="text-sm font-semibold text-gray-500 px-1 leading-none">
            Showing <span className="text-gray-900 font-bold">{filteredProperties.length}</span> listed properties
          </p>
        )}

        {/* ─── Table Section ─── */}
        {loading ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center space-y-4 shadow-xs">
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
            </div>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xs">
            <EmptyState
              icon={Building2}
              title="No properties found"
              description="Try adjusting your filters or search terms."
              action={{
                label: "Clear All Filters",
                onClick: () => {
                  setSearch("");
                  setCategory("");
                  setCity("");
                  setStatus("");
                },
              }}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <PropertyTable
              properties={paginatedProperties}
              onView={setSelectedProperty}
              onMarkSold={triggerMarkSold}
              onDelete={triggerDelete}
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

      {/* ─── Property details modal ─── */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/35 backdrop-blur-xs" onClick={() => setSelectedProperty(null)} />
          <div className="relative bg-white border border-gray-200 rounded-2xl shadow-xl w-full max-w-lg z-10 overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Property Details Info
              </h3>
              <button
                onClick={() => setSelectedProperty(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto p-6 space-y-5 text-left">
              {/* Image */}
              <div className="h-48 rounded-xl overflow-hidden bg-gray-50 border border-gray-150">
                <img
                  src={selectedProperty.propertyImages?.[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"}
                  alt={selectedProperty.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Price */}
              <div className="space-y-1">
                <h2 className="text-base font-bold text-gray-900" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  {selectedProperty.title}
                </h2>
                <div className="flex items-center gap-3">
                  <span className="text-base font-extrabold text-gray-950">{selectedProperty.price.toLocaleString("en-IN")}</span>
                  <StatusBadge status={selectedProperty.status} />
                </div>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 gap-y-3.5 gap-x-4 bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-semibold text-gray-650">
                <div>
                  <span className="text-gray-400 block font-normal text-[10px] uppercase tracking-wider mb-0.5">Category</span>
                  <span className="text-gray-800 font-bold">{selectedProperty.category}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-normal text-[10px] uppercase tracking-wider mb-0.5">City Location</span>
                  <span className="text-gray-800 font-bold">{selectedProperty.city}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-normal text-[10px] uppercase tracking-wider mb-0.5">Built Area</span>
                  <span className="text-gray-800 font-bold">{selectedProperty.area} sqft</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-normal text-[10px] uppercase tracking-wider mb-0.5">Configurations</span>
                  <span className="text-gray-800 font-bold">{selectedProperty.bedrooms} BHK ({selectedProperty.bathrooms} Bath)</span>
                </div>
              </div>

              {/* Seller details */}
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Seller Contact details</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-700 text-xs border border-gray-200">
                    {selectedProperty.seller?.fullname.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">{selectedProperty.seller}</p>
                    <div className="text-[10px] text-gray-400 space-y-0.5 mt-0.5">
                      <p className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-gray-400" />
                        {selectedProperty.seller?.email}
                      </p>
                      <p className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-gray-400" />
                        {selectedProperty.seller?.contact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedProperty(null)}
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
        onClose={() => setConfirmModal({ isOpen: false, type: "", propertyId: null })}
        onConfirm={handleConfirmAction}
        title={confirmModal.type === "sold" ? "Mark Property as Sold" : "Delete Property Listing"}
        message={
          confirmModal.type === "sold"
            ? "Are you sure you want to mark this property as Sold? This will update the availability status on the frontend platform."
            : "Warning: Are you sure you want to delete this listing? This action is permanent and cannot be undone."
        }
        confirmText={confirmModal.type === "sold" ? "Yes, Mark Sold" : "Yes, Delete"}
        cancelText="Cancel"
        isDanger={confirmModal.type === "delete"}
      />
    </AdminLayout>
  );
}
