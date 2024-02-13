// src/components/DropdownList.js
import React, { useState } from 'react';
import './AdminPage.css';
import serviceimage from "../assest/3.png";
import Footer from '../Homepage/Footer.js';
import { Link, useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const options = ['Add Journey','Display Journey','Display All Tickets','Display Unpaid','Display Users','Add driver','Display drivers','Display buses'];
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedValue(selectedOption);

    // Navigate to the corresponding page based on the selected option
    switch (selectedOption) {
        case 'Add Journey':
        navigate('/TripScheduleAdmin'); // Replace '/add-journey' with the actual route for the "Add Journey" page
        break;
        case 'Display Journey':
        navigate('/Journey'); 
        break;
        case 'Display All Tickets':
        navigate('/BusTickets'); // Replace '/display-paid' with the actual route for the "Display paid" page
        break;
        case 'Display Unpaid':
        navigate('/UnpaidTickets'); // Replace '/display-unpaid' with the actual route for the "Display Unpaid" page
        break;
        case 'Display Users':
        navigate('/Users'); 
        break;
        case 'Display drivers':
        navigate('/Drivers'); 
        break;
        case 'Add driver':
        navigate('/AddDriver'); 
        break;
        case 'Display buses':
        navigate('/Buses'); 
        break;
      default:
        // Handle other cases or do nothing
    }
  };

  return (
    <div className="dropdown-container">
      <h2>Admin Page</h2>
      <div className="image-container">
      
         <img
          src={serviceimage} 
          alt="Your Image"
          className="image"
        />
        <div className="dropdown-above-image">
          <label className='label' htmlFor="dropdown">What want to do ?</label>
          <select id="dropdown" value={selectedValue} onChange={handleSelectChange}>
            <option value="">Select an option</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;