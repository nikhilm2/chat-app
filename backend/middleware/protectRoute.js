import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

const protectRoute = async (req,res,next) =>{
    try {
        const token = req.cookies.jwt
        if(!token){
            res.status(401).json({error:"Unauthorized: No Toke"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            res.status(401).json({error:"Decoding Token Error"})
        }

        const user = await User.findById(decoded.userId).select("-password")

        if(!user){
            res.status(404).json({error:"User Not Found"})
        }

        req.user= user
        next()
    } catch (error) {
        console.log("Error in Protect Route",error.message)
        res.status(400).json({error:"Internal Server Error"})
    }


}

export default protectRoute