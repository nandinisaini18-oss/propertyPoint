import { create } from "zustand";

const useAdminStore = create((set) => ({
    pendingProperties: [],
    inquiries: [],

    setPendingProperties: (pendingProperties) =>
        set({ pendingProperties }),

    setInquiries: (inquiries) =>
        set({ inquiries }),
}));

export default useAdminStore;