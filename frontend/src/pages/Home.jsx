import React from 'react'
import { useSelector } from 'react-redux'
import UserDashborad from '../components/UserDashborad'
import OwnerDashboard from '../components/OwnerDashboard'
import DeliveryBoy from '../components/DeliveryBoy'

const Home = () => {

    const {userData} = useSelector(state => state.user)
    console.log("dasdasdasd",userData.user.role)

  return (
    <>
        <div className='w-[100vw] min-h-[100vh] pt-[100px] flex flex-col items-center bg-[#fff9f6]'>
            {
                userData.user.role=="user" && <UserDashborad />
            }
            {
                userData.user.role=="owner" && <OwnerDashboard />
            }
            {
                userData.user.role=="deliveryBoy" && <DeliveryBoy />
            }
        </div>
    </>
  )
}

export default Home