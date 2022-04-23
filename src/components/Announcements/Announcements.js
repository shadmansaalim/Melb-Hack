import React from 'react';
import Header from '../Header/Header';
import { Row, Col, Container, Modal, Button, Form, FloatingLabel, } from 'react-bootstrap';
import './_announcements.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import profile from '../../assets/profile.png';
import useAuth from '../../hooks/useAuth';

let data = {
    announcements: [
        {
            date_published: null,
            instuctor: "Instructor name",
            title: "Please stop asking your teacher to go to the toilet during online class.",
            body: "According to all known laws of aviation, there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway.",
        },
        {
            instuctor: "Instructor name",
            title: "Stop trying to rick roll out instructors",
            body: "According to all known laws of aviation, there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway.",
        },
        {
            instuctor: "Instructor name",
            title: "Please stop asking your teacher to go to the toilet during online class.",
            body: "According to all known laws of aviation, there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway.",
        },
    ]
}

const Announcements = () => {
    const { user, instructor } = useAuth();
    const [modalShow, setModalShow] = React.useState(false);


    return (
        <div id="announcements">
            <Header></Header>
            <Container className="my-5">
                <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start mb-4">
                    <h1 className="my-0">Announcements</h1>
                    {
                        instructor
                        &&
                        <>
                            <button onClick={() => setModalShow(true)} className="btn btn-success my-0 mt-3 mt-lg-0">Add Announcement <FontAwesomeIcon icon={faBullhorn} /></button>


                            <Modal
                                show={modalShow}
                                size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                        Publish Announcement
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                    <Container>
                                        <Form>
                                            <FloatingLabel controlId="floatingTextarea" label="Announcement Title" className="mb-3">
                                                <Form.Control placeholder="Leave a comment here" />
                                            </FloatingLabel>
                                            <FloatingLabel controlId="floatingTextarea2" label="Announcement Body">
                                                <Form.Control
                                                    as="textarea"
                                                    placeholder="Leave a comment here"
                                                    style={{ height: '100px' }}
                                                />
                                            </FloatingLabel>
                                        </Form>
                                    </Container>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button className="btn btn-success" onClick={() => setModalShow(false)}>
                                        Publish Announcement <FontAwesomeIcon icon={faBullhorn} />
                                    </button>
                                </Modal.Footer>
                            </Modal>
                        </>
                    }

                </div>

                <Row className="gy-3 gx-3">
                    {data.announcements.map(function (object, i) {
                        return <Col className="col-12 col-lg-6 a-cards">
                            <div className="card-wrap text-white">
                                <div className="instuctor mb-4">
                                    <img src={profile} alt="" />
                                    <p className="my-0 ms-2">{object.instuctor}</p>
                                </div>
                                <h3 className="mb-4">
                                    {object.title}
                                </h3>
                                <p><b>Posted: 1st April 2022</b></p>
                                <p>{object.body}</p>
                            </div>
                        </Col>
                    })}
                </Row>
            </Container>
        </div>
    )
}

export default Announcements;