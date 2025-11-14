import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { FaWhatsapp } from "react-icons/fa"; 
import "../cssComponent/HomePages.css";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const categoryFilter = query.get("category")?.toLowerCase();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/posts/blog")
      .then((res) => {
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sorted);
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const getMediaUrl = (filePath) =>
    filePath
      ? filePath.startsWith("/")
        ? `http://localhost:8080${filePath}`
        : `http://localhost:8080/uploads/${filePath}`
      : null;

  // Detect if mobile
  const isMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // WhatsApp contact button
  const getWhatsAppUrl = () => {
    const phoneNumber = "256771236219"; // Replace with company WhatsApp number
    const message = "Hello, I would like to inquire about your services.";
    return isMobile()
      ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  };

  if (posts.length === 0) return <p className="text-center">Loading...</p>;

  // Apply category filter if one is set
  const filteredPosts = categoryFilter
    ? posts.filter(
        (post) =>
          post.category && post.category.toLowerCase() === categoryFilter
      )
    : posts;

  if (filteredPosts.length === 0)
    return (
      <p className="text-center">
        No posts found in category "{categoryFilter}".
      </p>
    );

  // Featured section
  const featured = filteredPosts[0];
  const sideFeatures = filteredPosts.slice(1, 3);

  // Remaining posts after featured & side features
  const remainingPosts = filteredPosts.slice(3);

  // Trending - top by views
  const trendingPosts = [...remainingPosts]
    .sort((a, b) => b.views - a.views)
    .slice(0, 6);

  // Recently - top 2 by createdAt
  const recentlyPosts = [...remainingPosts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 2);

  // Latest - remaining posts after Recently
  const latestPosts = remainingPosts.filter(
    (p) => !recentlyPosts.includes(p)
  ).slice(0, 5);

  return (
    <Container fluid className="nilepost-home mt-4">
      {/* SECTION 1 - Featured */}
      <Row>
        {/* Big Featured Story */}
        <Col lg={8} md={12}>
          <Card className="featured-card mb-4">
            <div className="featured-media-container">
              <img
                src={
                  getMediaUrl(featured.imagePath) ||
                  "https://via.placeholder.com/800x400?text=No+Image"
                }
                alt={featured.title}
                className="featured-image"
              />
              <div className="featured-overlay">
                <span className="category-badge">
                  {featured.category || "News"}
                </span>
                <h2 className="featured-title">{featured.title}</h2>
                <p className="featured-description">
                  {featured.description?.substring(0, 150)}...
                </p>
                <Link to={`/post/${featured.id}`} className="btn read-more-btn">
                  Read More
                </Link>
              </div>
            </div>
          </Card>
        </Col>

        {/* Side Featured Stories */}
        <Col lg={4} md={12}>
          <div className="side-featured-list">
            {sideFeatures.map((post) => (
              <Card className="side-featured mb-3" key={post.id}>
                <Row>
                  <Col xs={5}>
                    <img
                      src={
                        getMediaUrl(post.imagePath) ||
                        "https://via.placeholder.com/200x120?text=No+Image"
                      }
                      alt={post.title}
                      className="side-featured-img"
                    />
                    {/*  */}
                  </Col>
                  <Col xs={7}>
                    <Link to={`/post/${post.id}`} className="side-featured-title">
                      {post.title}
                    </Link>
                    <div className="side-featured-meta">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                  </Col>
                </Row>
              </Card>
            ))}
          </div>
        </Col>
      </Row>

      {/* Floating WhatsApp Contact Button */}
      <div className="floating-whatsapp">
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float-btn"
        >
          <FaWhatsapp />
        </a>
      </div>

      {/* SECTION 2 - Trending / Recently / Latest */}
      <Row className="mt-5 section2">
        {/* Trending - Left */}
        <Col lg={3} md={6} className="sidebar">
          <h4 className="sidebar-title">Trending</h4>
          <div className="trending-list">
            {trendingPosts.map((post, index) => (
              <div className="trending-item" key={post.id}>
                <div className="trending-rank">{index + 1}</div>
                <div className="trending-thumb">
                  <img
                    src={
                      post.imagePath
                        ? getMediaUrl(post.imagePath)
                        : "https://via.placeholder.com/60x60?text=No+Img"
                    }
                    alt={post.title}
                  />
                </div>
                <div className="trending-content">
                  <Link to={`/post/${post.id}`} className="trending-title-link">
                    {post.title}
                  </Link>
                  <div className="trending-meta">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Col>

        {/* Recently - Center */}
        <Col lg={6} md={12}>
          <h4 className="sidebar-title">Recently</h4>
          <div className="recently-list">
            {recentlyPosts.map((post, index) => (
              <div
                className={`recently-item ${
                  index === 0 ? "recently-featured" : ""
                }`}
                key={post.id}
              >
                <div className="recently-thumb">
                  <img
                    src={
                      post.imagePath
                        ? getMediaUrl(post.imagePath)
                        : "https://via.placeholder.com/160x100?text=No+Img"
                    }
                    alt={post.title}
                  />
                </div>
                <div className="recently-content">
                  <Link
                    to={`/post/${post.id}`}
                    className={`recently-title-link ${
                      index === 0 ? "recently-featured-title" : ""
                    }`}
                  >
                    {post.title}
                  </Link>
                  <p className="recently-desc">
                    {post.description?.substring(0, 100)}...
                  </p>
                  <div className="recently-meta">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Col>

        {/* Latest - Right */}
        <Col lg={3} md={6} className="sidebar">
          <h4 className="sidebar-title">Latest</h4>
          <div className="latest-list">
            {latestPosts.map((post) => (
              <div className="latest-item" key={post.id}>
                <div className="latest-thumb">
                  <img
                    src={
                      post.imagePath
                        ? getMediaUrl(post.imagePath)
                        : "https://via.placeholder.com/70x50?text=No+Img"
                    }
                    alt={post.title}
                  />
                </div>
                <div className="latest-content">
                  <Link to={`/post/${post.id}`} className="latest-title-link">
                    {post.title}
                  </Link>
                  <div className="latest-meta">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>

      {/* SECTION 3 - Category Blocks */}
      {["Politics", "Business", "Health", "Education", "Sports"].map(
        (category) => {
          const catPosts = posts.filter(
            (p) => p.category?.toLowerCase() === category.toLowerCase()
          );
          if (catPosts.length === 0) return null;

          return (
            <div className="category-section mt-5" key={category}>
              <h3 className="category-heading">{category}</h3>
              <Row>
                {catPosts.slice(0, 4).map((post) => (
                  <Col md={6} lg={3} className="mb-4" key={post.id}>
                    <Card className="news-card">
                      <div className="news-image-wrapper">
                        <img
                          src={
                            getMediaUrl(post.imagePath) ||
                            "https://via.placeholder.com/400x200?text=No+Image"
                          }
                          alt={post.title}
                          className="news-image"
                        />
                      </div>
                      <Card.Body>
                        <Link
                          to={`/post/${post.id}`}
                          className="news-title d-block mb-2"
                        >
                          {post.title}
                        </Link>
                        <small className="text-muted">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </small>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          );
        }
      )}
    </Container>
  );
};

export default HomePage;
