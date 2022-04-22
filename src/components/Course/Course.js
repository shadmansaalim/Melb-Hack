import React from 'react';
import { Col, Card, ProgressBar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import cardImage from '../../assets/card-image.png';
import './Course.css';

const Course = ({ course }) => {
    const { name, param, courseID } = course;
    const history = useHistory();

    const continueCourse = () => {
        history.push(`/course${courseID}/${param}/module1/video1`);
        window.location.reload();
    }
    return (
        <Col>
            <Card className="rounded-3 course">
                <Card.Img className="course-img" variant="top" src={course.image ? course.image : cardImage} />
                <Card.Body>
                    <Card.Title className="text-start">{name}</Card.Title>
                    <Card.Text>
                        <span className="d-flex align-items-center my-3">
                            <p className="m-0 me-2 text-muted">Progress</p>
                            <ProgressBar className="w-100" variant="success" now={60} label={`${60}%`} />
                        </span>
                        <button className="w-100 btn btn-success rounded-pill" onClick={continueCourse}>Continue Course</button>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Course;