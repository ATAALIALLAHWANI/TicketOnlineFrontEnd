import './TripScheduleAdmin.css'
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { useEffect, useState } from 'react';
import React from 'react';
import axios from "axios";

function TripScheduleAdmin(){
    const [routeJourney, setrRouteJourney] = useState('');
    const [destinationJourney, setDestinationJourney] = useState('');
    const [dateJourney, setDateJourney] = useState('');
    const [departuerJourney, setDepartuerJourney] = useState('');
    const [busID, setBusID] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const handleTimeChange = (event) => {
      const selectedTime = event.target.value;
      setDepartuerJourney(selectedTime);
      setFormData({
        ...formData,
        departuerJourney: selectedTime,
      });
    };
  
    const getDayOfWeek = (dateString) => {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'];
        const date = new Date(dateString);
        const dayIndex = date.getDay();
        return daysOfWeek[dayIndex];
      };
    const [tripSchedules, setTripSchedules] = useState([]);
    // State to manage form inputs
  const [formData, setFormData] = useState({
      routeJourney: '',
      destinationJourney:'',
      dateJourney: '',
      departuerJourney: '',
      numberBus:49,
      busID: ''
  });

  const handleDelete = async (index) => {
    const updatedSchedules = [...tripSchedules];
    const deletedTrip = updatedSchedules.splice(index, 1)[0];
    setTripSchedules(updatedSchedules);

    try {
      // Replace 'YOUR_DELETE_ENDPOINT' with the actual API endpoint for deleting a trip
      await axios.delete('YOUR_DELETE_ENDPOINT/${deletedTrip.id}');
      console.log('Trip deleted successfully on the server.');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Bad Request (HTTP status code 400)
        alert(error.response.data); // Display the error message in a basic alert
      } else {
      console.error('Error deleting trip:', error);
    }
  }
  };

  // Handle form submission
  const handleSubmit =async (event) => {
    event.preventDefault();
    console.log('from data: ',formData);
    if (formData.routeJourney && formData.destinationJourney && formData.dateJourney && formData.departuerJourney && formData.busID) {

    // Update tripSchedules state with new schedule
    setTripSchedules([...tripSchedules, formData]);

    // Clear form inputs
    setFormData({
      routeJourney: '',
      destinationJourney:'',
      dateJourney: '',
      departuerJourney: '',
      numberBus: 49,
      busID: '',
    });
    try {
        // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
        const response = await axios.post('https://localhost:7227/api/Journey/AddJourney', formData);
  
        // Handle the response as needed
        console.log('Data submitted successfully:', response.data);
      } catch (error) {
        console.error('Error submitting data:', error);
      }  
}
  };

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const updatedValue = name === 'busID' ? parseInt(value, 10) : value;

    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  useEffect(() => {
    const savedData = localStorage.getItem('tripSchedules');
    if (savedData) {
      setTripSchedules(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage whenever tripSchedules is updated
  useEffect(() => {
    localStorage.setItem('tripSchedules', JSON.stringify(tripSchedules));
  }, [tripSchedules]);


    return(
        <div>
            <div className='headar'><h1 className='h11'>Journey Schedule</h1></div>
            <table className='table-admin'>
                {tripSchedules.length>0 &&(
                <thead>
                    <tr>
                    <th>ID Journey</th>
                    <th>Route</th>
                    <th>Days</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>pickup</th>
                    <th>number of passengers</th>
                    <th>Bus ID</th>
                    <th>Ticket Price</th>
                    </tr>
                </thead>
                )}
                <tbody>
                    {tripSchedules.map((schedule, index) => (
                    <tr key={index} style={{backgroundColor: index % 2 === 0 ? '#fff' : '#f2f2f2'}}>
                    <td>{index+1}</td>
                    <td>{schedule.routeJourney}</td>
                    <td>{getDayOfWeek(schedule.dateJourney)}</td>
                    <td>{new Date(schedule.dateJourney).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    })}</td>
                    <td>{schedule.departuerJourney}</td>
                    <td>{schedule.destinationJourney}</td>
                    <td>49</td>
                    <td>{schedule.busID}</td>
                    <td>2.5 JD</td>
                    </tr>
                    ))}
                </tbody>
            </table>

      {/* Form for admin to fill data */}
      <div className='form_container'>
      <form onSubmit={handleSubmit}>
        <div className='form_headar'><h3>Add Journey Schedule</h3></div>
      <label>
        Route:
          <input className='inp' type='text' name='routeJourney' value={formData.routeJourney} onChange={handleInputChange} />
        </label>
        <br></br>
        <label>
        Pickup: 
          <input className='inp' type='text' name='destinationJourney' value={formData.destinationJourney} onChange={handleInputChange} />
        </label>
        <br></br>
        <label>
          Date: 
          <DatePicker
          className='inp'
          selected={startDate}
          onChange={(dateJourney) => {
          console.log('Selected Date:', dateJourney);
          setStartDate(dateJourney);
          setFormData({ ...formData, dateJourney: dateJourney });
          }}
          dateFormat='yyyy-MM-dd'
          minDate={new Date()}
        />
        </label>
        <br></br>
        <label>
          Time:
          <input
          className='inp'
          type="time"
          name="time"
          value={formData.departuerJourney}
          onChange={handleTimeChange}
        />
        </label>
        <br></br>
        <label>
        BusID:
          <input className='inp' 
          type='text' name='busID' 
          value={formData.busID} 
          onChange={handleInputChange} 
          />
        </label>
        <br></br>
        <button type='submit' className='submitt'>Add Journey</button>
      </form>
      </div>
        </div>
    );
}
export default TripScheduleAdmin;
