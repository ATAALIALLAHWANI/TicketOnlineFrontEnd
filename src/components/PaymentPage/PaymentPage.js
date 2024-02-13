import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from "../Homepage/Footer.js";
import Navbar from '../Homepage/Navbar.js';
import bus from "../assest/bus.png";
import './PaymentPage.css';
import Swal from 'sweetalert2';
import axios from "axios";
import { useUser } from '../UserContext.js';
import { useUserSelection } from '../UserSelectionContext.js';
import { useUserSeat } from '../SelectedSeatsContext.js';
import { useAdditionalUser } from '../AdditionalUserContext.js';

function Payment() {
    const [pay, setPay] = useState('');
    const [selectedOption, setSelectedOption] = useState('option1');
    const navigate =useNavigate();
    const { userData } = useUser();
    const { userSelection, setSelection } = useUserSelection();
    const { selectedSeats, setSeatsSelection } = useUserSeat();
    const { additionalUserData } = useAdditionalUser();
    const storedPhone = localStorage.getItem('phone');
    const storedTrip = localStorage.getItem('selectedTrip');
    const [loading, setLoading] = useState(false);

    const handleRadioChange = (event) => {
       setSelectedOption(event.target.value);
    };

    const handleContinueClick = async () => {
      let seat = selectedSeats;
      if (!selectedSeats){
        seat = 9;
      }
      try {
          const bookingData = {
            dateBook: "2025-2-2",
            statusBooking: "not pay",
            tickitPrice: 2.5,
            seatsBooking: seat,
            phonePassenger: storedPhone,
            journeyoBo: JSON.parse(storedTrip)
          };
          
          await axios.post('https://localhost:7227/api/Booking/AddBooking', bookingData);
          console.log('bookingData', bookingData);
          if (selectedOption === 'option1') {
            navigate('/CreditCard');
          } else {
            Swal.fire({
              text: 'Your reservation was successful!',
              confirmButtonColor: 'rgb(1, 169, 1)',
              icon: 'success',
              width: '370px',
              timer: 3000,
              timerProgressBar: true,
              willClose: () => {
                navigate('/');
              },
            });
          }
    } catch (error) {
    if (error.response && error.response.status === 400) {
      // Bad Request (HTTP status code 400)
      alert(error.response.data); // Display the error message in a basic alert
    } else {
      console.error('Error saving booking:', error);
    }
  }
};

    return (
      <div>
       <img src={bus} alt="bus" className='bus'/>
       <div className="Payment-container">
        <div className="Payment-header">
        <h1>Payment</h1>
        </div>
        <div className="radio">
        <label>
          <input
            type="radio"
            value="option1"
            checked={selectedOption === 'option1'}
            onChange={handleRadioChange}
          />
         {' '} Credit Card
        </label>
        <br></br>
        <br></br>
        <label>
          <input
            type="radio"
            value="option2"
            checked={selectedOption === 'option2'}
            onChange={handleRadioChange}
          />
         {' '} Cash
        </label>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div >
        <div className="Price">
        <strong>Price:</strong> 2.5 JD
        </div> 
        <button className="Continuationn" onClick={handleContinueClick}>Continue</button>
        <Link to="/" className="link"><button className="Cancel">Cancel</button></Link>
        </div>
        </div>
        </div>
    );
    }

function PaymentPage() {
  return (
    <div>
      <Navbar />
      <Payment/>
      <Footer />
    </div>
  );
  }
  
  export default PaymentPage;