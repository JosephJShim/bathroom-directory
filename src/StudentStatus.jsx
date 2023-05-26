import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RadioButton from './RadioButton';
import './global.css';
import './NextButton.css';

function StudentStatus() {
    const [studentStatus, setStudentStatus] = useState(null);
    const navigate = useNavigate();
  
    const handleSelect = (status) => {
      setStudentStatus(status);
    };
  
    const handleNext = () => {
      navigate('/genderselection');
    };
  
    return (
      <div className="page-bg1">
        <div className="page-bg2">
          <h1 className="nu-bathroom-finder">NU Bathroom Finder</h1>
          <h2 className="prompt-text">Who are you?</h2>
          <RadioButton 
            label="I am a student" 
            selected={studentStatus === 'Student'} 
            onSelect={() => handleSelect('Student')} 
          />
          <RadioButton 
            label="I am a visitor" 
            selected={studentStatus === 'Visitor'} 
            onSelect={() => handleSelect('Visitor')} 
          />
          <div className="next-button-container">
            <button 
              className="next-button" 
              disabled={!studentStatus} 
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
}


export default StudentStatus;
