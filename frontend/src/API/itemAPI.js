import queryClient from "../global";

export const createItemAPI = async (data) => {
    const response = await queryClient.post('/api/item/add-item', data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }

    })

    // console.log(response.data);

    return response.data;
}

