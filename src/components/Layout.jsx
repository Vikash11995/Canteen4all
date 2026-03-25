import React from 'react'
import Navbar from './Navbar'
import {Outlet} from 'react-router'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#efeae37a] text-gray-800 ">
        <Navbar/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default Layout