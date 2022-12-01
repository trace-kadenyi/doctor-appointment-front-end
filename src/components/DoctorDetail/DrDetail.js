import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaAngleLeft } from 'react-icons/fa';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

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
    <Container>
      <div className="doctor-detail__container">
        <Row className="mx-2">
          <Link to="/">
            <FaAngleLeft />
            Back to doctors
          </Link>
        </Row>
        <Row className="d-flex">
          <Card className="mb-5 p-3">
            <Card.Img variant="top" src={doctor.photo} alt="doctor" />
          </Card>
        </Row>
        <div className="info__list">
          <ul className="doctor-detail__info">
            <li><h2 className="doctor-detail__name">{doctor.name}</h2></li>
            <li><p className="doctor-detail__specializations">{doctor.specialization}</p></li>
            <li><Link to={`/doctors/${id}/appointments`}>Make an appointment</Link></li>
          </ul>
        </div>
        <div className="link_to_doctors">
          <Link to="/">
            <FaAngleLeft />
            Back to doctors
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default DrDetail;
