import React from 'react'
import "./App.css"
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
      
       <section id='navbar'><Navbar/></section>
       <section><Hero/></section>
       <section id='about'><About/></section>
       <section><Service/></section>
       <section><Education/></section>
       <section><Contact/></section>
       <section id='footer'><Footer/></section>
    </div>
   
  )
}

export default App