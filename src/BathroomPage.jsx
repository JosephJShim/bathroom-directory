import React from 'react';
import { useLocation } from 'react-router-dom';
import bathrooms from './bathrooms.json';

function BathroomPage() {
    const location = useLocation();
    const bathroom = location.state ? location.state.bathroom : null;

    console.log('BathroomPage location state:', location.state);

    if (!bathroom) {
        console.error("No bathroom data in state. State:", location.state);
        return <p>No bathroom data available.</p>;
    }

    console.log("Bathroom data:", bathroom);

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
              <h1>{bathroom["Building Nickname"]}</h1>
              <p>Floor: {bathroom.Floor}</p>
              <p>Room: {bathroom.Room}</p>
              <p>Gender: {bathroom.Gender}</p>
              <p>Features:</p>
              <ul>
                {features.map((feature, index) => <li key={index}>{feature}</li>)}
              </ul>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSf7uEkCziYhchcrtnIp5jnlvLtacd7PO98NMCfKPH4ciTXkTw/viewform?usp=sf_link">
                Go to Google Form
              </a>
            </div>
          </div>
        </div>
    );
}

export default BathroomPage;



// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import bathrooms from './bathrooms.json';


// function BathroomPage() {
//     const location = useLocation();
//     const bathroom = location.state ? location.state.bathroom : null;
  
//     if (!bathroom) {
//       console.error("No bathroom data in state. State:", location.state);
//       return <p>No bathroom data available.</p>;
//     }

//     console.log("Bathroom data:", bathroom);

//   const features = [];
//   if (bathroom.ADA) {
//     features.push('ADA Accessible');
//   }
//   if (bathroom.PP) {
//     features.push('Period Products');
//   }
//   if (bathroom.PTowel) {
//     features.push('Paper Towels');
//   }
//   if (bathroom.Changing) {
//     features.push('Changing Table');
//   }

//   return (
//      <div className="page-bg1">
//       <div className="page-bg2">
//         <h1 className="nu-bathroom-finder">NU Bathroom Finder</h1>
//             <div>
//       <h1>{bathroom["Building Nickname"]}</h1>
//       <p>Floor: {bathroom.Floor}</p>
//       <p>Room: {bathroom.Room}</p>
//       <p>Gender: {bathroom.Gender}</p>
//       <p>Features:</p>
//       <ul>
//         {features.map((feature, index) => <li key={index}>{feature}</li>)}
//       </ul>
//       <a href="https://docs.google.com/forms/d/e/1FAIpQLSf7uEkCziYhchcrtnIp5jnlvLtacd7PO98NMCfKPH4ciTXkTw/viewform?usp=sf_link">
//         Go to Google Form
//       </a>
//     </div>
//     </div>
//     </div>
//   );
// }

// export default BathroomPage;
