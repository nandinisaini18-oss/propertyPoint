import { createBrowserRouter } from "react-router-dom";
import AdminProtectedRoute from "./AdminProtectedRoutes";
import Home from "../features/auth/pages/Home"
import Login from "../features/auth/pages/Login"
import Register from "../features/auth/pages/Register"
import CreateProperty from "../features/property/pages/CreateProperty"
import EditProperties from "../features/property/pages/EditProperties";
import MyProperty from "../features/property/pages/MyProperty";
import Properties from "../features/property/pages/Properties";
import PropertyDetails from "../features/property/pages/PropertyDetails";
import Locations from "../features/locations/pages/Locations";
import Favorites from "../features/property/pages/Favorites";
import Contact from "../features/contact/pages/Contact";
import Dashboard from "../features/admin/pages/Dasboard";
import AdminProperties from "../features/admin/pages/Properties";
import PendingRequests from "../features/admin/pages/PendingRequests";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },

    {
        path: "/login",
        element: <Login />,
    },

    {
        path: "/register",
        element: <Register />,
    },

    {
        path: "/properties",
        element: <Properties />,
    },

    {
        path: "/properties/:id",
        element: <PropertyDetails />,
    },

    {
    path: "/sell-property",
        element: (
            <ProtectedRoute>
                <CreateProperty />
            </ProtectedRoute>
        ),
    },
    {
        path: "/my-properties",
        element: <MyProperty />,
    },
    {
        path: "/locations",
        element: <Locations />,
    },
    {
    path: "/favorites",
        element: (
            <ProtectedRoute>
                <Favorites />
            </ProtectedRoute>
        ),
    },
    {
        path: "/contact",
        element: <Contact />,
    },
    {
        path: "/admin/dashboard",
        element: (
            <AdminProtectedRoute>
                <Dashboard />
            </AdminProtectedRoute>
        ),
    },
    {
        path : "/admin/properties",
        element: (
            <AdminProtectedRoute>
                <AdminProperties />
            </AdminProtectedRoute>
        ),
    },
    {
        path: "/admin/pending",
        element: (
            <AdminProtectedRoute>
               <PendingRequests />
            </AdminProtectedRoute>
        ),
    }
]);

export default router;