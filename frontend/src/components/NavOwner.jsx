import React, { useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import { logoutAPI } from '../API/authAPI';
import { setUserData } from '../redux/userSlice';

const NavOwner = () => {

    const { userData, city } = useSelector(state => state.user)
    const { myShopData } = useSelector(state => state.owner)

    const [showInfo, setShowInfo] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const result = await logoutAPI();
            dispatch(setUserData(null));
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <>
            <div className='w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[999] bg-[#fff9f6]'>

                <h1 className='text-3xl font-bold mb-2 text-[#ff4d2d]'>TajaFood</h1>


                {/* ------Cart---------------- */}
                <div className='flex items-center gap-4'>
                    {myShopData &&
                        <div>
                            <button className='flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d] text-[20px] '>Add Item +</button>
                        </div>
                    }



                    {/* -------My Order Button------- */}
                    <button className='hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium'>Orders Recive</button>

                    {/* Profile Icon */}
                    <div onClick={() => setShowInfo(prev => !prev)} className='w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer'>
                        {userData?.user.fullName.slice(0, 1).toUpperCase()}
                    </div>
                    {showInfo &&
                        <div className='fixed top-[80px] right-[10px] md:right-[10%] lg:right-[25%] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[999]'>
                            <div className='text-[18px] font-semibold'>
                                {userData?.user.fullName.toUpperCase()}
                            </div>
                            <div className='md:hidden text-[#ff4d2d] font-semibold cursor-pointer '>My Orders</div>
                            <div onClick={handleLogout} className='text-[#ff4d2d] font-semibold cursor-pointer'>LogOut</div>
                        </div>
                    }

                </div>
            </div>
        </>
    )
}

export default NavOwner