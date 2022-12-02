/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { signOut } from '../../Redux/UserReducer';
import logo from '../../assets/images/logo.png';
import humburgerMenu from '../../assets/images/humburger-menu.svg';
import './navbar.css';
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const [showLinks, setShowlinks] = useState(false);
  const dispatch = useDispatch();

 const navLinks = document.querySelectorAll('.header__link');
 navLinks.forEach(e => {e.addEventListener('click',() => setShowlinks(!showLinks))});

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
                <button  className="header__link" onClick={() => { dispatch(signOut()); }}>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
