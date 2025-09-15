import React from 'react'
import { FaUtensils } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import NavOwner from './NavOwner'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const OwnerDashboard = () => {
  const { myShopData } = useSelector(state => state.owner);
  console.log("myshopdata", myShopData.shop);

  const navigate = useNavigate();

  return (
    <div className='w-full min-h-screen bg-[#fff9f6] flex flex-col items-center'>
      <NavOwner />
      {!myShopData &&
        <div className='flex justify-center items-center p-4 sm:p-6'>
          <div className='w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
            <div className='flex flex-col items-center text-center'>
              <FaUtensils className='text-[#ff4d2d] w-16 h-16 sm:w-20 sm:h-20 mb-4' />
              <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-2'>Add Your Resturant</h2>
              <p className='text-gray-600 mb-4 text-sm sm:text-base'>Join our food delivery platform and reach thousand of hungry customers every day.</p>

              <button onClick={() => navigate("/create_edit_shop")} className='bg-[#ff4d2d] text-white px-5 sm:px-6 py-2 rounded-full font-medium shadow-md hover:bg-orange-600 transition-colors duration-200'>Get Started</button>
            </div>
          </div>
        </div>
      }

      {/* ------------------------------------------------------------------ */}

      {myShopData &&
        <div className='w-full flex flex-col items-center gap-6 px-4 sm:px-6'>

          <h1 className='text-2xl sm:text-3xl text-gray-900 flex items-center gap-3 mt-8 text-center'> <FaUtensils className='text-[#ff4d2d] w-14 h-14 sm:w-20 sm:h-20 mb-4' /> Welcome to {myShopData.shop.name}</h1>

          <div className='bg-white shadow-lg rounded-xl overflow-hidden border border-orange-100 hover:shadow-2xl transition-all duration-200 w-full max-w-3xl relative'>

            <div className='absolute top-4 right-4 bg-[#ff4d2d] text-white p-3 rounded-full hover:bg-amber-600 transition-colors cursor-pointer' onClick={()=>navigate("/create_edit_shop")}>
              <FaPen size={25} />
            </div>

            <img src={myShopData.shop.image} alt={myShopData.shop.name} className='w-full h-48 sm:h-64 object-cover' />

            <div className='p-4 sm:p-6'>
              <h1 className='text-xl sm:text-2xl font-bold text-gray-800 mb-2'>{myShopData.shop.name}</h1>
              <p className='text-gray-500'>{myShopData.shop.city}, {myShopData.shop.state}</p>
              <p className='text-gray-500 mb-4'>{myShopData.shop.address}</p>
            </div>
          </div>


        </div>
      }

    </div>
  )
}

export default OwnerDashboard