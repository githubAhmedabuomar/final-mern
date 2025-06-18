import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import usermodel from "../models/usermodel.js"
dotenv.config()
let x;
export const isuser=async(req,res,next)=>{
    try {
        const jwtSecret=process.env.JWT_SECRET
        const decode=jwt.verify(req.headers.authorization,jwtSecret); 
        req.user=decode;
        next();
    
        console.log(decode,"decode")
        console.log(req.user,"req.user")
    } catch (error) {
        console.log(error)
        res.status(500).send({
            mess:"u ar not user"
        })
    }
} 
export const isadmin=async(req,res,next)=>{
    try {
        console.log(req.user,"mm")
        console.log(req.user._id,"mm")
        const user= await usermodel.findById(req.user._id);
        
        if(user.role == 1) res.status(200).send({mes:"ok u r admin"}); next();

         if(user.role == 0) return res.status(300).send({mes:"sorry u r not admin"});
       
        
    } catch (error) {
        console.log(error)
    }
}