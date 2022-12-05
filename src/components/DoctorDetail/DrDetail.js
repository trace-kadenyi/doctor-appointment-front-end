import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BiLeftArrow } from 'react-icons/bi';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import {
  fetchDoctor, selectDoctorsloading, selectDoctor,
} from '../../Redux/doctorSlice';
import './DrDetail.css';
import preloader from '../../assets/images/preloader.gif';

const DrDetail = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectDoctorsloading);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchDoctor(id));
  }, [dispatch, id]);

  const doctor = useSelector(selectDoctor) || {};

  return (
    <>
      { loading
    && (
    <div className="loading">
      <img src={preloader} alt="loading" className="preloader" />
    </div>
    )}
      {(!loading && doctor.id) ? (
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
      ) : <div className="alert alert-danger">something went wrond</div>}
    </>
  );
};

export default DrDetail;
