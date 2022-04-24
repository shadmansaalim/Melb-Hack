import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import { Row, Container, Modal, Form, FloatingLabel, } from 'react-bootstrap';
import './_announcements.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../hooks/useAuth';
import Announcement from './Announcement';
import swal from 'sweetalert';



function AddAnnouncementModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Form onSubmit={props.handleOnSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Publish Announcement
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>

                        <FloatingLabel controlId="floatingTextarea" label="Announcement Title" className="mb-3">
                            <Form.Control
                                onBlur={props.handleOnBlur}
                                name="title"
                                onB
                                placeholder="Leave a comment here" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingTextarea2" label="Announcement Body">
                            <Form.Control
                                onBlur={props.handleOnBlur}
                                name="body"
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '100px' }}
                            />
                        </FloatingLabel>

                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className="btn btn-success">Publish Announcement <FontAwesomeIcon icon={faBullhorn} /></button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}




const Announcements = () => {
    const { user, instructor } = useAuth();
    const [modalShow, setModalShow] = useState(false);
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        fetch('https://still-basin-68719.herokuapp.com/announcements')
            .then(res => res.json())
            .then(data => setAnnouncements(data));
    }, [])


    const [announcementData, setAnnouncementData] = useState({});


    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newAnnouncementData = { ...announcementData };
        newAnnouncementData[field] = value;
        setAnnouncementData(newAnnouncementData);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (instructor) {
            announcementData.instructor = user.displayName;
            const date = new Date()
            announcementData.date = date.toLocaleDateString();
            fetch(`https://still-basin-68719.herokuapp.com/announcements`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(announcementData)
            })
                .then(res => res.json())
                .then(result => {
                    if (result.insertedId) {
                        setModalShow(false);
                        swal("Announcement Published Successfully!", "Students will be able to view the announcement now", "success");
                    }
                })
        }
    }


    return (
        <>
            {
                announcements.length
                    ?
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

                                        <AddAnnouncementModal
                                            handleOnBlur={handleOnBlur}
                                            handleOnSubmit={handleOnSubmit}
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                        />
                                    </>
                                }

                            </div>

                            <Row className="gy-3 gx-3">
                                {
                                    announcements.map((announcement, index) => <Announcement
                                        announcement={announcement}
                                        key={index}
                                    ></Announcement>)
                                }
                            </Row>
                        </Container>
                    </div>
                    :
                    <div className="spinner d-flex align-items-center justify-content-center">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
            }
        </>
    )
}

export default Announcements;