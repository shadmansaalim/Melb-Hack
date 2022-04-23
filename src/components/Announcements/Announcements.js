import Header from '../Header/Header';
//import useAuth from '../../hooks/useAuth';
import { Row, Col, Container} from 'react-bootstrap';
import './_announcements.scss';

const Announcements = () => {
    return (
        <div id="announcements">
            <Header></Header>

            <Container>
                <h1>Announcements</h1>

                <Row>
                    <Col class="col-lg-6">
                        
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Announcements;