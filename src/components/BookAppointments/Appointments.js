/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import './Appointments.css';
import { selectCurrentUser } from '../../Redux/UserReducer';
import { fetchDoctors, selectDoctors, selectDoctorsFulfilled } from '../../Redux/doctorSlice';
import { addAppointment } from '../../Redux/AppointmentsSlice';

const Appointments = () => {
  const doctors = useSelector(selectDoctors);
  const currentUser = useSelector(selectCurrentUser);
  const fulfilledDoctors = useSelector(selectDoctorsFulfilled);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState({
    doctor_id: '',
    date_of_appointment: '',
    time_of_appointment: '',
    description: '',
    user_id: currentUser.id,
  });
  const [onDoctors, setOnDoctors] = useState(false);

  // get the id from url , set onDoctors to be true
  const { id } = useParams();
  // get the doctor selected name;

  const getDoctorName = (id) => {
    const doctor = doctors.find((e) => e.id === Number(id));
    return doctor.name;
  };

  // fetch doctors on page load
  useEffect(() => {
    dispatch(fetchDoctors());
    if (id) { setOnDoctors(true); }
  }, [dispatch]);

  // handle the change of the input fields
  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  // handle the submission of the form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) { appointment.doctor_id = id; }
    dispatch(addAppointment({ appointment, onDoctors }));
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
            <input type="date" name="date_of_appointment" className="date" onChange={handleChange} />
          </div>
          <div className="date__selector">
            <label htmlFor="time">Time of Appointment</label>
            <input type="time" name="time_of_appointment" className="time" onChange={handleChange} />
          </div>

          { !id
          && (
          <div className="doctor__selector">
            <label htmlFor="Doctor">Select a Doctor</label>
            <select name="doctor_id" onChange={handleChange}>
              <option value="no-value">Doctor</option>
              {/* map through doctors */}
              { fulfilledDoctors && doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id} name="doctorId">
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
          )}
          {(id && fulfilledDoctors) &&
          <div className='doctor__selector'>
            <label htmlFor="doctor">Doctor</label>
            <input value={getDoctorName(id)} readOnly />
          </div>
          }

          {/* description */}
          <div className="description">
            <label htmlFor="description">Description</label>
            <textarea placeholder="Briefly describe your condition" className="textarea description-text-area" name="description" id="" cols="30" rows="5" onChange={handleChange} />
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
