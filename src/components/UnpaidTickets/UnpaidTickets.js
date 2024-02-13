import React, { useState, useEffect } from 'react';
import './UnpaidTickets.css';
import axios from "axios";
import { FaSpinner } from 'react-icons/fa';

const UnpaidTickets = () => {
  // Sample data for unpaid tickets
  const [unpaidTickets, setUnpaidTickets] = useState([]);
  const [data, setData] = useState(null);
  useEffect(() => {
    // Replace 'your_api_endpoint' with the actual API endpoint
    //GET Booking info in josn file
    fetch('https://localhost:7227/api/Booking/GetBookingNotPay')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error reading API data', error));
  }, []);

  if (!data) {
    return <div className="loading-spinner"><FaSpinner className="spinner" /></div>;
  }

  const handleAccept = async (id) => {
  
    try {
      // Make an API call to mark the ticket as paid
      const response = await fetch(`https://localhost:7227/api/Booking/AcceptPay?IdBooking=${id}`, {
        method: 'PUT',
        // Additional headers or credentials, if required
      });
  
      if (response.ok) {
        // If the API call is successful, update the UI or remove the ticket from the unpaidTickets list
        const updatedTickets = unpaidTickets.filter((ticket) => ticket.id !== id);
        setUnpaidTickets(updatedTickets);
        alert("Accept paid");
        window.location.href = '/UnpaidTickets';
      } else if (response.status === 400) {
        // Bad Request (HTTP status code 400)
        alert("failed accept paid "); // Display the error message in a basic alert
        window.location.href = '/UnpaidTickets';
      } else {
        // Handle error scenarios if needed
        console.error('Failed to mark the ticket as paid');
      }
    } catch (error) {
      console.error('Error marking ticket as paid:', error);
    }
  };
  
  // Function to handle deleting a ticket
  const handleDelete = async (id , PhoneNumber) => {
    try {
      // Make an API call to delete the ticket
      const response = await fetch(`https://localhost:7227/api/Passenger/AddBlocked?phoneNumber=${PhoneNumber}&IdBooking=${id}`, {
    method: 'PUT',
    // Additional headers or credentials, if required
    });

  
      if (response.ok) {
        // If the API call is successful
        const updatedTickets = unpaidTickets.filter((ticket) => ticket.id !== id);
        setUnpaidTickets(updatedTickets);
        alert("delete is successful"); // Display the error message in a basic alert
        window.location.href = '/UnpaidTickets';
        
        
    } else {
        // Handle error scenarios if needed
        console.error('Failed to delete the ticket');
    }
    
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

const filteredData = data.filter(item => item.statusBooking === "not pay");
  
return (
  <div className="unpaid-tickets">
    <h1>Unpaid Tickets</h1>
    <div className="ticket-list">

{filteredData.map((item, index) => (
 
        <div className="ticket-card" key={index}>
            <p>Reserved Tickets </p>
          <p>-------------------------------------------------------</p>
          <p> <i class="fas fa-user"></i> ID Booking: {item.idBooking}</p>
          <p> <i class="fas fa-user"></i>  phone Passenger: {item.phonePassenger}</p>

          <p><i class="fa-sharp fa-solid fa-location-dot"></i> Route Journey: {item.journeyoBo.routeJourney}</p>
          <p><i class="fa-solid fa-location-crosshairs"></i>Pickup: {item.journeyoBo.destinationJourney}</p>
          <p><i class="fa-regular fa-calendar-days"></i> Date Journey: {item.journeyoBo.dateJourney}</p>
             <p><i class="fa-regular fa-clock"></i> Time Journey : {item.journeyoBo.departuerJourney}</p>
             <p><i class="fa-solid fa-money-check-dollar"></i> Price: 2.5 JD</p>
             <p><i class="fa-solid fa-chair"></i> Seat Number: {item.seatsBooking}</p>
            <p>-------------------------------------------------------</p>

            <div className="button-group">
        <button onClick={() => handleAccept(item.idBooking)}>Accept</button>
        <button onClick={() => handleDelete(item.idBooking, item.phonePassenger)}>Delete</button>
    </div>
           </div>
      ))}
    </div>
  </div>
);

}
export default UnpaidTickets;
