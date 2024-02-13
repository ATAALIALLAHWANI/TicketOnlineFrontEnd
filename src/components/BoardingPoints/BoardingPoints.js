import React, { useState, useEffect } from 'react';
import './BoardingPoints.css';

const BoardingPoints = () => {
  // Sample data or data fetched from an API
  const [boardingPointsData, setBoardingPointsData] = useState([
    { point: 'Point A', passengers: 15 },
    { point: 'Point B', passengers: 25 },
    { point: 'Point C', passengers: 10 },
    { point: 'Point D', passengers: 10 },
    { point: 'Point E', passengers: 10 },




    // ... Add more boarding points as needed
  ]);


 /* const [boardingPointsData, setBoardingPointsData] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/boardingpoints');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setBoardingPointsData(data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error scenarios (e.g., set an error state)
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Run this effect only once (on component mount)
*/












  return (
    <div className="boarding-points">
      <h1 className='h11'>Boarding Points</h1>
      <div className="boarding-points-list">
        {boardingPointsData.map((point, index) => (
          <div key={index} className="boarding-point" >
            <h3><i class="fa-solid fa-location-crosshairs"></i>{point.point}</h3>
            <p>Passengers: {point.passengers}          <i class="fa-solid fa-users"></i></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardingPoints;
