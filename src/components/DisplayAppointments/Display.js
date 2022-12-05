/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import './Display.css';
import { useSelector, useDispatch } from 'react-redux';
import { appointmentsSelector, fetchAppointments } from '../../Redux/AppointmentsSlice';

const Display = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments);
  const allDoctors = useSelector((state) => state.doctors);
  // Fetch the appointments for the curent user:
  // loop through the appointments and render each appointment

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  return (

    <div className="display">
      <h1 className="display__header">Booked Appointments</h1>

      {
        appointments && appointments.map((appointment, index) => (
          <div className="appointment__card" key={index}>
            <div className="top">
              <div className="left">
                <p>Appointment Date:</p>
                {/* should destroy the appointment */}
                <p>Delete</p>
              </div>
              <div className="time">
                {appointment.date_of_appointment}
                {' '}
                at
                {' '}
                {appointment.time_of_appointment}
              </div>
            </div>
            <div className="bottom">
              <p>
                {allDoctors[appointment.doctor_id].name}
                <br />
                {allDoctors[appointment.doctor_id].specialization}
              </p>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default Display;
