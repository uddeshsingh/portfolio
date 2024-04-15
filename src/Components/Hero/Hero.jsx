import React from 'react'

import './Hero.css'

import profile_img from '../../assets/profile_img.svg'

const Hero = () => {
  return (
    <div className='hero'>
        <img src={profile_img} alt="" />
        <h1>Hi! This is <span>Uddesh</span> </h1>
        <p>Lorem ipsum</p>
        <div className="hero_action">
            <div className="hero_connect">Contact Me?</div>
            <div className="hero_resume">My Skills</div> 
        </div>

    </div>
  )
}

export default Hero