import { Router } from "express"
import { register , login , getMe , logout} from "../controllers/auth.controller.js"
import {registerValidation , loginValidation} from "../validator/auth.validator.js"
import { authenticateUser } from "../middlewares/auth.middleware.js"

const authRouter = Router()

authRouter.post("/register" , registerValidation , register)

authRouter.post("/login" , loginValidation , login)

authRouter.get("/get-me" , authenticateUser , getMe)

authRouter.post("/logout" , authenticateUser , logout)


export default authRouter