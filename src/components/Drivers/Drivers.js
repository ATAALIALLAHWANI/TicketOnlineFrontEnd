import React, { useState, useEffect } from 'react';
import './Drivers.css';

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    // Fetch user data (replace this with your actual API endpoint)
    fetch('https://localhost:7227/api/Driver/GetDriver')
      .then((response) => response.json())
      .then((data) => setDrivers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
      <h1>Driver Information</h1>
      <ul>
        {drivers.map((driver) => (
          <li className='li' key={driver.idDriver}>
            <strong className='strongg'>{driver.nameDriver}</strong>
            <p>Email: {driver.emailDriver}</p>
            <p>Username: {driver.nameDriver}</p>
            <p>password: {driver.passwordDriver}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Drivers;
