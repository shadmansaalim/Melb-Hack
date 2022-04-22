import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import profile from '../../assets/profile.png';
import './Header.css';

const Header = () => {
    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand className="fw-bold" href="/">EModule</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto d-flex align-items-center">
                        <Nav.Link className="text-dark me-0 me-lg-2" href="#home">My Courses</Nav.Link>
                        <Nav.Link className="text-dark me-0 me-lg-2" href="#link">Announcements</Nav.Link>
                        <Nav.Link className="text-dark" href="#link">
                            <img src={profile} alt="" width="40" height="40" />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;