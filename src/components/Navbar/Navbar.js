import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './navbar.css';

const Navbar = () => (
  <div className="navbar">
    <nav className="navbar_main">
      <div className="navbar_left">
        <NavLink className="nav__logo" to="/">
          <img src={logo} alt="logo" />
        </NavLink>
      </div>

      <div className="navbar_right">
        <div className="header__links">
          <NavLink to="/" className="header__link active">
            Doctors
          </NavLink>
          <NavLink to="/book-appointment" className="header__link">
            Book Appointment
          </NavLink>
          <NavLink to="/appointments" className="header__link">
            Appointments
          </NavLink>
          <NavLink to="/add-new-doctor" className="header__link">
            Add Doctor
          </NavLink>
          <NavLink to="/delete-doctor" className="header__link">
            Delete Doctor
          </NavLink>
        </div>
      </div>
    </nav>
  </div>
);

export default Navbar;
