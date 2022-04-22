import React, { useState, useEffect } from 'react';
import { Card, Accordion, useAccordionButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import VideoButton from '../VideoButton/VideoButton';

const Module = ({ module, course, previousVideoCompleted }) => {
    const [toggled, setToggled] = useState(false);
    const { key, title, videos } = module;

    const decoratedOnClick = useAccordionButton(key, () =>
        console.log('totally custom!'),
    );

    return (
        <Card>
            <Card.Header type="button" onClick={() => {
                decoratedOnClick();
            }} className="d-flex justify-content-between align-items-center" >
                <p className="mb-0 module-title">{title}</p>
                <button
                    className="btn btn-success">
                    {
                        toggled
                            ?
                            <FontAwesomeIcon icon={faMinus} />
                            :
                            <FontAwesomeIcon icon={faPlus} />
                    }
                </button>
            </Card.Header>
            <Accordion.Collapse eventKey={key}>
                <Card.Body>
                    {
                        videos.map(video => <VideoButton
                            key={video.key}
                            previousVideoCompleted={previousVideoCompleted}
                            moduleID={key}
                            course={course}
                            video={video}
                        />)
                    }

                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
};

export default Module;