import React from 'react'

import footer_logo from '../../assets/footer_logo.svg'
import user_icon from '../../assets/user_icon.svg'

import './Footer.css'

const Footer = () => {
  return (
    <div className="footer">
        <div className="footer_top">
            <div className="footer_top_left">
                
            <img src={footer_logo} alt="" />
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit inventore, sed maiores nam facilis atque id doloribus vitae.</p>

            </div>
        <div className="footer_top_right">
            <div className="footer_email_input">
                <img src={user_icon} alt="" />
                <input type="email" placeholder='Enter your email' />
            </div>
            <div className="footer_subscribe">
                Subscribe
            </div>
        </div>
        </div>
        <hr />
        <div className="footer_bot">
            <p className="footer_bot_left">Lorem ipsum dolor, sit amet.</p>
            <div className="footer_bot_right">
                <p>Term of Services</p>
                <p>Privacy Policy</p>
                <p>Connect with Me</p>
            </div>
        </div>
    </div>
  )
}

export default Footer