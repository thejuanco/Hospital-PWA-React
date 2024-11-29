import React, { useState, useEffect, Children } from "react"
import { Navigate, Route, Routes } from "react-router"
import { useAuth } from "./context/AuthContext"

import Home from "./views/Home"
import Login from "./views/auth/Login"
import Register from "./views/auth/Register"
import ForgotPass from "./views/auth/ForgotPass"

import Dashboard from "./views/home/Dashboard"

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/dashboard" element={<Dashboard/>}/>
          </>
        ) : (
          <>
          <Route index path="/" element={<Home/>}/>
          <Route path="/auth/login" element={<Login/>}/>
          <Route path="/auth/register" element={<Register/>}/>
          <Route path="/auth/forgot-password" element={<ForgotPass/>}/>
          </>
        )}
        
      </Routes>
    </>
  )
}

export default App
