import './Notification.css'
import React, { useState, useEffect } from 'react';

function Notification(){
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Fetch QR codes from the API when the component mounts
        const fetchNotification = async () => {
          try {
            const response = await fetch('https://localhost:7227/api/Booking/GetNotification');
            if (response.ok) {
              const data = await response.json();
              console.log(data); 
              setNotifications(data); 
            } else {
              console.error('Error fetching data');
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchNotification();
      }, []);

    return(
        <div className='notification-page'>
            <div className='notification'>NOTIFICATIONS</div>
            <div className='notification-container'>
            {notifications.map((notification, index) => (
          <div key={index}>
            <h3>Upcoming Journey Reminder</h3>
            <p>{notification}</p>
            <hr className='hr'></hr>
          </div>
        ))}
            </div>
        </div>
    );
}
export default Notification;