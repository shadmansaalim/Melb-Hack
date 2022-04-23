import React, { useEffect, useState } from 'react';
import './_CourseContent.scss';
import { Row, Col, ProgressBar, Container, Accordion, Modal, Form, Button, FloatingLabel, Card, useAccordionButton } from 'react-bootstrap';
import Module from '../Module/Module';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import useAuth from '../../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';



const CourseContent = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { courseID, courseParam, moduleID, videoID } = useParams();
    const { user, instructor } = useAuth();


    const cID = parseInt(courseID.substring(6));
    const mID = parseInt(moduleID.substring(6));
    const vID = parseInt(videoID.substring(5));


    const [course, setCourse] = useState({});
    const [module, setModule] = useState({});
    const [currentVideo, setCurrentVideo] = useState({});

    const [modalShow, setModalShow] = useState(false);


    const video_nums = module?.videos?.length;
    const modules_num = course?.modules?.length;


    const history = useHistory();


    useEffect(() => {
        fetch(`http://localhost:8000/course/${cID}`)
            .then(res => res.json())
            .then(data => {
                setCourse(data)
                const modules = data.modules;
                const module = modules.find(module => module.key == mID);
                const video = module.videos.find(video => video.key == vID);
                setModule(module);
                setCurrentVideo(video);
            })
            .finally(() => setIsLoading(false));

    }, [courseID, courseParam, moduleID, videoID])

    const moveNextVideo = () => {
        const data = {
            cID,
            mID,
            vID
        };
        if (vID != video_nums) {
            fetch(`http://localhost:8000/user/${user.email}/completed`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(result => {
                    if (result.modifiedCount) {
                        const vID = parseInt(videoID.substring(5)) + 1;
                        history.push(`/${courseID}/${courseParam}/${moduleID}/video${vID}`);
                        window.location.reload();
                    }
                });
        }
        else {
            if (mID != modules_num) {
                fetch(`http://localhost:8000/user/${user.email}/completed`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(res => res.json())
                    .then(result => {
                        if (result.modifiedCount) {
                            const mID = parseInt(moduleID.substring(6)) + 1;
                            const vID = 1;
                            history.push(`/${courseID}/${courseParam}/module${mID}/video${vID}`);
                            window.location.reload();
                        }
                    });

            }
        }
    }

    const movePreviousVideo = () => {
        if (vID != 1) {
            const vID = parseInt(videoID.substring(5)) - 1;
            history.push(`/${courseID}/${courseParam}/${moduleID}/video${vID}`);
            window.location.reload();
        }
        if (vID == 1 && mID != 1) {
            const mID = parseInt(moduleID.substring(6)) - 1;
            const module = course.modules.find(module => module.key == mID);
            const vID = module?.videos.length;
            history.push(`/${courseID}/${courseParam}/module${mID}/video${vID}`);
            window.location.reload();
        }

    }

    // the data that will be pushed to the database
    const [instructorNewModule, setInstructorNewModule] = useState('');
    const [instructorVideos, setInstructorVideos] = useState([
        { key: 1 },
    ]);

    const addNewVideo = (e) => {
        const videoNum = instructorVideos.length + 1;
        const video = { key: videoNum };
        setInstructorVideos([...instructorVideos, video]);
    };


    const handleOnBlurModule = (e) => {
        const value = e.target.value;
        const module = `Module ${course.modules.length + 1}: ` + value;
        setInstructorNewModule(module);
    }

    const handleOnBlur = (e, index) => {
        const field = e.target.name;
        const value = e.target.value;
        const otherVideos = instructorVideos.filter(video => video.key != index);
        const videoData = instructorVideos.find(video => video.key == index);
        const newVideoData = { ...videoData };
        newVideoData[field] = value;
        setInstructorVideos([...otherVideos, newVideoData]);
    }

    const handlePublishModule = (e) => {
        e.preventDefault();
        if (instructor) {
            instructorVideos.forEach((video, index) => {
                video.name = video[`video${index + 1}name`];
                video.link = video[`video${index + 1}link`];
                video.duration = video[`video${index + 1}duration`];

                // delete video[`video${index + 1}name`];
                // delete video[`video${index + 1}link`];
                // delete video[`video${index + 1}duration`];
            })
            const module = {
                key: course.modules.length + 1,
                title: instructorNewModule,
                videos: instructorVideos
            }


            fetch(`http://localhost:8000/user/${cID}/new-modules`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(module)
            })
                .then(res => res.json())
                .then(result => {
                    if (result.modifiedCount) {
                        setModalShow(false);
                        swal("Module Published Successfully!", "Check module list to see your videos", "success");
                    }
                })

        }

    }


    return (
        <div>
            {
                !isLoading
                    ?
                    <div>
                        <Header></Header>
                        <div className="text-start my-5">
                            <Container>
                                <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start mb-4">
                                    <h2 className="fw-bold my-0">{course.name}</h2>



                                    {/* Instructor Features ONLY */}
                                    {
                                        instructor
                                        &&
                                        <>
                                            <button onClick={() => setModalShow(true)} className="btn btn-lg add-instructor-btn my-0 mt-3 mt-lg-0">Add Modules <FontAwesomeIcon icon={faUpload} /></button>


                                            <Modal id="add-module-modal" show={modalShow} fullscreen={true} onHide={() => setModalShow(false)}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>{course.name}</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Container>
                                                        <Form onSubmit={handlePublishModule}>
                                                            <FloatingLabel
                                                                controlId="module-title"
                                                                label="Name of module"
                                                                className="mb-3"
                                                            >
                                                                <Form.Control
                                                                    required
                                                                    onBlur={handleOnBlurModule}
                                                                    name="title"
                                                                    type="text" placeholder="Advance Programming Techniques" />
                                                            </FloatingLabel>

                                                            <div className="course-sidebar">
                                                                <div className="modules">
                                                                    <Accordion defaultActiveKey="1">
                                                                        {
                                                                            instructorVideos.map((video, index) => <Card>
                                                                                <Card.Header type="button"
                                                                                    className="d-flex justify-content-between align-items-center video-title" >
                                                                                    <FloatingLabel
                                                                                        controlId="video-title"
                                                                                        label={"Name of video number " + (index + 1)}
                                                                                    >
                                                                                        <Form.Control
                                                                                            required
                                                                                            onBlur={(e) => handleOnBlur(e, index + 1)}
                                                                                            name={`video${index + 1}name`}
                                                                                            type="text"
                                                                                            placeholder="C++ basics" />
                                                                                    </FloatingLabel>
                                                                                </Card.Header>
                                                                                <Accordion.Collapse eventKey="1">
                                                                                    <Card.Body>
                                                                                        <Form.Group className="mb-3" controlId="video-link">
                                                                                            <Form.Label>Video link</Form.Label>
                                                                                            <Form.Control
                                                                                                required
                                                                                                onBlur={(e) => handleOnBlur(e, index + 1)}
                                                                                                name={`video${index + 1}link`}
                                                                                                type="text"
                                                                                                placeholder="YouTube Embedded Link" />
                                                                                        </Form.Group>
                                                                                        <Form.Group className="mb-3" controlId="video-duration">
                                                                                            <Form.Label>Duration</Form.Label>
                                                                                            <Form.Control
                                                                                                required
                                                                                                onBlur={(e) => handleOnBlur(e, index + 1)}
                                                                                                name={`video${index + 1}duration`}
                                                                                                type="text" placeholder="Duration of video" />
                                                                                        </Form.Group>

                                                                                    </Card.Body>
                                                                                </Accordion.Collapse>
                                                                            </Card>)
                                                                        }
                                                                        <Button variant="outline-dark" onClick={addNewVideo}>
                                                                            Add video <FontAwesomeIcon icon={faCirclePlay} />
                                                                        </Button>

                                                                    </Accordion>
                                                                </div>
                                                            </div>
                                                            <button className="btn btn-success mt-3" type="submit">
                                                                Publish Module
                                                            </button>
                                                        </Form>
                                                    </Container>
                                                </Modal.Body>
                                            </Modal>

                                        </>
                                    }

                                </div>
                                <Row>
                                    <Col className="col-12 col-lg-8 mb-4 mb-lg-0">
                                        <iframe
                                            width="100%" height="414"
                                            src={currentVideo.link} title="YouTube video player" />
                                        <div className="mt-3 d-flex flex-lg-row flex-column justify-content-between align-items-start">
                                            <h4 className=" mb-0">{currentVideo.name}</h4>
                                            <div className="mt-2 mt-lg-0">
                                                <button className="btn btn-outline-success rounded-pill me-2 video-control-btns"
                                                    onClick={movePreviousVideo}
                                                >
                                                    Previous
                                                </button>
                                                <button className="btn btn-success rounded-pill video-control-btns"
                                                    onClick={moveNextVideo}
                                                >
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col className="col-12 col-lg-4">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <h5 className="mb-0 fw-bold">Course Content</h5>
                                            <ProgressBar className="w-50 mb-0" variant="success" now={60} label={`${60}%`} />
                                        </div>
                                        <div className="course-sidebar">
                                            <input id="search" placeholder="Search for module"></input>

                                            <div className="modules">
                                                <Accordion defaultActiveKey="1">
                                                    {
                                                        course?.modules?.map(module => <Module
                                                            key={module.key}
                                                            module={module}
                                                            course={course}
                                                        />)
                                                    }

                                                </Accordion>
                                            </div>
                                        </div>
                                    </Col>

                                </Row>

                            </Container>
                        </div >
                    </div>
                    :
                    <div className="spinner d-flex align-items-center justify-content-center">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
            }
        </div>
    );
};

export default CourseContent;