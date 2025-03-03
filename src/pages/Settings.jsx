import React, { useState } from 'react';
import './settings.css';

export default function Settings() {
  const [username, setUsername] = useState('John Doe');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [theme, setTheme] = useState('light');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Settings</h1>

      <section className="settings-section">
        <h2 className="settings-label">Profile</h2>
        <div className="settings-option">
          <label className="settings-option-label">Username:</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className="settings-input"
            placeholder="Enter username"
          />
        </div>
      </section>

      <section className="settings-section">
        <h2 className="settings-label">Notifications</h2>
        <div className="settings-option">
          <label className="settings-option-label">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={handleNotificationsToggle}
            />
            Enable Notifications
          </label>
        </div>
      </section>

      <section className="settings-section">
        <h2 className="settings-label">Appearance</h2>
        <div className="settings-option">
          <label className="settings-option-label">Theme:</label>
          <select
            value={theme}
            onChange={handleThemeChange}
            className="settings-select"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </section>
    </div>
  );
}