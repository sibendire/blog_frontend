import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "../cssComponent/HomePages.css";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [recentlyCount, setRecentlyCount] = useState(6);
  const [latestCount, setLatestCount] = useState(5);
  const [trendingCount, setTrendingCount] = useState(5);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const categoryFilter = query.get("category")?.toLowerCase(); // read ?category=

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

  const featured = filteredPosts[0];
  const rest = filteredPosts.slice(1);

  return (
    <Container className="mt-4">
      {/* SECTION 1 - Featured + Trending */}
      <Row>
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
                <Link
                  to={`/post/${featured.id}`}
                  className="btn btn-primary read-more-btn"
                >
                  Read More
                </Link>
              </div>
            </div>
          </Card>

          {/* Grid of News Cards */}
          <Row>
            {rest.slice(0, 9).map((post) => (
              <Col md={6} lg={4} className="mb-4" key={post.id}>
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
                    <div className="d-flex justify-content-between align-items-center news-meta mb-2">
                      <Link
                        to={`/?category=${post.category?.toLowerCase()}`}
                        className="category-badge"
                      >
                        {post.category || "General"}
                      </Link>
                      <small>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                    <Link to={`/post/${post.id}`} className="news-title">
                      {post.title}
                    </Link>
                    <p className="news-desc">
                      {post.description?.substring(0, 100)}...
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        {/* Sidebar */}
        <Col lg={4} md={12} className="sidebar">
          <h4 className="sidebar-title">Trending</h4>
          <div className="trending-list">
            {filteredPosts.slice(0, trendingCount).map((post, index) => (
              <div className="d-flex trending-item" key={post.id}>
                <div className="trending-rank">{index + 1}</div>
                <div className="trending-thumb">
                  <img
                    src={
                      getMediaUrl(post.imagePath) ||
                      "https://via.placeholder.com/60x60?text=No+Img"
                    }
                    alt={post.title}
                  />
                </div>
                <div className="trending-content">
                  <Link
                    to={`/post/${post.id}`}
                    className="trending-title-link"
                  >
                    {post.title}
                  </Link>
                  <div className="trending-meta">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredPosts.length > trendingCount && (
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setTrendingCount(trendingCount + 5)}
              className="mt-2"
            >
              Load More
            </Button>
          )}
        </Col>
      </Row>

      {/* SECTION 2 - Latest + Recently + Trending */}
      <Row className="mt-5">
        <Col lg={3} md={6} className="sidebar">
          <h4 className="sidebar-title">Latest</h4>
          <div className="latest-list">
            {filteredPosts.slice(6, 10).map((post) => (
              <div className="d-flex latest-item mb-3" key={post.id}>
                <div className="latest-thumb">
                  <img
                    src={
                      post.imagePath
                        ? getMediaUrl(post.imagePath)
                        : "https://via.placeholder.com/80x60?text=No+Img"
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

        <Col lg={6} md={12} className="sidebar">
          <h4 className="sidebar-title">Recently</h4>
          <div className="recently-list">
            {filteredPosts.slice(0, 6).map((post) => (
              <div className="d-flex recently-item mb-3" key={post.id}>
                <div className="recently-thumb">
                  <img
                    src={
                      post.imagePath
                        ? getMediaUrl(post.imagePath)
                        : "https://via.placeholder.com/120x80?text=No+Img"
                    }
                    alt={post.title}
                  />
                </div>
                <div className="recently-content">
                  <Link
                    to={`/post/${post.id}`}
                    className="recently-title-link"
                  >
                    {post.title}
                  </Link>
                  <p className="recently-desc">
                    {post.description?.substring(0, 80)}...
                  </p>
                  <div className="recently-meta">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Col>

        <Col lg={3} md={6} className="sidebar">
          <h4 className="sidebar-title">Trending</h4>
          <div className="trending-list">
            {filteredPosts.slice(10, 15).map((post, index) => (
              <div className="d-flex trending-item mb-3" key={post.id}>
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
      </Row>
    </Container>
  );
};

export default HomePage;
