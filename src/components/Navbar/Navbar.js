/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import humburgerMenu from '../../assets/images/humburger-menu.svg';
import closeMenu from '../../assets/images/close-icon.svg';
import './navbar.css';

const Navbar = () => {
  const [showLinks, setShowlinks] = useState(true);

  return (
    <div>
      <div className="navbar">
        <nav className="navbar_main">
          <button className="menu__button" type="button">
            <img src={humburgerMenu} alt="Menu Icon" />
          </button>

          <div className="navbar_left">
            <NavLink className="nav__logo" to="/">
              <img src={logo} alt="logo" />
            </NavLink>
          </div>

          <div className="navbar_right">
            <div
              className="header__links"
              id={showLinks ? 'hidden' : ''}
              onClick={() => setShowlinks(!showLinks)}
            >
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
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
