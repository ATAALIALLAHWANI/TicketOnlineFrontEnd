import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import Footer from "../Homepage/Footer.js"; 
import Navbar from '../Homepage/Navbar.js'; 
import bus from "../assest/bus.png"; 
import './TicketDetails.css'; 
import axios from "axios";  
import { useUserSelection } from '../UserSelectionContext.js';
import { useUserSeat } from '../SelectedSeatsContext.js';

function Ticket(){ 
    const [route, setRoute] = useState('');  
    const [destination, setDestination] = useState('');  
    const [date, setDate] = useState('');  
    const [time, setTime] = useState('');  
    const [Pickup, setPickup] = useState([]);  
    const [seatNumber, setseatNumber] = useState([]);  
    const [loading, setLoading] = useState(false);  
    const [error, setError] = useState(null);  
    const [allData, setAllData] = useState([]);  
    const navigate = useNavigate(); 
    const { userSelection, setSelection } = useUserSelection();
    const { selectedSeats, setSeatsSelection } = useUserSeat();
    

  useEffect(() => {
    // Retrieve data from localStorage
    const storedTrip = localStorage.getItem('selectedTrip');

    if (storedTrip) {
      // If there's stored data, set the selection
      setSelection(JSON.parse(storedTrip));
    }
  }, []);

console.log(selectedSeats);
    const [data, setData] = useState({  
        route: '',  
        destination:'',  
        date: '',  
        time: '',  
        Pickup:'', 
        seatNumber:'', 
    }); 
    useEffect(() => {
      if (userSelection) {
        localStorage.setItem('selectedTrip', JSON.stringify(userSelection));
        // Store other necessary data in localStorage
      }
    }, [userSelection]);
  return (
    <div>
      <img src={bus} alt="bus" className='bus'/>
      <div className="ticket-container">
        <div className="ticket-info">
          <div className="ticket-header">
            <h1>Ticket details</h1>
          </div>          
            <div>
              <svg xmlns="http://www.w3.org/2000/svg"
                height="35"
                width="40"
                viewBox="0 0 576 512">
                <path d="M288 0C422.4 0 512 35.2 512 80V96l0 32c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32l0 160c0 17.7-14.3 32-32 32v32c0 17.7-14.3 32-32 32H416c-17.7 0-32-14.3-32-32V448H192v32c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32l0-32c-17.7 0-32-14.3-32-32l0-160c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h0V96h0V80C64 35.2 153.6 0 288 0zM128 160v96c0 17.7 14.3 32 32 32H272V128H160c-17.7 0-32 14.3-32 32zM304 288H416c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32H304V288zM144 400a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm288 0a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM384 80c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16s7.2 16 16 16H368c8.8 0 16-7.2 16-16z"/>
              </svg>

              <span className="details-item1"><strong>{userSelection && userSelection.routeJourney}</strong></span>
              <hr></hr>
              
              <div className="details-item">
              <strong>Date:</strong>{userSelection ? userSelection.dateJourney : ''}
              </div>
              <hr></hr>
              <div className="details-item">
              <strong>Time:</strong>{userSelection ? userSelection.departuerJourney : ''}
              </div>
              <hr></hr>
              <div className="details-item">
              <strong>Pickup:</strong>{userSelection ? userSelection.destinationJourney : ''}
            </div>
          <hr></hr>
          <div className="details-item">
          <strong>Seat number:</strong>{selectedSeats}
          </div>
          <hr></hr>

          <div className="details-item">
        <strong>price:</strong> 2.5 JD
     </div>
     <br></br>
    <br></br>
     <br></br>             
              <div>
                <Link to="/PaymentPage" className="link">
                  <button className="Continuation"><span>Continue</span></button>
                </Link>
              </div>
            </div>
        </div>   
      </div>
    </div>
  );
}
 
function TicketDetails() { 
     
 
  return ( 
    <div> 
      <Navbar /> 
      <Ticket /> 
      <Footer /> 
    </div> 
  ); 
  } 
   
  export default TicketDetails;
