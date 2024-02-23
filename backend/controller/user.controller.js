
export const getUsersForSidebar = async (req,res) =>{
    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password")
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.error("Fitlered Users Error",error.message)
        res.status(401).json({error:"Fitlered Users Error"})
    }
}