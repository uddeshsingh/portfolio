import React from 'react'

import './About.css'

import theme_pattern from '../../assets/theme_pattern.svg'
import profile_img from '../../assets/profile_img.svg'


const Hero = () => {
  return (
    <div className='about'>
      <div className="about_title">
        <h1>About me</h1>
        <img src={theme_pattern} alt="" />
      </div>
      <div className="about_section"> </div>
      <div className="about_left">
        <img src={profile_img} alt="" />
      </div>
      <div className="about_right">
        <div className="para"> 
        <p>lorem ipsum </p>
        <p>loresm ipsum</p></div>
      </div>
      <div className="about_skills">
        <div className="about_skill">
          <p>html</p>
          <hr style={{width:"50%"}}/>
        </div>
        <div className="about_skill">
          <p>React</p>
          <hr style={{width:"30%"}}/>
        </div>
        <div className="about_skill">
          <p>Css</p>
          <hr style={{width:"70%"}}/>
        </div>
        <div className="about_skill">
          <p>Javascript </p>
          <hr style={{width:"50%"}}/>
        </div>
      </div>

      <div className="about_achievements">
        <div className="about_achievement">
          <h1>3+</h1>
          <p>yrs of experience</p>
        </div>
        <hr />
        <div className="about_achievement">
          <h1>90++</h1>
          <p>yrs of experience</p>
        </div>
        <hr />
        <div className="about_achievement">
          <h1>200+</h1>
          <p>yrs of experience</p>
        </div>
        <hr />
      </div>
 

    </div>
  )
}

export default Hero