import { Router } from "express"
import { register , login , getMe , logout , addFavorite , removeFavorite , getFavorites} from "../controllers/auth.controller.js"
import {registerValidation , loginValidation} from "../validator/auth.validator.js"
import { authenticateUser } from "../middlewares/auth.middleware.js"

const authRouter = Router()

authRouter.post("/register" , registerValidation , register)

authRouter.post("/login" , loginValidation , login)

authRouter.get("/get-me" , authenticateUser , getMe)

authRouter.post("/logout" , authenticateUser , logout)

authRouter.post("/favorites/:propertyId", authenticateUser, addFavorite);

authRouter.delete("/favorites/:propertyId", authenticateUser, removeFavorite);

authRouter.get("/favorites", authenticateUser, getFavorites);


export default authRouter