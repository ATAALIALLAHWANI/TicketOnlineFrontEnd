import Destination from "../components/Homepage/Destination.js";
import Hero from "../components/Homepage/Hero.js";
import Navbar from "../components/Homepage/Navbar.js";
import Trip from "../components/Homepage/Trip.js";
import Footer from "../components/Homepage/Footer.js";
import React, { useState } from 'react';
import { useAuth } from "../components/AuthContext.js";

function Home(){
    const {isLoggedIn}=useAuth();
return(
    <>
    <Navbar/>
   <Hero
   cName="hero"
   heroImg="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
   title="Just Go"
   text="The process of transporting students to universities has become easier through us"
   buttonText="Reserve Your Ticket"
   btnClass="Show"
   isLoggedIn={isLoggedIn}
   />
   <Destination/>
   <Trip/>
   <Footer/>
    </>
)
}
export default Home;