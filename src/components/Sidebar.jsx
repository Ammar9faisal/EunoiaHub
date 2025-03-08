import React, { useState } from 'react';
import { BarChart2, Smile, NotepadText, Settings, LogOut } from 'lucide-react';
import './sidebar.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

export function Sidebar() {
  const [activeButton, setActiveButton] = useState('dashboard'); // Default active button
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleButtonClick = (buttonName, path = null) => { // Updated to accept a path parameter
    setActiveButton(buttonName);
    if (path) {
      navigate(path); // Navigate to the specified path if provided
    }
  };

  return (
    <div className="sidebar">
      <img className="sidebar-logo" src={logo} />
      <nav className="sidebar-nav">
        <button
          className={`sidebar-button ${activeButton === 'dashboard' ? 'sidebar-button-active' : ''}`}
          onClick={() => handleButtonClick('dashboard', '/dashboard')} // Navigate to dashboard
        >
          <BarChart2 className="sidebar-icon" color="white" />
        </button>
        <button
          className={`sidebar-button ${activeButton === 'checkin' ? 'sidebar-button-active' : ''}`}
          onClick={() => handleButtonClick('checkin', '/survey')} // Navigate to survey/check-in
        >
          <Smile className="sidebar-icon" color="white" />
        </button>
        <button
        className={`sidebar-button ${activeButton === 'visionboard' ? 'sidebar-button-active' : ''}`}
        onClick={() => handleButtonClick('visionboard', '/vision-board')} // NEW: Navigates to Vision Board
        >
           <NotepadText className="sidebar-icon" color="white" />
        </button>
        <button
          className={`sidebar-button ${activeButton === 'settings' ? 'sidebar-button-active' : ''}`}
          onClick={() => handleButtonClick('settings', '/settings')} // Navigate to settings
        >
          <Settings className="sidebar-icon" color="white" />
        </button>
      </nav>
      <button className="sidebar-button" onClick={() => navigate('/')}>
        <LogOut className="sidebar-icon" color="white" />
      </button>
    </div>
  );
}

export default Sidebar;