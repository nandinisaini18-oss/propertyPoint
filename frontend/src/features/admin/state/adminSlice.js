import { create } from "zustand";

const useAdminStore = create((set) => ({
  allProperties: [],
  pendingProperties: [],

  dashboardStats: {
    totalProperties: 0,
    pendingApproval: 0,
    soldProperties: 0,
    totalInquiries: 0,
  },

  // setters
  setAllProperties: (properties) =>
    set({
      allProperties: properties,
    }),

  setPendingProperties: (properties) =>
    set({
      pendingProperties: properties,
    }),

  setDashboardStats: (stats) =>
    set({
      dashboardStats: stats,
    }),

  // update property locally after API
  markPropertyAsSold: (id) =>
    set((state) => ({
      allProperties: state.allProperties.map((property) =>
        property._id === id
          ? { ...property, status: "Sold" }
          : property
      ),
    })),

  deleteProperty: (id) =>
    set((state) => ({
      allProperties: state.allProperties.filter(
        (property) => property._id !== id
      ),
    })),

  approveProperty: (id) =>
    set((state) => ({
      pendingProperties: state.pendingProperties.filter(
        (property) => property._id !== id
      ),
    })),

  rejectProperty: (id) =>
    set((state) => ({
      pendingProperties: state.pendingProperties.filter(
        (property) => property._id !== id
      ),
    })),
}));

export default useAdminStore;