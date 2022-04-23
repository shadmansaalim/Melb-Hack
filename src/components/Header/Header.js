import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import profile from '../../assets/profile.png';
import './_Header.scss';

const Header = () => {
    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand className="fw-bold" href="/">EModule</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto d-flex align-items-center">
                        <Nav.Link className="text-dark me-0 me-lg-2" href="#home">My Courses</Nav.Link>
                        <Nav.Link className="text-dark me-0 me-lg-2" href="/announcements">Announcements</Nav.Link>

                        <NavDropdown title={<img src={profile} alt='' width='40' height='40' />} id="profile-dropdown">
                            <NavDropdown.Item eventKey="4.0" disabled>Jane Doe</NavDropdown.Item>
                            <br></br>
                            <NavDropdown.Item eventKey="4.1">Profile</NavDropdown.Item>

                            <NavDropdown.Item eventKey="4.2">Logout</NavDropdown.Item>
                            <NavDropdown.Item eventKey="4.3">Instructors</NavDropdown.Item>
                        </NavDropdown>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;