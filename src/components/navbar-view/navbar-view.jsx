import React from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

import './navbar-view.scss'

export class Navbar extends React.Component {
    constructor() {
      super();
  
      this.state = {};
    }
  
    onLoggedOut = () => {
      localStorage.clear();
      window.open("/", "_self");
    };

    render() {
        const { user } = this.props
        console.log(this.props)
        const movies = `/`;
        const profile = `/user/id/${user}`;
    
        return (

<Navbar bg="light" expand="lg">
  <Container className="navbar-menu">
    <Navbar.Brand href={ movies }>myFlix</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="">Movies</Nav.Link>
        <Nav.Link href="#link">Actors</Nav.Link>
        <Nav.Link href="#link">Directors</Nav.Link>
        <NavDropdown title="Genres" id="basic-nav-dropdown">
          <NavDropdown.Item href="genres/Adventure">Adventure</NavDropdown.Item>
          <NavDropdown.Item href="genres/Fantasy">Fantasy</NavDropdown.Item>
          <NavDropdown.Item href="genres/Fiction">Fiction</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">More Genres...</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link id="Account" href={profile}>My Account</Nav.Link>
        <Nav.Link id="logout" onClick={() => { this.onLoggedOut() }}>Logout</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

        );
    }
}