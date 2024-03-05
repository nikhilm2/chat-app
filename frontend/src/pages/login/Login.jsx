import React from 'react'

const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className="w-full p-6 bg-green-100 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100">
            <h1 className='text-3xl font-semibold text-center text-gray-300'> Login <span className=' text-blue-500'>TalkApp</span>
            </h1>
           <form>
            <div>
                <label className='label p-2'>
                    <span className='text-base label-text text-stone-200'>Username</span>
                    
                </label>
                <input type="text" placeholder="Enter Username" class="input input-bordered w-full max-w-xs" />
            </div>
            <label className='label p-2'>
                    <span className='text-base label-text'>Password</span>
                    
                </label>
                <input type="password" placeholder="Enter Password" class="input input-bordered w-full max-w-xs" />
            <div>
            <a href="#" className='text-sm text-white hover:underline hover:text-blue-500 mt-2 inline-block'>
                Don't have an Account?
            </a>
            </div>
            <button className='btn btn-sm btn-block mt-2'>Login</button>
           </form>
            </div>
    </div>
  
  )
}

export default Login