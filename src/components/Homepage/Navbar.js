import React, { useState } from 'react';
import { Component } from "react";
import "./NavbarStyles.css";
import {Link} from "react-router-dom";
import MenuItems from "./MenuItems";
import { useAuth } from '../AuthContext.js';

const Navbar =()=> {
    const [clicked, setClicked] = useState(false);
    const { isLoggedIn } = useAuth(); 

    const handleClick = () => {
      setClicked(!clicked);
    };
    const handleJUSTGO = () => {
      window.location.href = '/';
      };
    
        return(
    <nav className="NavbarItems">
        <h1 className="navbar-logo" onClick={handleJUSTGO} >JUSTGO</h1>
        <div className="menu-icons" onClick={handleClick}>
      < i className={clicked ? "fas fa-times":"fas fa-bars"}></i>
        </div>
        <ul className={clicked? "nav-menu active" :"nav-menu"} >
        

            {MenuItems().map((item,index)=>{
                return(
                    <li key={index}>
                <Link className={item.cName}
                to={item.url}>
                <i className={item.icon}></i>
              {item.title}
                </Link>
            </li>

                )
            })}
            {!isLoggedIn && <Link to="/SignUp"><button className='sign' >Sign Up</button></Link>}
            {!isLoggedIn && <Link to="/Login"><button className='buttonn'>Login</button></Link>}
        </ul>
    </nav>
        )
    
}
export default Navbar;