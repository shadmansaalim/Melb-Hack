import React, { useState, useEffect } from 'react';
import { Col, Card, ProgressBar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import cardImage from '../../assets/card-image.png';
import useAuth from '../../hooks/useAuth';
import './Course.css';

const Course = ({ course }) => {
    const { name, param, courseID } = course;
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { user, instructor } = useAuth();
    const history = useHistory();

    const continueCourse = () => {
        history.push(`/course${courseID}/${param}/module1/video1`);
        window.location.reload();
    }

    useEffect(() => {
        if (!instructor) {
            fetch(`https://melb-hack-backend.onrender.com/users/progress/${user.email}/${courseID}`)
                .then(res => res.json())
                .then(data => setProgress(data))
                .finally(() => setIsLoading(false));
        }
        else {
            setIsLoading(false)
        }
    }, [instructor])


    return (
        <>
            {
                !isLoading
                &&
                <Col>
                    <Card className="course">
                        <Card.Img className="course-img" variant="top" src={course.image ? course.image : cardImage} />
                        <Card.Body>
                            <Card.Title className="text-start">{name}</Card.Title>
                            <Card.Text>
                                <span className="d-flex align-items-center mt-3 mb-2 gap-2">
                                    <p className="m-0 me-2 text-muted">Progress</p>
                                    <ProgressBar className="w-100" variant="success" now={instructor ? 100 : progress} label={`${instructor ? 100 : progress}%`} />
                                </span>
                                <button className="w-100 btn btn-success rounded-pill" onClick={continueCourse}>Continue Course</button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            }
        </>
    );
};

export default Course;