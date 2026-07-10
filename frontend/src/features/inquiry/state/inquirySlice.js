import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    inquiries: [],
    loading: false,
};

const inquirySlice = createSlice({
    name: "inquiry",

    initialState,

    reducers: {

        setLoading(state, action) {
            state.loading = action.payload;
        },

        setInquiries(state, action) {
            state.inquiries = action.payload;
        },

    },
});

export const {
    setLoading,
    setInquiries,
} = inquirySlice.actions;

export default inquirySlice.reducer;