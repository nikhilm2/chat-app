import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"

const useSignUp = () => {

    const [loading,setLoading] = useState(false)
     const {setAuthUser} = useAuthContext()

    const signup = async({fullName,username,password,confirmPassword,gender}) =>{
            const success = handleInputErrors({fullName,username,password,confirmPassword,gender})
            if(!success) return; 

            setLoading(true)
            try {
                const res = await fetch("/api/auth/signup", {
                    method:'POST',
                    headers:{"Content-Type": "application/json"},
                    body: JSON.stringify({fullName,username,password,confirmPassword,gender})
                })

                const data = await res.json()
                if(data.error){
                    throw new Error(data.error)
                }
                //localstorage
                localStorage.setItem("chat-user",JSON.stringify(data))
                setAuthUser(data)
                //console.log(data)
            } catch (error) {
                toast.error(error.message)
            }

            finally{
                setLoading(false)
            }
    }
    return {loading, signup}
}

export default useSignUp

function handleInputErrors({fullName,username,password,confirmPassword,gender}){
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error("Fill All The Fields!")
        return false
    }

    if(password!==confirmPassword){
        toast.error("Password Does Not Match!")
        return false
    }

    if(password.length<8){
        toast.error('Password length is less than 8 characters.')
        return false
    }

    return true
}
