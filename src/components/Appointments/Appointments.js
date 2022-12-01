/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAppointments, appointmentsSelector } from '../../Redux/AppointmentsSlice';
import './Appointments.css';

const Appointments = () => {
  const dispatch = useDispatch();
  const appointments = useSelector(appointmentsSelector);

  // Fetch the appointments dispatch the fetching function
  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  return (
    <div className="appointments">
      <div className="header">
        <h2>My appointments</h2>
        {/* Include doctor's info? */}
        {
          appointments && appointments.map((appointment) => {
            <div className="appointment__card" key={appointment.id}>
              <p>
                Appointments:
                {appointment.description}
              </p>
              <p>
                Date of Appointment:
                {appointment.date_of_appointment}
              </p>
              <p>
                Time of Appointment:
                {appointment.time_of_appointment}
              </p>
              {/* Add Icon to delete instead of a button */}
              <button className="delete_appointment" type="button">Delete Appointment</button>
            </div>;
          })
        }
      </div>
    </div>
  );
};

export default Appointments;
