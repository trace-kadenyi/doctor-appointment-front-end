import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Home from './components/Home';
import User from './components/Authentication/User';
import { setCurrentUser } from './Redux/UserReducer';
import DoctorsList from './components/Doctors/DoctorsList';
import Navbar from './components/Navbar/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import ProtectRoutes from './components/ProtectRoutes';

function App() {
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  // if the user is logged in copy users data from the local storage to redux state.
  if (currentUser) { dispatch(setCurrentUser(currentUser)); }
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/authentication" element={<User />} />
        <Route element={<ProtectRoutes />}>
          <Navbar />
          <Route exact path="/" element={<DoctorsList />} />
          <Route exact path="/doctors/:id" element={<DrDetail />} />
          <Route path="/signout" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
