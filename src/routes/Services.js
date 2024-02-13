import Navbar from "../components/Homepage/Navbar.js";
import Hero from "../components/Homepage/Hero.js";
import serviceimage from "../components/assest/3.png";
import Footer from "../components/Homepage/Footer.js";
import Trip from "../components/Homepage/Trip.js";
function Services(){
    return(
        <>
        <Navbar/>
        <Hero
   cName="hero-mid"
   heroImg={serviceimage}
   title="Services"
   text=""
   buttonText=""
   
   btnClass="hide"
   />
<Trip/>
        <Footer/>
        </>
    )
    }
    export default Services;