import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from './components/Home';
import User from './components/User';
import { selectCurrentUser, setCurrentUser } from './Redux/UserReducer';
import DoctorsList from './components/Doctors/DoctorsList';

function App() {
  const dispatch = useDispatch();
  // check if a current user exists in local storage or in the redux store.
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || useSelector(selectCurrentUser)
  // if the user is logged in copy users data from the local storage to redux state.
  if (currentUser) { dispatch(setCurrentUser(currentUser)); }
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        { !currentUser && <Route path="/" element={<User />} /> }
        <Route exact path="/" element={<DoctorsList />} />
      </Routes>
    </Router>
  );
}

export default App;
