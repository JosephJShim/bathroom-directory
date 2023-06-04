import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SelectableFeature from './SelectableFeature';
import './global.css';
import './NextButton.css';

function FeatureSelection() {
    const { location, studentStatus, gender } = useLocation().state; 
    const [selectedFeatures, setSelectedFeatures] = useState({});
    const navigate = useNavigate();
  
    const handleFeatureSelect = (feature, isSelected) => {
        setSelectedFeatures(prevFeatures => ({
          ...prevFeatures,
          [feature]: isSelected,
        }));
    };
  
    const handleNext = () => {
      navigate('/results', { state: { location, studentStatus, gender, selectedFeatures } });
    };

    return (
        <div className="page-bg1">
          <div className="page-bg2">
            <h1 className="nu-bathroom-finder">NU Bathroom Finder</h1>
            <h2 className="prompt-text">What features?</h2>

            <SelectableFeature
              feature="ADA Accessible"
              onSelect={handleFeatureSelect}
            />

            <SelectableFeature
              feature="Period Products"
              onSelect={handleFeatureSelect}
            />

            <SelectableFeature
              feature="Changing Table"
              onSelect={handleFeatureSelect}
            />

            <SelectableFeature
              feature="Paper Towels"
              onSelect={handleFeatureSelect}
            />
            
            <div className="next-button-container">
              <button 
                className="next-button" 
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>
    );
}
  
export default FeatureSelection;
