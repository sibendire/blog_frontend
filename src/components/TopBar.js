import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaTwitter, FaInstagram } from "react-icons/fa";
import { SiTiktok } from "react-icons/si"; // ✅ Import TikTok icon
import "../cssComponent/TopBar.css";

const TopBar = () => {
  const today = new Date();
  const dateString = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="top-bar">
      <Container>
        <Row className="align-items-center">
          {/* Left: Date */}
          <Col xs={12} md={6} className="text-md-start text-center">
            <small>{dateString}</small>
          </Col>

          {/* Right: Social Icons */}
          <Col xs={12} md={6} className="text-md-end text-center">
            <a
              href="https://x.com/SibendireK/status/1972179663381561846?t=dYrvsImnCuXK8mArOvSZBg&s=08"
              target="_blank"
              rel="noreferrer"
              className="social-icon"
            >
              <FaTwitter />
            </a>
            <a
              href="https://vm.tiktok.com/ZMAaBer6q/"
              target="_blank"
              rel="noreferrer"
              className="social-icon"
            >
              <SiTiktok /> {/* ✅ Correct TikTok icon */}
            </a>
            <a
              href="https://instagram.com/yourprofile"
              target="_blank"
              rel="noreferrer"
              className="social-icon"
            >
              <FaInstagram />
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopBar;
