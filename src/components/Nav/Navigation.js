/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import humburgerMenu from '../../assets/images/humburger-menu.svg';
import './navigation.css';

function Navigation() {
  const [showLinks, setShowlinks] = useState(false);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar_left">
          <NavLink className="nav__logo" to="/">
            <img src={logo} alt="logo" />
          </NavLink>
        </div>

        <div className="navbar_right">
          <div className="header__links" id={showLinks ? 'hidden' : ''} onClick={() => setShowlinks(!showLinks)}>
            <NavLink to="/" className="header__link">
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
          <button className="menu__button" onClick={() => setShowlinks(!showLinks)}>
            <img src={humburgerMenu} alt="Menu Icon" />
          </button>
        </div>

      </nav>
    </div>
  );
}

export default Navigation;
