import React from 'react';
import { useLocation } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { apiKey } from './config';


function MapComponent({latitude, longitude}) {
    const isMobile = window.innerWidth <= 600; // Change the value as needed

    const containerStyle = isMobile ? {
        width: '90vw',  // Adjust as needed for mobile
        height: '30vh',  // Adjust as needed for mobile
        display: 'flex',
        margin: 'auto'
    } : {
        width: '70vw',
        height: '40vh',
        display: 'flex',
    };

    const wrapperStyle = isMobile ? {
        width: '90vw',  // Adjust as needed for mobile
        height: '30vh',  // Adjust as needed for mobile
        border: '2px solid #000',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto'
    } : {
        width: '70vw',
        height: '40vh',
        border: '2px solid #000',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };
  
    const center = {
      lat: latitude,
      lng: longitude,
    };
  
    const mapRef = React.useRef();

    // Only render map when latitude and longitude are defined
    const [mapReady, setMapReady] = React.useState(false);
  
    React.useEffect(() => {
      if (latitude && longitude) {
        setMapReady(true);
      }
    }, [latitude, longitude]);
  
    React.useEffect(() => {
      if (mapRef.current) {
        // Trigger resize event to re-center map
        window.google.maps.event.trigger(mapRef.current, 'resize');
      }
    }, [mapReady]);
  
    return mapReady ? (
      <div style={wrapperStyle}>
        <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
          <GoogleMap 
            mapContainerStyle={containerStyle} 
            center={center} 
            zoom={17}
            onLoad={map => mapRef.current = map}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </div>
    ) : (
      <div>Loading...</div>
    );
}



  
  


function BathroomPage() {
    const location = useLocation();
    const bathroom = location.state ? location.state.bathroom : null;

    if (!bathroom) {
        return <p>No bathroom data available.</p>;
    }

    const features = [];
    if (bathroom.ADA) {
      features.push('ADA Accessible');
    }
    if (bathroom.PP) {
      features.push('Period Products');
    }
    if (bathroom.PTowel) {
      features.push('Paper Towels');
    }
    if (bathroom.Changing) {
      features.push('Changing Table');
    }


    return (
        <div className="page-bg1">
            <div className="page-bg2">
                <h1 className="nu-bathroom-finder">NU Bathroom Finder</h1>
                <div>
                    <h3 className="bathroom-page-text">{bathroom["Building Nickname"]}, Floor {bathroom.Floor}, Room {bathroom.Room}, {bathroom.Gender}</h3>
                    <MapComponent latitude={bathroom.Lat} longitude={bathroom.Long} />
                    <h2 className="bathroom-page-text">
                        <a href={bathroom.GoogleMaps} className="bathroom-page-text">Google Maps Link →</a>
                    </h2>
                    <p className="bathroom-page-text" style={{ maxWidth: "75%", wordWrap: "break-word", margin: "auto" }}>Extra Notes: {bathroom.ExtraInfo}</p>
                    <p className="bathroom-page-text">Features: {features.join(', ')}</p>
                    <a className="bathroom-page-text" href="https://docs.google.com/forms/d/e/1FAIpQLSf7uEkCziYhchcrtnIp5jnlvLtacd7PO98NMCfKPH4ciTXkTw/viewform?usp=sf_link">
                        Bathroom Feedback Form →
                    </a>
                </div>
            </div>
        </div>
    );    
}

export default BathroomPage;
