import React, { useState, useEffect } from 'react';
import axios from "axios";
import { FaSpinner } from 'react-icons/fa';

import './BusTickets.css';

const BusTickets = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    // Replace 'your_api_endpoint' with the actual API endpoint
    fetch('https://localhost:7227/api/Booking/GetAllBooking')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error reading API data', error));
  }, []);

  if (!data.length) {
    return <div className="loading-spinner"><FaSpinner className="spinner" /></div>;
  }

  const ticketData = [];


  return (
    <div className="bus-tickets">
      <h1>Bus Reservation Tickets</h1>
      <div className="ticket-list">
        {data.map((item, index) => (
          <div key={index} className="ticket-card">
            <p>Reserved Tickets </p>
            <p>-------------------------------------------------------</p>
            <p><i className="fas fa-user"></i> ID Booking: {item.idBooking}</p>
            <p><i className="fas fa-user"></i> Phone Passenger: {item.phonePassenger}</p>

            <p><i className="fa-sharp fa-solid fa-location-dot"></i> Status Booking: {item.statusBooking}</p>
            {item.journeyoBo && (
              <div>
                <p><i className="fa-solid fa-location-crosshairs"></i> Route Journey: {item.journeyoBo.routeJourney}</p>
                <p><i className="fa-solid fa-location-crosshairs"></i> Pickup Journey: {item.journeyoBo.destinationJourney}</p>
                <p><i className="fa-regular fa-calendar-days"></i> Date Journey: {item.journeyoBo.dateJourney}</p>  
                <p><i className="fa-regular fa-clock"></i> Time Journey : {item.journeyoBo.departuerJourney}</p>
                <p><i className="fa-solid fa-money-check-dollar"></i> Price: 2.5 JD</p>
                {/* Uncomment the following line if you have seatsBooking property */}
                <p><i className="fa-solid fa-chair"></i> Seat Number: {item.seatsBooking}</p>
              </div>
            )}
            <p>-------------------------------------------------------</p>
          </div>
        ))}
      </div>
    </div>
  );
  
  }
export default BusTickets;



