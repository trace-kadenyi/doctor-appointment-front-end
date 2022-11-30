import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorsList from './components/Doctors/DoctorsList';
// import Navigation from './components/Nav/Navigation';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<DoctorsList />} />
      </Routes>
    </Router>
  );
}

export default App;
