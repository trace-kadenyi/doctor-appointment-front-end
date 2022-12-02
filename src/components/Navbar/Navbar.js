/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import humburgerMenu from '../../assets/images/humburger-menu.svg';
import './navbar.css';

const Navbar = () => {
  const [showLinks, setShowlinks] = useState(false);

  return (
    <div>
      <div className="navbar" id={!showLinks ? 'hide-shadow' : ''}>
        <nav className="navbar_main">
          <button className="menu__button" type="button" onClick={() => setShowlinks(!showLinks)}>
            <img src={humburgerMenu} alt="Menu Icon" />
          </button>

          <div className="nav_items" id={showLinks ? 'showNav' : ''}>
            <div className="navbar_left" id={showLinks ? 'd-none' : ''}>
              <NavLink className="nav__logo" to="/" onClick={() => setShowlinks(!showLinks)}>
                <img src={logo} alt="logo" />
              </NavLink>
            </div>

            <div className="navbar_right" id={showLinks ? 'showNav' : ''}>
              <div className="header__links">
                <NavLink to="/" className="header__link" onClick={() => setShowlinks(!showLinks)}>
                  Doctors
                </NavLink>
                <NavLink to="/book-appointment" className="header__link" onClick={() => setShowlinks(!showLinks)}>
                  Book Appointment
                </NavLink>
                <NavLink to="/appointments" className="header__link" onClick={() => setShowlinks(!showLinks)}>
                  Appointments
                </NavLink>
                <NavLink to="/add-new-doctor" className="header__link" onClick={() => setShowlinks(!showLinks)}>
                  Add Doctor
                </NavLink>
                <NavLink to="/delete-doctor" className="header__link" onClick={() => setShowlinks(!showLinks)}>
                  Delete Doctor
                </NavLink>
                <NavLink to="/signout" className="header__link" onClick={() => setShowlinks(!showLinks)}>
                  Sign Out
                </NavLink>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
