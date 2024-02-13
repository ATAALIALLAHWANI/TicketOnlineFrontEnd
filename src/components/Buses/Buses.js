import React, { useState, useEffect } from 'react';
import './Buses.css';

const Drivers = () => {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    // Fetch user data (replace this with your actual API endpoint)
    fetch('https://localhost:7227/api/Bus/GetBus')
      .then((response) => response.json())
      .then((data) => setBuses(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
      <h1>Buses Information</h1>
      <ul>
        {buses.map((bus) => (
          <li className='li' key={bus.idBus}>
            <p>ID: {bus.idBus}</p>
            <p>Bus capacity: {bus.capacityBus}</p>
            <p>Bus model: {bus.modelBus}</p>
            <p>ID Driver: {bus.idDriver}</p>
            <p>ID Scanner: {bus.idScanner}</p>
            <p>Number Bus: {bus.numberBus}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Drivers;
