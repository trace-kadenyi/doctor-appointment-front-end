import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../../Redux/UserReducer';
import {
  fetchDoctors, doctorSelector, deleteDoctor, selectdoctorEdited, selectDoctors,
} from '../../Redux/doctorSlice';
// import { fetchUsers, selectCurrentUser } from '../../Redux/UserReducer';
import preloader from '../../assets/images/preloader.gif';
import './doctors.css';

const DoctorsList = () => {
  const dispatch = useDispatch();
  const doctors = useSelector(doctorSelector);
  const doctorsList = useSelector(selectDoctors);
  const doctorEdited = useSelector(selectdoctorEdited);
  // get the current user from localstorage.
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // or from the store uncomment the next line and line 6
  // const currentUser = dispatch(selectCurrentUser)

  // Fetch doctors on mount
  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch, doctorEdited]);

  // Fetch users on mount
  useEffect(() => {
    dispatch(fetchUsers());
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
        <div className="error">
          Unable to display doctors. Please check your server.
        </div>
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
              {doctorsList.map((doctor) => (
                <div key={doctor.id} className="doctors_div">
                  {/* link to DrDetails */}
                  <Link to={`/doctors/${doctor.id}`}>
                    <img
                      className="doctors_img"
                      src={doctor.photo}
                      alt={doctor.name}
                    />
                  </Link>
                  {/* delete doctor button only for owners. */}
                  {doctor.user_id === currentUser.id
                    && (
                    <button
                      type="button"
                      className="delete btn btn-danger"
                      onClick={() => {
                        dispatch(deleteDoctor({ doctorId: doctor.id, userId: currentUser.id }));
                      }}
                    >
                      Delete
                    </button>
                    )}
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
