import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import AuthUser from '../pageauth/AuthUser'

const LayoutReader = () => {
        const { getRol } = AuthUser()
        const navigate = useNavigate()
    
        useEffect(()=>{
            if(getRol()!="reader"){
                navigate("/")
            }
        },[])
    return (
        <>
        <Navbar/>
        <Outlet/>
        <Footer/>
        
        </>
    )
}
export default LayoutReader