import { Outlet, NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Guess that joke!</Navbar.Brand>
        <Nav>
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/scoreboard">Scoreboard</Nav.Link>
          <Nav.Link as={NavLink} to="/login">Log-in/out</Nav.Link>
          <Nav.Link as={NavLink} to="/createacc">Create Account</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
    );
}

export default Header;
