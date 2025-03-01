import React, { useEffect, useState } from 'react';

// ColorCoding - function that determines the color of the dashboard based on the final category
const ColorCoding = () => {
  //dashboardColor - stores the current state of the dashboard
  //set DashboardColor - updates the state of the dashboard
  //useState - initializes the state of the dashboard to white
  const [dashboardColor, setDashboardColor] = useState('dashboard-white');

  //useEffect - runs when the component renders. checks local storage value and updates the dashboard color
  useEffect(() => {
   
    //fetch final category from local storage or
    //set the final category to 'D' if it does not exist
    const finalCategory = localStorage.getItem('finalCategory') || 'D';

    //takes choice A, B, C or D and returns the corresponding color
    const determineColor = (choice) => {
      switch (choice) {
        case 'A': //maps to green
          return 'dashboard-green';
        case 'B': //maps to purple
          return 'dashboard-purple';
        case 'C': //maps to orange
          return 'dashboard-orange';
        default: //Anything else (or if no valid choice) defaults to white
          return 'dashboard-white';
      }
    };

    //color is set by calling determineColor with the final category
    const color = determineColor(finalCategory);
    //updates the dashboard color and local storage
    setDashboardColor(color);
    //saves color in localStorage so it persists even if the user refreshes the page or navigates to another page.
    localStorage.setItem('dashboardColor', color);
  }, []);

  return null;
};

export default ColorCoding;
