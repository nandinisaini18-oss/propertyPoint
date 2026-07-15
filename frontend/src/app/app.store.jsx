import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/state/authSlice"
import propertyReducer from "../features/property/state/propertySlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        property: propertyReducer
    },
});
