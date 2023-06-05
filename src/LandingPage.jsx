import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './global.css';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      navigate('/studentstatus', { state: { location: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }}});
    });
  }, [navigate]);

  return (
    <div className="page-bg1">
      <div className="page-bg2">
        <h1 className="nu-bathroom-finder">NU Bathroom Finder</h1>
        <p className="prompt-text">
          To start, please allow access to your location.
        </p>
        <p className="prompt-text">
          You may have to allow location access from settings. 
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
