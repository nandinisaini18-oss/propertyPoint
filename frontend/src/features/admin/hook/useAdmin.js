import useAdminStore from "./admin.state";

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
} from "./admin.api";

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
    } = useAdminStore();

    // Dashboard
    const handleDashboardStats = async () => {
        try {
            const data = await dashboardStatsAPI();

            if (data.success) {
                setDashboardStats(data.stats);
            }

            return data;
        } catch (err) {
            console.log(err);
        }
    };

    // All Properties
    const handleGetAllProperties = async () => {
        try {
            const data = await getAllPropertiesAPI();

            if (data.success) {
                setAllProperties(data.properties);
            }

            return data;
        } catch (err) {
            console.log(err);
        }
    };

    // Pending Properties
    const handleGetPendingProperties = async () => {
        try {
            const data = await getPendingPropertiesAPI();

            if (data.success) {
                setPendingProperties(data.properties);
            }

            return data;
        } catch (err) {
            console.log(err);
        }
    };

    // Approve
    const handleApproveProperty = async (id) => {
        try {
            const data = await approvePropertyAPI(id);

            if (data.success) {
                await handleGetPendingProperties();
            }

            return data;
        } catch (err) {
            console.log(err);
        }
    };

    // Reject
    const handleRejectProperty = async (id) => {
        try {
            const data = await rejectPropertyAPI(id);

            if (data.success) {
                await handleGetPendingProperties();
            }

            return data;
        } catch (err) {
            console.log(err);
        }
    };

    // Mark Sold
    const handleMarkPropertyAsSold = async (id) => {
        try {
            const data = await markPropertyAsSoldAPI(id);

            if (data.success) {
                await handleGetAllProperties();
            }

            return data;
        } catch (err) {
            console.log(err);
        }
    };

    // All Inquiries
    const handleGetAllInquiries = async () => {
        try {
            const data = await getAllInquiriesAPI();

            if (data.success) {
                setInquiries(data.inquiries);
            }

            return data;
        } catch (err) {
            console.log(err);
        }
    };

    // Single Inquiry
    const handleGetInquiryById = async (id) => {
        try {
            const data = await getInquiryByIdAPI(id);

            if (data.success) {
                setSelectedInquiry(data.inquiry);
            }

            return data;
        } catch (err) {
            console.log(err);
        }
    };

    // Update Inquiry
    const handleUpdateInquiryStatus = async (id, status) => {
        try {
            const data = await updateInquiryStatusAPI(id, status);

            if (data.success) {
                await handleGetAllInquiries();
            }

            return data;
        } catch (err) {
            console.log(err);
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

        handleGetAllInquiries,
        handleGetInquiryById,
        handleUpdateInquiryStatus,
    };
}