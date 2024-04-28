import React from 'react'

import './Service.css'

import theme_pattern from '../../assets/theme_pattern.svg'
import services_data from '../../assets/services_data'
import arrow_icon from '../../assets/arrow_icon.svg'


const Service = () => {
  return (
    <div id ='projects' className="services">
        <div className="service_title">
            <h1>My Services</h1>
            <img src={theme_pattern} alt="" />
        </div>
        <div className="service_container">
            {
                services_data.map((service,index)=>{
                    return <div key = {index} className="services_format">
                        <h3>{service.s_no}</h3>
                        <h2>{service.s_name}</h2>
                        <p>{service.s_desc}</p>
                        <div className="services_readmore">
                            <p>Read more</p>
                            <img src={arrow_icon} alt="" />
                        </div>
                    </div>
                })
            }

        </div>
    </div>
  )
}

export default Service