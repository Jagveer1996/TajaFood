import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { deleteItemAPI } from '../API/itemAPI';

const OwnerItemCard = ({data}) => {

    const navigate = useNavigate();

    const {mutate, isError, isSuccess,} = useMutation({
        mutationFn : deleteItemAPI,
        onSuccess : (res)=>{
            console.log("Item has been delete", res);
            
            alert("Item Has been Deleted");
            refetch();
        }
    })

    function handleDelete(id){
                console.log("Deleting ID:", id); // Should log a string like 'abc123'
                mutate(id)
    }

  return (
    <>
    <div className='flex bg-white rounded-lg shadow-md overflow-hidden border border-[#ff4d2d] w-full max-w-2xl'>
        <div className='w-36 flex-shrink-0 bg-gray-50'>
            <img src={data.image} alt="" className='w-full h-full object-cover' />
        </div>

        <div className='flex flex-col justify-between p-3 flex-1'>
            <div className=''>
                <h2 className='text-base font-semibold text-[#ff4d2d]'>{data.name}</h2>
                <p><span className='font-medium text-gray-80' >Category : </span>{data.category} </p>
                <p><span className='font-medium text-gray-80' >Food Type : </span>{data.foodType} </p>
            </div>
            <div className='flex items-center justify-between'>
                <p>Price : <span className='text-[#ff4d2d]'>{data.price} </span></p>
                <div className=' flex items-center gap-2'>
                    <div onClick={()=>navigate(`/editItem/${data._id}`)} className='p-2 rounded-full hover:bg-[#ff4d2d]/10 text-[#ff4d2d] cursor-pointer  '>
                        <FaPen size={18} />
                    </div>
                    <div onClick={()=>handleDelete(data._id)} className='p-2 rounded-full hover:bg-[#ff4d2d]/10 text-[#ff4d2d] cursor-pointer '>
                        <FaTrashAlt size={18} />
                    </div>
                </div>
            </div>
        </div>
    </div>

    </>
  )
}

export default OwnerItemCard