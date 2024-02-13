import './SignUp.css'
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from "axios";
import { useAuth } from '../AuthContext.js';
import { useUser } from '../UserContext.js';

function SignUp(){
    const { updateUserData } = useUser();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const {login} =useAuth();
    const navigate = useNavigate();

    const data = {
      passengerName: name,
      passengerPhone: phone,
      passengerEmail: email,
      passengerPassword: password,
    };
    
  
async function handleSignUp(event) {
  event.preventDefault();
  setIsLoading(true); // Set loading state to true
  
    // Validation checks for name
    if (name.length < 4 || name.length > 20 || !/^[a-zA-Z]+$/.test(name)) {
      setNameError("It must be between 4 and 20 letters and contain only letters.");
      return;
    }else{setNameError('');}

    // Validation checks for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      return;
    } else {
      setEmailError('');
    }

    // Validation checks for phone
    const PhoneRegex = /^(?:\+962|0)?7[789]\d{7}$/;
    if (!PhoneRegex.test(phone)) {
      setPhoneError('Please enter a valid number');
      return;
    } else {
      setPhoneError('');
    }

    // Validation checks for password
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
      setPasswordError('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.');
      return;
    } else {
      setPasswordError('');
    }
  const response = await axios.post('https://localhost:7227/api/Passenger/AddPassenger', data);

  if (response.status === 200) {
    // Handle successful sign-up
    console.log("Sign-up successful!");
    // Redirect to login page or other appropriate page
    navigate('/');
    login();
    updateUserData({email, password})
  } else {
    console.error("Error:", response.data.error);
  }
}

    return (
      <div className='full-screen-container'>
      <div className="container-ath">
        <div className="header-ath">
          <div className="text">
            <u>Si</u>gn Up
          </div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1.3em"
              fill="#797979"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            </div>
            {nameError && <div className="error-message">{nameError}</div>}
  
          <div className="input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1.3em"
              fill="#797979"
              viewBox="0 0 512 512"
            >
              <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
            </svg>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {emailError && <div className="error-message">{emailError}</div>}
          
          <div className="input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1.3em"
              fill="#797979"
              viewBox="0 0 512 512"
            >
              <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
            </svg>
            <input
              type="text"
              placeholder="Enter your phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          {phoneError && <div className="error-message">{phoneError}</div>}

          <div className="input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1.3em"
              fill="#797979"
              viewBox="0 0 448 512"
            >
              <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
            </svg>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {passwordError && <div className="error-message">{passwordError}</div>}
        </div>
        <div className="submitContainer">
        <button type="button" className="submit" onClick={handleSignUp}>Sign Up</button>

        </div>
        <div className="Login">
          Already have an account?<Link to="/Login" ><span> Login now </span></Link>
        </div>
      </div>
      </div>
    );
    
    }

    export default SignUp;