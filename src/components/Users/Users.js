// src/Users.js
import React, { useState, useEffect } from 'react';
import './Users.css';


const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data (replace this with your actual API endpoint)
    fetch('https://localhost:7227/api/Passenger/GetPassengers')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
      <h1>User Information</h1>
      <ul>
        {users.map((user) => (
          <li className='li' key={user.idPassenger}>
            <strong className='strongg'>{user.passengerName}</strong>
            <p>Email: {user.passengerEmail}</p>
            <p>Username: {user.passengerName}</p>
            <p>PhoneNumber: {user.passengerPhone}</p>
            <p>block: {user.blocked}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;