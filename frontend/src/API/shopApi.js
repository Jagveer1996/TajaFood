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

export const getShopbyCityAPI = async (city) => {
    const response = await queryClient.get(
        `/api/shop/get_shopBy_city/${city}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        }
    );

    console.log(response)

    return response.data;
};


