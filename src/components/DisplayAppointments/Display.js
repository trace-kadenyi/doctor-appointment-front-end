import React from 'react';
import './Display.css';
import { useSelector, useDispatch } from 'react-redux';

const Display = () => {
  const dispatch = useDispatch();

  return (
    <div className="display">
      <h1 className="display__header">Booked Appointments</h1>
      <div className="appointment__card">
        <div className="top">
          <div className="left">
            <p>Appointment Date:</p>
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
  )
};

export default Display;
