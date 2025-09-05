import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { resetPasswordAPI, sendOtpAPI, verifyOtpAPI } from '../API/authAPI';

const ForgotPassword = () => {

    const navigate = useNavigate();

    let [step, setStep] = useState(1);
    let [email, setEmail] = useState("");
    let [otp, setOTP] = useState("");
    let [updatePassword, setUpdatePassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");

    const {mutate : sendOtpMutate, isError :sendOtpError, isSuccess : sendOtpSuccess} = useMutation({
        mutationFn : (data)=>sendOtpAPI(data),
        onSuccess : (res)=>{
            console.log(res);
            alert("OTP Has been send Check your gmail");
            setStep(2)
        }
    })

    
    const {mutate : verifyOtpMutate, isError : verifyOtpErrror, isSuccess : verifyOtpSuccess} = useMutation({
        mutationFn : (data)=>verifyOtpAPI(data),
        onSuccess : (res)=>{
            console.log(res);
            alert("OTP Has been Verifyied Successfully");
            setStep(3)
        }
    })
    
    const {mutate : resetPasswordMutate, isError : resetPasswordErrror, isSuccess : resetPasswordSuccess} = useMutation({
        mutationFn : (data)=>resetPasswordAPI(data),
        onSuccess : (res)=>{
            console.log(res);
            alert("Password has been Reset Successfully");
            navigate('/signin')
        }
    });

    function handleSendOTP(){
        let formData = new FormData();

        formData.append("email", email);

        sendOtpMutate(formData);
    }

    function handleVerifyOTP(){
        let formData = new FormData();

        formData.append("email", email);
        formData.append("otp", otp);

        verifyOtpMutate(formData);
    }

    function handleResetPassword(){
        if(updatePassword != confirmPassword){
            return null
        };

        let formData = new FormData();

        formData.append("email", email);
        formData.append("newPassword", updatePassword);

        resetPasswordMutate(formData);
    }



    return (
        <>
            <div className='flex items-center justify-center min-h-screen bg-[#fff9f6] p-4 w-full'>

                <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>
                    <div className='flex items-center gap-4 mb-4'>
                        <IoIosArrowRoundBack className='text-[#ff4d2d] size-[30px] cursor-pointer' onClick={() => navigate("/signin")} />
                        <h1 className='text-2xl font-bold text-center text-[#ff4d2d]'>Forgot Password</h1>
                    </div>

                    {
                        step == 1 &&
                        <div>
                            {/* email */}

                            <div className='mt-6'>
                                <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
                                <input onChange={(e) => setEmail(e.target.value)} type="email" className='w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 border-[1px]' placeholder='Enter your email ' />

                            </div>

                            <button onClick={handleSendOTP} className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer'>Send OTP</button>
                        </div>
                    }

                    {
                        step == 2 &&
                        <div>
                            {/* email */}

                            <div className='mt-6'>
                                <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>OTP</label>

                                <input onChange={(e) => setOTP(e.target.value)} type="email" className='w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 border-[1px]' placeholder='Enter your OTP' />

                            </div>

                            <button onClick={handleVerifyOTP} className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer'>Verify OTP</button>
                        </div>
                    }

                    {
                        step == 3 &&
                                                <div>
                            {/* email */}

                            <div className='mt-6'>
                                <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Update Password</label>

                                <input onChange={(e) => setUpdatePassword(e.target.value)} type="text" className='w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 border-[1px]' placeholder='Update your Password' />

                            </div>

                            <div className='mt-6'>
                                <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Confirm Password</label>

                                <input onChange={(e) => setConfirmPassword(e.target.value)} type="text" className='w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 border-[1px]' placeholder='Confirm your Password' />

                            </div>

                            <button onClick={handleResetPassword} className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer'>Reset Password</button>
                        </div>
                    }
                </div>

            </div>
        </>
    )
}

export default ForgotPassword