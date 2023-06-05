import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RadioButton from './RadioButton';
import './global.css';
import './NextButton.css';

function StudentStatus() {
    const { location } = useLocation().state; 
    const [studentStatus, setStudentStatus] = useState(null);
    const navigate = useNavigate();
  
    const handleSelect = (status) => {
      setStudentStatus(status);
    };
  
    const handleNext = () => {
      console.log('Navigating with studentStatus:', studentStatus); //testing
      navigate('/genderselection', { state: { location, studentStatus } });
    };
    
  
  
    return (
      <div className="page-bg1">
        <div className="page-bg2">
          <h1 className="nu-bathroom-finder">NU Bathroom Finder</h1>
          <h2 className="prompt-text">Who are you?</h2>
          <RadioButton 
            label="I am a student" 
            selected={studentStatus === 'student'} 
            onSelect={() => handleSelect('student')} 
          />
          <RadioButton 
            label="I am a visitor" 
            selected={studentStatus === 'visitor'} 
            onSelect={() => handleSelect('visitor')} 
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
