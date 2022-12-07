import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import User from './components/Authentication/User';
import { setCurrentUser } from './Redux/UserReducer';
import DoctorsList from './components/Doctors/DoctorsList';
import DrDetail from './components/DoctorDetail/DrDetail';
import 'react-toastify/dist/ReactToastify.css';
import ProtectRoutes from './components/ProtectRoutes';
import Appointments from './components/BookAppointments/Appointments';
import Display from './components/DisplayAppointments/Display';
import NewDoctor from './components/Doctors/NewDoctor';
import Navbar from './components/Navbar/Navbar';
import About from './components/About';

const App = () => {
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  // if the user is logged in copy users data from the local storage to redux state.
  if (currentUser) { dispatch(setCurrentUser(currentUser)); }
  return (
    <Router>
      <ToastContainer autoClose={1300} />
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/authentication" element={<User />} />
          <Route element={<ProtectRoutes />}>
            <Route exact path="/" element={<DoctorsList />} />
            <Route path="/book-appointment" element={<Appointments />} />
            <Route path="/doctors/:id/appointment" element={<Appointments />} />
            <Route path="/appointments" element={<Display />} />
            <Route exact path="/doctors/:id" element={<DrDetail />} />
            <Route path="/users/:id/doctors" element={<NewDoctor />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </div>

    </Router>
  );
};

export default App;
