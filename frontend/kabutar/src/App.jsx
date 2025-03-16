import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import SignUp from '../Pages/SignUp/SignUp';

import './App.css'

import logo from './assets/logo/logo.png';

function App() {
  const { authUser } = useAuthContext();
  return (
    // <div className='p-4 h-screen flex items-center justify-center'>
    <div className="relative w-full bg-slate-950 p-4 h-screen flex items-center justify-center">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      {!authUser && <div className='w-[30%]'>
        <img src={logo} className='w-full'/>
      </div>}
      <div>
        <Routes>
          <Route exact path="/" element={authUser ? <Home /> : <Navigate to='/login' />} />
          <Route exact path="/login" element={authUser ? <Navigate to='/' /> : <Login />} />
          <Route exact path="/signup" element={authUser ? <Navigate to='/' /> : <SignUp />} />
        </Routes>
        <Toaster />
      </div>
    </div>
  )
}

export default App
