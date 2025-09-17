import React, { useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import { logoutAPI } from '../API/authAPI';
import { setUserData } from '../redux/userSlice';

const NavUser = () => {

    const { userData, city } = useSelector(state => state.user)
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
                {showSearch &&
                    <div className='md:hidden w-[90%] h-[70px] bg-white shadow-xl rounded-lg items-center flex gap-[20px] fixed top-[80px] left-[5%]'>
                        <div className='flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400'>
                            <FaLocationDot className='text-[#ff4d2d] text-[25px]' />
                            <div className='w-[80%] text-gray-600 truncate'>{city}</div>
                        </div>
                        <div className='w-[80%] flex items-center gap-[10px]'>
                            <FaSearch className='text-[#ff4d2d] text-[25px]' />
                            <input type="text" placeholder='Search Delicious Food' className='px-[10px] text-gray-700 outline-0 w-full' />
                        </div>
                    </div>
                }
                <h1 className='text-3xl font-bold mb-2 text-[#ff4d2d]'>TajaFood</h1>
                <div className='md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg items-center md:flex hidden gap-[20px]'>
                    <div className='flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400'>
                        <FaLocationDot className='text-[#ff4d2d] text-[25px]' />
                        <div className='w-[80%] text-gray-600 truncate'>{city}</div>
                    </div>
                    <div className='w-[80%] flex items-center gap-[10px]'>
                        <FaSearch className='text-[#ff4d2d] text-[25px]' />
                        <input type="text" placeholder='Search Delicious Food' className='px-[10px] text-gray-700 outline-0 w-full' />
                    </div>
                </div>

                {/* ------Cart---------------- */}
                <div className='flex items-center gap-4'>
                    {showSearch ? <RxCross1 onClick={() => setShowSearch(false)} className='text-[#ff4d2d] text-[25px] md:hidden' /> : <FaSearch onClick={() => setShowSearch(true)} className='text-[#ff4d2d] text-[25px] md:hidden' />
                    }

                    <div className='relative cursor-pointer'>
                        <IoCartOutline className='text-[#ff4d2d] text-[25px]' />
                        <span className='absolute right-[-9px] top-[-12px] text-[#ff4d2d]'>5</span>
                    </div>
                    {/* -------My Order Button------- */}
                    <button className='hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium'>My Orders</button>

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

export default NavUser