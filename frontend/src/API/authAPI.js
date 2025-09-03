import queryClient from "../global";

export const createSignup = async (data)=>{
    const response = await queryClient.post('/api/auth/signup', data);

    return response.data;
}

export const createSignin = async (data)=>{
    const response = await queryClient.post('/api/auth/signin', data);

    return response.data;
}