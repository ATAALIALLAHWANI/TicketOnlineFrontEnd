import React, { useState, useEffect } from 'react';
import './Profile.css'; 
import profileImage from '../assest/11.jpg'; 
import { Link, useNavigate } from 'react-router-dom';
import { useAdditionalUser } from '../AdditionalUserContext.js'; 
import { useAuth } from '../AuthContext.js';
import { useUser } from '../UserContext.js';

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { userData } = useUser();
  const { additionalUserData, setAdditionalUser } = useAdditionalUser(); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAdditionalUserData = async () => {
      try {
        setLoading(true);
  
        // Check if userData is complete and exists
        if (userData && userData.email && userData.password) {
          const response = await fetch(`https://localhost:7227/api/Passenger/GetPassengersUsingPass?email=${userData.email}&password=${userData.password}`, {
            method: 'POST',            
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: userData.email,
              password: userData.password,
            }),
          });
  
          if (response.ok) {
            const data = await response.json();
            // Exclude sensitive information before setting the state
            const { passengerPassword, ...nonSensitiveData } = data;
            setAdditionalUser(nonSensitiveData);
            localStorage.setItem('additionalUserData', JSON.stringify(nonSensitiveData));
            localStorage.setItem('phone', nonSensitiveData.passengerPhone);
          }else {
            const errorText = await response.text();
            console.error('Error fetching additional user data:', response.status, errorText);
            
            if (response.status === 400) {
              // Bad Request (HTTP status code 400)
              alert(errorText); // Display the error message in a basic alert
            }
          }
        } else {
          console.error('Incomplete or missing userData:', userData);
        }
      } catch (error) {
        console.error('Error fetching additional user data:', error.message);
      } finally {
        setLoading(false);
      }
    };
  
    // Fetch additional user data when userData is available
    if (userData) {
      fetchAdditionalUserData();
    }
  }, [userData, setAdditionalUser]);
 
  useEffect(() => {
    // Retrieve data from localStorage when the component mounts
    const storedUserData = localStorage.getItem('additionalUserData');
    if (storedUserData) {
      setAdditionalUser(JSON.parse(storedUserData));
    }
  }, []);

  const handleLogout = () => {
    // Clear data from localStorage on logout
    localStorage.removeItem('additionalUserData');
    logout();
    navigate('/');
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Profile image */}
        <div className="profile-image">
          <img src={profileImage} alt="Profile" />
        </div>
        {/* User information */}
        <div className="profile-info">
          <h3>Profile Information</h3>
          {additionalUserData && (
            <>
              <p>
                <strong><i className="fa-solid fa-user"></i> Username:</strong> {additionalUserData.passengerName}
              </p>
              <p>
                <strong><i className="fa-solid fa-envelope"></i> Email:</strong> {additionalUserData.passengerEmail}
              </p>
              <p>
                <strong><i className="fa-solid fa-phone"></i> Phone Number:</strong> {additionalUserData.passengerPhone}
              </p>
              <p>
                <strong><i className="fa-solid "></i> Blocked:</strong> {additionalUserData.blocked}
              </p>
            </>
          )}
          <button className='Sign-out' onClick={handleLogout}>Sign out</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;