import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoadScript } from '@react-google-maps/api';
import './FindHelp.css';

// Mock data as backup in case API calls fail or no results are found
const mockResources = [
  { id: 1, name: 'Therapist A', type: 'Therapist', address: '123 Wellness St, Toronto, ON', distance: '2 km', postalCode: 'M5V2T6' },
  { id: 2, name: 'Support Group B', type: 'Group', address: '456 Calm Rd, Toronto, ON', distance: '3 km', postalCode: 'M5V2T6' },
  { id: 3, name: 'Counselor C', type: 'Counselor', address: '789 Peace Ave, Vancouver, BC', distance: '5 km', postalCode: 'V6Z1S4' },
];

// Library  for Google Maps API (Places API for search)
const libraries = ['places'];

function FindHelp() {
  const navigate = useNavigate();
  // Variables for managing user input, search results, and UI state
  const [postalCode, setPostalCode] = useState(''); 
  const [resources, setResources] = useState([]); 
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false); 

  // Load Google Maps API script with the specified API key and libraries
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'KEY', libraries, //key
  });

  // Handles functionality like : validates postal code, geocodes it, fetches nearby therapists, and calculates distances
  const handleSearch = async () => {
    setError('');
    setResources([]);
    setLoading(true);
    console.log('Starting search for:', postalCode);
    console.log('API Loaded:', isLoaded, 'Load Error:', loadError);

    // Validation of postal code format (A1A1A1)
    const postalCodeRegex = /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/;
    const cleanedPostalCode = postalCode.replace(/\s/g, '');
    if (!postalCodeRegex.test(cleanedPostalCode)) {
      setError('Please enter a valid Canadian postal code (e.g., M5V 2T6).');
      setLoading(false);
      console.log('Invalid postal code');
      return;
    }

    // Checking if API is loaded before making requests
    if (!isLoaded) {
      setError('Google Maps API not loaded yet. Please try again.');
      setLoading(false);
      console.log('API not loaded');
      return;
    }

    try {
      // Geocode the postal code to get its latitude and longitude
      console.log('Geocoding:', cleanedPostalCode);
      const geocoder = new window.google.maps.Geocoder();
      const geocodeResult = await new Promise((resolve, reject) => {
        geocoder.geocode({ address: `${cleanedPostalCode}, Canada` }, (results, status) => {
          console.log('Geocode status:', status);
          if (status === 'OK') {
            console.log('Geocode result:', results[0].geometry.location);
            resolve(results[0].geometry.location);
          } else {
            reject(new Error(`Geocoding failed: ${status}`));
          }
        });
      });

      const { lat, lng } = geocodeResult;
      console.log('Geocoded to:', lat(), lng());

      // Search for therapists using Places API(New) with a text query
      console.log('Searching places with Places API (New) using searchText...');
      const requestBody = {
        textQuery: `therapist OR counselor OR psychologist OR psychiatrist OR mental health OR wellness near ${cleanedPostalCode}`,
        locationBias: {
          circle: {
            center: {
              latitude: lat(),
              longitude: lng(),
            },
            radius: 25000, // 25km
          },
        },
        maxResultCount: 5,
      };

      console.log('Places API (New) request:', requestBody);
      const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': 'KEY',//KEY
          'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.primaryType,places.location',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log('Places API (New) response:', data);
      console.log('Response status:', response.status);

      if (response.status !== 200) {
        throw new Error(`Places API (New) failed: ${data.error?.message || response.statusText}`);
      }

      if (!data.places || data.places.length === 0) {
        setError('No therapists or resources found near this postal code.');
        console.log('No results found');
      } else {
        // Calculate distances using Routes API for each place
        const origin = { latitude: lat(), longitude: lng() };
        const formattedResources = [];

        for (let index = 0; index < data.places.length; index++) {
          const place = data.places[index];
          const destination = {
            latitude: place.location.latitude,
            longitude: place.location.longitude,
          };

          console.log(`Calculating distance for place ${index}...`, { origin, destination });
          const routesRequestBody = {
            origin: {
              location: {
                latLng: origin,
              },
            },
            destination: {
              location: {
                latLng: destination,
              },
            },
            travelMode: 'DRIVE',
            routingPreference: 'TRAFFIC_AWARE',
            computeAlternativeRoutes: false,
            units: 'METRIC',
          };

          const routesResponse = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Goog-Api-Key': 'KEY',//KEY
              'X-Goog-FieldMask': 'routes.distanceMeters',
            },
            body: JSON.stringify(routesRequestBody),
          });

          const routesData = await routesResponse.json();
          console.log(`Routes API response for place ${index}:`, routesData);
          console.log(`Routes API response status for place ${index}:`, routesResponse.status);

          if (routesResponse.status !== 200) {
            console.warn(`Routes API failed for place ${index}:`, routesData.error?.message);
          }

          let distance = 'N/A';
          const route = routesData.routes && routesData.routes[0];
          if (route && route.distanceMeters) {

            // Convert meters to kilometers
            distance = `${(route.distanceMeters / 1000).toFixed(1)} km`;
          } else {
            console.warn(`Distance calculation failed for place ${index}:`, route);
          }

          formattedResources.push({
            id: index,
            name: place.displayName.text,
            type: place.primaryType || 'Therapist/Counselor',
            address: place.formattedAddress,
            distance: distance,
          });
        }

        setResources(formattedResources);
        console.log('Formatted resources:', formattedResources);
      }
    } catch (err) {
      setError(err.message);
      setResources([]);
      console.error('Search error:', err);
    } finally {
      setLoading(false);
      console.log('Search completed');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Renders the UI with an input field, search button, and results list
  return (
    <div className="find-help-container">
      <h1>Find Help Near You</h1>
      <p>Enter your Canadian postal code to find nearby therapists and support resources.</p>

      <div className="search-section">
        <input
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
          onKeyPress={handleKeyPress}
          placeholder="Enter postal code (e.g., M5V 2T6)"
          maxLength="7"
          className="postal-input"
          disabled={!isLoaded || loading}
        />
        <button onClick={handleSearch} className="search-button" disabled={!isLoaded || loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {loadError && <p className="error-message">Error loading Google Maps API: {loadError.message}</p>}
      {error && <p className="error-message">{error}</p>}

      {resources.length > 0 && (
        <div className="resources-list">
          <h2>Resources Near {postalCode}</h2>
          {resources.map((resource) => (
            <div key={resource.id} className="resource-card">
              <h3>{resource.name}</h3>
              <p>Type: {resource.type}</p>
              <p>Address: {resource.address}</p>
              <p>Distance: {resource.distance}</p>
            </div>
          ))}
        </div>
      )}

      <button onClick={() => navigate('/dashboard')} className="back-button">
        Back to Dashboard
      </button>
    </div>
  );
}

export default FindHelp;