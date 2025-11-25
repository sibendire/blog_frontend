import React, { useEffect, useState, useRef } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { FaWhatsapp } from "react-icons/fa";
import "../cssComponent/HomePages.css";


/* ---------------------------------------------------------
   MEDIA RENDERER (image + video support)
--------------------------------------------------------- */
const MediaRenderer = ({ imageSrc, videoSrc, className = "", style = {} }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const isVideo = !!videoSrc;

  const togglePlay = (e) => {
    e?.stopPropagation();
    if (!isVideo || !videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.muted = false; // enable sound
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const overlayStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "rgba(0,0,0,0.45)",
    padding: "10px 12px",
    borderRadius: "50%",
    cursor: "pointer",
    zIndex: 5
  };

  const wrapperStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    ...style
  };

  if (isVideo) {
    return (
      <div className="media-wrapper" style={wrapperStyle} onClick={togglePlay}>
        <video
          ref={videoRef}
          src={videoSrc}
          className={className}
          controls={false}
          preload="metadata"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={overlayStyle}>
          {isPlaying ? (
            <span style={{ color: "#fff", fontSize: 20 }}>❚❚</span>
          ) : (
            <span style={{ color: "#fff", fontSize: 22 }}>▶</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={wrapperStyle}>
      <img
        src={imageSrc || "https://via.placeholder.com/800x400?text=No+Media"}
        alt="media"
        className={className}
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

/* ---------------------------------------------------------
   HOME PAGE
--------------------------------------------------------- */
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

  const isMobile = () =>
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const getWhatsAppUrl = () => {
    const phone = "256771236219";
    const msg = "Hello, I would like to inquire about your services.";
    return isMobile()
      ? `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
      : `https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(msg)}`;
  };

  if (posts.length === 0) return <p className="text-center">Loading...</p>;

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

  /* ------------------------------
     Featured + Side Feature
  ------------------------------ */
  const featured = filteredPosts[0];
  const sideFeatures = filteredPosts.slice(1, 3);
  const remainingPosts = filteredPosts.slice(3);

  /* ------------------------------
     Trending / Recently / Latest
  ------------------------------ */
  const trendingPosts = [...remainingPosts]
    .sort((a, b) => b.views - a.views)
    .slice(0, 100);

  const recentlyPosts = [...remainingPosts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);

  const latestPosts = remainingPosts.filter(
    (p) => !recentlyPosts.includes(p)
  );

  /* ------------------------------
     Render Page
  ------------------------------ */
  return (
    <Container fluid className="nilepost-home mt-4">
      {/* ============================  
            SECTION 1 — FEATURED
      ============================ */}
      <Row>
        <Col lg={8} md={12}>
          <Card className="featured-card mb-4">
            <div className="featured-media-container" style={{ height: "420px" }}>
              <MediaRenderer
                imageSrc={getMediaUrl(featured.imagePath)}
                videoSrc={getMediaUrl(featured.videoPath)}
                className="featured-image"
              />

              <div className="featured-overlay">
                <span className="category-badge">{featured.category}</span>
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

        <Col lg={4} md={12}>
          <div className="side-featured-list">
            {sideFeatures.map((post) => (
              <Card className="side-featured mb-3" key={post.id}>
                <Row>
                  <Col xs={5} style={{ maxHeight: 120, overflow: "hidden" }}>
                    <MediaRenderer
                      imageSrc={getMediaUrl(post.imagePath)}
                      videoSrc={getMediaUrl(post.videoPath)}
                      className="side-featured-img"
                    />
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

      {/* Floating WhatsApp Button */}
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

      {/* ============================
          SECTION 2 — TRENDING etc.
      ============================ */}
      <Row className="mt-5 section2">
        {/* Trending */}
        <Col lg={3} md={6}>
          <h4 className="sidebar-title">Trending</h4>
          <div className="trending-list">
            {trendingPosts.map((post, index) => (
              <div className="trending-item" key={post.id}>
                <div className="trending-rank">{index + 1}</div>
                <div
                  className="trending-thumb"
                  style={{ width: 60, height: 60, overflow: "hidden" }}
                >
                  <MediaRenderer
                    imageSrc={getMediaUrl(post.imagePath)}
                    videoSrc={getMediaUrl(post.videoPath)}
                    className="w-100 h-100"
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

        {/* Recently */}
        <Col lg={6} md={12}>
          <h4 className="sidebar-title">Recently</h4>
          <div className="recently-list">
            {recentlyPosts.map((post, index) => (
              <div
                className={`recently-item ${index === 0 ? "recently-featured" : ""}`}
                key={post.id}
              >
                <div style={{ maxHeight: 140, overflow: "hidden" }}>
                  <MediaRenderer
                    imageSrc={getMediaUrl(post.imagePath)}
                    videoSrc={getMediaUrl(post.videoPath)}
                    className="w-50 h-50"
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
                  <p>{post.description?.substring(0, 100)}...</p>
                  <div className="recently-meta">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Col>

        {/* Latest */}
        <Col lg={3} md={6}>
          <h4 className="sidebar-title">Latest</h4>
          <div className="latest-list">
            {latestPosts.map((post) => (
              <div className="latest-item" key={post.id}>
                <div
                  className="latest-thumb"
                  style={{ width: 70, height: 50, overflow: "hidden" }}
                >
                  <MediaRenderer
                    imageSrc={getMediaUrl(post.imagePath)}
                    videoSrc={getMediaUrl(post.videoPath)}
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

      {/* ============================
          SECTION 3 — CATEGORY BLOCKS
      ============================ */}
      {["Politics", "Business", "Health", "Education","Technology", "Sports"].map((category) => {
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
                    <div style={{ height: 180, overflow: "hidden" }}>
                      <MediaRenderer
                        imageSrc={getMediaUrl(post.imagePath)}
                        videoSrc={getMediaUrl(post.videoPath)}
                        className="news-image"
                      />
                    </div>
                    <Card.Body>
                      <Link to={`/post/${post.id}`} className="news-title d-block mb-2">
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
      })}
    </Container>
  );
};

export default HomePage;
