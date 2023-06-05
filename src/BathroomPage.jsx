import React from 'react';
import { useLocation } from 'react-router-dom';

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
                <h1 className="nu-bathroom-finder bathroom-page-text">NU Bathroom Finder</h1>
                <div>
                    <h3 className="bathroom-page-text">{bathroom["Building Nickname"]}, Floor {bathroom.Floor}, Room {bathroom.Room}, {bathroom.Gender}</h3>
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
