import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaAngleLeft } from 'react-icons/fa';

const DrDetail = () => {
  const { id } = useParams();
  const { doctors } = useSelector((state) => state.doctors);
  const doctor = doctors[parseInt(id, 10) - 1];

  return (
    <section className="doctor-detail">
      <div className="link_to_doctors">
        <Link to="/doctors">
          <FaAngleLeft />
          Back to doctors
        </Link>
      </div>
      <div className="doctor-detail__container">
        <div className="doctor-detail__photo">
          <img className="doctor_photo" src={doctor.photo} alt="doctor" />
        </div>
        <div className="doctor-detail__info">
          <h2 className="doctor-detail__name">{doctor.name}</h2>
          <p className="doctor-detail__specializations">{doctor.specializations}</p>
          <Link to={`/doctors/${id}/appointments`}>Make an appointment</Link>
        </div>
      </div>
      <div className="link_to_doctors">
        <Link to="/doctors">
          <FaAngleLeft />
          Back to doctors
        </Link>
      </div>
    </section>
  );
};

export default DrDetail;
