import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Signup = () => {
    const primaryColor = "#ff4d2d";
    const hoverColor = "#e64323";
    const bgColor = "#fff9f6";
    const borderColor = "#ddd";

    const [showPassword, setShowPassword] = useState(false);

    let [role, setRole] = useState("user");

  return (
    <>
        <div className='min-h-screen w-full flex items-center justify-center p-4' style={{backgroundColor:bgColor}}>
            <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]' style={{borderColor : borderColor}}>
                <h1 className='text-3xl font-bold mb-2' style={{color : primaryColor}}>Vingo</h1>

                <p className='text-gray-800 mb-8'>Create your account to get started with delicious food deliveries</p>

                {/* fullname */}

                <div className='mb-4'>
                    <label htmlFor="fullName" className='block text-gray-700 font-medium mb-1'>Full Name</label>
                    <input type="text" className='w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 border-[1px]' placeholder='Enter your fullname' style={{borderColor : borderColor}} />

                   
                </div>

                {/* email */}

                <div className='mb-4'>
                    <label htmlFor="fullName" className='block text-gray-700 font-medium mb-1'>Email</label>
                    <input type="email" className='w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 border-[1px]' placeholder='Enter your email' style={{borderColor : borderColor}} />

                </div>

                {/* mobile */}

                <div className='mb-4'>
                    <label htmlFor="fullName" className='block text-gray-700 font-medium mb-1'>Mobile no</label>
                    <input type="text" className='w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 border-[1px]' placeholder='Enter your mobile no' style={{borderColor : borderColor}} />

                   
                </div>

                {/* password */}

                <div className='mb-4'>
                    <label htmlFor="fullName" className='block text-gray-700 font-medium mb-1'>Password</label>

                    <div className='relative'>

                    <input type={`${showPassword ? "password" : "text"}`} className='w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 border-[1px]' placeholder='Enter your password' style={{borderColor : borderColor}} />
                    
                    <button onClick={()=>setShowPassword(prev=>!prev)} className='absolute right-3 top-2.5 text-gray-500 cursor-pointer'>{showPassword ? <FaRegEye /> : <FaRegEyeSlash /> }</button>

                    </div>
                   
                </div>

                {/* role */}

                <div className='mb-4'>
                    <label htmlFor="fullName" className='block text-gray-700 font-medium mb-1'>Password</label>

                    <div className='relative'>

                    <input type={`${showPassword ? "password" : "text"}`} className='w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 border-[1px]' placeholder='Enter your password' style={{borderColor : borderColor}} />
                    
                    <button onClick={()=>setShowPassword(prev=>!prev)} className='absolute right-3 top-2.5 text-gray-500 cursor-pointer'>{showPassword ? <FaRegEye /> : <FaRegEyeSlash /> }</button>

                    </div>
                   
                </div>

            </div>
        </div>
    </>
  )
}

export default Signup