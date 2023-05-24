import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      // Navigate to the StudentStatus page once the location is fetched
      navigate('/studentstatus');
    });
  }, [navigate]);  // Added navigate as a dependency

  // You can add more JSX to be rendered here...
  return (
    <div className="location-selection">
      <div className="dark-gray-background">
        <h1 className="nu-bathroom-finder">NU Bathroom Finder</h1>
        <p className="get-location-text">
          To start, please allow access to your location.
        </p>
        {location ? (
          <p>Location: {location.latitude}, {location.longitude}</p>
        ) : (
          <p>Loading location...</p>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
