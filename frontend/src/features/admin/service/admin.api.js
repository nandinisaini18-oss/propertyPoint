import axios from "axios";

const adminAPI = axios.create({
    baseURL: "http://localhost:5000/api/admin",
    withCredentials: true,
});

export const getPendingPropertiesAPI = async () => {
    const { data } = await adminAPI.get("/properties/pending");
    return data;
};

export const approvePropertyAPI = async (id) => {
    const { data } = await adminAPI.patch(`/properties/${id}/approve`);
    return data;
};

export const rejectPropertyAPI = async (id) => {
    const { data } = await adminAPI.patch(`/properties/${id}/reject`);
    return data;
};

export const getAllInquiriesAPI = async () => {
    const { data } = await adminAPI.get("/inquiries");
    return data;
};

export const updateInquiryStatusAPI = async (id, status) => {
    const { data } = await adminAPI.patch(`/inquiries/${id}`, {
        status,
    });

    return data;
};