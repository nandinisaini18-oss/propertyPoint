import React, { useState, useEffect } from "react";
import { Building2, Clock, CheckCircle2, ChevronRight, User,
  X,
  Mail,
  Phone } from "lucide-react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import PropertyCard from "../components/PropertyCard";
import { StatCardSkeleton, CardSkeleton } from "../components/LoadingSkeleton";
import useAdmin from "../hook/useAdmin";

export default function Dashboard() {
  const {
    dashboardStats,
    pendingProperties,
    inquiries,
    handleDashboardStats,
    handleGetAllProperties,
    handleGetPendingProperties,
  } = useAdmin();

  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);
      try {
        await Promise.all([
          handleDashboardStats(),
          handleGetAllProperties(),
          handleGetPendingProperties(),
        ]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8 text-left animate-in fade-in duration-300">
        
        {/* Header Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time analytics and activity summary for 360Views.
          </p>
        </div>

        {/* ─── Statistics Cards ───
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
            : statsConfig.map((card, i) => (
                <StatCard key={card.title} {...card} delay={i * 75} />
              ))}
        </div> */}

        {/* ─── Dashboard Sections Grid ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Recently Submitted Properties (2/3 width) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  Recently Submitted Properties
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">Properties awaiting admin validation</p>
              </div>
              <Link
                to="/admin/pending"
                className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Review Requests
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {Array.from({ length: 2 }).map((_, i) => <CardSkeleton key={i} />)}
              </div>
            ) : pendingProperties.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl">
                <EmptyState
                  icon={Building2}
                  title="All caught up!"
                  description="No properties are currently awaiting approval."
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {pendingProperties.slice(0, 2).map((prop) => (
                  <PropertyCard
                    key={prop._id}
                    property={prop}
                    onView={setSelectedProperty}
                    showGallery={false}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* ─── Property Details Modal ─── */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/35 backdrop-blur-xs" onClick={() => setSelectedProperty(null)} />
          <div className="relative bg-white border border-gray-200 rounded-2xl shadow-xl w-full max-w-lg z-10 overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Property Submissions Detail
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
                  src={
                    selectedProperty.propertyImages?.[0] ||
                    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80"
                  }
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
                  <span className="text-base font-extrabold text-gray-950">₹ {selectedProperty.price?.toLocaleString("en-IN")}</span>
                  <StatusBadge status={selectedProperty.approvalStatus || selectedProperty.status} />
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
                    {selectedProperty.seller?.fullname?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">{selectedProperty.seller?.fullname}</p>
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

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Close View
              </button>
            </div>
    </AdminLayout>
  );
}
