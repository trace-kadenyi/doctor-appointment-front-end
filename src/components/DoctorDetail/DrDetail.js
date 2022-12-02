import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BiLeftArrow } from 'react-icons/bi';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import './DrDetail.css';

import { fetchDoctor, doctorSelector } from '../../Redux/doctorSlice';

const DrDetail = () => {
  const dispatch = useDispatch();
  const { doctor } = useSelector(doctorSelector);
  const { id } = useParams();
  // const doctor = doctors.find((doc) => doc.id === parseInt(id, 10));

  useEffect(() => {
    dispatch(fetchDoctor(id));
    console.log('run');
  }, [dispatch]);

  return (
    <Container>
      <Row className="d-flex">
        <Col xs={12} md={5}>
          <Card className="mb-4 p-3">
            <Card.Img variant="top" src={doctor.photo} alt="doctor" />
          </Card>
        </Col>

        <Col xs={12} md={5}>
          <Card.Body>
            <Card.Title><h5>{doctor.name}</h5></Card.Title>
            <div>
              <Table striped bordered hover responsive="sm">
                <tbody>
                  <tr>
                    <th>Specialization</th>
                    <td>{doctor.specialization}</td>
                  </tr>
                  <tr>
                    <th>Bio</th>
                    <td>{}</td>
                  </tr>
                  <tr>
                    <th>Appointment</th>
                    <td className="d-flex justify-content-end"><Link to={`/doctors/${id}/appointments`} className="btn btn-success">Book Appointment</Link></td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Col>
      </Row>
      <button type="button" className="arrow left">
        <Link className="back" to="/">
          <BiLeftArrow />
        </Link>
      </button>
    </Container>
  );
};

export default DrDetail;
