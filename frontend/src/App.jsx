import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query' 
import ForgotPassword from './pages/ForgotPassword'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import useGetCity from './hooks/useGetCity'
import useGetShop from './hooks/useGetShop'
import CreateEditShop from './pages/CreateEditShop'

// import queryClient from './global'

export const serverUrl = "http://localhost:8000";

const queryClient = new QueryClient();

const App = () => {

  useGetCurrentUser();
  useGetCity();
  useGetShop();

  // Gioapi Key : - bb50a520e64148dfb05a089b6a0b061a

  const {userData} = useSelector(state =>state.user)

  return (
    <>

      <QueryClientProvider client={queryClient} >

      <Routes>
        <Route path='signup' element={!userData ? <Signup /> : <Navigate to={"/"} />} />
        <Route path='signin' element={!userData ? <Signin /> : <Navigate to={"/"} />} />
        <Route path='forgotpassword' element={userData ? <ForgotPassword /> : <Navigate to={"/"} />} />
        <Route path='/' element={userData ? <Home /> : <Navigate to={"/signin"} />} />
        <Route path='/create_edit_shop' element={<CreateEditShop />} />
      </Routes> 
      </QueryClientProvider>

    </>
  )
}

export default App