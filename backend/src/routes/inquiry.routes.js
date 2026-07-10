import { Router } from "express";
import { createInquiry, getMyInquiries, deleteInquiry} from "../controllers/inquiry.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const inquiryRouter = Router();


inquiryRouter.post("/create", authenticateUser, createInquiry);


// Logged in user's inquiries
inquiryRouter.get("/my", authenticateUser, getMyInquiries);


// Delete inquiry
inquiryRouter.delete("/:id", authenticateUser, deleteInquiry);

export default inquiryRouter;