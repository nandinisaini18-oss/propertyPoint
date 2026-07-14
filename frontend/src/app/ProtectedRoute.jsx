import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useSelector((state) => state.auth);

console.log({ loading, user });

if (loading) return <Spinner />;

if (!user) return <Navigate to="/login" />;
return children;


};

export default ProtectedRoute;