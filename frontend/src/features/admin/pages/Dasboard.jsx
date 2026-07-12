import React, { useState, useEffect } from "react";
import { Building2, Clock, CheckCircle2, MessageSquare, ArrowUpRight, ChevronRight, X, Calendar, User, Mail, Phone } from "lucide-react";
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
    handleGetAllInquiries,
  } = useAdmin();

  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);
      try {
        await Promise.all([
          handleDashboardStats(),
          handleGetAllProperties(),
          handleGetPendingProperties(),
          handleGetAllInquiries(),
        ]);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  const statsConfig = [
    {
      title: "Total Properties",
      value: dashboardStats.totalProperties || 0,
      icon: Building2,
      change: "Active in system",
    },
    {
      title: "Pending Properties",
      value: dashboardStats.pendingApproval || 0,
      icon: Clock,
      change: "Awaiting approval",
    },
    {
      title: "Sold Properties",
      value: dashboardStats.soldProperties || 0,
      icon: CheckCircle2,
      change: "Marked as sold",
    },
    {
      title: "Purchase Requests",
      value: dashboardStats.totalInquiries || 0,
      icon: MessageSquare,
      change: "Buyer inquiries",
    },
  ];

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

        {/* ─── Statistics Cards ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
            : statsConfig.map((card, i) => (
                <StatCard key={card.title} {...card} delay={i * 75} />
              ))}
        </div>

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

          {/* Right: Recent Purchase Requests (1/3 width) */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  Recent Purchase Requests
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">Latest buyer expressions of interest</p>
              </div>
              <Link
                to="/admin/purchase-requests"
                className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                View All
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4.5">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 animate-pulse space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="h-4 bg-gray-200 rounded-md w-1/3" />
                      <div className="h-3 bg-gray-200 rounded-md w-1/4" />
                    </div>
                    <div className="h-3.5 bg-gray-200 rounded-md w-3/4" />
                    <div className="h-3 bg-gray-200 rounded-md w-1/2" />
                  </div>
                ))
              ) : inquiries.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-2xl">
                  <EmptyState
                    icon={MessageSquare}
                    title="No requests yet"
                    description="Buyer purchase requests will show up here."
                  />
                </div>
              ) : (
                inquiries.slice(0, 3).map((inq) => (
                  <div
                    key={inq._id}
                    className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-sm transition-all duration-200 flex flex-col gap-3.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gray-150 flex items-center justify-center text-xs font-bold text-gray-700">
                          {inq.buyer.charAt(0)}
                        </div>
                        <span className="text-xs font-bold text-gray-900 truncate max-w-[120px]">{inq.buyer}</span>
                      </div>
                      <StatusBadge status={inq.status} />
                    </div>

                    <div className="text-left space-y-1">
                      <p className="text-xs text-gray-400 leading-none">Property Interested</p>
                      <p className="text-xs font-bold text-gray-800 line-clamp-1 leading-snug">{inq.property}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2.5 border-t border-gray-100 mt-0.5">
                      <span className="text-[10px] text-gray-400 font-semibold">{inq.date}</span>
                      <button
                        onClick={() => setSelectedInquiry(inq)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        View details
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
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
                  src={selectedProperty.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"}
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
                  <span className="text-base font-extrabold text-gray-950">{selectedProperty.price}</span>
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
                    {selectedProperty.seller?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">{selectedProperty.seller}</p>
                    <div className="text-[10px] text-gray-400 space-y-0.5 mt-0.5">
                      <p className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-gray-400" />
                        {selectedProperty.sellerEmail}
                      </p>
                      <p className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-gray-400" />
                        {selectedProperty.sellerPhone}
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

      {/* ─── Purchase Request Details Modal ─── */}
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
                      <p className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-gray-400" />
                        {selectedInquiry.buyerEmail || `${selectedInquiry.buyer.toLowerCase().replace(/\s+/g, ".")}@example.com`}
                      </p>
                      <p className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-gray-400" />
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
    </AdminLayout>
  );
}
