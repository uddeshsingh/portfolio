import React from 'react'

import './Navbar.css'

import logo from '../../assets/logo.svg'
const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={logo}  alt=""/>
        <ul className='nav-menu'>
            <li>Home</li>
            <li>Personal</li>
            <li>Education</li>
            <li>Projects</li>
            <li>Contact </li>
        </ul>
        <div className='nav-connect'> Contact Me? </div>
    </div>
  )
}

export default Navbar