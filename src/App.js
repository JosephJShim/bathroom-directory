import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './global.css';
import LandingPage from './LandingPage';
import StudentStatus from './StudentStatus';
import GenderSelection from './GenderSelection';
import FeatureSelection from './FeatureSelection';
import Results from './Results';
import BathroomPage from './BathroomPage';

function App() {
  return (
  <Router>
    <Routes>
    <Route exact path="/bathroom-directory" element={<LandingPage />} />
    <Route path="/studentstatus" element={<StudentStatus />} />
    <Route path="/genderselection" element={<GenderSelection />} />
    <Route path="/featureselection" element={<FeatureSelection />} />
    <Route path="/results" element={<Results />} />
    <Route path="/bathroompage" element={<BathroomPage />} />
  </Routes>
</Router>

  );
}

export default App;
