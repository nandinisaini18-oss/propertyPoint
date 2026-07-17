import React, { useState, useEffect } from "react";
import { Building2, ChevronRight, User, Clock, CheckCircle2 , 
  X,
  Mail,
  Phone } from "lucide-react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import PropertyCard from "../components/PropertyCard";

import { CardSkeleton , StatCardSkeleton} from "../components/LoadingSkeleton";
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

  const statsConfig = [
  {
    title: "Total Properties",
    value: dashboardStats?.totalProperties || 0,
    icon: Building2,
  },
  {
    title: "Pending",
    value: dashboardStats?.pendingProperties || 0,
    icon: Clock,
  },
  {
    title: "Approved",
    value: dashboardStats?.approvedProperties || 0,
    icon: CheckCircle2,
  },
  {
    title: "Users",
    value: dashboardStats?.totalUsers || 0,
    icon: User,
  },
];


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
      <div className="space-y-16 px-2 text-left animate-in fade-in duration-300">
        
        {/* Header Title */}
        <div className="flex items-centre justify-centre pb-6 gap-8 ">
    <div>
        {/* <p className="uppercase tracking-[4px] text-xs text-stone-500 font-semibold">
            Admin Panel
        </p>

        <h1 className="text-4xl font-bold text-stone-900 mt-2">
            Dashboard
        </h1> */}

        {/* <p className="text-black-500 mt-2 mb-2">
            Review new property submissions and monitor platform activity.
        </p> */}
    </div>

    <div className="hidden lg:block">
        {/* <div className="bg-white rounded-3xl border border-stone-200 px-8 py-5">
            <p className="text-xs uppercase tracking-widest text-stone-500">
                Pending
            </p>

            <h2 className="text-4xl font-bold mt-1">
                {pendingProperties.length}
            </h2>
        </div> */}
    </div>
</div>

        {/* ─── Statistics Cards ─── */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7 mt-2">
    {loading
        ? Array.from({ length: 4 }).map((_, i) => (
            <StatCardSkeleton key={i} />
        ))
        : statsConfig.map((card, i) => (
            <StatCard
                key={card.title}
                {...card}
                delay={i * 70}
            />
        ))}
</div> */}


{/* <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm">
    <h3 className="text-lg font-bold">
        Recent Activity
    </h3>

    <div className="mt-8 space-y-8">

        <div className="flex gap-3">
            <div className="w-2 h-2 rounded-full bg-gray-900 mt-2"></div>

            <div>
                <p className="font-medium">
                    New property submitted
                </p>

                <p className="text-sm text-gray-500">
                    10 minutes ago
                </p>
            </div>
        </div>

        <div className="flex gap-3">
            <div className="w-2 h-2 rounded-full bg-gray-400 mt-2"></div>

            <div>
                <p className="font-medium">
                    Property approved
                </p>

                <p className="text-sm text-gray-500">
                    45 minutes ago
                </p>
            </div>
        </div>

        <div className="flex gap-3">
            <div className="w-2 h-2 rounded-full bg-gray-300 mt-2"></div>

            <div>
                <p className="font-medium">
                    New user registered
                </p>

                <p className="text-sm text-gray-500">
                    Today
                </p>
            </div>
        </div>

    </div>
</div>

<div className="bg-white border border-gray-200 rounded-2xl p-6">

    <div className="flex justify-between items-center">

        <div>

            <h3 className="text-lg font-bold">
                Platform Overview
            </h3>

            <p className="text-sm text-gray-500 mt-1">
                Current marketplace summary
            </p>

        </div>

    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-6">

        <div>
            <p className="text-sm text-gray-500">
                Total Listings
            </p>

            <p className="text-3xl font-bold mt-2">
                {dashboardStats.totalProperties}
            </p>
        </div>

        <div>
            <p className="text-sm text-gray-500">
                Pending
            </p>

            <p className="text-3xl font-bold mt-2">
                {dashboardStats.pendingProperties}
            </p>
        </div>

        <div>
            <p className="text-sm text-gray-500">
                Approved
            </p>

            <p className="text-3xl font-bold mt-2">
                {dashboardStats.approvedProperties}
            </p>
        </div>

        <div>
            <p className="text-sm text-gray-500">
                Users
            </p>

            <p className="text-3xl font-bold mt-2">
                {dashboardStats.totalUsers}
            </p>
        </div>

    </div>

</div> */}
{/* 
<div className="bg-white border border-gray-200 rounded-2xl p-6">

    <h3 className="text-lg font-bold">
        Recently Joined Users
    </h3>

    <div className="mt-5 divide-y divide-gray-100">

        {recentUsers.map(user => (

            <div
                key={user._id}
                className="flex justify-between items-center py-4"
            >

                <div>

                    <p className="font-semibold">
                        {user.fullname}
                    </p>

                    <p className="text-sm text-gray-500">
                        {user.email}
                    </p>

                </div>

                <span className="text-xs text-gray-400">
                    Today
                </span>

            </div>

        ))}

    </div>

</div> */}

{/* <div className="bg-gray-900 text-white rounded-2xl p-6">

    <h2 className="text-2xl font-bold">

        {pendingProperties.length} Properties waiting for review

    </h2>

    <p className="text-gray-300 mt-2">
        Review them to keep listings up to date.
    </p>

    <Link
        to="/admin/pending"
        className="inline-flex mt-5 px-5 py-3 bg-white text-gray-900 rounded-xl font-semibold"
    >
        Review Now
    </Link>

</div> */}

        {/* ─── Dashboard Sections Grid ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Latest Property Submissions (2/3 width) */}
          <div className="col-span-full space-y-10">
            <div className="flex items-center justify-between">
              <div>
                <br />
                <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  Latest Property Submissions
                </h2>
                {/* <p className="text-xs text-gray-400 mt-0.5">Properties awaiting admin validation</p> */}
              </div>
              <Link
                to="/admin/pending"
                className="
                rounded-sm
                
                border-stone-300
                px-20
                py-20
                text-sm
                font-medium
                hover:bg-stone-100
                transition
"
              >
                Review Requests <ChevronRight className="w-3 h-4" />
              </Link>
            </div>
            <br />
            {loading ? (
              <div className="grid grid-cols-3 sm:grid-cols-2 gap-8">
                {Array.from({ length: 2 }).map((_, i) => <CardSkeleton key={i} />)}
              </div>
            ) : pendingProperties.length === 0 ? (
              <div className="
bg-white
rounded-3xl
border
border-stone-200
p-10
">
                <EmptyState
                  icon={Building2}
                  title="All caught up!"
                  description="No properties are currently awaiting approval."
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {pendingProperties.slice(0, 5).map((prop) => (
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
          <div className="relative bg-white border border-gray-200 rounded-3xl shadow-xl w-full max-w-lg z-10 overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
            
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
            <div className="overflow-y-auto p-8 space-y-5 text-left">
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
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </AdminLayout>
  );
}
