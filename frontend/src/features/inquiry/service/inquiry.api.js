import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/inquiries",
    withCredentials: true,
});

// Create Inquiry
export const createInquiryApi = (payload) =>
    API.post("/create", payload);

// Get Logged-in User Inquiries
export const getMyInquiriesApi = () =>
    API.get("/my");

// Delete Inquiry
export const deleteInquiryApi = (id) =>
    API.delete(`/${id}`);