import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query' 
import ForgotPassword from './pages/ForgotPassword'

// import queryClient from './global'

export const serverUrl = "http://localhost:8000";

const queryClient = new QueryClient();

const App = () => {
  return (
    <>

      <QueryClientProvider client={queryClient} >

      <Routes>
        <Route path='signup' element={<Signup />} />
        <Route path='signin' element={<Signin />} />
        <Route path='forgotpassword' element={<ForgotPassword />} />
      </Routes>
      </QueryClientProvider>

    </>
  )
}

export default App