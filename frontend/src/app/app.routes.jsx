import { createBrowserRouter } from "react-router-dom";
import HomePage from "../features/home/HomePage";
import LoginPage from "../features/auth/LoginPage";
import RegisterPage from "../features/auth/RegisterPage";
import PropertiesPage from "../features/property/PropertiesPage";
import PropertyDetailsPage from "../features/property/PropertyDetailsPage";
import CreatePropertyPage from "../features/property/CreatePropertyPage";
import MyPropertiesPage from "../features/property/MyPropertiesPage";
import EditPropertyPage from "../features/property/EditPropertyPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },

    {
        path: "/login",
        element: <LoginPage />,
    },

    {
        path: "/register",
        element: <RegisterPage />,
    },

    {
        path: "/properties",
        element: <PropertiesPage />,
    },

    {
        path: "/properties/:id",
        element: <PropertyDetailsPage />,
    },

    {
        path: "/sell-property",
        element: <CreatePropertyPage />,
    },

    {
        path: "/my-properties",
        element: <MyPropertiesPage />,
    },

    {
        path: "/properties/edit/:id",
        element: <EditPropertyPage />,
    },
]);

export default router;