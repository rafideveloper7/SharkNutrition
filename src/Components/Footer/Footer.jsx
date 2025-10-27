import React from 'react'
import logo from '../../assets/logo.png'
import { Link, NavLink } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer id="footer" className='min-h-[90px] shadow-[0_0_2px_#fff]'>
      <div className='container flex justify-between items-center gap-15 py-5'>
        <div className="logo">
          <Link to='/' className='flex items-center'>
            <img className='w-25' src={logo} alt="" />
            <h1 className='font-bold text-xl'>Shark Nutrition</h1>
          </Link>
        </div>
        <nav className='flex-1'>
          <ul className='flex justify-center flex-wrap gap-10 text-xl items-center'>
            <li>
              <NavLink to='/'>About</NavLink>
            </li>
            <li>
              <NavLink to='/need-help'>Need Help</NavLink>
            </li>
            <li>
              <NavLink to='/return-policy'>Return Policy</NavLink>
            </li>
            <li>
              <NavLink to='/term-conditions'>Terms & Conditions</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className='shadow-[0_0_2px_#fff]'>
        <p className='container text-[#aaa] py-5'>Copyright © 2025 Protonic Nutrition <br /> Powered by Team Developerans</p>
      </div>
    </footer>
  )
}

export default Footer