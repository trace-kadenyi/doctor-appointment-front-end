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
      </div>
    </div>
  );
};

export default Appointments;
