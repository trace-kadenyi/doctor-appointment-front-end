import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorsList from './components/Doctors/DoctorsList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DoctorsList />} />
      </Routes>
    </Router>
  );
}

export default App;
