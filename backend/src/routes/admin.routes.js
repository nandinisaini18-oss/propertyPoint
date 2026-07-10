import { Router } from "express";
import {getPendingProperties, approveProperty, rejectProperty, getAllInquiries, updateInquiryStatus } from "../controllers/admin.controller.js";
import {authenticateUser, authenticateAdmin} from "../middlewares/auth.middleware.js";

const adminRouter = Router();


// Pending property requests
adminRouter.get( "/properties/pending",  authenticateUser, authenticateAdmin, getPendingProperties);

// Approve property
adminRouter.patch("/properties/:id/approve", authenticateUser, authenticateAdmin, approveProperty);

// Reject property
adminRouter.patch("/properties/:id/reject", authenticateUser, authenticateAdmin,rejectProperty);

// Get all inquiries
adminRouter.get("/inquiries", authenticateUser, authenticateAdmin, getAllInquiries);

// Update inquiry status
adminRouter.patch("/inquiries/:id", authenticateUser, authenticateAdmin, updateInquiryStatus);

export default adminRouter;