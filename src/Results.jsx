import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './global.css';
import bathrooms from './bathrooms.json';

function Results() {
  const [filteredBathrooms, setFilteredBathrooms] = useState([]);
  const { location, studentStatus, gender, selectedFeatures } = useLocation().state;

  useEffect(() => {
    console.log('Initial state values:', location, studentStatus, gender, selectedFeatures);
    console.log('Bathrooms data:', bathrooms);
    const filtered = bathrooms
      .filter(bathroom => {
        const validForGender = gender === "All Gender" || bathroom.Gender === gender || bathroom.Gender === "All Gender";
        if (!validForGender) {
          console.log('Gender not valid for bathroom:', bathroom);
          return false;
        }

        const currentTime = new Date();
        const currentHour = currentTime.getHours() + currentTime.getMinutes() / 60;
        const currentDay = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][currentTime.getDay()];

        let isOpen = false;
        if (bathroom.hours && bathroom.hours[studentStatus] && bathroom.hours[studentStatus][currentDay]) {
          const bathroomHours = bathroom.hours[studentStatus][currentDay].split('-').map(time => {
            const [hour, minute] = time.split(':').map(Number);
            return hour + minute / 60;
          });
          isOpen = bathroomHours[0] <= currentHour && currentHour <= bathroomHours[1]
            || bathroomHours[0] > bathroomHours[1] && (bathroomHours[0] <= currentHour || currentHour <= bathroomHours[1]);
        }
        if (!isOpen) {
          console.log('Bathroom not open:', bathroom);
          return false;
        }

        const validForFeatures = Object.entries(selectedFeatures).every(([feature, isSelected]) => {
          return !isSelected || bathroom[feature];
        });
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

  const getDistance = (lat1, lon1, lat2, lon2) => {
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


  // setFilteredBathrooms(filtered);
  // console.log('Filtered bathrooms:', filtered);

  return (
    <div className="page-bg1">
          <div className="page-bg2">
            <h1 className="nu-bathroom-finder">NU Bathroom Finder</h1>
                {/* <div>
                  {filteredBathrooms.map((bathroom, index) => (
                    <p key={index}>{bathroom["Building Nickname"]} - {bathroom.Gender}</p>
                  ))}
                </div> */}
                <div>
                  <p>Hello, I'm here!</p>
                    {filteredBathrooms.map((bathroom, index) => (
                  <p key={index}>{bathroom["Building Nickname"]} - {bathroom.Gender}</p>
                  ))}
  </div>

          </div>
    </div>
    

  );
  }

export default Results;
