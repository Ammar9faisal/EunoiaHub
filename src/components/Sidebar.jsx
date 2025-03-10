import React, { useState } from 'react';
import { BarChart2, Smile, NotepadText , Settings, LogOut,  Map, Clipboard, Star, LayoutList, Plus } from 'lucide-react';
import './sidebar.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { account } from '../appwrite';

export function Sidebar() {
  const [activeButton, setActiveButton] = useState('dashboard');
  const navigate = useNavigate();

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <div className="sidebar">
      <img className="sidebar-logo" src={logo} />
      <nav className="sidebar-nav">
        <button
          className={`sidebar-button ${activeButton === 'dashboard' ? 'sidebar-button-active' : ''}`}
          onClick={() => handleButtonClick('dashboard')}
        >
          <BarChart2 className="sidebar-icon" color="blue" />
        </button>
        <button
          className={`sidebar-button ${activeButton === 'checkin' ? 'sidebar-button-active' : ''}`}
          onClick={() => navigate("/survey")}
        >
          <Smile className="sidebar-icon" color="white" />
        </button>
        <button
          className={`sidebar-button ${activeButton === 'find' ? 'sidebar-button-active' : ''}`}
          onClick={() => navigate("/FindHelp")}
        >
          <LayoutList className="sidebar-icon"  color="white"/>
        </button>
        
        {/* NEW Vision Board Button */}
        <button
          className={`sidebar-button ${activeButton === 'visionboard' ? 'sidebar-button-active' : ''}`}
          onClick={() => navigate('/visionboard')}
        >
          <NotepadText className="sidebar-icon"  color="white"/>
        </button>
        <button
          className={`sidebar-button ${activeButton === 'settings' ? 'sidebar-button-active' : ''}`}
          onClick={() => handleButtonClick('settings')}
        >
          <Settings className="sidebar-icon"  color="blue"/>
        </button>

        <button
          className={`sidebar-button ${activeButton === 'UserTickets' ? 'sidebar-button-active' : ''}`}
          onClick={() => navigate("/usertickets")}    // sets the button as active when a button is clicekd
        >
          <Star className="sidebar-icon"  color="blue"/>
        </button>

        <button
          className={`sidebar-button ${activeButton === 'ToDoList' ? 'sidebar-button-active' : ''}`}
          onClick={() => navigate("/todo")}    // sets the button as active when a button is clicekd
        >
          <LayoutList className="sidebar-icon"  color="blue"/>
        </button>

        <button
          className={`sidebar-button ${activeButton === 'resources' ? 'sidebar-button-active' : ''}`}
          onClick={() => navigate("/resources")}  // sets the button as active when a button is clicekd
        >
          <Plus className="sidebar-icon"  color="blue"/>
        </button>

      </nav>
      <button className="sidebar-button" onClick={() => navigate('/')}>
        <LogOut className="sidebar-icon"  color="white"/>
      </button>
    </div>
  );
}

export default Sidebar;
