import React from 'react'

import profile_img from '../../assets/about_profile.svg'

import theme_pattern from '../../assets/theme_pattern.svg'

import './About.css'


const About = () => {
  return (
    <div id='about' className="about">
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