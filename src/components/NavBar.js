import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "../cssComponent/NavbarCustom.css";

function CollapsibleBlog() {
  const [expanded, setExpanded] = useState(false);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const activeCategory = query.get("category");

  const categories = [
    { name: "News", path: "news" },
    { name: "Politics", path: "politics" },
    { name: "Business", path: "business" },
    { name: "Health", path: "health" },
    { name: "Opinions", path: "opinions" },
    { name: "Education", path: "education" },
    { name: "Sports", path: "sports" },
    { name: "Crimes", path: "crimes" },
  ];

  return (
    <Navbar
      expanded={expanded}
      onToggle={setExpanded}
      expand="lg"
      bg="dark"
      variant="dark"
      sticky="top"
      className="news-navbar shadow-sm"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="news-logo"
          onClick={() => setExpanded(false)}
        >
          GIDZ<span className="logo-highlight">POST</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto nav-links">
            <Nav.Link
              as={Link}
              to="/"
              onClick={() => setExpanded(false)}
              className={!activeCategory ? "active-category" : ""}
            >
              Home
            </Nav.Link>

            {categories.map((cat) => (
              <Nav.Link
                key={cat.path}
                as={Link}
                to={`/?category=${cat.path}`}
                onClick={() => setExpanded(false)}
                className={
                  activeCategory === cat.path
                    ? "active-category"
                    : ""
                }
              >
                {cat.name}
              </Nav.Link>
            ))}
          </Nav>

          <Nav className="nav-right">
            <Nav.Link
              as={Link}
              to="/new"
              className="btn-post"
              onClick={() => setExpanded(false)}
            >
              ✍️ Post
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleBlog;
