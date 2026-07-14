import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtectedRoute = ({children}) => {
    const { user } = useSelector(state => state.auth);


if (!user) {
    return <Navigate to="/login" />;
}

if (user.role !== "admin") {
    return <Navigate to="/" />;
}

return children;
};

export default AdminProtectedRoute;