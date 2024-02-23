import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName:{
        type:String,
        require:true
    },
    username: {
        type:String,
        require:true,
        unique:true
    },
    password: {
        type:String,
        require:true,
        minlength:8
    },
    gender: {
        type:String,
        enum:["male","female"]
    },
    profilePic: {
        type:String,
        default:""
    },
}, {timestamps:true})

const User = mongoose.model("User",userSchema)

export default User