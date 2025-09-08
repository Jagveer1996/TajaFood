import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { data, Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createSignin, gooleAuthAPI } from '../API/authAPI';
import {  GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../utils/firebase,js';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const Signin = () => {

  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const dispatch = useDispatch()

  const { mutate, isError, isSuccess } = useMutation({
    mutationFn: (data) => createSignin(data),
    onSuccess: (res) => {
      console.log(res);
      alert("sign IN Successfully");
      dispatch(setUserData(res.data))
    }
  });

  const { mutate: googleAuthMutate, isError: googleAuthError, isSuccess: googleAuthSuccess } = useMutation({
    mutationFn: (data) => gooleAuthAPI(data),
    onSuccess: (res) => {
      console.log(res);
      alert("Google signIn Successfully");

      dispatch(setUserData(res.data))

    }
  })

  function handleSignin() {
    const formData = new FormData();


    formData.append("email", email);
    formData.append("password", password);

    mutate(formData);
  };


  let handleGoogleAuth = async () => {

    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider);

    console.log(result);
    // console.log(result.user.displayName);

    let formData = new FormData();

    formData.append("email", result.user.email);

    googleAuthMutate(formData);
  }

  return (
    <>
      <div className='min-h-screen w-full flex items-center justify-center p-4' style={{ backgroundColor: bgColor }}>
        <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]' style={{ borderColor: borderColor }}>
          <h1 className='text-3xl font-bold mb-2' style={{ color: primaryColor }}>Vingo</h1>

          <p className='text-gray-800 mb-8'>Sign In to your account to get started with delicious food deliveries</p>


          {/* email */}

          <div className='mb-4'>
            <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" className='w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 border-[1px]' placeholder='Enter your email' style={{ borderColor: borderColor }} required />

          </div>

          {/* password */}

          <div className='mb-4'>
            <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>Password</label>

            <div className='relative'>

              <input onChange={(e) => setPassword(e.target.value)} type={`${showPassword ? "password" : "text"}`} className='w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 border-[1px]' placeholder='Enter your password' style={{ borderColor: borderColor }} />

              <button onClick={() => setShowPassword(prev => !prev)} className='absolute right-3 top-2.5 text-gray-500 cursor-pointer'>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>

            </div>

          </div>

          {/* Forgot Password */}

          <div onClick={() => navigate('/forgotpassword')} className='text-right mb-4 text-[#ff4d2d] cursor-pointer'>
            Forgot Password
          </div>

          <button onClick={handleSignin} className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer'>Sign In</button>

          <button onClick={handleGoogleAuth} className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-200'>
            <FcGoogle className=' size-[30px]' />
            <span>Sign up with Google</span>
          </button>

          <p onClick={() => navigate("/signup")} className='text-center mt-4 cursor-pointer'>Want to Create a new Account have ? <span className='text-[#ff4d2d]'>Sign Up</span></p>
        </div>
      </div>
    </>
  )
}

export default Signin