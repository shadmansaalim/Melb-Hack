import React from 'react';
import { Col } from 'react-bootstrap';
import profile from '../../assets/profile.png';

const Announcement = ({ announcement }) => {
    const { instructor, date, title, body } = announcement;
    return (
        <Col className="col-12 col-lg-6 a-cards">
            <div className="card-wrap text-white">
                <div className="instructor mb-4">
                    <img src={profile} alt="" />
                    <p className="my-0 ms-2">{instructor}</p>
                </div>
                <h3 className="mb-4">
                    {title}
                </h3>
                <p><b>Posted: {date}</b></p>
                <p>{body}</p>
            </div>
        </Col>
    )
};

export default Announcement;