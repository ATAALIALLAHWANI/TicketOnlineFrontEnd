import React, { useState, useEffect } from 'react';
import './DriverPage.css';
import serviceimage from "../assest/3.png";
import Footer from '../Homepage/Footer.js';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"; 
import { useAdditionalUser } from '../AdditionalUserContext.js'; 
import { useUser } from '../UserContext.js';

const DriverPage = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const navigate = useNavigate();
  const [idJourney, setIdJourney] = useState(''); 
  const [numberBus, setNumberBus] = useState(''); 
  const [busID, setBusID] = useState(''); 
  const [routeJourney, setRouteJourney] = useState(''); 
  const [destinationJourney, setDestinationJourney] = useState(''); 
  const [dateJourney, setDateJourney] = useState(''); 
  const [departuerJourney, setDepartuerJourney] = useState(''); 
  const { additionalUserData, setAdditionalUser } = useAdditionalUser(); 
  const { userData } = useUser();
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
   
  const getDayOfWeek = (dateString) => { 
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat']; 
    const date = new Date(dateString); 
    const dayIndex = date.getDay(); 
    return daysOfWeek[dayIndex]; 
  }; 
const [tripSchedules, setTripSchedules] = useState([
  {
    idJourney:'1',
    routeJourney: 'JUST - Amman',
    destinationJourney:'JUST,p1,p2,p3',
    dateJourney: '1-3-2024',
    departuerJourney: '3:30 - 4:15',
    numberBus:'222',
    busID:'1'
  },
]); 

useEffect(() => {
    const fetchAdditionalDriverData = async () => {
        try {
          setLoading(true);
      
          if (userData && userData.email && userData.password) {
            const response = await axios.post(`https://localhost:7227/api/Driver/GetDriverUsingPass?email=${userData.email}&password=${userData.password}`, {
            });
            console.log(response.data);
            if (response.status === 200) {
              setAdditionalUser(response.data);
              localStorage.setItem('additionalDriverData', JSON.stringify(response.data));
            } else if (response.status === 400) {
              // Bad Request (HTTP status code 400)
              alert(error.response.data); // Display the error message in a basic alert
            } else {
              const errorText = response.statusText;
              console.error('Error fetching additional user data:', response.status, errorText);
            }
          } else {
            console.error('Incomplete or missing userData:', userData);
          }
        } catch (error) {
          console.error('Error fetching additional user data:', error.message);
        } finally {
          setLoading(false);
        }
      };
      
      if (userData) {
        fetchAdditionalDriverData();
    }
  }, [userData, setAdditionalUser]);

  useEffect(() => {
    // Retrieve data from localStorage when the component mounts
    const storedDriverData = localStorage.getItem('additionalDriverData');
    if (storedDriverData) {
      setAdditionalUser(JSON.parse(storedDriverData));
    }
  }, []);
 
  useEffect(() => {
    const fetchJourney = async () => {
        try {
          setLoading(true);
      
          if (additionalUserData && additionalUserData.idDriver) {
            const response = await axios.post(`https://localhost:7227/api/Driver/GetAllJourneyDriver?idDriver=${additionalUserData.idDriver}`, {
            });
      
            if (response.status === 200) {
              setTripSchedules(response.data);
              localStorage.setItem('DriverJourney', JSON.stringify(response.data));
            } else if (response.status === 400) {
              // Bad Request (HTTP status code 400)
              alert(error.response.data); // Display the error message in a basic alert
            } else {
              const errorText = response.statusText;
              console.error('Error fetching trip data:', response.status, errorText);
            }
          } else {
            console.error('Incomplete or missing additionalUserData:', additionalUserData);
          }
        } catch (error) {
          console.error('Error fetching trip data:', error.message);
        } finally {
          setLoading(false);
        }
      };      
  
    if (additionalUserData) {
        fetchJourney();
    }
  }, [additionalUserData, setTripSchedules]);
  
  useEffect(() => {
    // Retrieve data from localStorage when the component mounts
    const storedDriverJourney = localStorage.getItem('DriverJourney');
    if (storedDriverJourney) {
      setTripSchedules(JSON.parse(storedDriverJourney));
    }
  }, []);

  return (
    <div>
    <div className="dropdown-container">
      <div className='navbar'>
        <h2>Driver Page 
          <Link className="noti"
                to="/Notification">
                <i className="fa-sharp fa-solid fa-bell"></i>
                Notification
                </Link></h2>
      </div>
      
      <div className='headar'><h1 className='h111'>Your journeys</h1></div>
      <div>
      <table className='table-admin'>
        <thead>
          <tr>
          <th>Route</th> 
            <th>Days</th> 
            <th>Date</th> 
            <th>Time</th> 
            <th>Pickup</th>
            <th>Number bus</th>
            <th>BusID</th>
          </tr>
        </thead>
        <tbody>
        {tripSchedules.map((schedule, scheduleIndex) => ( 
            <tr key={scheduleIndex} style={{backgroundColor: scheduleIndex % 2 === 0 ? '#fff' : '#f2f2f2'}}>
              <td>{schedule.routeJourney}</td> 
              <td>{getDayOfWeek(schedule.dateJourney)}</td> 
              <td>{schedule.dateJourney}</td> 
              <td>{schedule.departuerJourney}</td> 
              <td>
              <div key={scheduleIndex}>
              {schedule.destinationJourney.split(',').map((destinationPoint,destinationJourneyIndex)=>(
                <div key={destinationJourneyIndex}>
              <input 
              type="radio" 
              name={`destinationRadio_${scheduleIndex}`} 
              />{' '}{destinationPoint}
              </div>
              ))}
              </div>
              </td>
              <td>{schedule.numberBus}</td> 
              <td>{schedule.busID} {' '}</td>
            </tr>
          ))}          
        </tbody>
      </table>  
      </div>
    </div>
    </div>
    
  );
};

export default DriverPage;
