import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaBackspace } from "react-icons/fa";
import { useSelector } from 'react-redux';
import CartItemCard from '../components/CartItemCard';


const CartPage = () => {
    const navigate = useNavigate();
    const {cartItems, totalAmount} = useSelector(state=>state.user)
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
                    ) : (<>
                        <div className='space-y-4'>
                            {cartItems?.map((item, index)=>(
                                <CartItemCard data={item} key={index} />
                            ))}
                        </div>
                        {/* Total Item card */}
                         <div className='mt-6 bg-white p-4 rounded-xl shadow flex justify-between items-center border'>
                            <h1 className='text-lg font-semibold'>Total Amount</h1>
                            <span className='text-xl font-bold text-[#ff4d2d]'>₹{totalAmount}</span>
                         </div>   
                         <div className='mt-4 flex justify-end'>
                            <button onClick={()=>navigate("/checkout")} className='bg-[#ff4d2d] text-white px-6 py-3 rounded-lg text-lg font-medium cursor-pointer hover:bg-[#e64526] transition'>CheckOut</button>
                         </div>    
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default CartPage