import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import './Messages.css';
import { useAdditionalUser } from '../AdditionalUserContext.js';


function Messages() {
  const { additionalUserData } = useAdditionalUser();
   const [values, setValues] = useState([]);
  const [back, setBack] = useState("#FFFFFF");
  const [fore, setFore] = useState("#000000");
  const [size, setSize] = useState(256);
  const storedPhone = localStorage.getItem('phone');
  useEffect(() => {
    // Fetch QR codes from the API when the component mounts
    const fetchQRCodeValues = async () => {
      try {
        // Replace this URL with your actual API endpoint
        const response = await fetch(`https://localhost:7227/api/Booking/GetAllPassengerQrcode?PhoneNumber=${storedPhone}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data); // Log the data to see what is received
          setValues(data); // Assuming the API response has a property 'qrCodes' containing the list of QR codes
        } else {
          console.error('Failed to fetch QR codes');
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // Bad Request (HTTP status code 400)
          alert(error.response.data); // Display the error message in a basic alert
        } else {
        console.error('Error fetching QR codes:', error);
      }}
    };

    fetchQRCodeValues();
  }, []);

  const handleRemoveValue = (index) => {
    // Remove a QR code from the list based on its index
    const updatedValues = [...values];
    updatedValues.splice(index, 1);
    setValues(updatedValues);
  };

  return (
    <div className="App">
      <center>
        <div> <h1> Messages </h1>  </div>
        <br />
        <br />
        {values.map((value, index) => (
          <div key={index}>
            <p>Barcode {index + 1}</p>
            <QRCode
              title={`QR Code ${index + 1}`}
              value={value}
              bgColor={back}
              fgColor={fore}
              size={size === "" ? 0 : size}
            />
           
            <br />
            <br />
          </div>
        ))}

      </center>
    </div>
  );
}

export default Messages;
