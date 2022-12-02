/* eslint-disable */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi';
import { useParams, Link } from 'react-router-dom';

import { fetchDoctors, doctorSelector } from '../../Redux/doctorSlice';
import { fetchUsers, selectCurrentUser } from '../../Redux/UserReducer';
import preloader from '../../assets/images/preloader.gif';
import './doctors.css';

const DoctorsList = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const params = useParams();
  const doctors = useSelector(doctorSelector);
  const Users = useSelector(selectCurrentUser)

  // Fetch doctors on mount
  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  // Fetch users on mount
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // get user by id
  const { id } = params;
  // const user = Users.find((user) => user.id === parseInt(id, 10));

  // scroll to the right
  const scrollRight = () => {
    const container = document.querySelector('.scroll_content');
    container.scrollLeft += container.offsetWidth / 2;
    // if inactive disable the button
    if (container.scrollLeft >= container.scrollWidth - container.offsetWidth) {
      document.querySelector('.right').classList.add('disable');
    } else {
      document.querySelector('.right').classList.remove('disable');
    }
  };

  // scroll to the left
  const scrollLeft = () => {
    const container = document.querySelector('.scroll_content');
    container.scrollLeft -= container.offsetWidth / 2;
    // if inactive add disable attribute
    if (container.scrollLeft === 0) {
      document.querySelector('.left').classList.add('disable');
    } else {
      document.querySelector('.left').classList.remove('disable');
    }
  };

  return (
    <div className="doctors_sect">
      {/* page title */}
      <div>
        <p className="page_title">
          <span className="available_docs">AVAILABLE DOCTORS</span>
          <span className="select">Please select a doctor</span>
        </p>
      </div>
      {/* loading main page */}
      {doctors.loading && (
      <div className="loading">
        <img src={preloader} alt="loading" className="preloader" />
      </div>
      )}
      {/* error main page */}
      {doctors.hasErrors && (
        <div className="error">Unable to display doctors. Please check your server.</div>
      )}

      {/* add doctor button */}
      <div className="add_doctor">
        <Link to="/users/:id/doctors" className="add_doctor_btn">
          Add Doctor
        </Link>
      </div>

      {/* doctors' list */}
      {!doctors.loading && !doctors.hasErrors && (
        <div className="content_div">
          {/* scroll left arrow */}
          <div className="arrow_div">
            <button type="button" className="arrow left" onClick={scrollLeft}>
              <BiLeftArrow className="left_arrow" />
            </button>
          </div>
          <div className="cover_div">
            <div className="scroll_content">
              {doctors.doctors.map((doctor) => (
                <div key={doctor.id} className="doctors_div">
                  <Link to={`/doctors/${doctor.id}`}>
                    <img
                      className="doctors_img"
                      src={doctor.photo}
                      alt={doctor.name}
                    />
                  </Link>
                  <h2 className="doctors_name">{doctor.name}</h2>
                  <p className="specialization">{doctor.specialization}</p>
                </div>
              ))}
            </div>
          </div>
          {/* scroll right arrow */}
          <div>
            <button type="button" className="arrow right" onClick={scrollRight}>
              <BiRightArrow />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default DoctorsList;
