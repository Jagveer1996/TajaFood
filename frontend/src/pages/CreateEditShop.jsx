import { useMutation } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import { FaBackspace } from "react-icons/fa";;
import { FaUtensils } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createShopAPI } from '../API/shopApi';
import { setMyShopData } from '../redux/ownerSlice';

const CreateEditShop = () => {
    const navigate = useNavigate();
    const { myShopData } = useSelector(state => state.owner)
    const { city, currentState, currentAddress } = useSelector(state => state.user)

    const [name, setName] = useState(myShopData?.name || "");
    const [City, setCity] = useState(myShopData?.City || city);
    const [state, setState] = useState(myShopData?.state || currentState);
    const [address, setAddress] = useState(myShopData?.address || currentAddress);
    const [frontendImage, setFrontendImage] = useState(myShopData?.image || null);
    const [backendImage, setBackendImage] = useState(null);

    const dispatch = useDispatch()
    const {mutate : createShopMutate, isError : createShopError} = useMutation({
        mutationFn : (data)=>createShopAPI(data),
        onSuccess : (res)=>{
        console.log("Shop Has been Created", res);
        dispatch(setMyShopData(res.data))
            
        }
    })

    const handleImage = (e) => {
        const file = e.target.files[0];
        setBackendImage(file);
        setFrontendImage(URL.createObjectURL(file))
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        try {
               const formData = new FormData();
               
               formData.append("name", name);
               formData.append("city", City);
               formData.append("state", state);
               formData.append("address", address);
               if(backendImage){
                formData.append("image", backendImage)
               }

               createShopMutate(formData);

        } catch (error) {
            
        }
    }

    return (
        <>
            <div className='flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50 relative to-white min-h-screen'>
                <div onClick={() => navigate("/")} className='absolute top-[20px] left-[20px] z-[10] mb-[10px]'>
                    <FaBackspace className='text-[#ff4d2d] text-[30px]' />
                </div>

                <div className='max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100'>
                    <div className='flex flex-col items-center mb-6'>
                        <div className='bg-orange-100 p-4 rounded-full mb-4'>
                            <FaUtensils className='text-[#ff4d2d] text-[30px]' />
                        </div>

                        <div className='text-3xl font-extrabold text-gray-900'>
                            {myShopData ? "EditShop" : "Add Shop"}
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className='space-y-5'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                            <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Enter Shop Name' className='w-full px-4 py-2 border rounded-lg focus:outline-0 focus:ring-2 focus:ring-orange-500' />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Image</label>
                            <input onChange={handleImage} type="file" accept="image/*" className='w-full px-4 py-2 border rounded-lg focus:outline-0 focus:ring-2 focus:ring-orange-500' />
                            {frontendImage &&
                                    <div className='mt-4'>
                                        <img src={frontendImage} alt="" className='w-full h-48 object-cover rounded-lg border' />
                                    </div>
                                }
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-3.5'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>City</label>
                                <input onChange={(e) => setCity(e.target.value)} value={City} type="text" placeholder='Enter City' className='w-full px-4 py-2 border rounded-lg focus:outline-0 focus:ring-2 focus:ring-orange-500' />
                                

                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>State</label>
                                <input onChange={(e) => setState(e.target.value)} value={state} type="text" placeholder='Enter State Name' className='w-full px-4 py-2 border rounded-lg focus:outline-0 focus:ring-2 focus:ring-orange-500' />
                            </div>
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Address</label>
                            <input onChange={(e) => setAddress(e.target.value)} value={address} type="text" placeholder='Enter Shop Address' className='w-full px-4 py-2 border rounded-lg focus:outline-0 focus:ring-2 focus:ring-orange-500' />
                        </div>

                        <button className='w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-amber-600 hover:shadow-lg transition-all duration-200 cursor-pointer'>Save</button>
                    </form>
                </div>

            </div>
        </>
    )
}

export default CreateEditShop