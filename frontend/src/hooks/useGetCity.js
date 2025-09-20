import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCity, setCurrentAddress, setCurrentState, setUserData } from '../redux/userSlice';
import { setAddress, setLocation } from '../redux/mapSlice';

const useGetCity = () => {
  const dispatch = useDispatch();

  const {userData} = useSelector(state=>state.user)

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(async (position)=>{
        // console.log(position.coords);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const cityAPI = "bb50a520e64148dfb05a089b6a0b061a";

        dispatch(setLocation({lat:latitude, lon : longitude }))

        const result =  await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${cityAPI}`);

        const city = await result.json()

        // console.log(city?.results[0].city);
          dispatch(setCity(city?.results[0].city))
          dispatch(setCurrentState(city?.results[0].state))
          dispatch(setCurrentAddress(city?.results[0].address_line2))

          dispatch(setAddress(city?.results[0].address_line2))
    })  
  },[userData])

};

export default useGetCity;