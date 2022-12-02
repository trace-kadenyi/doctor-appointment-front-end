import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { fetchDoctors, doctorSelector } from '../../Redux/doctorSlice';
import { deleteDoctor } from '../../Redux/doctorSlice';
import preloader from '../../assets/images/preloader.gif';
import './doctors.css';

const DoctorsList = () => {
  const dispatch = useDispatch();
  const doctors = useSelector(doctorSelector);

  // Fetch doctors on mount
  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

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
                  <button type="remove-btn" className="delete" onClick={() => dispatch(deleteDoctor(doctor.id))}>Delete</button>
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
