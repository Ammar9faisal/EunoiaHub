// ColorCoding.jsx
import React, { useState, useEffect } from 'react';

const ColorCoding = () => {
  // State to store the color based on questionnaire results
  const [dashboardColor, setDashboardColor] = useState('white');

  // Function to set the color based on the result category
  const setDashboardColorBasedOnResult = () => {
    // Get the final category from localStorage
    const finalCategory = localStorage.getItem('finalCategory');

    // Set the dashboard color based on the category
    switch (finalCategory) {
      case 'A':
        setDashboardColor('green');
        break;
      case 'B':
        setDashboardColor('orange');
        break;
      case 'C':
        setDashboardColor('purple');
        break;
      default:
        setDashboardColor('white');
        break;
    }
  };

  // UseEffect hook to apply the color once the component mounts
  useEffect(() => {
    setDashboardColorBasedOnResult();
  }, []); // Runs once when the component is mounted

  return (
    <div
      style={{
        backgroundColor: dashboardColor,
        minHeight: '100vh',
        transition: 'background-color 0.5s ease',
      }}
    >
      <h1 style={{ textAlign: 'center', paddingTop: '50px' }}>
        Welcome to Your Wellness App
      </h1>
      <p style={{ textAlign: 'center', fontSize: '20px' }}>
        Your dashboard color is based on your answers. Current color: {dashboardColor}
      </p>
    </div>
  );
};

export default ColorCoding;
