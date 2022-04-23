import Header from '../Header/Header';
//import useAuth from '../../hooks/useAuth';
import { Row, Col, Container} from 'react-bootstrap';
import './_instructors.scss';

const Instructors = () => {
    let data = {
        instructors: [
            {
                name: "Albert Einstein",
                profile_pic: null,
                biography: "German-born theoretical physicist, widely acknowledged to be one of the greatest and most influential physicists of all time.
            },
        ]
    }

    return (
        <div id="instructors">
            <Header></Header>

            <Container>
                <h1>Instructors</h1>

                <Row className="gy-3 gx-3">
                {data.instructors.map(function(object, i){
                    return <Col className="col-4 col-lg-4 a-cards">
                            <div className="card-wrap">
                                <div className="a-heading">
                                    <img src={"https://picsum.photos/1080?" + i} alt=""/>
                                    <h2>{object.name}</h2>
                                </div>
                                <p>{object.biography}</p>
                            </div>
                        </Col>
                    })}
                </Row>
            </Container>
        </div>
    )
}

export default Instructors;