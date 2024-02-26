import userModel from "../models/user.model";
import {Request,Response,NextFunction} from "express"
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

declare global{
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const userVerifyToken = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        let secretKey:any = process.env.SECRET_KEY
        let Token: any = req.headers['authorization']?.split(" ")[1];
        let {userID}: any = jwt.verify(Token,secretKey);
        let user = await userModel.findOne({_id:userID, isAdmin: false});
        req.user = user;
        if(req.user){
            next();
        }
        else{
            res.json("Invalide user");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json("Server Error from User Token..");
    }
};