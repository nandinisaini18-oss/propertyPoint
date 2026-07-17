import React, { useState, useEffect, useMemo } from "react";
import { X, ClipboardList, Bed, Bath, Maximize2, MapPin, Tag, Mail, Phone, Calendar, CheckSquare, Trash } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import PropertyCard from "../components/PropertyCard";
import ConfirmationModal from "../components/ConfirmationModal";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";
import useAdmin from "../hook/useAdmin";

const CATEGORIES = [
  "Apartment",
  "Villa",
  "Independent House",
  "Farm House",
  "Residential Plot",
  "Commercial Plot",
  "Office",
  "Shop",
  "Warehouse",
  "Agricultural Land"
];
const CITIES = ["Bhopal", "Indore", "Delhi", "Mumbai", "Pune", "Bangalore"];

export default function PendingRequests() {
  const {
    pendingProperties,
    handleGetPendingProperties,
    handleApproveProperty,
    handleRejectProperty,
  } = useAdmin();

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");

  // Drawer details state
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Confirmation Modals State
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: "", // "approve" or "reject"
    propertyId: null,
  });
useEffect(() => {
  if (selectedProperty) {
    console.log(selectedProperty);
    console.log(selectedProperty.propertyImages);
  }
}, [selectedProperty]);
  useEffect(() => {
  console.log(pendingProperties.propertyImages);
}, [pendingProperties]);

  useEffect(() => {
    async function loadPending() {
      setLoading(true);
      await handleGetPendingProperties();
      setLoading(false);
    }
    loadPending();
  }, []);

  // Filter pending requests
  const filteredPending = useMemo(() => {
    return pendingProperties.filter((p) => {
      const q = search.toLowerCase();
      const matchesSearch =
  !search ||
  p.title?.toLowerCase().includes(q) ||
  p.seller?.fullname?.toLowerCase().includes(q);
      const matchesCategory = !category || p.category === category;
      const matchesCity = !city || p.city === city;

      return matchesSearch && matchesCategory && matchesCity;
    });
  }, [pendingProperties, search, category, city]);

  const handleOpenDrawer = (property) => {
    setSelectedProperty(property);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      setSelectedProperty(null);
    }, 300); // Allow slide-out animation to complete
  };

  const triggerApprove = (id, e) => {
    if (e) e.stopPropagation();
    setConfirmModal({
      isOpen: true,
      type: "approve",
      propertyId: id,
    });
  };

  const triggerReject = (id, e) => {
    if (e) e.stopPropagation();
    setConfirmModal({
      isOpen: true,
      type: "reject",
      propertyId: id,
    });
  };

  const handleConfirmAction = async () => {
    const { type, propertyId } = confirmModal;
    if (!propertyId) return;

    setLoading(true);
    if (type === "approve") {
      await handleApproveProperty(propertyId);
      await handleGetPendingProperties();
    } else if (type === "reject") {
      await handleRejectProperty(propertyId);
      await handleGetPendingProperties();
    }
    
    // If the active property inside the drawer was approved/rejected, close it
    if (selectedProperty && selectedProperty._id === propertyId) {
      handleCloseDrawer();
    }
    
    setLoading(false);
    setConfirmModal({ isOpen: false, type: "", propertyId: null });
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left animate-in fade-in duration-300 relative overflow-hidden">
        
        {/* Header Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Pending Approval Requests
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review, inspect, approve, or reject new property submissions from sellers.
          </p>
        </div>

        {/* Filters Row */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row gap-3">
          {/* <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search properties or sellers..."
            className="flex-1"
          /> */}
          <FilterDropdown
            label="All Categories"
            value={category}
            onChange={setCategory}
            options={CATEGORIES}
            className="sm:w-44"
          />
          <FilterDropdown
            label="All Cities"
            value={city}
            onChange={setCity}
            options={CITIES}
            className="sm:w-40"
          />
        </div>

        {/* Count Indicator */}
        {!loading && (
          <p className="text-sm font-semibold text-gray-500 px-1 leading-none">
            Showing <span className="text-gray-900 font-bold">{filteredPending.length}</span> pending approvals
          </p>
        )}

        {/* Grid Cards Container */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
          </div>
        ) : filteredPending.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xs">
            <EmptyState
              icon={ClipboardList}
              title="All caught up!"
              description="No properties are currently awaiting administrative review."
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {filteredPending.map((p) => (
              
              <PropertyCard
              
                key={p._id}
                property={p}
                onApprove={(id) => triggerApprove(id)}
                onReject={(id) => triggerReject(id)}
                onView={handleOpenDrawer}
                showGallery={true}
              />
            ))}
          </div>
        )}

        {/* ─── Right-Side slide-over Drawer ─── */}
        {selectedProperty && (
          <>
            {/* Backdrop */}
            <div
              className={`fixed inset-0 bg-black/35 backdrop-blur-xs z-40 transition-opacity duration-300 ${
                isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              onClick={handleCloseDrawer}
            />

            {/* Slide-over Panel */}
            <div
              className={`fixed top-0 right-0 h-full w-full max-w-md bg-white border-l border-gray-200 shadow-2xl z-50 flex flex-col transform transition-transform duration-350 ease-in-out ${
                isDrawerOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {/* Drawer Header */}
              <div className="px-6 py-4.5 border-b border-gray-150 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    Submission Details
                  </h3>
                  <p className="text-[10px] text-gray-400 font-semibold mt-0.5">ID: {selectedProperty._id}</p>
                </div>
                <button
                  onClick={handleCloseDrawer}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body Scroll */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Images Container */}
                <div className="h-52 rounded-xl overflow-hidden bg-gray-50 border border-gray-150 relative">

                  <img
                    src={selectedProperty.propertyImages?.[0] || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80"}
                    alt={selectedProperty.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <StatusBadge status={selectedProperty.status} />
                  </div>
                </div>

                {/* Title & Price */}
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-gray-900 leading-snug" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    {selectedProperty.title}
                  </h2>
                  <p className="text-xl font-extrabold text-gray-950">{selectedProperty.price?.toLocaleString("en-IN")}</p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-3.5 bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-semibold text-gray-650">
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
                    <span className="text-gray-800 font-bold">
                      {selectedProperty.bedrooms} BHK, {selectedProperty.bathrooms} Bath
                    </span>
                  </div>
                </div>

                {/* Submission Date */}
                <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50/50 border border-gray-100/50 rounded-xl px-4 py-2.5">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Submitted on: <span className="font-bold text-gray-700">{new Date(selectedProperty.createdAt).toLocaleDateString()}</span></span>
                </div>

                {/* Amenities List */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Amenities & Features</p>
                  <div className="flex flex-wrap gap-1.5">
                    {(selectedProperty.amenities || []).map((amenity, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2.5 py-1.5 rounded-lg border border-gray-150"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Seller Detail Card */}
                <div className="border-t border-gray-150 pt-5 space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Seller Details</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-700 text-sm border border-gray-200">
                      {selectedProperty.seller?.fullname?.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">{selectedProperty.seller?.fullname}</p>
                      <div className="text-[10px] text-gray-400 space-y-0.5 mt-0.5">
                        <p className="flex items-center gap-1.5 truncate">
                          <Mail className="w-3.5 h-3.5 text-gray-400" />
                          {selectedProperty.seller?.email}
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          {selectedProperty.seller?.contact}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Drawer Actions Footer (Approve/Reject Sticky Panel) */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-150 flex items-center gap-3">
                <button
                  onClick={() => triggerReject(selectedProperty._id)}
                  className="flex-1 py-2.5 text-xs font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-100 rounded-xl transition-all duration-200 active:scale-[0.98]"
                >
                  Reject Request
                </button>
                <button
                  onClick={() => triggerApprove(selectedProperty._id)}
                  className="flex-1 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow rounded-xl transition-all duration-200 active:scale-[0.98]"
                >
                  Approve Request
                </button>
              </div>

            </div>
          </>
        )}

        {/* ─── Confirmation Modal ─── */}
        <ConfirmationModal
          isOpen={confirmModal.isOpen}
          onClose={() => setConfirmModal({ isOpen: false, type: "", propertyId: null })}
          onConfirm={handleConfirmAction}
          title={confirmModal.type === "approve" ? "Approve Property Submission" : "Reject Property Submission"}
          message={
            confirmModal.type === "approve"
              ? "Are you sure you want to approve this property? Once approved, it will be added to the live listings and become visible to platform buyers."
              : "Are you sure you want to reject this property submission? This will remove the listing request from the pending validation queue."
          }
          confirmText={confirmModal.type === "approve" ? "Yes, Approve" : "Yes, Reject"}
          cancelText="Cancel"
          isDanger={confirmModal.type === "reject"}
        />

      </div>
    </AdminLayout>
  );
}
