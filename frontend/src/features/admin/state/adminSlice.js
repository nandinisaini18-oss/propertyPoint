import { create } from "zustand";

const useAdminStore = create((set) => ({
    dashboardStats: {},

    pendingProperties: [],
    allProperties: [],

    inquiries: [],
    selectedInquiry: null,

    setDashboardStats: (dashboardStats) =>
        set({ dashboardStats }),

    setPendingProperties: (pendingProperties) =>
        set({ pendingProperties }),

    setAllProperties: (allProperties) =>
        set({ allProperties }),

    setInquiries: (inquiries) =>
        set({ inquiries }),

    setSelectedInquiry: (selectedInquiry) =>
        set({ selectedInquiry }),
}));

export default useAdminStore;