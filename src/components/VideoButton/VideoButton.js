import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

const VideoButton = ({ moduleID, courseParam, video }) => {
    const { key, name, duration } = video;
    const history = useHistory();

    const openModule = () => {
        history.push(`/course/${courseParam}/module${moduleID}/video${key}`);
        window.location.reload();
    }



    return (
        <button className="video-btn" onClick={openModule}>
            <span className="d-flex align-items-center">
                <FontAwesomeIcon color="#2A4A5F" className="me-1" icon={faCirclePlay} />
                <p className="mb-0">{name}</p>
            </span>
            <span>{duration}m</span>
        </button>
    );
};

export default VideoButton;