import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Search,
  Bell,
  Menu,
  X,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  Building2,
  ClipboardList,
  MessageSquare,
} from "lucide-react";
import useAdminStore from "../state/adminSlice";

// Navigation Items
const NAV_ITEMS = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Properties", path: "/admin/properties", icon: Building2 },
  { label: "Pending Requests", path: "/admin/pending", icon: ClipboardList },
  { label: "Purchase Requests", path: "/admin/purchase-requests", icon: MessageSquare },
];

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { pendingProperties, inquiries } = useAdminStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    // Perform any logout cleanup here if needed
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ─── Sticky Header ─── */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 gap-4">
            
            {/* Left: Logo & Brand */}
            <div className="flex items-center gap-3">
              {/* Mobile hamburger menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/admin/dashboard")}>
                <div className="w-9 h-9 bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <div className="hidden sm:block">
                  <p className="font-bold text-gray-900 text-base leading-none tracking-tight">
                    360Views
                  </p>
                  <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest leading-none">
                    Admin Panel
                  </span>
                </div>
              </div>
            </div>

            {/* Center: Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-md relative items-center">
              <Search className="absolute left-3.5 w-4.5 h-4.5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search properties, sellers, buyers..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl
                  text-gray-800 placeholder-gray-400 focus:bg-white
                  focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            {/* Right: Notifications & Profile */}
            <div className="flex items-center gap-2.5">
              
              {/* Notifications Dropdown */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="relative p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                >
                  <Bell className="w-5 h-5" strokeWidth={1.8} />
                  {pendingProperties.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-[10px] font-bold text-white rounded-full flex items-center justify-center ring-2 ring-white">
                      {pendingProperties.length}
                    </span>
                  )}
                </button>

                {notifOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-900">Notifications</p>
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                        {pendingProperties.length} Pending
                      </span>
                    </div>
                    <div className="max-h-64 overflow-y-auto divide-y divide-gray-50">
                      {pendingProperties.length === 0 && inquiries.length === 0 ? (
                        <div className="px-4 py-8 text-center text-xs text-gray-400">
                          No new notifications
                        </div>
                      ) : (
                        <>
                          {pendingProperties.slice(0, 3).map((p) => (
                            <div
                              key={p._id}
                              onClick={() => {
                                setNotifOpen(false);
                                navigate("/admin/pending");
                              }}
                              className="px-4 py-3 flex gap-3 hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                              <div className="min-w-0">
                                <p className="text-xs text-gray-700 font-medium">
                                  New submission pending review:
                                </p>
                                <p className="text-xs text-gray-900 truncate font-semibold mt-0.5">{p.title}</p>
                                <p className="text-[10px] text-gray-400 mt-0.5">{p.date}</p>
                              </div>
                            </div>
                          ))}
                          {inquiries.slice(0, 2).map((inq) => (
                            <div
                              key={inq._id}
                              onClick={() => {
                                setNotifOpen(false);
                                navigate("/admin/purchase-requests");
                              }}
                              className="px-4 py-3 flex gap-3 hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                              <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                              <div className="min-w-0">
                                <p className="text-xs text-gray-700 font-medium">
                                  New purchase request from:
                                </p>
                                <p className="text-xs text-gray-900 truncate font-semibold mt-0.5">{inq.buyer}</p>
                                <p className="text-[10px] text-gray-400 mt-0.5">{inq.date}</p>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-100 bg-gray-50/50 text-center">
                      <button
                        onClick={() => {
                          setNotifOpen(false);
                          navigate("/admin/pending");
                        }}
                        className="text-[11px] font-bold text-gray-700 hover:text-gray-900"
                      >
                        View all pending requests
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="w-px h-6 bg-gray-200" />

              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <div
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 cursor-pointer group p-1.5 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8.5 h-8.5 rounded-full bg-gray-900 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    A
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-xs font-semibold text-gray-900 leading-tight">Admin User</p>
                    <p className="text-[10px] text-gray-400">Super Admin</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={1.8} />
                </div>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/30">
                      <p className="text-xs font-semibold text-gray-900">Admin User</p>
                      <p className="text-[10px] text-gray-400 truncate">admin@360views.in</p>
                    </div>
                    <div className="p-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </header>

      {/* ─── Horizontal Navigation Bar (Desktop) ─── */}
      <nav className="hidden md:block bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-14 gap-2">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                  }`
                }
              >
                <item.icon className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
                {item.label}
              </NavLink>
            ))}
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 ml-auto rounded-xl text-xs font-bold uppercase tracking-wider text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
            >
              <LogOut className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Collapse Drawer ─── */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-4 space-y-4 animate-in slide-in-from-top duration-200 z-20 relative">
          {/* Mobile search bar */}
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search properties, sellers..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none"
            />
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                <item.icon className="w-4.5 h-4.5 text-gray-400" />
                {item.label}
              </NavLink>
            ))}
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut className="w-4.5 h-4.5" />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* ─── Main Content Container ─── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        {children}
      </main>

      {/* ─── Footer ─── */}
      <footer className="bg-white border-t border-gray-200 py-5 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <p>© 2026 360Views Admin Dashboard. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-gray-600">Privacy Policy</span>
            <span className="cursor-pointer hover:text-gray-600">Terms of Service</span>
            <span>v1.2 (Active State Enabled)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
