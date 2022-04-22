import React, { useState, useEffect } from 'react';
import { Row, Container } from 'react-bootstrap';
import Header from '../Header/Header';
import Course from '../Course/Course';


const Dashboard = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/courses')
            .then(res => res.json())
            .then(data => setCourses(data))
    }, [])

    return (
        <div>
            {
                courses.length
                    ?
                    <div>
                        <Header></Header>
                        <Container className="my-5" >
                            <Row xs={1} md={2} lg={3} className="g-4 mx-auto container">
                                {
                                    courses.map(course => <Course
                                        key={course._id}
                                        course={course}
                                    ></Course>)
                                }

                            </Row>
                        </Container>
                    </div>
                    :
                    <div class="spinner d-flex align-items-center justify-content-center">
                        <div class="bounce1"></div>
                        <div class="bounce2"></div>
                        <div class="bounce3"></div>
                    </div>
            }
        </div>
    );
};

export default Dashboard;