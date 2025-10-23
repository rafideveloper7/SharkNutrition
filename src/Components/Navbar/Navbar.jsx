import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'
import logo from '../../assets/logo.webp'
import Search from '../Search/Search'

function Navbar() {
  const [showMenu, setShowMenu] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)

  return (
    <header id='header' className='shadow-[0_0_2px_#fff] sticky top-0 bg-[#000000ea] z-100'>
      <div className="container flex justify-between items-center gap-15 h-[90px]">
        <div className="logo">
          <Link to='/'>
            <img className='w-50' src={logo} alt="" />
          </Link>
        </div>
        <nav className={`${showMenu ? 'showMenu' : ''} flex-1`}>
          <ul className='flex gap-10 text-xl items-center'>
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink to='/products'>Products</NavLink>
            </li>
            <li>
              <NavLink to='/about'>About</NavLink>
            </li>
            <li>
              <NavLink to='/contact'>Contact</NavLink>
            </li>
            <li className='add-me hidden'>
              <NavLink to="/login">Login / Register</NavLink>
            </li>
            <li className='add-me hidden'>
              <NavLink to="/wishlist">Wishlist</NavLink>
            </li>
          </ul>
          <button onClick={() => setShowMenu(false)} className='hidden absolute top-5 left-5 text-lg px-1 cursor-pointer rounded-md border-1'>
            <i className="fa-solid fa-xmark"></i>
          </button>
          {openSearch && <Search setOpenSearch={setOpenSearch} />}
        </nav>
        <div className='buttons-container flex gap-5 items-center'>
          <button onClick={() => setOpenSearch(true)} className='cursor-pointer'><i className="fa-solid fa-magnifying-glass text-lg"></i></button>
          <NavLink to="/login" className='remove-me'>Login / Register</NavLink>
          <NavLink to="/wishlist" className='remove-me'><i className="fa-regular fa-heart text-lg me-2"></i></NavLink>
          <NavLink to='/cart'><i className="fa-solid fa-cart-shopping text-lg me-2"></i></NavLink>
          <button onClick={() => setShowMenu(true)} className='menu-btn px-1 cursor-pointer rounded-md border-1 hidden'>
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
      {showMenu && <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setShowMenu(false)}></div>}
    </header>
  )
}

export default Navbar