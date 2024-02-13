import Navbar from "../components/Homepage/Navbar.js";
import Hero from "../components/Homepage/Hero.js";
import Footer from "../components/Homepage/Footer.js";
import AboutUs from "../components/Homepage/AboutUs.js";
function About(){
    return(
        <>
        <Navbar/>
        <Hero
   cName="hero-mid"
   heroImg="https://images.unsplash.com/photo-1509749837427-ac94a2553d0e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
   title="About"
   text=""
   buttonText=""
   
   btnClass="hide"
   />
<AboutUs/>
        <Footer/>
        </>
    )
    }
    export default About;