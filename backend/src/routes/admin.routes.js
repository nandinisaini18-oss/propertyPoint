import { Router } from "express";

import {
    getPendingProperties,
    approveProperty,
    rejectProperty,
    getAllPropertiesForAdmin,
    markPropertyAsSold,
    getAllInquiries,
    getInquiryById,
    updateInquiryStatus,
    dashboardStats,
    deleteProperty
} from "../controllers/admin.controller.js";

import {
    authenticateUser,
    authenticateAdmin,
} from "../middlewares/auth.middleware.js";

const adminRouter = Router();

/* ===========================
   Dashboard
=========================== */

adminRouter.get(
    "/dashboard",
    authenticateUser,
    authenticateAdmin,
    dashboardStats
);

/* ===========================
   Properties
=========================== */

// All properties
adminRouter.get(
    "/properties",
    authenticateUser,
    authenticateAdmin,
    getAllPropertiesForAdmin
);

// Pending properties
adminRouter.get(
    "/properties/pending",
    authenticateUser,
    authenticateAdmin,
    getPendingProperties
);

// Approve property
adminRouter.patch(
    "/properties/:id/approve",
    authenticateUser,
    authenticateAdmin,
    approveProperty
);

// Reject property
adminRouter.patch(
    "/properties/:id/reject",
    authenticateUser,
    authenticateAdmin,
    rejectProperty
);

// Mark property as sold
adminRouter.patch(
    "/properties/:id/sold",
    authenticateUser,
    authenticateAdmin,
    markPropertyAsSold
);

adminRouter.delete(
    "/properties/:id",
    authenticateUser,
    authenticateAdmin,
    deleteProperty
);

/* ===========================
   Inquiries
=========================== */

// All inquiries
adminRouter.get(
    "/inquiries",
    authenticateUser,
    authenticateAdmin,
    getAllInquiries
);

// Single inquiry
adminRouter.get(
    "/inquiries/:id",
    authenticateUser,
    authenticateAdmin,
    getInquiryById
);

// Update inquiry status
adminRouter.patch(
    "/inquiries/:id",
    authenticateUser,
    authenticateAdmin,
    updateInquiryStatus
);

export default adminRouter;