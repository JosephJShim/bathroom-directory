import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './global.css';



function LandingPage() {
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      // navigate to StudentStatus page after location fetched
      navigate('/studentstatus');
    });
  }, [navigate]);  // navigate is dependency


  return (
    <div className="page-bg1">
      <div className="page-bg2">
        <h1 className="nu-bathroom-finder">NU Bathroom Finder</h1>
        <p className="prompt-text">
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
