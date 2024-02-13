import React, { useEffect, useState, useContext } from 'react';
import './TripSchedule2.css';
import { Link } from 'react-router-dom';
import bus from "../assest/bus.png";
import Footer from "../Homepage/Footer.js";
import Navbar from '../Homepage/Navbar.js';
import Swal from 'sweetalert2';
import Modal from '../ChooseSeat/Modal.js';
import axios from "axios"; 
import { useUserSelection } from '../UserSelectionContext.js';

function TripScheduleTable() {
  const [idJourney, setIdJourney] = useState(''); 
  const [numberBus, setNumberBus] = useState(''); 
  const [busID, setBusID] = useState(''); 
  const [routeJourney, setRouteJourney] = useState(''); 
  const [destinationJourney, setDestinationJourney] = useState(''); 
  const [dateJourney, setDateJourney] = useState(''); 
  const [departuerJourney, setDepartuerJourney] = useState(''); 
  const [AvailableSeats, setAvailableSeats] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [selectedSchedule, setSelectedSchedule] = useState(null); 
  const [dateBooking, setDateBooking] = useState(''); 
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { setSelection } = useUserSelection();

  function getDate() { 
    const today = new Date(); 
    const month = today.getMonth() + 1; 
    const year = today.getFullYear(); 
    const date = today.getDate(); 
    return `${year}/${month}/${date}`; 
  } 

  // Set the initial value for dateBooking when the component mounts 
  useState(() => { 
    setDateBooking(getDate()); 
  }, []); 
   
  const getDayOfWeek = (dateString) => { 
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat']; 
    const date = new Date(dateString); 
    const dayIndex = date.getDay(); 
    return daysOfWeek[dayIndex]; 
  }; 
const [tripSchedules, setTripSchedules] = useState([
  {
    routeJourney: 'JUST - Amman',
    destinationJourney:'JUST,p1,p2,p3',
    dateJourney: '1-3-2024',
    departuerJourney: '3:30 - 4:15',
  },
]); 

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
      const response = await axios.get('https://localhost:7227/api/Journey/GetAllJourney');
      setTripSchedules(response.data);
      console.log('Data fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchData(); // Call the function when the component mounts
}, []);

const handleRadioChange = (scheduleIndex, destinationJourneyIndex) => {
  const selectedDestination = tripSchedules[scheduleIndex].destinationJourney.split(',')[destinationJourneyIndex];
  setSelectedDestination(selectedDestination);
  setSelectedSchedule(tripSchedules[scheduleIndex]); // Store the selected schedule
};

const handleSelect= (selectedSchedule) => { 
  console.log('selectedSchedule', selectedSchedule);

  if(selectedDestination){
  const tripInfo = {
    idJourney: selectedSchedule.idJourney, 
    routeJourney: selectedSchedule.routeJourney,
    destinationJourney: selectedDestination,
    dateJourney: selectedSchedule.dateJourney,
    departuerJourney: selectedSchedule.departuerJourney,
    numberBus:selectedSchedule.numberBus,
    busID: selectedSchedule.busID
    };
  setSelection(tripInfo);
  localStorage.setItem('selectedTrip', JSON.stringify(tripInfo));
  console.log('tripInfo',tripInfo);
  setShowModal(true);
  }else{
    Swal.fire({
      text: 'Please choose a pickup point',
      confirmButtonColor: '#000',
    });
  }

};

  return (
    <div>
      <div className='Tcontainer'>
    <img src={bus} alt="bus" className='bus'/>    
      <table>
        <thead>
          <tr>
          <th>Route</th> 
            <th>Days</th> 
            <th>Date</th> 
            <th>Time</th> 
            <th>Pickup</th>
            <th>Price</th>
            <th>Available Seats</th>
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
              onChange={() => handleRadioChange(scheduleIndex,destinationJourneyIndex)} 
              />{' '}{destinationPoint}
              </div>
              ))}
              </div>
              </td>
              <td>2.5 JD</td>
              <td>49<button className='select' onClick={()=>handleSelect(schedule)} > select</button></td>
              <Modal showModal={showModal} onClose={() => setShowModal(false)} />    
            </tr>
          ))}          
        </tbody>
      </table>  
      </div>
    </div>
  );
}

function TripSchedule2() {
  return (
    <div>
      <Navbar/>
      <TripScheduleTable />
      <Footer/>
    </div>
  );
}

export default TripSchedule2;