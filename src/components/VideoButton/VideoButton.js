import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const VideoButton = ({ moduleID, course, video }) => {
    const { user, instructor } = useAuth();
    const { courseID, param } = course;
    const { key, name, duration } = video;
    const [currentVideoCompleted, setCurrentVideoCompleted] = useState(false);
    const history = useHistory();

    const openModule = () => {
        if (instructor) {
            history.push(`/course${courseID}/${param}/module${moduleID}/video${key}`);
            window.location.reload();
        }
        else if (currentVideoCompleted) {
            history.push(`/course${courseID}/${param}/module${moduleID}/video${key}`);
            window.location.reload();
        }
        else {
            const cID = courseID;
            let mID = moduleID;
            let vID = key;

            if (vID != 1) {
                vID = vID - 1;
            }
            if (vID == 1 && mID != 1) {
                mID = mID - 1;
                const module = course.modules.find(module => module.key == mID);
                vID = module?.videos.length;
            }
            const data = {
                cID,
                mID,
                vID
            }
            fetch(`https://melb-hack-backend.onrender.com/user/${user.email}/completed`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(status => {
                    if (status) {
                        history.push(`/course${courseID}/${param}/module${moduleID}/video${key}`);
                        window.location.reload();
                    }
                });
        }
    }


    useEffect(() => {
        const cID = courseID;
        let mID = moduleID;
        let vID = key;

        const data = {
            cID,
            mID,
            vID
        }
        if (user.email) {
            fetch(`https://melb-hack-backend.onrender.com/user/${user.email}/completed`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(status => {
                    setCurrentVideoCompleted(status)
                })
        }
    }, [user.email, course, moduleID, video])


    return (
        <button className="video-btn" onClick={openModule}>
            <span className="d-flex align-items-center">
                {
                    currentVideoCompleted || instructor
                        ?
                        <FontAwesomeIcon color="#006B5A" className="me-1" icon={faCircleCheck} />
                        :
                        <FontAwesomeIcon color="#2A4A5F" className="me-1" icon={faLock} />
                }
                <p className="mb-0">{name}</p>
            </span>
            <span>{duration}m</span>
        </button>
    );
};

export default VideoButton;