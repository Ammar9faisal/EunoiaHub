import React, { useState } from 'react';
import { BarChart2, Smile, NotepadText, Settings, LogOut, FileText } from 'lucide-react'; 
import './sidebar.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

export function Sidebar() {
  const [activeButton, setActiveButton] = useState('dashboard');
  const navigate = useNavigate();

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="sidebar">
      <img className="sidebar-logo" src={logo} alt="Logo" />
      <nav className="sidebar-nav">
        <button
          className={`sidebar-button ${activeButton === 'dashboard' ? 'sidebar-button-active' : ''}`}
          onClick={() => navigate("/dashboard")}
        >
          <BarChart2 className="sidebar-icon" color="white"/>
        </button>
        <button
          className={`sidebar-button ${activeButton === 'checkin' ? 'sidebar-button-active' : ''}`}
          onClick={() => navigate("/survey")}
        >
          <Smile className="sidebar-icon" color="white"/>
        </button>
        <button
          className={`sidebar-button ${activeButton === 'users' ? 'sidebar-button-active' : ''}`}
          onClick={() => handleButtonClick('users')}
        >
          <NotepadText className="sidebar-icon" color="white"/>
        </button>
        <button
          className={`sidebar-button ${activeButton === 'settings' ? 'sidebar-button-active' : ''}`}
          onClick={() => handleButtonClick('settings')}
        >
          <Settings className="sidebar-icon" color="white"/>
        </button>
        <button
          className={`sidebar-button ${activeButton === 'blog' ? 'sidebar-button-active' : ''}`}
          onClick={() => navigate("/blog")}
        >
          <FileText className="sidebar-icon" color="white"/> 
        </button>
      </nav>
      <button className="sidebar-button" onClick={() => navigate('/')}>
        <LogOut className="sidebar-icon" color="white"/>
      </button>
    </div>
  );
}

export default Sidebar;

