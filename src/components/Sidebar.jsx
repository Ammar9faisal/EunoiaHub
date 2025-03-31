import React, { useState, useEffect } from 'react';
import {
  BarChart2,
  Smile,
  NotepadText,
  Settings,
  LogOut,
  Map,
  Clipboard,
  Star,
  LayoutList,
  Plus,
  Book,
  Wind,
  CalendarRange,
} from 'lucide-react';

import './sidebar.css';
import logo from '../assets/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { account } from '../appwrite';

export function Sidebar() {
  const [activeButton, setActiveButton] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Update activeButton state when location changes
  useEffect(() => {
    switch (location.pathname.toLowerCase()) {
      case '/dashboard':
        setActiveButton('dashboard');
        break;
      case '/survey':
        setActiveButton('checkin');
        break;
      case '/findhelp':
        setActiveButton('find');
        break;
      case '/visionboard':
        setActiveButton('visionboard');
        break;
      case '/blogpage':
        setActiveButton('BlogPage');
        break;
      case '/usertickets':
        setActiveButton('UserTickets');
        break;
      case '/todo':
        setActiveButton('ToDoList');
        break;
      case '/resources':
        setActiveButton('resources');
        break;
      case '/dailyexercises':
        setActiveButton('dailyexercises');
        break;
      case '/habittracker':
        setActiveButton('habittracker');
        break;
      default:
        setActiveButton('dashboard');
        break;
    }
  }, [location]);

  const handleButtonClick = (buttonName, route) => {
    setActiveButton(buttonName);
    navigate(route);
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
      <img className="sidebar-logo" src={logo} alt="Logo" />
      <nav className="sidebar-nav">
        <button
          className={`sidebar-button ${activeButton === 'dashboard' ? 'sidebar-button-active' : ''}`}
          onClick={() => handleButtonClick('dashboard', '/dashboard')}
        >
          <BarChart2 className="sidebar-icon" color="white" />
        </button>
        <button
          className={`sidebar-button ${activeButton === 'checkin' ? 'sidebar-button-active' : ''}`}
          onClick={() => handleButtonClick('checkin', '/survey')}
        >
          <Smile className="sidebar-icon" color="white" />
        </button>
        <button
          className={`sidebar-button ${activeButton === 'find' ? 'sidebar-button-active' : ''}`}
          onClick={() => handleButtonClick('find', '/findhelp')}
        >
          <Map className="sidebar-icon" color="white" />
        </button>
        <button
          className={`sidebar-button ${activeButton === 'visionboard' ? 'sidebar-button-active' : ''}`}
          onClick={() => handleButtonClick('visionboard', '/visionboard')}
        >
          <NotepadText className="sidebar-icon" color="white" />
        </button>
        <button
          className={`sidebar-button ${activeButton === 'BlogPage' ? 'sidebar-button-active' : ''}`}
          onClick={() => handleButtonClick('BlogPage', '/blogpage')}
        >
          <Book className="sidebar-icon" color="white" />
        </button>
        <button
          className={`sidebar-button ${activeButton === 'UserTickets' ? 'sidebar-button-active' : ''}`}
          onClick={() => handleButtonClick('UserTickets', '/usertickets')}
        >
          <Star className="sidebar-icon" color="white" />
        </button>
        <button
          className={`sidebar-button ${activeButton === 'dailyexercises' ? 'sidebar-button-active' : ''}`}
          onClick={() => handleButtonClick('dailyexercises', '/dailyexercises')}
        >
          <Wind className="sidebar-icon" color="white" />
        </button>
        <button
          className={`sidebar-button ${activeButton === 'habittracker' ? 'sidebar-button-active' : ''}`}
          onClick={() => handleButtonClick('habittracker', '/habittracker')}
        >
          <CalendarRange className="sidebar-icon" color="white" />
        </button>
        <button
          className={`sidebar-button ${activeButton === 'ToDoList' ? 'sidebar-button-active' : ''}`}
          onClick={() => handleButtonClick('ToDoList', '/todo')}
        >
          <LayoutList className="sidebar-icon" color="white" />
        </button>
        <button
          className={`sidebar-button ${activeButton === 'resources' ? 'sidebar-button-active' : ''}`}
          onClick={() => handleButtonClick('resources', '/resources')}
        >
          <Plus className="sidebar-icon" color="white" />
        </button>
      </nav>
      <button className="sidebar-button" onClick={handleLogout}>
        <LogOut className="sidebar-icon" color="white" />
      </button>
    </div>
  );
}

export default Sidebar;