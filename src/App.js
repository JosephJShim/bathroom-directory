import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './LandingPage';
import StudentStatus from './StudentStatus';
import GenderSelection from './GenderSelection';
// import FeatureSelection from './FeatureSelection';
// import Results from './Results';

function App() {
  return (
  <Router>
    <Routes>
    <Route exact path="/" element={<LandingPage />} />
    <Route path="/studentstatus" element={<StudentStatus />} />
    <Route path="/genderselection" element={<GenderSelection />} />
    {/* <Route path="/featureselection" element={<FeatureSelection />} />
    <Route path="/results" element={<Results />} /> */}
  </Routes>
</Router>

  );
}

export default App;
