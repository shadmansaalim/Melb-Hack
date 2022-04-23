import Header from '../Header/Header';
//import useAuth from '../../hooks/useAuth';
import { Row, Col, Container, Form, FloatingLabel, Button} from 'react-bootstrap';

const AddAnnouncement = () => {
    return (
        <div id="announcements">
            <Header></Header>

            <Container>
                <h1>Add Announcement</h1>
                <Form>
                    <FloatingLabel controlId="floatingTextarea" label="Announcement Title" className="mb-3">
                        <Form.Control placeholder="Leave a comment here" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingTextarea2" label="Announcement Body">
                        <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '100px' }}
                        />
                    </FloatingLabel>
                    <br></br>
                    <Button variant="success" type="submit">
                        Submit
                    </Button>    
                </Form>          
            </Container>
        </div>
    )
}

export default AddAnnouncement;