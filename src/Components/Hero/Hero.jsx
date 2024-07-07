import React from 'react'

import './Hero.css'
import {motion} from 'framer-motion'

const textVariants = {
  initial:{x:-500, opacity:0},
  animate:{x:0, opacity:1,transition:{duration:1,staggerChildren:0.5}}  
}

const containerVariants = {
  initial: { x:-500, opacity: 0 },
  animate: { x:0, opacity: 1, transition:{delay: 1, duration:1.25} },
};

const sliderVariants = {
  initial: { x:0 },
  animate: { x:'-590%', transition:{repeat: Infinity, repeatType:"mirror", duration:20} },
};

import profile_img from '../../assets/profile_img.svg'
import scroll_mouse from '../../assets/scroll_mouse.svg'

import AnchorLink from 'react-anchor-link-smooth-scroll'

const Hero = () => {
  return (
    <div id='home' className='hero'>
        <motion.img className = "profile_img" src={profile_img} alt=""  height="500" width = "400" variants = {textVariants} initial = 'initial' animate = 'animate'/>
        <motion.h1 variants = {textVariants} initial = 'initial' animate = 'animate'>Hi! This is 
        <motion.span variants = {textVariants} initial = 'initial' animate = 'animate'> Uddesh</motion.span> 
        </motion.h1>
        <motion.p variants = {textVariants} initial = 'initial' animate = 'animate'>Lorem ipsum</motion.p>
        <motion.div className="hero_action" variants = {containerVariants} initial = 'initial' animate = 'animate'>
            <motion.div className="hero_connect" ><AnchorLink className='anchor_link' offset={50} href='#contact'>Contact Me?</AnchorLink></motion.div>
            <motion.div className="hero_resume" >My Skills</motion.div> 
        </motion.div>
        <motion.div className="slidingTextContainer">
        <motion.div className="slidingTextWrapper" variants={sliderVariants} initial="initial" animate="animate">
          Developer 
          Data Scientist 
          Gamer 
          Fungi
        </motion.div>
      </motion.div>

    </div>
  )
}

export default Hero