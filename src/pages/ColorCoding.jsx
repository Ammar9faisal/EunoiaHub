import React, { useEffect } from 'react';

const ColorCoding = ({ result }) => {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dashboard-green', 'dashboard-orange', 'dashboard-purple');

    switch (result) {
      case 'A':
        root.classList.add('dashboard-green');
        break;
      case 'B':
        root.classList.add('dashboard-purple');
        break;
      case 'C':
        root.classList.add('dashboard-orange');
        break;
      default:
        break;
    }
  }, [result]);

  return null;
};

export default ColorCoding;
