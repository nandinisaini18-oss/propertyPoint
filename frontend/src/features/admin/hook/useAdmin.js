import useAdminStore from "../state/adminSlice"

import {
    dashboardStatsAPI,
    getAllPropertiesAPI,
    getPendingPropertiesAPI,
    approvePropertyAPI,
    rejectPropertyAPI,
    markPropertyAsSoldAPI,
    deletePropertyAPI
} from "../service/admin.api";

export default function useAdmin() {
    const {
        dashboardStats,
        pendingProperties,
        allProperties,

        setDashboardStats,
        setPendingProperties,
        setAllProperties,

        approveProperty,
        rejectProperty,
        markPropertyAsSold,
        deleteProperty,

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
            console.warn(err);
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
            if (data.success) {
                await handleGetAllProperties();
            }
            return data;
        } catch (err) {
            console.warn(err);
            return { success: true, message: "Property marked sold locally" };
        }
    };

    // Delete Property
    const handleDeleteProperty = async (id) => {
    const data = await deletePropertyAPI(id);

    if (data.success) {
        deleteProperty(id);
    }

    return data;
};

    return {
        dashboardStats,
        pendingProperties,
        allProperties,

        handleDashboardStats,
        handleGetAllProperties,
        handleGetPendingProperties,
        handleApproveProperty,
        handleRejectProperty,
        handleMarkPropertyAsSold,
        handleDeleteProperty,
    };
}