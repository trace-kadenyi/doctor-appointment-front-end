import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaAngleLeft } from 'react-icons/fa';

import { fetchDoctors, doctorSelector } from '../../Redux/doctorSlice';

const DrDetail = () => {
  const dispatch = useDispatch();
  const { doctors } = useSelector(doctorSelector);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  return (
    <section className="doctor-detail">
      <div className="link_to_doctors">
        <Link to="/">
          <FaAngleLeft />
          Back to doctors
        </Link>
      </div>
      <div className="doctor-detail__container">
        <div className="doctor-detail__photo">
          <img className="doctor_photo" src={doctors.photo} alt="doctor" />
        </div>
        <div className="doctor-detail__info">
          <h2 className="doctor-detail__name">{doctors.name}</h2>
          <p className="doctor-detail__specializations">{doctors.specializations}</p>
          <Link to={`/doctors/${id}/appointments`}>Make an appointment</Link>
        </div>
      </div>
      <div className="link_to_doctors">
        <Link to="/">
          <FaAngleLeft />
          Back to doctors
        </Link>
      </div>
    </section>
  );
};

export default DrDetail;
