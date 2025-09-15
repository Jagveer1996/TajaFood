import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { setMyShopData } from '../redux/ownerSlice';

const useGetShop = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const token = localStorage.getItem('authToken') // ✅ define token

        const result = await axios.get('http://localhost:8000/api/shop/get_shop',{
          headers : {
            Authorization : `Bearer ${token}`
          }
        });

        dispatch(setMyShopData(result.data))

        console.log('current shop result', result);
      } catch (error) {
        console.log('Error fetching current user:', error);
      }
    };

    fetchShop(); //Call the function here
  }, []);
};

export default useGetShop;