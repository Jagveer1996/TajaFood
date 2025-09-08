import axios from "axios";
import queryClient from "../global";

export const createSignup = async (data)=>{
    const response = await queryClient.post('/api/auth/signup', data);

    return response.data;
}


export const createSignin = async (data) => {
  const response = await queryClient.post('http://localhost:8000/api/auth/signin', data)

  const { token } = response.data

  if (token) {
    localStorage.setItem('authToken', token)
    console.log('Token stored in localStorage:', token)
  } else {
    console.warn('No token received from backend')
  }

  return response.data
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

export const gooleAuthAPI = async(data) =>{

    const response = await queryClient.post('/api/auth/googleauth', data);
    
    return response.data;

        
}