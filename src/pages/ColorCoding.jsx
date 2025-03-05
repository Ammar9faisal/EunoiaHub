import React, { useEffect, useState } from 'react';

const getColor = () => {
  const storedColor = localStorage.getItem('dashboardColor');
  switch (storedColor) {
    case 'dashboard-green':
      return 'dashboard-green';
    case 'dashboard-purple':
      return 'dashboard-purple';
    case 'dashboard-orange':
      return 'dashboard-orange';
    default:
      return 'dashboard-white';
  }
};

const ColorCoding = ({ children }) => {
  const [backgroundColor, setBackgroundColor] = useState('dashboard-white');

  useEffect(() => {
    const color = getColor();
    setBackgroundColor(color);
  }, []);

  return <div className={`${backgroundColor} min-h-screen`}>{children}</div>;
};

export default ColorCoding;
