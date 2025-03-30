import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoadScript } from '@react-google-maps/api';
import '../../styles/FindHelp.css';
import { handleSearch, handleKeyPress } from '../services/FindHelpServices';
import Sidebar from '../components/Sidebar.jsx';
// Mock data as backup in case API calls fail or no results are found
const mockResources = [
  { id: 1, name: 'Therapist A', type: 'Therapist', address: '123 Wellness St, Toronto, ON', distance: '2 km', postalCode: 'M5V2T6' },
  { id: 2, name: 'Support Group B', type: 'Group', address: '456 Calm Rd, Toronto, ON', distance: '3 km', postalCode: 'M5V2T6' },
  { id: 3, name: 'Counselor C', type: 'Counselor', address: '789 Peace Ave, Vancouver, BC', distance: '5 km', postalCode: 'V6Z1S4' },
];

// Library for Google Maps API (Places API for search)
const libraries = ['places'];

// Main component to search for nearby therapists based on a Canadian postal code
function FindHelp() {
  const navigate = useNavigate();
  // Variables for managing user input, search results, and UI state
  const [postalCode, setPostalCode] = useState('');
  const [resources, setResources] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Load Google Maps API script with the specified API key and libraries
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'KEY', // ************************************************************************PUT KEY 
    libraries,
  });

  // Wrap handleSearch to pass state setters and other dependencies
  const searchHandler = () =>
    handleSearch(postalCode, setError, setResources, setLoading, isLoaded, loadError);

  // Renders the UI with an input field, search button, and results list
  return (
    <div className="fh-container">
      <Sidebar />
      <div className="fh-main">
        <div className="find-help-page-container">
          <h1>Find Help Near You</h1>
          <p>Enter your Canadian postal code to find nearby therapists and support resources.</p>
  
          <div className="find-help-search-section">
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
              onKeyPress={(e) => handleKeyPress(e, searchHandler)}
              placeholder="Enter postal code (e.g., M5V 2T6)"
              maxLength="7"
              className="find-help-search-input"
              disabled={!isLoaded || loading}
            />
            <button onClick={searchHandler} className="find-help-search-button" disabled={!isLoaded || loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
  
          {(loadError || error) && <p className="find-help-error-message">{loadError?.message || error}</p>}
  
          {resources.length > 0 && (
            <div className="find-help-resources-list">
              <h2>Resources Near {postalCode}</h2>
              {resources.map((resource) => (
                <div key={resource.id} className="find-help-resource-card">
                  <h3>{resource.name}</h3>
                  <p>Type: {resource.type}</p>
                  <p>Address: {resource.address}</p>
                  <p>Distance: {resource.distance}</p>
                </div>
              ))}
            </div>
          )}
  
          <button onClick={() => navigate('/dashboard')} className="find-help-back-button">
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default FindHelp;