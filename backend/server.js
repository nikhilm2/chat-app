import express from "express"
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import connectToMongoDb from "./db/connectToMongoDb.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import userRoute from "./routes/user.route.js"
import { getUsersForSidebar } from "./controller/user.controller.js"

dotenv.config()
const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoute)

// app.get("/",(req,res)=>{
//     res.send("Hello There!")
// })



app.listen(PORT,()=>{
    connectToMongoDb()
    console.log(`Server starting on port ${PORT}`)
})