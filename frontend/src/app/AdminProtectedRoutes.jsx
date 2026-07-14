import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtectedRoute = () => {
    const { user } = useSelector(state => state.auth);

    if (!user)
        return <Navigate to="/login" />;

    if (user.role !== "admin")
        return <Navigate to="/" />;

    return <Outlet />;
};

export default AdminProtectedRoute;