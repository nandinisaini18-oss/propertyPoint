import { Router } from "express";
import {createProperty, getAllProperties, getPropertyById, getMyProperties, updateProperty, deleteProperty , getLocations} from "../controllers/property.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import multer, { memoryStorage } from "multer"
const upload = multer({storage : memoryStorage()})

const propertyRouter = Router();

propertyRouter.post("/create", authenticateUser, upload.array("propertyImages",6), createProperty)

propertyRouter.get("/", getAllProperties);

propertyRouter.get("/my/properties", authenticateUser, getMyProperties);

propertyRouter.get("/locations" , getLocations)

propertyRouter.get("/:id", getPropertyById);

propertyRouter.patch("/:id",authenticateUser,updateProperty);

propertyRouter.delete("/:id", authenticateUser, deleteProperty);



export default propertyRouter;