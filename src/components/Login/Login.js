import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from "axios";
import { useAuth } from '../AuthContext.js';
import { useUser } from '../UserContext.js';

function Login(){
    const { updateUserData } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userType, setUserType] = useState(null);
    const [loginInformation, setLoginInformation] = useState('');
    const navigate = useNavigate();
    const {login} =useAuth();
    

      async function handleLogIn(event) {
        event.preventDefault();
      
        if (!email || !password) {
          setLoginInformation('Incorrect username or password.');
          return;
        } else {
          setLoginInformation('');
        }
        if (!userType) {
          // Alert the user if no user type is selected
          Swal.fire({
          text: "Please select a user type",
          confirmButtonColor:'#000',
          width:'300px'      
          });
          return;
        }
        // login();
        // navigate('/');
        try {
          let response;
          switch (userType) {
            case 'User':
              response = await axios.get(`https://localhost:7227/api/Passenger/CheckPassenger?email=${email}&password=${password}`);
              break;
            case 'Admin':
              response = await axios.get(`https://localhost:7227/api/Admin/CheckedAdmin?email=${email}&password=${password}`);
              break;
            case 'Driver':
              response = await axios.get(`https://localhost:7227/api/Driver/CheckDriver?email=${email}&password=${password}`);
              break;
          }
      
          const userExists = response.data;
          console.log('User exists:', userExists);
      
          if (userExists > 0) {
            setIsLoading(true); // Set loading state to true
            updateUserData({email, password})
          }
       
          if (response.status === 200 && userExists > 0) {
            // Handle successful sign-up
            console.log("Sign-in successful!");
            switch (userType) {
              case 'User':
                navigate('/');
                login();
                break;
              case 'Admin':
                navigate('/AdminPage');
                break;
              case 'Driver':
                navigate('/DriverPage');
                break;
            }
          } else {
            console.error("Error:", response.data.error);
            setLoginInformation('Incorrect username or password.');
          }
          
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setIsLoading(false); // Set loading state back to false, whether the request succeeds or fails
        }
      }
    
    return(
      <div className='full-screen-container'>
    <div className="container-ath">
    <div className="header-ath">
    <div className="text">
    <u>Lo</u>gin
    </div>
      {isLoading && <div>  is done  </div>}


    <div className="underline"></div>
    
    </div> 
    <div className="inputs-login">
    {loginInformation && <div className="error-messagel">{loginInformation}</div>}
    <div className="input-login">
    <svg xmlns="http://www.w3.org/2000/svg" height="1.3em" fill="#797979" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
        <input type="text" placeholder='Enter your email'  value={email}
              onChange={(e) => setEmail(e.target.value)}/>
    </div>
    <div className="input-login">
    <svg xmlns="http://www.w3.org/2000/svg" height="1.3em" fill="#797979" viewBox="0 0 448 512"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>    
    <input type="password" placeholder='Enter your password'  value={password}
              onChange={(e) => setPassword(e.target.value)}/>
    </div>
    </div>
    <div className="forgotPassword">Forgot Password? <span>Click Here!</span></div>
    <div className='radioContainer' >
      <label><input type="radio" name='userType' value='User'onChange={() => setUserType('User')}/>User</label>
      <label><input type="radio" name='userType'value='Admin'onChange={() => setUserType('Admin')} />Admin</label>
      <label><input type="radio" name='userType'value='Driver'onChange={() => setUserType('Driver')}/>Driver</label>
    </div>
    <div className="submitContainer">
    <button type="button" className="submit" onClick={handleLogIn}> Log In</button>
    </div>
    <div className="Login">Don’t have an account? <Link to="/SignUp"><span>Signup now </span></Link></div>
    </div></div>
    )
    }
    export default Login;