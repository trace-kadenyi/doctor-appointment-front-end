import React, { useEffect } from 'react';
import './Display.css';
import { useSelector, useDispatch } from 'react-redux';
import { appointmentsSelector, fetchAppointments } from '../../Redux/AppointmentsSlice';

const Display = () => {
  const dispatch = useDispatch();
  const appointments = useSelector(appointmentsSelector);

  // Fetch the appointments for the curent user:
  // loop through the appointments and render each appointment

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  return (

    <div className="display">
      <h1 className="display__header">Booked Appointments</h1>
      <div className="appointment__card">
        <div className="top">
          <div className="left">
            <p>Appointment Date:</p>
            {/* should destroy the appointment */}
            <p>Delete</p>
          </div>
          <div className="time">
            Monday Dec 05, 2022 at 8.30am
          </div>
        </div>
        <div className="bottom">
          <p>
            Dr Kadenyi
            <br />
            Opthamologist
          </p>
        </div>
      </div>
    </div>
  );
};

export default Display;
