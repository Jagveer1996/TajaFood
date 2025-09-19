import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaBackspace } from "react-icons/fa";
import { useSelector } from 'react-redux';


const CartPage = () => {
    const navigate = useNavigate();
    const {cartItems} = useSelector(state=>state.user)
    return (
        <>
            <div className='min-h-screen bg-[#fff9f6] flex justify-center p-6'>
                <div className='w-full max-w-[800px]'>
                    <div className='flex items-center gap-[20px] mb-6'>
                        <div onClick={() => navigate("/")} className='z-[10]'>
                            <FaBackspace className='text-[#ff4d2d] text-[30px]' />
                        </div>
                        <h1 className='text-2xl font-bold text-start'>Your Cart</h1>
                    </div>
                    {cartItems?.length == 0 ? (
                        <p className='text-gray-500 text-lg text-center'>Your Cart is empty</p>
                    ) : (
                        <div>
                            
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default CartPage