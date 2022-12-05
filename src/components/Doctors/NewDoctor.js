import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addDoctor } from '../../Redux/doctorSlice';
import { selectCurrentUser } from '../../Redux/UserReducer';

const NewDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const [doctor, setDoctor] = useState({
    name: '',
    specialization: '',
    photo: '',
    userId: currentUser.id,
  });

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addDoctor(doctor));
    navigate('/');
  };

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
