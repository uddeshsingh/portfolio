import React from 'react'
import Hero from './Components/Hero/Hero'
import Navbar from './Components/Navbar/Navbar'
import About from './Components/About/About'
import Service from './Components/Service/Service'

const App = () => {
  return (
    <div> 
      
       <Navbar/>
       <Hero/>
       <About/>    
       <Service/>
    </div>
   
  )
}

export default App