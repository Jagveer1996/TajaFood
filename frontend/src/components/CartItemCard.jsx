import React from 'react';
import { FaRupeeSign } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { removeCartItem, updateQuantity } from '../redux/userSlice';


const CartItemCard = ({ data }) => {

    const dispatch = useDispatch()

    const handleIncrease = (id, currentQuantity)=>{
        dispatch(updateQuantity({id, quantity : currentQuantity+1}))
    }

    const handleDecrease = (id, currentQuantity)=>{
        if(currentQuantity > 1){

            dispatch(updateQuantity({id, quantity : currentQuantity-1}))
        }
    }

    const handleDeleteItem = ()=>{
        dispatch(removeCartItem(data.id))
    }
    return (
        <>
            <div className='flex items-center justify-between bg-white p-4 rounded-xl shadow border'>
                {/* Left side div */}
                <div className='flex items-center gap-4'>
                    <img src={data.image} alt="" className='w-40 h-40 object-cover rounded-lg border' />
                    <div>
                        <h1 className='font-medium text-gray-800'>{data.name}</h1>
                        <p className='text-sm text-gray-500 flex items-center'> <FaRupeeSign /> {data.price} X {data.quantity}</p>
                        <p className='font-bold text-gray-800 flex items-center'><FaRupeeSign /> {data.price * data.quantity}</p>
                    </div>
                </div>
                {/* Right Side div */}
                <div className='flex items-center gap-3'>
                    <button onClick={()=>handleDecrease(data.id, data.quantity)} className='p-2 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer'><FaMinus /></button>

                    <span>{data.quantity}</span>

                    <button onClick={()=>handleIncrease(data.id, data.quantity)}  className='p-2 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer' ><FaPlus /></button>

                    <button onClick={handleDeleteItem} className='p-2.5 bg-red-500 rounded-full text-white hover:bg-red-700 cursor-pointer'><FaTrashAlt /></button>
                </div>
            </div>
        </>
    )
}

export default CartItemCard