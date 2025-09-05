import queryClient from "../global";

export const createSignup = async (data)=>{
    const response = await queryClient.post('/api/auth/signup', data);

    return response.data;
}

export const createSignin = async (data)=>{
    const response = await queryClient.post('/api/auth/signin', data);

    return response.data;
}

export const sendOtpAPI = async (data)=>{
    const response = await queryClient.post('/api/auth/sendotp', data);

    return response.data;
}

export const verifyOtpAPI = async (data)=>{
    const response = await queryClient.post('/api/auth/verifyotp', data);

    return response.data;
}

export const resetPasswordAPI = async (data) =>{
    const response = await queryClient.post('api/auth/resetpassword', data);

    return response.data
}