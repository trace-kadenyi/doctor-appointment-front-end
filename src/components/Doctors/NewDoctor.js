/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addDoctor, doctorSelector } from '../../Redux/doctorSlice';
import { fetchUsers, selectCurrentUser } from '../../Redux/UserReducer';

const NewDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const doctors = useSelector(doctorSelector);
  const currentUser = useSelector(selectCurrentUser);
  const [doctor, setDoctor] = useState({
    name: '',
    specialization: '',
    photo: '',
    user_id: currentUser.id,
  });

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addDoctor(doctor));
    navigate('/');
  };

  useEffect(() => {
    dispatch(fetchUsers());
  },
  [dispatch]);

  return (
    <div className="new_doctor">
      <div className="new_doctor_form">
        <h2 className="new_doctor_title">Add a new doctor</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={doctor.name}
            onChange={handleChange}
            className="new_doctor_input"
          />
          <input
            type="text"
            name="specialization"
            placeholder="Specialization"
            value={doctor.specialization}
            onChange={handleChange}
            className="new_doctor_input"
          />
          <input
            type="text"
            name="photo"
            placeholder="Photo"
            value={doctor.photo}
            onChange={handleChange}
            className="new_doctor_input"
          />
          <button type="submit" className="new_doctor_btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default NewDoctor;
