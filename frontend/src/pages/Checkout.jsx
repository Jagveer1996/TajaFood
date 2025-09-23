import React, { useEffect, useState } from 'react'
import { FaBackspace } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaSearchLocation } from "react-icons/fa";
import { TbCurrentLocation } from "react-icons/tb";
import { MdDeliveryDining } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa6";
import { FaMobileAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import "leaflet/dist/leaflet.css"
import { setAddress, setLocation } from '../redux/mapSlice';

function RecenterMap({ location }) {
    if (location.lat && location.lon) {
        const map = useMap();
        map.setView([location.lat, location.lon], 16, { animate: true })

    }
    return null;
}

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { location, address } = useSelector(state => state.map)
    const { cartItems, totalAmount } = useSelector(state => state.user)
    const [addressInp, setAddressInp] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const deliveryFee = totalAmount > 500 ? 0 : 40;
    const amountWithDeliveryFee = totalAmount + deliveryFee;


    const onDragEnd = (e) => {
        const { lat, lng } = e.target._latlng

        dispatch(setLocation({ lat: lat, lon: lng }))
        getAddressByLatLng(lat, lng)
    };

    const getAddressByLatLng = async (lat, lng) => {
        try {

            const cityAPI = "bb50a520e64148dfb05a089b6a0b061a";
            const result = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${cityAPI}`);
            const city = await result.json()

            // console.log(city?.results[0].address_line2);
            dispatch(setAddress(city?.results[0].address_line2))

        } catch (error) {
            console.log(error);

        }
    };

    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            // console.log(position.coords);
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const cityAPI = "bb50a520e64148dfb05a089b6a0b061a";

            dispatch(setLocation({ lat: latitude, lon: longitude }));
            getAddressByLatLng(latitude, longitude );
        })
    }

    const getLatLngByAddress = async()=>{
        try {
            const cityAPI = "bb50a520e64148dfb05a089b6a0b061a";
            const result = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(addressInp)}&apiKey=${cityAPI}`)
            const city = await result.json()

            const {lat, lon} =  city.features[0].properties;
            
            dispatch(setLocation({lat, lon})) ;           

        } catch (error) {
            
        }
    };

    useEffect(()=>{
        setAddressInp(address)
    }, [address])

    return (
        <>
            <div className='min-h-screen bg-[#fff9f6] flex items-center justify-center'>
                <div onClick={() => navigate("/")} className='absolute top-[20px] left-[20px] z-[10]'>
                    <FaBackspace className='text-[#ff4d2d] text-[30px]' />
                </div>

                <div className='w-full max-w-[900px] bg-white rounded-2xl shadow-xl p-6 space-y-6'>
                    <h1 className='text-2xl font-bold text-gray-800'>Checkout</h1>
                    <section>
                        <h2 className='text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800'><FaMapLocationDot className='text-[#ff4d2d] text-[20px]' /> Delivery Location</h2>

                        <div className='flex gap-2 mb-3'>
                            <input value={addressInp} onChange={(e)=>setAddressInp(e.target.value)} type="text" placeholder="Enter Your Delivery Address" className='flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none  focus:ring-[#ff4d2d] focus:ring-2' />
                            <button onClick={getLatLngByAddress} className='bg-[#ff4d2d] hover:bg-[#e64526] text-white px-3 py-2 rounded-lg flex items-center justify-center'><FaSearchLocation /></button>
                            <button onClick={getCurrentLocation} className='bg-blue-400 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center justify-center cursor-pointer'><TbCurrentLocation /></button>
                        </div>

                        <div className='rounded-xl border overflow-hidden'>
                            <div className='h-64 w-full flex items-center justify-center'>
                                <MapContainer className='w-full h-full' center={[location?.lat, location?.lon]} zoom={16}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <RecenterMap location={location} />
                                    <Marker position={[location?.lat, location?.lon]} draggable eventHandlers={{ dragend: onDragEnd }}></Marker>
                                </MapContainer>
                            </div>
                        </div>
                    </section>


                    {/* Payment methods */}

                    <section>
                        <h2 className='text-lg font-semibold mb-3 text-gray-800'>Payment Method</h2>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            {/* COS Payment div */}
                            <div onClick={()=>setPaymentMethod("cod")} className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${paymentMethod === "cod" ? "border-[#ff4d2d] bg-orange-50 shadow" : "border-gary-200 hover:border-gray-300"}`}>
                                <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100'>
                                    <MdDeliveryDining className='text-green-600 text-xl' />
                                </span>
                                <div>
                                    <p className='font-medium text-gray-800'>Cash on Delivery</p>
                                    <p className='text-sm text-gray-500'>Pay when your food arrives</p>
                                </div>
                            </div>

                            {/* Online payment div */}
                            <div onClick={()=>setPaymentMethod("online")} className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${paymentMethod === "online" ? "border-[#ff4d2d] bg-orange-50 shadow" : "border-gary-200 hover:border-gray-300"}`}>
                                <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-100'>
                                    <FaMobileAlt className='text-purple-600 text-xl' />
                                </span>
                                <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100'>
                                    <FaRegCreditCard className='text-blue-600 text-xl' />
                                </span>
                                <div>
                                    <p className='font-medium text-gray-800' >UPI / Credit / Debit Card</p>
                                    <p className='text-sm text-gray-500'>Pay Securely Online</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Order Summery */}

                    <section>
                        <h2 className=' text-lg font-semibold mb-3 text-gary-800' >Order Summary</h2>
                        <div className='rounded-xl border bg-gray-50 p-4 space-y-4'>
                            {
                                cartItems.map((item, index)=>(
                                    <div key={index} className='flex justify-between text-sm text-gray-700'>
                                        <span>{item.name} x {item.quantity}</span>
                                        <span>₹{item.price*item.quantity}</span>
                                    </div>
                                ))
                            }
                            <hr className='border-gray-400 my-2' />
                            <div className='flex justify-between font-medium text-gray-800'>
                                <span>SubTotal</span>
                                <span>{totalAmount}</span>
                            </div>
                            <div className='flex justify-between text-gray-700'>
                                <span>Delivery Fee</span>
                                <span>{deliveryFee == 0 ? "free" : deliveryFee}</span>
                            </div>
                            <div className='flex justify-between text-lg text-[#ff4d2d] font-bold'>
                                <span>Total Amount</span>
                                <span>{amountWithDeliveryFee}</span>
                            </div>
                        </div>


                    </section>

                    <button className='w-full bg-[#ff4d2d] hover:bg-[#e64526] text-white rounded-xl font-semibold py-3'>{paymentMethod == "cod" ? "Place Order" : "Pay & Place Order" }</button>

                </div>
            </div>
        </>
    )
}

export default Checkout