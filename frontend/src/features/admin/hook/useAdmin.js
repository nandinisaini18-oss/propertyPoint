import useAdminStore from "./admin.state";

import {
    getPendingPropertiesAPI,
    approvePropertyAPI,
    rejectPropertyAPI,
    getAllInquiriesAPI,
    updateInquiryStatusAPI,
} from "./admin.api";

export default function useAdmin() {

    const {
        pendingProperties,
        inquiries,
        setPendingProperties,
        setInquiries,
    } = useAdminStore();

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
        pendingProperties,
        inquiries,

        handleGetPendingProperties,
        handleApproveProperty,
        handleRejectProperty,
        handleGetAllInquiries,
        handleUpdateInquiryStatus,
    };
}