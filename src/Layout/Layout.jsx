import React, { useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import Search from '../Components/Search/Search'

function Layout() {
  const [openSearch, setOpenSearch] = useState(false)
    return (
        <>
            <Navbar setOpenSearch={setOpenSearch} />
            {openSearch && <Search setOpenSearch={setOpenSearch} />}
            <main id='layout' className='min-h-[80vh]'>
                {<Outlet/>}
            </main>
            <Footer />
        </>
    )
}

export default Layout