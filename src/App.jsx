import React from 'react'
import Hero from './Components/Hero/Hero'
import Navbar from './Components/Navbar/Navbar'
import About from './Components/About/About'
import Service from './Components/Service/Service'
import Education from './Components/Education/Education'
import Contact from './Components/Contact/Contact'
import Footer from './Components/Footer/Footer'

const App = () => {
  return (
    <div> 
      
       <Navbar/>
       <Hero/>
       <About/>    
       <Service/>
       <Education/>
       <Contact/>
       <Footer/>
    </div>
   
  )
}

export default App