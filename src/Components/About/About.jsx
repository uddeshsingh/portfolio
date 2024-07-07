import React from 'react'

import profile_img from '../../assets/about_profile.svg'

import theme_pattern from '../../assets/theme_pattern.svg'

import {motion} from 'framer-motion'

import './About.css'


const About = () => {
  return (
    <div id='about' className="about">
      <div className="bg_wrapper">
      <div className="bg_left"></div>
      <motion.div className="bg_mid" whileHover={{opacity:0, scale:1, duration: 2}} >
        <img src="https://plus.unsplash.com/premium_photo-1676637000058-96549206fe71?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      </motion.div>
      <div className="bg_right"></div>
      
      </div>
      <div className="about_title">
        <h1>About Me</h1>
        <img src={theme_pattern} alt="" />
      </div>
      <div className="about_sections">
         <div className="about_left">
          <img src={profile_img} alt=""/>
         </div>
         <div className="about_right">
          <div className="about_para">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil quia non ut ad totam ratione molestias dicta culpa neque impedit eum, distinctio a necessitatibus. Sint voluptates dolore quae nulla unde?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ut nisi earum nihil cumque ea laboriosam officia fuga laudantium voluptates, culpa voluptatum ab placeat suscipit hic quidem illo maiores ipsam.</p>
          </div>
          <div className="about_skills">
            <div className="about_skill"><p>HTML</p> <hr  style={{width: "80% "}}/></div>
            <div className="about_skill"><p>HTML</p> <hr  style={{width: "70% "}}/></div>
            <div className="about_skill"><p>HTML</p> <hr  style={{width: "90% "}}/></div>
            <div className="about_skill"><p>HTML</p> <hr  style={{width: "50% "}}/></div>
            <div className="about_skill"><p>HTML</p> <hr  style={{width: "30% "}}/></div>
          </div>
         </div>
      </div>
      <div className="about_achievements">
        <div className="about_achievement">
          <h1>10+</h1>
          <p>Lorem ipsum, dolor sit amet</p>
        </div>
        <hr />
        <div className="about_achievement">
          <h1>10+</h1>
          <p>Lorem ipsum, dolor sit amet</p>
        </div>
        <hr />
        <div className="about_achievement">
          <h1>10+</h1>
          <p>Lorem ipsum, dolor sit amet</p>
        </div>
      </div>
    </div>
  )
}

export default About