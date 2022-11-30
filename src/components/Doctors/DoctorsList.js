/* eslint-disable */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDoctors, doctorSelector } from '../../Redux/doctorSlice';
import { Link } from 'react-router-dom';

const DoctorsList = () => {
  
  const dispatch = useDispatch();
  const doctors = useSelector(doctorSelector);

  // Fetch doctors on mount
  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const handleDelete = (doctor) => {
    Promise.resolve(dispatch(deleteDoctor(doctor.id))).then(() => 
      dispatch(fetchDoctors(doctors))
    );
  };

  return (
    <div>
      <h1>Doctors</h1>
      {/* loading main page */}
      {doctors.loading && <div className='loading'>Loading...</div>}
      {/* error main page */}
      {doctors.hasErrors && <div className='error'>Unable to display doctors.</div>}
      {/* doctors list */}
      {doctors.doctors.map((doctor) => (
        <div key={doctor.id} className="doctors_div">
          <h2 className='doctors_name'>{doctor.name}</h2>
          <p className='specialization'>{doctor.specialization}</p>
        </div>
      ))}
      <Link to='doctors/1'>Detail</Link>

      <button id={doctors.id} onClick={(e) => { handleDelete(e.target.id); }} type="button">Delete</button>
    </div>
  );
}

export default DoctorsList;