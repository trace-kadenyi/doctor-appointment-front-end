import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorsList from './components/Doctors/DoctorsList';
import Navigation from './components/Nav/Navigation';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<DoctorsList />} />
      </Routes>
    </Router>
  );
}

export default App;
