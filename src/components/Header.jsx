import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import './header.css';

export function Header() {
  return (
    <header className="header">
      <div className="header-search">
        <div className="header-search-container">
          <Search className="header-search-icon" />
          <input
            type="text"
            placeholder="Search..."
            className="header-search-input"
          />
        </div>
      </div>
      <div className="header-buttons">
        <button className="header-button">
          <Bell className="header-button-icon" />
        </button>
        <button className="header-button">
          <User className="header-button-icon" />
        </button>
      </div>
    </header>
  );
}