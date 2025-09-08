import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const useGetCurrentUser = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken') // ✅ define token

        const result = await axios.get('http://localhost:8000/api/user/current',{
          headers : {
            Authorization : `Bearer ${token}`
          }
        });

        dispatch(setUserData(result.data))

        console.log('current user result', result);
      } catch (error) {
        console.log('Error fetching current user:', error);
      }
    };

    fetchUser(); //Call the function here
  }, []);
};

export default useGetCurrentUser;