import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaAngleLeft } from 'react-icons/fa';

import { fetchDoctors, doctorSelector } from '../../Redux/doctorSlice';

const DrDetail = () => {
  const dispatch = useDispatch();
  const { doctors } = useSelector(doctorSelector);
  const { id } = useParams();
  const doctor = doctors.find((doc) => doc.id === parseInt(id, 10));

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
          <img className="doctor_photo" src={doctor.photo} alt="doctor" />
        </div>
        <div>
          <ul className="doctor-detail__info">
            <li><h2 className="doctor-detail__name">{doctor.name}</h2></li>
            <li><p className="doctor-detail__specializations">{doctor.specializations}</p></li>
            <li><Link to={`/doctors/${id}/appointments`}>Make an appointment</Link></li>
          </ul>
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
