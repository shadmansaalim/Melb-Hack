import Header from '../Header/Header';
//import useAuth from '../../hooks/useAuth';
import { Row, Col, Container} from 'react-bootstrap';
import './_announcements.scss';

const Announcements = () => {
    let data = {
        announcements: [
            {
                date_published: null,
                instuctor: "Instructor name",
                title: "Please stop asking your teacher to go to the toilet during online class.",
                body: "According to all known laws of aviation, there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway.",
            },
            {
                instuctor: "Instructor name",
                title: "Please stop asking your teacher to go to the toilet during online class.",
                body: "According to all known laws of aviation, there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway.",
            },
            {
                instuctor: "Instructor name",
                title: "Please stop asking your teacher to go to the toilet during online class.",
                body: "According to all known laws of aviation, there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway.",
            },
        ]
    }

    return (
        <div id="announcements">
            <Header></Header>

            <Container>
                <h1>Announcements</h1>

                <Row className="gy-3 gx-3">
                {data.announcements.map(function(object, i){
                    return <Col className="col-6 col-lg-6 a-cards">
                            <div className="card-wrap">
                                <div className="a-heading">
                                    <h2>
                                        {object.title}
                                    </h2>
                                    <div class="instuctor">
                                        <img src="https://picsum.photos/64" alt="" />
                                        <h5>{object.instuctor}</h5>
                                    </div>
                                </div>
                                <p><b>Posted: 1st April 2022</b></p>
                                <p>{object.body}</p>
                            </div>
                        </Col>
                    })}
                </Row>
            </Container>
        </div>
    )
}

export default Announcements;