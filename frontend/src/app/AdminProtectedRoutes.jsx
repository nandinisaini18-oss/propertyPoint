import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtectedRoute = ({ children }) => {
    const { user, loading } = useSelector(state => state.auth);

    console.log("Admin Route", {
        loading,
        user,
        pathname: window.location.pathname
    });

    if (loading) {
        console.log("Loading...");
        return <div>Loading...</div>;
    }

    if (!user) {
        console.log("Redirect because user is null");
        return <Navigate to="/login" replace />;
    }

    if (user.role !== "admin") {
        console.log("Redirect because role =", user.role);
        return <Navigate to="/" replace />;
    }

    console.log("Rendering dashboard");

    return children;
};
export default AdminProtectedRoute;