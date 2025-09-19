import React, { useState } from 'react'
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/userSlice';

const FoodCard = ({ data }) => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.user)
    const [quantity, setQuantity] = useState(0);

    const renderStars = (rating) => {  // r=3
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                (i <= rating ? <FaStar className='text-yellow-500 text-lg' /> : <FaRegStar className='text-yellow-500 text-lg' />)
            )
        }
        return stars;
    }


    const quantityIncrease = () => {
        const newQty = quantity + 1;
        setQuantity(newQty);
    }

    const quantityDecrease = () => {
        if (quantity > 0) {
            const newQty = quantity - 1;
            setQuantity(newQty);
        }
    }

    return (
        <>
            <div className='w-[250px] rounded-2xl border-2 border-[#ff4d2d] bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col '>
                <div className='relative w-full h-[170px] flex justify-center items-center bg-white'>
                    <img src={data.image} alt="" className='w-full h-full object-cover transition-transform duration-300 hover:scale-110' />
                </div>

                <div className='flex-1 flex flex-col p-4'>
                    <h1 className='font-semibold text-gray-800 text-base truncate'>{data.name}</h1>

                    {/* Rating */}
                    <div className='flex items-center gap-1 mt-1'>
                        {renderStars(data.rating?.average || 0)}
                        <span>
                            {data.rating?.count || 0}
                        </span>
                    </div>

                    <div className='flex items-center justify-between mt-auto p-3'>
                        <span className='font-bold text-gray-900 text-lg'>{data.price}</span>

                        <div className='flex items-center border rounded-full overflow-hidden shadow-sm'>
                            <button onClick={quantityDecrease} className='cursor-pointer px-2 py-1 hover:bg-gray-100 transition'><FaMinus /></button>

                            <span>{quantity}</span>

                            <button onClick={quantityIncrease} className='cursor-pointer px-2 py-1 hover:bg-gray-100 transition'><FaPlus /></button>

                            <button onClick={() => {
                                quantity > 0 ? dispatch(addToCart({
                                    id: data._id,
                                    name: data.name,
                                    price: data.price,
                                    image: data.image,
                                    shop: data.shop,
                                    quantity: quantity,
                                    foodType: data.foodType
                                })) : null
                            }} className={`${cartItems.some(i => i.id == data._id) ? "bg-gray-800" : "bg-[#ff4d2d]"} text-white px-3 py-2 transition-colors cursor-pointer`}><FaCartPlus /></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FoodCard