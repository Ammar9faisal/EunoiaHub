import React, { useState } from 'react';
import { BarChart2, Smile, NotepadText , Settings, LogOut } from 'lucide-react';
import './sidebar.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

export function Sidebar() {
  const [activeButton, setActiveButton] = useState('dashboard');  // 'dashboard' is the default active button
  const navigate = useNavigate(); // useNavigate is a hook that returns a navigate function to navigate to a different route

  const handleButtonClick = (buttonName) => {  // sets the button as active when a button is clicekd
    setActiveButton(buttonName);
  };

  return (
    <div className="sidebar">
      <img className="sidebar-logo" src={logo} />
      <nav className="sidebar-nav">
        <button
          className={`sidebar-button ${activeButton === 'dashboard' ? 'sidebar-button-active' : ''}`}
          onClick={() => handleButtonClick('dashboard')}  // sets the button as active when a button is clicekd
        >
          <BarChart2 className="sidebar-icon" color="white"/>
        </button>
        <button
          className={`sidebar-button ${activeButton === 'checkin' ? 'sidebar-button-active' : ''}`}
          onClick={() => navigate("/survey")}  // sets the button as active when a button is clicekd
        >
          <Smile className="sidebar-icon"  color="white"/>
        </button>
        <button
          className={`sidebar-button ${activeButton === 'users' ? 'sidebar-button-active' : ''}`}
          onClick={() => handleButtonClick('users')} // sets the button as active when a button is clicekd
        >
          <NotepadText className="sidebar-icon"  color="white"/>
        </button>
        <button
          className={`sidebar-button ${activeButton === 'settings' ? 'sidebar-button-active' : ''}`}
          onClick={() => handleButtonClick('settings')}   // sets the button as active when a button is clicekd
        >
          <Settings className="sidebar-icon"  color="white"/>
        </button>
      </nav>
      <button className="sidebar-button" onClick={() => navigate('/')}>
        <LogOut className="sidebar-icon"  color="white"/>
      </button>
    </div>
  );
}

export default Sidebar;
