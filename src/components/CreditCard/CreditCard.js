import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from "../Homepage/Footer.js";
import Navbar from '../Homepage/Navbar.js';
import bus from "../assest/bus.png";
import './CreditCard.css';
import axios from "axios";
import Swal from 'sweetalert2';
import { useUser } from '../UserContext.js';
import { useUserSelection } from '../UserSelectionContext.js';
import { useUserSeat } from '../SelectedSeatsContext.js';
import { useAdditionalUser } from '../AdditionalUserContext.js';

function PaymentInfo(){
  const [pay, setPay] = useState('');
  const [CardNumber, setCardNumber] = useState('');
  const [Name, setName] = useState('');
  const [ExpirationDate, setExpirationDate] = useState('');
  const [CVV, setCVV] = useState('');
  const [CardNumberError, setCardNumberError] = useState('');
  const [NameError, setNameError] = useState('');
  const [ExpirationDateError, setExpirationDateError] = useState('');
  const [CVVError, setCVVError] = useState('');
  const { userData } = useUser();
  const { additionalUserData } = useAdditionalUser();
  const { userSelection, setSelection } = useUserSelection();
  const { selectedSeats, setSeatsSelection } = useUserSeat();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const storedPhone = localStorage.getItem('phone');

  const [formData, setFormData] = useState({
    statusBooking:'',
});

const handleContinue = async () => {
    
      // Validation checks for CardNumber
      if (!/^[0-9]{16}$/.test(CardNumber)) {
        setCardNumberError("Please enter a valid card number");
        return;
      }else{setCardNumberError('');}
  
      // Validation checks for name
      const nameRegex = /^[a-zA-Z\s]+$/;
      if (!nameRegex.test(Name)) {
        setNameError('Please enter a valid name');
        return;
      } else {
        setNameError('');
      }
  
      // Validation checks for Expiration Date
      const ExpirationDateRegex = /^((0[1-9])|(1[0-2]))\/\d{2}$/;
      if (!ExpirationDateRegex.test(ExpirationDate)) {
        setExpirationDateError('Please enter a valid Expiration Date');
        return;
      } else {
        setExpirationDateError('');
      }
  
      // Validation checks for CVV
      if (!/^[0-9]{3}$/.test(CVV)) {
      setCVVError('Please enter a valid CVV');
      return;
      } else {
      setCVVError('');
      }

      // const passengerPhone = additionalUserData.passengerPhone;
      if (!CardNumberError && !NameError && !ExpirationDateError && !CVVError) {
        try {
          const response = await axios.post(`https://localhost:7227/api/Booking/AcceptPay2?PhoneNumber=${storedPhone}`);
          console.log('API response:', response.data);
        Swal.fire({
          text: 'Your reservation was successful!',
          confirmButtonColor: 'rgb(1, 169, 1)',
          icon: 'success',
          width: '370px',
          timer: 3000, // Adjust the timer (in milliseconds) based on your preference
          timerProgressBar: true,
          willClose: () => {
            navigate('/');
          },
        });
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // Bad Request (HTTP status code 400)
          alert(error.response.data); // Display the error message in a basic alert
        } else {
        console.error('Error saving booking:', error);
        // Handle error, show alert, etc.
      }}
      }
  }

    return (
      <div>
       <img src={bus} alt="bus" className='bus'/>
       <div className="PaymentInfo-container">
        <div className="PaymentInfo-header">
        <h1>Credit/Debit Card</h1>
        </div>
        <div className="iinputs">
        
        <div className="iiinput">
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        height="1.7em" 
        fill="#797979"
        viewBox="0 0 576 512">
        <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"/></svg>
            <input
              type="text"
              value={CardNumber}
              placeholder="Card number"
              onChange={(e) => setCardNumber(e.target.value)}
            />
            </div>
            {CardNumberError && <div className="error-messagee">{CardNumberError}</div>}
          <div className="iinput">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1.7em"
              fill="#797979"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
            <input
              type="text"
              value={Name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {NameError && <div className="error-messagee">{NameError}</div>}

          <div className="iinput">
          <svg xmlns="http://www.w3.org/2000/svg" 
          height="1.7em" 
          fill="#797979"
          viewBox="0 0 448 512">
          <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"/>
          </svg>
            <input
              type="text"
              value={ExpirationDate}
              placeholder="Expiration date"
              onChange={(e) => setExpirationDate(e.target.value)}
            />
            
          </div>
          {ExpirationDateError && <div className="error-messagee">{ExpirationDateError}</div>}

          <div className="iinput">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1.7em"
              fill="#797979"
              viewBox="0 0 448 512"
            >
              <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
            </svg>
            <input
              type="text"
              value={CVV}
              placeholder="CVV"
              onChange={(e) => setCVV(e.target.value)}
            />
          </div>
          {CVVError && <div className="error-messagee">{CVVError}</div>}

        </div>
        <br></br>
        <br></br>
        <div >
        <div className="Price">
        <strong>Price:</strong> 2.5 JD
        </div> 
        <Link className="link"><button className="Continuationn" onClick={handleContinue}><span>Continue</span></button></Link> 
        <Link to="/PaymentPage" className="link"><button className="Cancel"><span>Cancel</span></button></Link>
        </div>
        </div>
        </div>
    );
}

function CreditCard() {
  return (
    <div>
      <Navbar />
      <PaymentInfo />
      <Footer />
    </div>
  );
  }
  
  export default CreditCard;