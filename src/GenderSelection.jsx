import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RadioButton from './RadioButton';
import './GenderSelection.css';
import './NextButton.css';

function GenderSelection() {
    const [genderSelection, setGenderSelection] = useState(null);
    const navigate = useNavigate();
  
    const handleSelect = (status) => {
        setGenderSelection(status);
    };
  
    const handleNext = () => {
      navigate('/featureselection');
    };
  
    return (
      <div className="gender-selection">
        <div className="rectangle">
          <h1 className="nu-bathroom-finder">NU Bathroom Finder</h1>
          <h2 className="what-gender">What gender bathrooms?</h2>
          <RadioButton 
            label="Men and All Gender" 
            selected={genderSelection === 'Men'} 
            onSelect={() => handleSelect('Men')} 
          />
          <RadioButton 
            label="Women and All Gender" 
            selected={genderSelection === 'Women'} 
            onSelect={() => handleSelect('Women')} 
          />
          <RadioButton 
            label="All Gender" 
            selected={genderSelection === 'All'} 
            onSelect={() => handleSelect('All')} 
          />
          <div className="next-button-container">
            <button 
              className="next-button" 
              disabled={!genderSelection} 
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