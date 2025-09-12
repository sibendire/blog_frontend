import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function CollapsibleBlog() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">📝 My Blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/category/news">News</Nav.Link>
            <Nav.Link as={Link} to="/category/politics">Politics</Nav.Link>
            <NavDropdown title="Categories">
              <NavDropdown.Item as={Link} to="/category/business">Business</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/health">Health</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/opinions">Opinions</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/category/education">Education</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/category/sports">Sports</Nav.Link>
            <Nav.Link as={Link} to="/category/crimes">Crimes</Nav.Link>
            <Nav.Link as={Link} to="/category/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <Nav.Link as={Link} to="/new">✍️ Create Post</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleBlog;
