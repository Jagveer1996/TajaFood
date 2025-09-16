import queryClient from "../global";

export const createItemAPI = async (data) => {
    const response = await queryClient.post('/api/item/add-item', data, {
        headers: {
            "Content-Type" : "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }

    })

    // console.log(response.data);

    return response.data;
}

export const getItemByIdAPI = async(itemId)=>{
    const response = await queryClient.get(`/api/item/get-item/${itemId}`,{
        headers : {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
    });

    return response.data
}

export const editItemByIdAPI = async(data)=>{
    const response = await queryClient.put(`/api/item/edit-item/${data.itemId}`, data.formData,{
        headers : {
            "Content-Type" : "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
    });

    return response.data
}


export const deleteItemAPI = async(id)=>{

    console.log("deleteItemAPI", id)

    const response = await queryClient.delete(`/api/item/delete-item/${id}`,{
        headers : {
            Authorization : `Bearer ${localStorage.getItem('authToken')}`
        }
    })

    return response.data
}