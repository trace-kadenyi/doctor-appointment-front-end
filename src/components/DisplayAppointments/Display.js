/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import './Display.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAppointments, selectAppointments } from '../../Redux/AppointmentsSlice';
import { fetchDoctors, selectDoctors, selectDoctorsFulfilled } from '../../Redux/doctorSlice';
import { selectCurrentUser } from '../../Redux/UserReducer';

const Display = () => {
  const dispatch = useDispatch();
  const appointments = useSelector(selectAppointments);
  const doctorsFulfilled = useSelector(selectDoctorsFulfilled);
  const currentUser = useSelector(selectCurrentUser);

  // Fetch the appointments for the curent user:
  // loop through the appointments and render each appointment

  useEffect(() => {
    dispatch(fetchAppointments({ userId: currentUser.id }));
    dispatch(fetchDoctors());
  }, [dispatch]);

  const allDoctors = useSelector(selectDoctors);
  const findDoctorName = (id) => allDoctors.find((e) => e.id === id).name;
  const findDoctorSpecialization = (id) => allDoctors.find((e) => e.id === id).specialization;
  return (

    <div className="display">
      <h1 className="display__header">Booked Appointments</h1>

      {
        (appointments && doctorsFulfilled) && appointments.map((appointment) => (
          <>
            <div className="appointment__card" key={appointment.id}>
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
                  {findDoctorName(appointment.doctor_id)}
                  <br />
                  {findDoctorSpecialization(appointment.doctor_id)}
                </p>
              </div>
            </div>
          </>
        ))
      }
    </div>
  );
};

export default Display;
