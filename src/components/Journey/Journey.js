import React, { useEffect, useState, useContext } from 'react';
import './Journey.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios"; 

function Journey() {
  const [idJourney, setIdJourney] = useState(''); 
  const [numberBus, setNumberBus] = useState(''); 
  const [busID, setBusID] = useState(''); 
  const [routeJourney, setRouteJourney] = useState(''); 
  const [destinationJourney, setDestinationJourney] = useState(''); 
  const [dateJourney, setDateJourney] = useState(''); 
  const [departuerJourney, setDepartuerJourney] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate();
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

const handleDelete = async (index) => {
  const updatedSchedules = [...tripSchedules];
  const deletedTrip = updatedSchedules.splice(index, 1)[0];

  console.log(deletedTrip.idJourney, "= deletedTrip.idJourney");
  try {
    // Replace 'YOUR_DELETE_ENDPOINT' with the actual API endpoint for deleting a trip
    const response = await axios.delete(`https://localhost:7227/api/Journey/DeleteJourneyById?id=${deletedTrip.idJourney}`);
    console.log('Journey deleted successfully on the server.');
      alert("delete journey successfuly ");
   
      setTripSchedules(updatedSchedules);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      // Bad Request (HTTP status code 400)
      alert("Failed delete journey"); // Display the error message in a basic alert
      window.location.reload();
    } else {
    console.error('Error deleting Journey:', error);
  }}
};

  return (
    <div >
      <div className='headar'><h1 className='h11'>All journey</h1></div>
      <div>
      <table className='table-admin'>
        <thead>
          <tr>
          <th>ID Journey</th>
          <th>Route</th> 
            <th>Days</th> 
            <th>Date</th> 
            <th>Time</th> 
            <th>Pickup</th>
            <th>Price</th>
            <th>number of passengers </th>
            <th>BusID</th>
          </tr>
        </thead>
        <tbody>
        {tripSchedules.map((schedule, scheduleIndex) => ( 
            <tr key={scheduleIndex} style={{backgroundColor: scheduleIndex % 2 === 0 ? '#fff' : '#f2f2f2'}}>
              <td>{schedule.idJourney}</td>
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
              <td>2.5 JD</td>
              <td>{schedule.numberBus}</td>
              
              <td>{schedule.busID} {' '}<button className='delete' onClick={() => handleDelete(scheduleIndex)}>Delete</button></td>
            </tr>
          ))}          
        </tbody>
      </table>  
      </div>
    </div>
  );
}

export default Journey;