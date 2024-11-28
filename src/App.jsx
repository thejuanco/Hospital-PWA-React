import React from "react"
import { Route, Routes } from "react-router"
import Home from "./views/Home"
import Login from "./views/auth/Login"
import Register from "./views/auth/Register"
import ForgotPass from "./views/auth/ForgotPass"

function App() {

  return (
    <>
      <Routes>
        <Route index path="/" element={<Home/>}/>
        <Route path="/auth/login" element={<Login/>}/>
        <Route path="/auth/register" element={<Register/>}/>
        <Route path="/auth/forgot-password" element={<ForgotPass/>}/>
      </Routes>
    </>
  )
}

export default App
