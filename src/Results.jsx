import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './global.css';
import bathrooms from './bathrooms.json';

function getDistance(lat1, lon1, lat2, lon2){
  const R = 6371e3;
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  const distance = R * c;
  return distance;
};

function Results() {
  const navigate = useNavigate();
  const [filteredBathrooms, setFilteredBathrooms] = useState([]);
  const { location, studentStatus, gender, selectedFeatures } = useLocation().state;

  useEffect(() => {
    console.log('Initial state values:', location, studentStatus, gender, selectedFeatures);
    console.log('Bathrooms data:', bathrooms);
    const filtered = bathrooms
      .filter(bathroom => {

        //GENDER HANDLING START
        let validForGender = false;

        if (gender === "All Gender" && bathroom.Gender === "All Gender") {
            validForGender = true;
        } else if (gender === "Mens" && (bathroom.Gender === "Mens" || bathroom.Gender === "All Gender")) {
            validForGender = true;
        } else if (gender === "Womens" && (bathroom.Gender === "Womens" || bathroom.Gender === "All Gender")) {
            validForGender = true;
        }

        if (!validForGender) {
          console.log('Gender not valid for bathroom:', bathroom);
          return false;
        }
        else{
          console.log('Gender IS VALID LGFGG :', bathroom);
        }
        //GENDER HANDLING END


        //TIME HANDLING START

        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();
        const currentDay = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][currentTime.getDay()];

        console.log('Current time:', currentTime);
        console.log('Current hour:', currentHour);
        console.log('Current day:', currentDay);

        let isOpen = false;
        if(bathroom.hours && bathroom.hours[studentStatus] && bathroom.hours[studentStatus][currentDay]) {
          const status = bathroom.hours[studentStatus];
          const statusDay = status[currentDay];
          const openTime = statusDay.open.split(':').map(Number);
          const closeTime = statusDay.close.split(':').map(Number);
          
          const openHour = openTime[0];
          const openMinutes = openTime[1];
          const closeHour = closeTime[0];
          const closeMinutes = closeTime[1];
          
          if(openHour < closeHour || (openHour === closeHour && openMinutes <= closeMinutes)) {
            isOpen = (currentHour > openHour || (currentHour === openHour && currentMinutes >= openMinutes)) && (currentHour < closeHour || (currentHour === closeHour && currentMinutes <= closeMinutes));
          } else {
            isOpen = (currentHour > openHour || (currentHour === openHour && currentMinutes >= openMinutes)) || (currentHour < closeHour || (currentHour === closeHour && currentMinutes <= closeMinutes));
          }
        }

        if (!isOpen) {
          console.log('Bathroom not open:', bathroom);
          return false;
        }

        //TIME HANDLING END


        let validForFeatures = true;
        if (selectedFeatures["ADA Accessible"] && !bathroom.ADA ) {
          validForFeatures = false;
        }
        if (selectedFeatures["Period Products"] && !bathroom.PP ) {
          validForFeatures = false;
        }
        if (selectedFeatures["Changing Table"] && !bathroom.Changing ) {
          validForFeatures = false;
        }
        if (selectedFeatures["Paper Towels"] && !bathroom.PTowel ){
          validForFeatures = false;
        }
        if (!validForFeatures) {
          console.log('Features not valid for bathroom:', bathroom);
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const distanceA = getDistance(location.latitude, location.longitude, a.Lat, a.Long);
        const distanceB = getDistance(location.latitude, location.longitude, b.Lat, b.Long);
        return distanceA - distanceB;
      })
      .slice(0, 5);

    setFilteredBathrooms(filtered);
  }, [gender, location.latitude, location.longitude, selectedFeatures, studentStatus]);


  return (
    <div className="page-bg1">
        <div className="page-bg2">
            <h1 className="nu-bathroom-finder">NU Bathroom Finder</h1>
            <div className="results-container">
                {filteredBathrooms.map((bathroom, index) => {
                    return (
                        <div 
                            className="result-box"
                            key={index} 
                            onClick={() => {
                                navigate('/BathroomPage', { state: { bathroom: bathroom } });
                            }}
                        >
                            <p>
                                {bathroom["Building Nickname"]} - {bathroom.Gender} - Floor {bathroom.Floor}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
);

}


export default Results;
