import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../cssComponent/HomePages.css";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts and sort descending (latest first)
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

  // Helper to get full media URL
  const getMediaUrl = (filePath) => {
    if (!filePath) return null;
    return filePath.startsWith("/")
      ? `http://localhost:8080${filePath}`
      : `http://localhost:8080/uploads/${filePath}`;
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Latest Posts</h2>
      <Row>
        {posts.map((post) => {
          const imageUrl = getMediaUrl(post.imagePath);
          const videoUrl = getMediaUrl(post.videoPath);

          return (
            <Col md={4} sm={6} xs={12} key={post.id} className="mb-4">
              <Card className="h-100 shadow-sm post-card">

                {/* Media container with overlay */}
                <div className="media-container">
                  {/* Show video thumbnail if video exists, otherwise image */}
                  {videoUrl ? (
                    <video
                      controls
                      className="post-image"
                      poster={imageUrl || "https://via.placeholder.com/400x200?text=Video"}
                      style={{ objectFit: "cover" }}
                    >
                      <source src={videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={imageUrl || "https://via.placeholder.com/400x200?text=No+Image"}
                      alt={post.title}
                      className="post-image"
                    />
                  )}

                  {/* Overlay text */}
                  <div className="media-overlay">
                    <h5>{post.title}</h5>
                    <p>{post.category}</p>
                  </div>
                </div>

                {/* Card body */}
                <Card.Body className="d-flex flex-column">
                  <Card.Text className="flex-grow-1 text-truncate">
                    {post.description}
                  </Card.Text>
                  <Button
                    as={Link}
                    to={`/category/${post.category.toLowerCase()}/post/${post.id}`}
                    variant="primary"
                    className="mt-2"
                  >
                    Read More
                  </Button>
                </Card.Body>

                {/* Card footer */}
                <Card.Footer className="text-muted d-flex justify-content-between align-items-center">
                  <small>
                    <Link
                      to={`/category/${post.category.toLowerCase()}`}
                      className="text-decoration-none"
                    >
                      {post.category}
                    </Link>
                  </small>
                  <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                </Card.Footer>

              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default HomePage;
