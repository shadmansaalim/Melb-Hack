import React from 'react';
import { Row, Col, Card, ProgressBar, Container } from 'react-bootstrap';
import cardImage from '../../assets/card-image.png';


const Dashboard = () => {
    const now = 60;
    return (
        <div>
            <Container className="my-5" >
                <Row xs={1} md={2} lg={3} className="g-4 mx-auto container">
                    <Col>
                        <Card className="rounded-3">
                            <Card.Img variant="top" src={cardImage} />
                            <Card.Body>
                                <Card.Title className="text-start">Maths - MATH023</Card.Title>
                                <Card.Text>
                                    <span className="d-flex align-items-center my-3">
                                        <p className="m-0 me-2 text-muted">Progress</p>
                                        <ProgressBar className="w-100" variant="success" now={now} label={`${now}%`} />
                                    </span>
                                    <button className="w-100 btn btn-success rounded-pill">Continue Course</button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="rounded-3">
                            <Card.Img variant="top" src={cardImage} />
                            <Card.Body>
                                <Card.Title className="text-start">Maths - MATH023</Card.Title>
                                <Card.Text>
                                    <span className="d-flex align-items-center my-3">
                                        <p className="m-0 me-2 text-muted">Progress</p>
                                        <ProgressBar className="w-100" variant="success" now={now} label={`${now}%`} />
                                    </span>
                                    <button className="w-100 btn btn-success rounded-pill">Continue Course</button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="rounded-3">
                            <Card.Img variant="top" src={cardImage} />
                            <Card.Body>
                                <Card.Title className="text-start">Maths - MATH023</Card.Title>
                                <Card.Text>
                                    <span className="d-flex align-items-center my-3">
                                        <p className="m-0 me-2 text-muted">Progress</p>
                                        <ProgressBar className="w-100" variant="success" now={now} label={`${now}%`} />
                                    </span>
                                    <button className="w-100 btn btn-success rounded-pill">Continue Course</button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="rounded-3">
                            <Card.Img variant="top" src={cardImage} />
                            <Card.Body>
                                <Card.Title className="text-start">Maths - MATH023</Card.Title>
                                <Card.Text>
                                    <span className="d-flex align-items-center my-3">
                                        <p className="m-0 me-2 text-muted">Progress</p>
                                        <ProgressBar className="w-100" variant="success" now={now} label={`${now}%`} />
                                    </span>
                                    <button className="w-100 btn btn-success rounded-pill">Continue Course</button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="rounded-3">
                            <Card.Img variant="top" src={cardImage} />
                            <Card.Body>
                                <Card.Title className="text-start">Maths - MATH023</Card.Title>
                                <Card.Text>
                                    <span className="d-flex align-items-center my-3">
                                        <p className="m-0 me-2 text-muted">Progress</p>
                                        <ProgressBar className="w-100" variant="success" now={now} label={`${now}%`} />
                                    </span>
                                    <button className="w-100 btn btn-success rounded-pill">Continue Course</button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="rounded-3">
                            <Card.Img variant="top" src={cardImage} />
                            <Card.Body>
                                <Card.Title className="text-start">Maths - MATH023</Card.Title>
                                <Card.Text>
                                    <span className="d-flex align-items-center my-3">
                                        <p className="m-0 me-2 text-muted">Progress</p>
                                        <ProgressBar className="w-100" variant="success" now={now} label={`${now}%`} />
                                    </span>
                                    <button className="w-100 btn btn-success rounded-pill">Continue Course</button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard;