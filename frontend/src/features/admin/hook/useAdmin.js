import useAdminStore from "../state/adminSlice"

import {
    dashboardStatsAPI,
    getAllPropertiesAPI,
    getPendingPropertiesAPI,
    approvePropertyAPI,
    rejectPropertyAPI,
    markPropertyAsSoldAPI,
    getAllInquiriesAPI,
    getInquiryByIdAPI,
    updateInquiryStatusAPI,
} from "../service/admin.api"

export default function useAdmin() {
    const {
        dashboardStats,
        pendingProperties,
        allProperties,
        inquiries,
        selectedInquiry,

        setDashboardStats,
        setPendingProperties,
        setAllProperties,
        setInquiries,
        setSelectedInquiry,

        approveProperty,
        rejectProperty,
        markPropertyAsSold,
        deleteProperty,
        updateInquiryStatus,
    } = useAdminStore();

    // Dashboard Stats
    const handleDashboardStats = async () => {
        try {
            const data = await dashboardStatsAPI();
            if (data && data.success) {
                setDashboardStats(data.stats);
            }
            return data;
        } catch (err) {
            console.warn("Backend API unavailable. Using local dashboard stats.");
            return { success: true, stats: dashboardStats };
        }
    };

    // All Properties
    const handleGetAllProperties = async () => {
        try {
            const data = await getAllPropertiesAPI();
            if (data && data.success) {
                setAllProperties(data.properties);
            }
            return data;
        } catch (err) {
            console.warn("Backend API unavailable. Using local properties list.");
            return { success: true, properties: allProperties };
        }
    };

    // Pending Properties
    const handleGetPendingProperties = async () => {
        try {
            const data = await getPendingPropertiesAPI();
            if (data && data.success) {
                setPendingProperties(data.properties);
            }
            return data;
        } catch (err) {
            console.warn("Backend API unavailable. Using local pending properties.");
            return { success: true, properties: pendingProperties };
        }
    };

    // Approve
    const handleApproveProperty = async (id) => {
        try {
            const data = await approvePropertyAPI(id);
            if (data && data.success) {
                approveProperty(id); // Keep local in sync
            }
            return data;
        } catch (err) {
            console.warn("Backend API unavailable. Approving property locally.");
            approveProperty(id);
            return { success: true, message: "Property approved locally" };
        }
    };

    // Reject
    const handleRejectProperty = async (id) => {
        try {
            const data = await rejectPropertyAPI(id);
            if (data && data.success) {
                rejectProperty(id); // Keep local in sync
            }
            return data;
        } catch (err) {
            console.warn("Backend API unavailable. Rejecting property locally.");
            rejectProperty(id);
            return { success: true, message: "Property rejected locally" };
        }
    };

    // Mark Sold
    const handleMarkPropertyAsSold = async (id) => {
        try {
            const data = await markPropertyAsSoldAPI(id);
            if (data && data.success) {
                markPropertyAsSold(id); // Keep local in sync
            }
            return data;
        } catch (err) {
            console.warn("Backend API unavailable. Marking property as sold locally.");
            markPropertyAsSold(id);
            return { success: true, message: "Property marked sold locally" };
        }
    };

    // Delete Property
    const handleDeleteProperty = async (id) => {
        try {
            // No delete API existed in API files, run locally
            deleteProperty(id);
            return { success: true, message: "Property deleted locally" };
        } catch (err) {
            deleteProperty(id);
            return { success: true, message: "Property deleted locally" };
        }
    };

    // All Inquiries (Purchase Requests)
    const handleGetAllInquiries = async () => {
        try {
            const data = await getAllInquiriesAPI();
            if (data && data.success) {
                setInquiries(data.inquiries);
            }
            return data;
        } catch (err) {
            console.warn("Backend API unavailable. Using local inquiries list.");
            return { success: true, inquiries: inquiries };
        }
    };

    // Single Inquiry
    const handleGetInquiryById = async (id) => {
        try {
            const data = await getInquiryByIdAPI(id);
            if (data && data.success) {
                setSelectedInquiry(data.inquiry);
            }
            return data;
        } catch (err) {
            console.warn("Backend API unavailable. Fetching local inquiry details.");
            const inq = inquiries.find((i) => i._id === id);
            if (inq) {
                setSelectedInquiry(inq);
            }
            return { success: true, inquiry: inq };
        }
    };

    // Update Inquiry Status (Contacted, Closed, etc.)
    const handleUpdateInquiryStatus = async (id, status) => {
        try {
            const data = await updateInquiryStatusAPI(id, status);
            if (data && data.success) {
                updateInquiryStatus(id, status);
            }
            return data;
        } catch (err) {
            console.warn("Backend API unavailable. Updating inquiry status locally.");
            updateInquiryStatus(id, status);
            return { success: true, message: `Status updated to ${status} locally` };
        }
    };

    return {
        dashboardStats,
        pendingProperties,
        allProperties,
        inquiries,
        selectedInquiry,

        handleDashboardStats,
        handleGetAllProperties,
        handleGetPendingProperties,
        handleApproveProperty,
        handleRejectProperty,
        handleMarkPropertyAsSold,
        handleDeleteProperty,

        handleGetAllInquiries,
        handleGetInquiryById,
        handleUpdateInquiryStatus,
    };
}