import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './global.css';


function Results() {
    const [results, setResults] = useState({});
    const navigate = useNavigate();
  
    const handleChoice = () => {
      navigate('/results');
    };

    return (
        <div className="page-bg1">
          <div className="page-bg2">
            <h1 className="nu-bathroom-finder">NU Bathroom Finder</h1>
            
           
          </div>
        </div>
    );
}
  
export default Results;