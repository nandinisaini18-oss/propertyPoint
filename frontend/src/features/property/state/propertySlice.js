import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    properties: [],
    property: null,
    myProperties: [],
    loading: false,
};

const propertySlice = createSlice({
    name: "property",

    initialState,

    reducers: {

        setLoading(state, action) {
            state.loading = action.payload;
        },

        setProperties(state, action) {
            state.properties = action.payload;
        },

        setProperty(state, action) {
            state.property = action.payload;
        },

        setMyProperties(state, action) {
            state.myProperties = action.payload;
        },

    },
});

export const {
    setLoading,
    setProperties,
    setProperty,
    setMyProperties,
} = propertySlice.actions;

export default propertySlice.reducer;