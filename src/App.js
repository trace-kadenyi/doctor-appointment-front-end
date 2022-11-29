import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DrDetail from './components/DoctorDetail/DrDetail';
import './components/DoctorDetail/DrDetail.css';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/doctors/:index" element={<DrDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
