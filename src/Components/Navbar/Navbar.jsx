import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import {motion} from 'framer-motion'

import './Navbar.css'
import underline from '../../assets/nav_underline.svg'

import logo from '../../assets/logo.svg'
import scroll_mouse from '../../assets/scroll_mouse.svg'

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
    <div className="wrapper_navbar">
    <div className='navbar'>
        <motion.span initial={{opacity:0, scale: 0}} animate={{opacity:1, scale:1}} transition={{duration: 0.5}}><img src={logo} alt=""/></motion.span>
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
    <div className="scroll_mouse">
      <motion.img src = {scroll_mouse} animate = {{y:150, transition:{duration:1, repeat:Infinity}}}/>
    </div>
    
    </div>
  )
}

export default Navbar