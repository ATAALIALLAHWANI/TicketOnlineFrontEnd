import './AddDriver.css'
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { useEffect, useState } from 'react';
import React from 'react';
import axios from "axios";

function AddDriver(){
    const [nameDriver, setrNameDriver] = useState('');
    const [emailDriver, setEmailDriver] = useState('');
    const [passwordDriver, setPasswordDriver] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [drivers, setDrivers] = useState([]);

    // State to manage form inputs
  const [formData, setFormData] = useState({
    nameDriver: '',
    emailDriver:'',
    passwordDriver: '',
  });

  // Handle form submission
  const handleSubmit =async (event) => {
    event.preventDefault();
    console.log('from data: ',formData);
    if (formData.nameDriver && formData.emailDriver && formData.passwordDriver) {
    setDrivers([...drivers, formData]);

    // Clear form inputs
    setFormData({
        nameDriver: '',
        emailDriver:'',
        passwordDriver: '',
    });
    try {
        // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
        const response = await axios.post('https://localhost:7227/api/Driver/AddDriver', formData);
  
        // Handle the response as needed
        console.log('Data submitted successfully:', response.data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // Bad Request (HTTP status code 400)
          alert(error.response.data); // Display the error message in a basic alert
        } else {
        console.error('Error submitting data:', error);
      }  
  }
}
};

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const savedData = localStorage.getItem('DriverInfo');
    if (savedData) {
      setDrivers(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage whenever tripSchedules is updated
  useEffect(() => {
    localStorage.setItem('DriverInfo', JSON.stringify(drivers));
  }, [drivers]);


    return(
        <div>
            <div className='headar'><h1 className='h11'>Add Driver</h1></div>
            <table className='table-admin'>
                {drivers.length>0 &&(
                <thead>
                    <tr>
                    <th>Driver name</th>
                    <th>Driver email</th>
                    <th>Password</th>
                    </tr>
                </thead>
                )}
                <tbody>
                    {drivers.map((driver, index) => (
                    <tr key={index} style={{backgroundColor: index % 2 === 0 ? '#fff' : '#f2f2f2'}}>
                    <td>{driver.nameDriver}</td>
                    <td>{driver.emailDriver}</td>
                    <td>{driver.passwordDriver}</td>
                    </tr>
                    ))}
                </tbody>
            </table>

      <div className='form_container'>
      <form onSubmit={handleSubmit}>
        <div className='form_headar'><h3>Add driver</h3></div>
      <label>
      Driver name:
          <input className='inp' type='text' name='nameDriver' value={formData.nameDriver} onChange={handleInputChange} />
        </label>
        <br></br>
        <label>
        Driver email: 
          <input className='inp' type='text' name='emailDriver' value={formData.emailDriver} onChange={handleInputChange} />
        </label>
        <br></br>
        <label>
        Driver password: 
          <input className='inp' type='text' name='passwordDriver' value={formData.passwordDriver} onChange={handleInputChange} />
        </label>
        <br></br>
        <button type='submit' className='submitt'>Add Journey</button>
      </form>
      </div>
        </div>
    );
}
export default AddDriver;
