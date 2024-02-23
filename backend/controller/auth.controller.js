import bcrypt from "bcryptjs"
import User from "../models/user.model.js";
import generateTokenAndCookie from "../utils/generateToken.js";

export const signup = async (req,res) => {
    try {
        const {fullName,username,password,confirmPassword,gender} = req.body;

        if(password!=confirmPassword){
            return res.status(400).json({error: "Password does not match!"})

        }

        const user = await User.findOne({username})
        if(user){
            return res.status(400).json({error:"Username already exists!"}
            )
        }

        //hashcode
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        //profilepic
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User ({
            fullName,
            username,
            password: hashPassword,
            gender,
           profilePic: gender === "male"? boyProfilePic : girlProfilePic 
        })
        
        if(newUser){
            generateTokenAndCookie(newUser._id,res)
            await newUser.save()
            res.status(201).json({
                _id: newUser._id,
                fullName:newUser.fullName,
                username:newUser.username,
                profilePic:newUser.profilePic
    
            })
        }
        else{
            res.staus(400).json({error:"Invalid User Create Error"})
        }
       
        
    } catch (error) {
        console.log("Signup Error",error.message)
        res.status(500).json({error:"SignUp Error"})
    }
}

export const login = async (req,res) => {
    try {
        const {username,password} = req.body
        const user = await User.findOne({username})
        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "")

        if(!user || !isPasswordCorrect){
            res.status(400).json({error:"Invalid credentials or Username"})
        }

        generateTokenAndCookie(user._id,res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log("Login Error",error.message)
        res.status(500).json({error:"Login Error"})
    }
}
export const logout = (req,res) => {
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logout Successfully!"})
    } catch (error) {
        console.log("Logout Error",error.message)
        res.status(500).json({error:"Logout Error"})
    }
}