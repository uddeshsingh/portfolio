import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'

import './Navbar.css'
import underline from '../../assets/nav_underline.svg'

import logo from '../../assets/logo.svg'
import menu_open from '../../assets/menu_open.svg'
import menu_close from '../../assets/menu_close.svg'

import { useState } from 'react'
import { useRef } from 'react'
const Navbar = () => {

  const [menu,setMenu] = useState("home");
  const menuRef = useRef();

  const openMenu = () =>{
    menuRef.current.style.right = "0";
  }

  const closeMenu = () =>{
    menuRef.current.style.right = "-350px";
  }

  return (
    <div className='navbar'>
        <img src={logo}  alt=""/>
        <img src={menu_open} onClick={openMenu} alt="" className='nav_mob_open'/>
        <ul className='nav-menu' ref={menuRef}>
          <img src={menu_close} alt="" className='nav_mob_close' onClick={closeMenu}/>
            <li> <AnchorLink className='anchor_link' href='#home'><p onClick={()=>setMenu("home")}>Home</p></AnchorLink>{menu==="home"?<img src = {underline}/>:<></>}</li>
            <li> <AnchorLink className='anchor_link' offset={50} href='#about'><p onClick={()=>setMenu("about")}>Personal</p></AnchorLink>{menu==="about"?<img src = {underline}/>:<></>}</li>
            <li> <AnchorLink className='anchor_link' offset={50} href='#education'><p onClick={()=>setMenu("education")}>Education</p></AnchorLink>{menu==="education"?<img src = {underline}/>:<></>}</li>
            <li> <AnchorLink className='anchor_link' offset={50} href='#projects'><p onClick={()=>setMenu("projects")}>Projects</p></AnchorLink>{menu==="projects"?<img src = {underline}/>:<></>}</li>
            <li> <AnchorLink className='anchor_link' offset={50} href='#contact'><p onClick={()=>setMenu("contact")}>Contact</p></AnchorLink>{menu==="contact"?<img src = {underline}/>:<></>}</li>
        </ul>
        <div className='nav-connect'> <AnchorLink className='anchor_link' offset={50} href='#contact'>Contact Me? </AnchorLink></div>
    </div>
  )
}

export default Navbar