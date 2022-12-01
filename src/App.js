import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import DoctorsList from './components/Doctors/DoctorsList';

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
