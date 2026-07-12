import axios from "axios";

const authAPI = axios.create({
    baseURL: "http://localhost:5000/api/auth",
    withCredentials: true,
});

export const registerAPI = (data) =>
    authAPI.post("/register", data);

export const loginAPI = (data) =>
    authAPI.post("/login", data);

export const getMeAPI = () =>
    authAPI.get("/get-me");

export const logoutAPI = () =>
    authAPI.post("/logout");

export const addFavoriteApi = (id) =>
    authAPI.post(`/favorites/${id}`);

export const removeFavoriteApi = (id) =>
    authAPI.delete(`/favorites/${id}`);

export const getFavoritesApi = () =>
    authAPI.get("/favorites");