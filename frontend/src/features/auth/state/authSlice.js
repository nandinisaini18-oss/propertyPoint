import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    favorites: [],
    loading: true,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        setLoading(state, action) {
            state.loading = action.payload;
        },

        setUser(state, action) {
            state.user = action.payload;
        },

        setError(state, action) {
            state.error = action.payload;
        },

        logout(state) {
            state.user = null;
            state.error = null;
        },
        setFavorites(state, action) {
            state.favorites = action.payload;
        },

        addFavorite(state, action) {
            state.favorites.push(action.payload);
        },

        removeFavorite(state, action) {
            state.favorites = state.favorites.filter(
                fav => fav._id !== action.payload
            );
        },
    },
});

export const {
    setLoading,
    setUser,
    setError,
    logout,
    setFavorites,
    addFavorite,
    removeFavorite
} = authSlice.actions;

export default authSlice.reducer;