import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/state/authSlice"
import propertyReducer from "../features/property/propertySlice";
import inquiryReducer from "../features/inquiry/inquirySlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        property: propertyReducer,
        inquiry: inquiryReducer,
    },
});
