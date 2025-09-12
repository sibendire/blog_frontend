// src/components/CategoryPage.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";

const CategoryPage = () => {
  const { category } = useParams(); // grabs category from URL
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/posts")
      .then((res) => {
        // filter posts by category (case-insensitive)
        const filtered = res.data.filter(
          (post) => post.category?.toLowerCase() === category.toLowerCase()
        );
        setPosts(filtered);
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, [category]);

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-capitalize">{category} Posts</h2>
      <Row>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Col md={4} key={post.id} className="mb-4">
              <Card>
                {post.imagePath && (
                  <Card.Img
                    variant="top"
                    src={
                      post.imagePath.startsWith("/")
                        ? post.imagePath
                        : `/uploads/${post.imagePath}`
                    }
                    alt={post.title}
                  />
                )}
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.description?.substring(0, 100)}...</Card.Text>
                  <Button
                    as={Link}
                    to={`/category/${category}/post/${post.id}`}
                    variant="primary"
                  >
                    Read More
                  </Button>
                </Card.Body>
                <Card.Footer className="text-muted d-flex justify-content-between">
                  <small>{post.category}</small>
                  <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <p>No posts found in {category}.</p>
        )}
      </Row>
    </Container>
  );
};

export default CategoryPage;
