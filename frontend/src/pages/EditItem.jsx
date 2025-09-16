import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { FaBackspace } from "react-icons/fa";;
import { FaUtensils } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editItemByIdAPI, getItemByIdAPI } from '../API/itemAPI';

const EditItem = () => {
    const navigate = useNavigate();
    const { myShopData } = useSelector(state => state.owner)

    // const params = useParams();
    // console.log("Params:", params);

    const { itemId } = useParams();

    // console.log("EditItem ID:", itemId);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const categories = ["Snacks", "Main Course", "Desserts", "Pizza", "Burgers", "Sandwiches", "South Indian", "North Indian", "Chinese", "Fast Food", "Others"];
    const [category, setCategory] = useState(null);
    const [foodType, setFoodType] = useState("Veg"); //"Veg", "Non-Veg"
    const [frontendImage, setFrontendImage] = useState(null);
    const [backendImage, setBackendImage] = useState(null);

    const {data, isSuccess, isError, error} = useQuery({
        queryKey : ['getItemByIdAPI', itemId],
        queryFn : ()=>getItemByIdAPI(itemId),
        enabled : !!itemId
    })

    // console.log("get Item By Id", data?.item?.image);
    

    useEffect(()=>{
        setName(data?.item?.name);
        setPrice(data?.item?.price);
        setCategory(data?.item?.category);
        setFrontendImage(data?.item?.image)
    }, [data]);

    const {mutate : editItemMutate, isError : editItemError} = useMutation({
        mutationFn : (data)=>editItemByIdAPI(data),
        onSuccess : (res)=>{
            console.log("Item Has been Updated", res);
            alert("Item Has been Updated")
            
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
               formData.append("category", category);
               formData.append("price", price);
               formData.append("foodType", foodType);
               if(backendImage){
                formData.append("image", backendImage)
               }

               editItemMutate({itemId, formData});

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
                            Edit Food
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className='space-y-5'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                            <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Enter Shop Name' className='w-full px-4 py-2 border rounded-lg focus:outline-0 focus:ring-2 focus:ring-orange-500' />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Image</label>
                            <input onChange={handleImage} type="file" name='image' accept="image/*" className='w-full px-4 py-2 border rounded-lg focus:outline-0 focus:ring-2 focus:ring-orange-500' />
                            {frontendImage &&
                                    <div className='mt-4'>
                                        <img src={frontendImage} alt="" className='w-full h-48 object-cover rounded-lg border' />
                                    </div>
                                }
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Price</label>
                            <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" placeholder='Enter Price' className='w-full px-4 py-2 border rounded-lg focus:outline-0 focus:ring-2 focus:ring-orange-500' />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Select Category</label>
                            <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full px-4 py-2 border rounded-lg focus:outline-0 focus:ring-2 focus:ring-orange-500'>
                                <option value="">Select Category</option>
                                {
                                    categories.map((cate, ind)=>{
                                    
                                      return <option value={cate} key={ind}>{cate}</option> 
                                        
                                    })
                                }
                            </select>
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Food Type</label>
                            <select onChange={(e) => setFoodType(e.target.value)} value={foodType} className='w-full px-4 py-2 border rounded-lg focus:outline-0 focus:ring-2 focus:ring-orange-500'>
                                <option value="Veg">Vegitarian</option>
                                <option value="Non-Veg">Non-Vegitarian</option>

                            </select>
                        </div>


                        <button className='w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-amber-600 hover:shadow-lg transition-all duration-200 cursor-pointer'>Save</button>
                    </form>
                </div>

            </div>
        </>
    )
}



export default EditItem