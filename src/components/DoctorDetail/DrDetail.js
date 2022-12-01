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
      <Row className="mx-2">
        <Link to="/">
          <FaAngleLeft />
          Back to doctors
        </Link>
      </Row>
      <Row className="d-flex">
        <Col xs={12} md={5}>
          <Card className="mb-4 p-3">
            <Card.Img variant="top" src={doctor.photo} alt="doctor" />
          </Card>
        </Col>

        <Col xs={12} md={4}>
          <Card.Body className="doctor-detail__info">
            <Card.Title>{doctor.name}</Card.Title>
            <Table className="mt-4" striped bordered hover size="sm">
              <tbody>
                <tr>
                  <th>Specialization</th>
                  <td>{doctor.specialization}</td>
                </tr>
                <tr>
                  <th>Make an appointment</th>
                  <td className="d-flex justify-content-end"><Link to={`/doctors/${id}/appointments`} className="btn btn-primary">Book Appointment</Link></td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Col>
        <div className="link_to_doctors">
          <Link className="left" to="/">
            <FaAngleLeft />
            Back to doctors
          </Link>
        </div>
      </Row>
    </Container>
  );
};

export default DrDetail;
