import queryClient from "../global";

export const createShopAPI = async (data) => {
    const response = await queryClient.post('/api/shop/createShop', data, {
        headers: {
            "Content-Type" : "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }

    })

    // console.log(response.data);

    return response.data;
}

