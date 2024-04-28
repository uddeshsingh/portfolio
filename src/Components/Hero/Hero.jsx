import React from 'react'

import './Hero.css'

import profile_img from '../../assets/profile_img.svg'

import AnchorLink from 'react-anchor-link-smooth-scroll'

const Hero = () => {
  return (
    <div id='home' className='hero'>
        <img src={profile_img} alt="" />
        <h1>Hi! This is <span>Uddesh</span> </h1>
        <p>Lorem ipsum</p>
        <div className="hero_action">
            <div className="hero_connect"><AnchorLink className='anchor_link' offset={50} href='#contact'>Contact Me?</AnchorLink></div>
            <div className="hero_resume">My Skills</div> 
        </div>

    </div>
  )
}

export default Hero