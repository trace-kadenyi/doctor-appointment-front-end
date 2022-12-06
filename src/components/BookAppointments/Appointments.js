/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './Appointments.css';

const Appointments = () => {
  // const allDoctors = useSelector((state) => state.doctors);

  const bookAppointment = (e) => {
    e.preventDefault();
    const formObject = new FormData(e.target);
    const data = Object.fromEntries(formObject.entries());
    // Form Object wil give a key value pair
    // dispatch an action to send data
  };

  return (
    <div className="appointments">
      {/* <h1>Book your appointment</h1> */}
      <div className="appointments__tab">
        <form action="" className="book__doctor" onSubmit={bookAppointment}>
          <div className="date__selector">
            <label htmlFor="date">Select a date and time</label>
            <input type="datetime-local" name="date_time" className="date" />
          </div>
          <div className="doctor__selector">
            <label htmlFor="Doctor">Select Doctor</label>
            <select name="doctor_select">
              <option value="no-value">Doctor</option>
              {/* {allDoctors.map((doctor) => (<option key={doctor.id} value={doctor.id}>{`Dr. ${doctor.name}`}</option>))} */}
            </select>
          </div>

          <button type="submit" className="book_button">Book Now</button>
        </form>
      </div>

    </div>
  );
};

export default Appointments;
