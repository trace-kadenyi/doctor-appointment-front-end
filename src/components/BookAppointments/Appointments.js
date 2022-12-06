/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './Appointments.css';
import { selectCurrentUser } from '../../Redux/UserReducer';
import { doctorSelector } from '../../Redux/doctorSlice';
import { addAppointment } from '../../Redux/AppointmentsSlice';

const Appointments = () => {
  const { doctors } = useSelector(doctorSelector);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState({
    doctorId: '',
    dateOfAppointment: '',
    timeOfAppointment: '',
    description: '',
    userId: currentUser.id,
  });

  // handle the change of the input fields
  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  // handle the submission of the form
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAppointment(appointment));
    navigate('/appointments');
  };

  return (
    <div className="appointments">
      {/* <h1>Book your appointment</h1> */}
      <div className="appointments__tab">
        <form action="" className="book__doctor" onSubmit={handleSubmit}>
          {/* date and time */}
          <div className="date__selector">
            <label htmlFor="date">Date of Appointment</label>
            <input type="date" name="dateOfAppointment" className="date" onChange={handleChange} />
          </div>
          <div className="date__selector">
            <label htmlFor="time">Time of Appointment</label>
            <input type="time" name="timeOfAppointment" className="time" onChange={handleChange} />
          </div>
          {/* doctor */}
          <div className="doctor__selector">
            <label htmlFor="Doctor">Select a Doctor</label>
            <select name="doctor_select" onChange={handleChange}>
              <option value="no-value">Doctor</option>
              {/* map through doctors */}
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id} name="doctorId">
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
          {/* description */}
          <div className="description">
            <label htmlFor="description">Description</label>
            <input name="description" id="" cols="30" rows="10" onChange={handleChange} />
          </div>
          <button type="submit" className="book_button">
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Appointments;
