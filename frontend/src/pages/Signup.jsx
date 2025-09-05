import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { serverUrl } from '../App';
import { useMutation } from '@tanstack/react-query';
import { createSignup, gooleAuthAPI } from '../API/authAPI';
import { auth } from '../utils/firebase,js';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Signup = () => {
    const primaryColor = "#ff4d2d";
    const hoverColor = "#e64323";
    const bgColor = "#fff9f6";
    const borderColor = "#ddd";

    const [showPassword, setShowPassword] = useState(false);
    let navigate = useNavigate();

    let [role, setRole] = useState("user");
    let [fullName, setFullName] = useState("");
    let [email, setEmail] = useState("");
    let [mobile, setMobile] = useState("");
    let [password, setPassword] = useState("");
    let [err, setErr] = useState("");


    // const handleSignup = async ()=>{
    //     try {
    //         const result = await axios.post(`http://localhost:8000/api/auth/signup`, {
    //             fullName, email, password, mobile, role
    //         }, {withCredentials:true});

    //         console.log(result);
            
    //     } catch (error) {
    //         console.log(error);
            
    //     }    
    // }

    const {mutate, isError, isSuccess} = useMutation({
        mutationFn : (data)=>createSignup(data),
        onSuccess : (res)=>{
            console.log(res);
        alert("signup Successfully");
            
        }
    })

    const {mutate : googleAuthMutate, isError : googleAuthError, isSuccess: googleAuthSuccess} = useMutation({
        mutationFn : (data)=>gooleAuthAPI(data),
        onSuccess : (res)=>{
            console.log(res);
            alert("Google signup Successfully");
        }
    })

    function handleSignup(){
        const formData = new FormData();

        formData.append("fullName", fullName);
        formData.append("email", email);
        formData.append("mobile", mobile);
        formData.append("password", password);
        formData.append("role", role)

        mutate(formData);
    }


    let handleGoogleAuth = async () =>{

        if(!mobile){
           return alert("Mobile no is required");
        }
 
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider);

        console.log(result);
        // console.log(result.user.displayName);

        let formData = new FormData();

        formData.append("fullName", result.user.displayName);
        formData.append("email", result.user.email);
        formData.append("mobile", mobile);
        formData.append("role", role);

        googleAuthMutate(formData);
        
    }

  return (
    <>
        <div className='min-h-screen w-full flex items-center justify-center p-4' style={{backgroundColor:bgColor}}>
            <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]' style={{borderColor : borderColor}}>
                <h1 className='text-3xl font-bold mb-2' style={{color : primaryColor}}>Vingo</h1>

                <p className='text-gray-800 mb-8'>Create your account to get started with delicious food deliveries</p>

                {/* fullname */}

                <div className='mb-4'>
                    <label htmlFor="fullName" className='block text-gray-700 font-medium mb-1'>Full Name</label>
                    <input onChange={(e)=>setFullName(e.target.value)} type="text" className='w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 border-[1px]' placeholder='Enter your fullname' style={{borderColor : borderColor}} required />

                   
                </div>

                {/* email */}

                <div className='mb-4'>
                    <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
                    <input onChange={(e)=>setEmail(e.target.value)} type="email" className='w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 border-[1px]' placeholder='Enter your email' style={{borderColor : borderColor}} required />

                </div>

                {/* mobile */}

                <div className='mb-4'>
                    <label htmlFor="mobile" className='block text-gray-700 font-medium mb-1'>Mobile no</label>
                    <input onChange={(e)=>setMobile(e.target.value)} type="text" className='w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 border-[1px]' placeholder='Enter your mobile no' style={{borderColor : borderColor}} required />

                   
                </div>

                {/* password */}

                <div className='mb-4'>
                    <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>Password</label>

                    <div className='relative'>

                    <input onChange={(e)=>setPassword(e.target.value)} type={`${showPassword ? "password" : "text"}`} className='w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 border-[1px]' placeholder='Enter your password' style={{borderColor : borderColor}} />
                    
                    <button onClick={()=>setShowPassword(prev=>!prev)} className='absolute right-3 top-2.5 text-gray-500 cursor-pointer'>{showPassword ? <FaRegEye /> : <FaRegEyeSlash /> }</button>

                    </div>
                   
                </div>

                {/* role */}

                <div className='mb-4'>
                    <label htmlFor="Role" className='block text-gray-700 font-medium mb-1'>Role</label>

                    <div className='flex gap-2'>

                    {["user", "owner", "deliveryBoy"].map((r)=>(
                        <button className='flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer' 
                        onClick={()=>setRole(r)}
                        style={
                            role == r? {backgroundColor : primaryColor, color : "white"} : {border : `1px solid ${primaryColor}`, color : "#333"} 
                        } >{r}</button>
                    ))}
                    
                    </div>
                   
                </div>

                <button onClick={handleSignup} className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer'>Sign Up</button>

                <button onClick={handleGoogleAuth} className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-200'>
                    <FcGoogle className=' size-[30px]' />
                    <span>Sign up with Google</span>
                </button>

                <p onClick={()=> navigate("/signin")} className='text-center mt-4 cursor-pointer'>Already have an account ?  <span className='text-[#ff4d2d]'>Sign-In</span></p>
            </div>
        </div>
    </>
  )
}

export default Signup