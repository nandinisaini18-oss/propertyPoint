import { createBrowserRouter } from "react-router-dom";
import Home from "../features/auth/pages/Home"
import Login from "../features/auth/pages/Login"
import Register from "../features/auth/pages/Register"
import CreateProperty from "../features/property/pages/CreateProperty"
import EditProperties from "../features/property/pages/EditProperties";
import MyProperty from "../features/property/pages/MyProperty";
import Properties from "../features/property/pages/Properties";
import propertyDetails from "../features/property/pages/PropertyDetails";
import Locations from "../features/locations/pages/Locations";
import Favorites from "../features/property/pages/Favorites";
import Contact from "../features/contact/pages/Contact";
import Dashboard from "../features/admin/pages/Dasboard";
import AdminProperties from "../features/admin/pages/Properties";
import PendingRequests from "../features/admin/pages/PendingRequests";
import PurchaseRequests from "../features/admin/pages/PurchaseRequests";

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

    // {
    //     path: "/properties/:id",
    //     element: <PropertyDetails />,
    // },

    {
        path: "/sell-property",
        element: <CreateProperty />,
    },

    {
        path: "/my-properties",
        element: <MyProperty />,
    },

    {
        path: "/properties/edit/:id",
        element: <EditProperties />,
    },
    {
        path: "/locations",
        element: <Locations />,
    },
    {
        path: "/favorites",
        element: <Favorites />,
    },
    {
        path: "/contact",
        element: <Contact />,
    },
    {
        path: "/admin/dashboard",
        element: <Dashboard />,
    },
    {
        path : "/admin/properties",
        element : <AdminProperties />
    },
    {
        path: "/admin/pending",
        element: <PendingRequests />
    },
    {
        path: "/admin/purchase-requests",
        element: <PurchaseRequests />
    }
]);

export default router;