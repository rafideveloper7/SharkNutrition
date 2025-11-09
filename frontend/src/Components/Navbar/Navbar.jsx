import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Navbar.css'
import logo from '../../assets/logo.png'
import { CartContext } from '../../Context/CartContext'

function Navbar({ setOpenSearch }) {
  const { cartData } = useContext(CartContext)
  const [showMenu, setShowMenu] = useState(false)

  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
  }, [location]);

  return (
    <header id='header' className='sticky top-0 z-[1000] bg-[#000000ea] shadow-[0_0_2px_#fff] backdrop-blur-md'>
      <div className="container flex justify-between items-center gap-15 h-[90px] m-auto">
        <div className='buttons-container flex gap-5 items-center'>
          <button onClick={() => setShowMenu(true)} className='menu-btn px-1 cursor-pointer rounded-md border-1 hidden'>
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
        <div className="logo pr-[50px] m-auto flex justify-between w-full">
          <Link to='/' className='flex items-center mr-3'>
            <img className='w-25 mr-[-15px] p-2' src={logo} alt="Shark Nutriton" />
            <span className=' leading-tight font-bold text-center '>
              <h1 className=' whitespace-nowrap'>SHARK NUTRITION</h1>
            <p className='text-[11px] text-center text-blue-400'>DIVE INTO ATHENTICITY</p>
            </span>
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
            <li className="add-me hidden">
              {!currentUser ? <NavLink to="/login">Login / Register</NavLink> :
                <NavLink to="/settings">Settings</NavLink>}
            </li>
            <li className='add-me hidden'>
              <NavLink to="/wishlist">Wishlist</NavLink>
            </li>
          </ul>
          <button onClick={() => setShowMenu(false)} className='hidden absolute top-5 left-5 text-lg px-1 cursor-pointer rounded-md border-1'>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </nav>
        <div className='buttons-container flex gap-5 items-center'>
          <button onClick={() => setOpenSearch(true)} className='cursor-pointer'><i className="fa-solid fa-magnifying-glass text-lg"></i></button>
          {!currentUser ? <NavLink to="/login" className='remove-me'>Login / Register</NavLink> :
            <NavLink to="/settings" className='remove-me'>Settings</NavLink>}

          <NavLink to="/wishlist" className='remove-me'><i className="fa-regular fa-heart text-lg me-2"></i></NavLink>
          <div className="relative">
            <NavLink to='/cart'><i className="fa-solid fa-cart-shopping text-lg me-2"></i></NavLink>
            <span className="cart-count absolute -top-2 -right-1 bg-blue-400 text-white-600 text-center text-sm font-bold w-4 h-4 flex items-center justify-center rounded-full">
              {cartData?.length}
            </span>
          </div>

          {/* <button onClick={() => setShowMenu(true)} className='menu-btn px-1 cursor-pointer rounded-md border-1 hidden'>
            <i className="fa-solid fa-bars"></i>
          </button> */}
        </div>
      </div>
      {showMenu && <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setShowMenu(false)}></div>}
    </header>
  )
}

export default Navbar;