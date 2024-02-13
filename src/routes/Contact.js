import Hero from "../components/Homepage/Hero.js";
import Navbar from "../components/Homepage/Navbar.js";
import contactimage from "../components/assest/2.png"
import Footer from "../components/Homepage/Footer.js";
import ContactForm from "../components/Homepage/ContactForm.js";
function Contact(){
    return(
        <>
        <Navbar/>
        <Hero
   cName="hero-mid"
   heroImg={contactimage}
   title="Contact"
   text=""
   buttonText=""
   
   btnClass="hide"
   />
<ContactForm/>
        <Footer/>
        </>
    )
    }
    export default Contact;