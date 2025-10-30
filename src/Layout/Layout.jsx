import React, { useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import Search from '../Components/Search/Search'
import whatsapp from '../assets/whatsapp.png'
import './Layout.css'

function Layout() {
    const [openSearch, setOpenSearch] = useState(false)
    return (
        <>
            <Navbar setOpenSearch={setOpenSearch} />
            {openSearch && <Search setOpenSearch={setOpenSearch} />}
            <main id='layout' className='min-h-[70.5vh]'>
                {<Outlet />}
            </main>
            <Footer />
            {/* Whatsapp Button */}
            <a
                href="https://wa.me/923302721777"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp fixed z-[100000] bottom-[5%] right-[3%]"
            >
                <img  src={whatsapp} alt="go to whatsapp" className='w-28 h-28' />
            </a>
        </>
    )
}

export default Layout