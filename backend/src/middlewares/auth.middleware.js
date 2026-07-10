import jwt from "jsonwebtoken"
import { config } from "../config/config.js"
import userModel from "../models/user.model.js"

export async function authenticateUser(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Token not found",
            success: false
        })
    }

    try {

        const decoded = jwt.verify(token, config.JWT_SECRET)

        const user = await userModel.findById(decoded.id)

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        req.user = user

        next()

    } catch (err) {

        return res.status(403).json({
            message: "Forbidden",
            success: false
        })
    }
}

export const authenticateAdmin = async (req,res,next)=>{

    const token = req.cookies.token;
    try{
        if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        });
    }

    const decoded = jwt.verify(token,config.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }

    if(user.role !== "admin"){
        return res.status(403).json({
            message:"Admin only"
        });
    }

    req.user = user;

    next();

    }catch(err){

    return res.status(401).json({
        success:false,
        message:"Unauthorized"
    })

    }

}