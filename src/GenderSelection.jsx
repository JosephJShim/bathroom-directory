import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RadioButton from './RadioButton';
import './global.css';
import './NextButton.css';

function GenderSelection() {
    const { location, studentStatus } = useLocation().state;
    const [gender, setGender] = useState(null);
    const navigate = useNavigate();
  
    const handleSelect = (gender) => {
      setGender(gender);
    };
  
    const handleNext = () => {
      navigate('/featureselection', { state: { location, studentStatus, gender } });
    };
    
  
    return (
      <div className="page-bg1">
        <div className="page-bg2">
          <h1 className="nu-bathroom-finder">NU Bathroom Finder</h1>
          <h2 className="prompt-text">What gender bathrooms?</h2>
          <RadioButton 
            label="Men/All Gender" 
            selected={gender === 'Mens'} 
            onSelect={() => handleSelect('Mens')} 
          />
          <RadioButton 
            label="Women/All Gender" 
            selected={gender === 'Womens'} 
            onSelect={() => handleSelect('Womens')} 
          />
          <RadioButton 
            label="All Gender" 
            selected={gender === 'All Gender'} 
            onSelect={() => handleSelect('All Gender')} 
          />
          <div className="next-button-container">
            <button 
              className="next-button" 
              disabled={!gender} 
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
}


export default GenderSelection;
