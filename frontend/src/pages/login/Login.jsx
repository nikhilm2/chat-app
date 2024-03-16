import { useState } from "react"
import { Link } from "react-router-dom"

const Login = () => {
    const [username,setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()
        await login(username,password)
    }
  return ( 
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className="w-full p-6 bg-green-100 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100">
            <h1 className='text-3xl font-semibold text-center text-gray-300'> Login <span className=' text-blue-500'>TalkApp</span>
            </h1>
           <form onSubmit={handleSubmit}>
            <div>
                <label className='label p-2'>
                    <span className='text-base label-text text-stone-200'>Username</span>
                    
                </label>
                <input type="text" placeholder="Enter Username" class="input input-bordered w-full max-w-xs" value={username} onChange={(e)=> setUsername(e.target.value)} />
            </div>
            <label className='label p-2'>
                    <span className='text-base label-text'>Password</span>
                    
                </label>
                <input type="password" placeholder="Enter Password" class="input input-bordered w-full max-w-xs" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            <div>
            <Link to="/signup" className='text-sm text-white hover:underline hover:text-blue-500 mt-2 inline-block'>
                Don't have an Account?
            </Link>
            </div>
            <button className='btn btn-sm btn-block mt-2' disabled={loading}>{loading? <span className="loading loading-spinner"></span> : "Login" }</button>
           </form>
            </div>
    </div>
  
  )
}

export default Login