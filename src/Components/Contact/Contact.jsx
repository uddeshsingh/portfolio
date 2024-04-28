import React from 'react'

import './Contact.css'

import theme_pattern from '../../assets/theme_pattern.svg'
import mail_icon from '../../assets/mail_icon.svg'
import call_icon from '../../assets/call_icon.svg'
import location_icon from '../../assets/location_icon.svg'


const Contact = () => {
    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
    
        formData.append("access_key", "5067fd26-de33-4b0c-8d16-4ae78e262afe");
    
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });
    
        const data = await response.json();
    
        if (data.success) {
            alert(data.message)
          event.target.reset();
        } else {
          console.log("Error", data);        }
      };
    
  return (
    <div id='contact' className="contact">
        <div className="contact_title">
            <h1>Get in Touch</h1>
            <img src={theme_pattern} alt="" />
        </div>
        <div className="contact_section">
            <div className="contact_left">
                <h1>Let's Talk!</h1>
                <p>I am always available to talk about tech, products, projects and share my experience!</p>
                <div className="contact_details">
                    <div className="contact_detail">
                        <img src={mail_icon} alt="" /> <p>uddeshsingh@gmail.com</p>
                    </div>
                    <div className="contact_detail">
                        <img src={call_icon} alt="" /> <p>+91 7506558839</p>
                    </div>
                    <div className="contact_detail">
                        <img src={location_icon} alt="" /> <p> Gurgaon, Haryana, India</p>
                    </div>
                </div>

            </div>
            <form onSubmit ={onSubmit} className="contact_right">
                <label htmlFor="">Your Name</label>
                <input type="text" placeholder='Enter your name' name='name' />
                <label htmlFor="">Your email</label>
                <input type="text" placeholder='Enter your email' name='email'/>
                <label htmlFor="">Write your message here</label>
                <textarea name="message" placeholder='Enter your message' rows="10"></textarea>
                <button type="submit" className='contact_submit'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Contact