import React from 'react'

import './Education.css'
import theme_pattern from '../../assets/theme_pattern.svg'
import education_map from '../../assets/education'

const Education = () => {
  return (
    <div id='education' className="education">
        <div className="education_title">
            <h1>Education</h1>
            <img src={theme_pattern} alt="" />
        </div>
        <div className="education_container">
            {

            education_map.map((educations,index)=>{
                return <div key = {index} className="education_format">
                    <div className="education_name">
                    <h2>{educations.e_name} </h2>
                    </div>
                    <div className="education_image">
                    <img src={educations.e_img} alt="" />
                    </div>
                    <div className="education_deg">
                        <div className="education_major">
                    <h3>{educations.e_degree} - {educations.e_major}</h3>
                    </div>
                    <div className="education_time">
                    <h4>{educations.e_timep}</h4>
                    </div>
                    </div>
                    <div className="education_description">
                    <h4>{educations.e_description}</h4>
                    </div>
                    <br />
                    <hr />


                </div>
            })
            }

        </div>

    </div>
  )
}

export default Education