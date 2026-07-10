import { useDispatch } from "react-redux";

import { setError , setLoading , setUser , logout } from "../state/authSlice";

import { registerAPI , loginAPI , getMeAPI , logoutAPI } from "../service/auth.api";

export function useAuth() {

    const dispatch = useDispatch();

    async function handleRegister(data) {

        dispatch(setLoading(true));

        try {

            const res = await registerAPI(data);

            dispatch(setUser(res.data.user));

            return res.data;

        } catch (err) {

            dispatch(
                setError(
                    err.response?.data?.message ||
                    "Registration failed"
                )
            );

            throw err;

        } finally {

            dispatch(setLoading(false));
        }
    }

    async function handleLogin(data) {

        dispatch(setLoading(true));

        try {

            const res = await loginAPI(data);

            dispatch(setUser(res.data.user));

            return res.data;

        } catch (err) {

            dispatch(
                setError(
                    err.response?.data?.message ||
                    "Login failed"
                )
            );

            throw err;

        } finally {

            dispatch(setLoading(false));
        }
    }

    async function handleGetMe() {

        dispatch(setLoading(true));

        try {

            const res = await getMeAPI();

            dispatch(setUser(res.data.user));

            return res.data;

        } catch (err) {

            dispatch(logout());

        } finally {

            dispatch(setLoading(false));
        }
    }

    async function handleLogout() {

        try {

            await logoutAPI();

            dispatch(logout());

        } catch (err) {

            console.log(err);
        }
    }

    return {

        handleRegister,
        handleLogin,
        handleGetMe,
        handleLogout,
    };
}