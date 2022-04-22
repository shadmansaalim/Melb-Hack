import React, { useEffect, useState } from 'react';
import './Course.scss';
import { Row, Col, ProgressBar, Container, Accordion } from 'react-bootstrap';
import Module from '../Module/Module';
import { useHistory, useParams } from 'react-router-dom';

const courses = [
    {
        name: 'C Programming Fundamentals',
        param: 'c-programming-fundamentals',
        modules: [
            {

                key: 1,
                title: 'Module 1: Introduction to Programming Language',
                videos: [
                    { key: 1, name: 'Introduction to C programming', duration: '10', link: 'https://www.youtube.com/embed/KJgsSFOSQv0' },
                    { key: 2, name: 'First C program (Hello World)', duration: '6', link: 'https://www.youtube.com/embed/b00HsZvg-V0' },
                    { key: 3, name: 'Working with variables', duration: '8', link: 'https://www.youtube.com/embed/aIQk1O08zpg' },
                ]
            },
            {
                key: 2,
                title: 'Module 2: Variable Types & Operators',
                videos: [
                    { key: 1, name: 'Data types in C', duration: '5', link: 'https://www.youtube.com/embed/TnYCHohAMS8' },
                    { key: 2, name: 'Arithmetic Operators', duration: '8', link: 'https://www.youtube.com/embed/5JXcX0IqRUo' },
                    { key: 3, name: 'Variable Type Conversion', duration: '6', link: 'https://www.youtube.com/embed/xi2wf0Zy2Y4' },
                ]
            },
            {
                key: 3,
                title: 'Module 3: Control flow in C Programming',
                videos: [
                    { key: 1, name: 'Decision making in programming', duration: '10', link: 'https://www.youtube.com/embed/SOnpOBvyhDM' },
                    { key: 2, name: 'Relational Operators', duration: '8', link: 'https://www.youtube.com/embed/1oKRTjw0yuY' },
                    { key: 3, name: 'Ternary Operator', duration: '5', link: 'https://www.youtube.com/embed/hrw9ojCWoL8' },
                ]
            },
        ]
    },
    {
        name: 'Web Development Course',
        param: 'web-development-course',
        modules: [
            {

                key: 1,
                title: 'Module 1: Introduction to HTML',
                videos: [
                    { key: 1, name: 'What is HTML?', duration: '5', link: 'https://www.youtube.com/embed/u0OeZfIfBRI' },
                    { key: 2, name: 'HTML Basic Tags', duration: '10', link: 'https://www.youtube.com/embed/bUEykHfMMnc' },
                    { key: 3, name: 'Build a website with HTML', duration: '8', link: 'https://www.youtube.com/embed/PlxWf493en4' },
                ]
            },
            {
                key: 2,
                title: 'Module 2:  Learn CSS for styling',
                videos: [
                    { key: 1, name: 'Getting started with CSS', duration: '9', link: 'https://www.youtube.com/embed/1PnVor36_40' },
                    { key: 2, name: 'Colors, Height, Width, Fonts', duration: '8', link: 'https://www.youtube.com/embed/M3IYolgO1Og' },
                    { key: 3, name: 'CSS Classes & ID', duration: '6', link: 'https://www.youtube.com/embed/wXUhTZpF_HQ' },
                    { key: 4, name: 'Margin & Padding', duration: '9', link: 'https://www.youtube.com/embed/NZEz4yNITd8' },
                ]
            },
            {
                key: 3,
                title: 'Module 3: Git, Source Control & Github',
                videos: [
                    { key: 1, name: 'Introduction to Github', duration: '10', link: 'https://www.youtube.com/embed/0fKg7e37bQE' },
                    { key: 2, name: 'Create github repository', duration: '7', link: 'https://www.youtube.com/embed/hMfi_ONvGEs' },
                    { key: 3, name: 'Push, Pull & Branch', duration: '9', link: 'https://www.youtube.com/embed/Lf3DYRvCPFo' },
                ]
            },
        ]
    }
];



const Course = () => {
    const { courseParam, moduleID, videoID } = useParams();
    const mID = parseInt(moduleID.substring(6));
    const vID = parseInt(videoID.substring(5));
    const [course, setCourse] = useState({});
    const [module, setModule] = useState({});
    const [currentVideo, setCurrentVideo] = useState({})


    useEffect(() => {
        const course = courses.find(course => course.param == courseParam);
        const modules = course.modules;
        const module = modules.find(module => module.key == mID);
        const video = module.videos.find(video => video.key == vID);
        setCourse(course)
        setModule(module);
        setCurrentVideo(video);


    }, [courseParam, moduleID, videoID])




    return (
        <div>
            <div className="text-start my-5">
                <Container>
                    <h2 className="fw-bold">{course.name}</h2>
                    <Row>
                        <Col className="col-12 col-lg-8 mb-4 mb-lg-0">
                            <iframe
                                width="100%" height="414"
                                src={currentVideo.link} title="YouTube video player" />
                            <div className="mt-3 d-flex flex-lg-row flex-column justify-content-between align-items-start">
                                <h4 className=" mb-0">{currentVideo.name}</h4>
                                <div className="mt-2 mt-lg-0">
                                    <button className="btn btn-outline-success rounded-pill me-2 video-control-btns">
                                        Previous
                                    </button>
                                    <button className="btn btn-success rounded-pill video-control-btns">
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
                                                courseParam={courseParam}
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
    );
};

export default Course;