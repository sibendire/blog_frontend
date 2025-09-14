import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../cssComponent/HomePages.css";

const HomePage = () => {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState({});

  // Fetch posts
  useEffect(() => {
    let url = "http://localhost:8080/api/posts/blog";
    if (category) {
      url = `http://localhost:8080/api/posts/blog/category/${category}`;
    }

    axios
      .get(url)
      .then((res) => {
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sorted);
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, [category]);

  const getMediaUrl = (filePath) => {
    if (!filePath) return null;
    return filePath.startsWith("/")
      ? `http://localhost:8080${filePath}`
      : `http://localhost:8080/uploads/${filePath}`;
  };

  const toggleExpand = (id) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Handle Like
  const handleLike = (id) => {
    axios
      .put(`http://localhost:8080/api/posts/blog/${id}/like`)
      .then((res) => {
        setPosts((prev) =>
          prev.map((post) =>
            post.id === id ? { ...post, likes: res.data.likes } : post
          )
        );
      })
      .catch((err) => console.error("Error liking post:", err));
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">
        {category ? `${category} Posts` : "Latest Posts"}
      </h2>
      <Row>
        {posts.map((post) => {
          const imageUrl = getMediaUrl(post.imagePath);
          const videoUrl = getMediaUrl(post.videoPath);
          const isExpanded = expandedPosts[post.id] || false;

          return (
            <Col md={4} sm={6} xs={12} key={post.id} className="mb-4">
              <Card className="h-100 shadow-sm post-card">
                {/* Media */}
                <div className="media-container">
                  {videoUrl ? (
                    <video controls className="post-image" poster={imageUrl}>
                      <source src={videoUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={
                        imageUrl ||
                        "https://via.placeholder.com/400x200?text=No+Image"
                      }
                      alt={post.title}
                      className="post-image"
                    />
                  )}
                  <div className="media-overlay">
                    <h5>{post.title}</h5>
                    <p>{post.category}</p>
                  </div>
                </div>

                {/* Card body */}
                <Card.Body className="d-flex flex-column">
                  <Card.Text className="flex-grow-1">
                    {isExpanded
                      ? post.description
                      : `${post.description?.substring(0, 120)}...`}
                  </Card.Text>

                  <Button
                    onClick={() => toggleExpand(post.id)}
                    variant="link"
                    className="p-0 text-primary"
                  >
                    {isExpanded ? "Show Less" : "Read More"}
                  </Button>

                  <Button
                    onClick={() => handleLike(post.id)}
                    variant="outline-danger"
                    className="mt-2"
                  >
                    ❤️ {post.likes || 0}
                  </Button>

                  <Button
                    as={Link}
                    to={`/post/${post.id}`}
                    variant="primary"
                    className="mt-2"
                  >
                    View Full Post
                  </Button>
                </Card.Body>

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
