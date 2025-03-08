// Handles the search functionality: validates postal code, geocodes it, fetches nearby therapists, and calculates distances
export const handleSearch = async (
    postalCode,
    setError,
    setResources,
    setLoading,
    isLoaded,
    loadError
  ) => {
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
  
      // Search for therapists using Places API (New) with a text query
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
          'X-Goog-Api-Key': 'KEY', //*************************************************PUT KEY (Consider using environment variables)
        
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
              'X-Goog-Api-Key': 'KEy', // ************************PUT KEY (Consider using environment variables)
              
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
  
  // Triggers the search when the Enter key is pressed in the input field
  export const handleKeyPress = (e, handleSearch) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };