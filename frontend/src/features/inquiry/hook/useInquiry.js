import { useDispatch } from "react-redux";

import {
    setLoading,
    setInquiries,
} from "../features/inquiry/inquirySlice";

import {
    createInquiryApi,
    getMyInquiriesApi,
    deleteInquiryApi,
} from "../api/inquiry.api";

export default function useInquiry() {

    const dispatch = useDispatch();

    const handleCreateInquiry = async (payload) => {

        try {

            dispatch(setLoading(true));

            const { data } = await createInquiryApi(payload);

            return data;

        } catch (err) {

            throw err.response?.data || err;

        } finally {

            dispatch(setLoading(false));

        }

    };

    const handleGetMyInquiries = async () => {

        try {

            dispatch(setLoading(true));

            const { data } = await getMyInquiriesApi();

            dispatch(setInquiries(data.inquiries));

        } catch (err) {

            console.log(err);

        } finally {

            dispatch(setLoading(false));

        }

    };

    const handleDeleteInquiry = async (id) => {

        try {

            dispatch(setLoading(true));

            const { data } = await deleteInquiryApi(id);

            return data;

        } catch (err) {

            throw err.response?.data || err;

        } finally {

            dispatch(setLoading(false));

        }

    };

    return {
        handleCreateInquiry,
        handleGetMyInquiries,
        handleDeleteInquiry,
    };
}