import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../cssComponent/PostDetails.css"; // Your custom CSS

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  // Fetch post details
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/posts/blog/${id}`)
      .then((res) => {
        setPost(res.data);
        fetchRelatedPosts(res.data.category, res.data.id);
      })
      .catch((err) => console.error("Error fetching post:", err));
  }, [id]);

  // Fetch related posts by category
  const fetchRelatedPosts = (category, postId) => {
    axios
      .get(`http://localhost:8080/api/posts/blog/category/${category}`)
      .then((res) => {
        // Exclude the current post
        const related = res.data.filter((p) => p.id !== postId).slice(0, 4); // max 4 posts
        setRelatedPosts(related);
      })
      .catch((err) => console.error("Error fetching related posts:", err));
  };

  const handleLike = () => {
    axios
      .put(`http://localhost:8080/api/posts/blog/${id}/like`)
      .then((res) => setPost((prev) => ({ ...prev, likes: res.data.likes })))
      .catch((err) => console.error("Error liking post:", err));
  };

  if (!post) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading post...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container post-details-container">
      <div className="card post-card">
        {post.imagePath && (
          <img
            src={`http://localhost:8080${post.imagePath}`}
            alt={post.title}
            className="card-img-top"
          />
        )}

        <div className="card-body p-4">
          <h2 className="card-title">{post.title}</h2>
          <p className="post-meta">
            Category: {post.category} •{" "}
            {new Date(post.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <p className="card-text">{post.description}</p>

          {post.videoPath && (
            <div className="mt-4">
              <video controls>
                <source
                  src={`http://localhost:8080${post.videoPath}`}
                  type="video/mp4"
                />
              </video>
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center mt-4">
            <button className="btn btn-outline-danger" onClick={handleLike}>
              ❤️ {post.likes || 0}
            </button>

            <Link to="/" className="btn btn-primary">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-5">
          <h3 className="mb-4">Related Posts</h3>
          <div className="row">
            {relatedPosts.map((related) => (
              <div key={related.id} className="col-md-3 col-sm-6 mb-4">
                <div className="card shadow-sm related-post-card h-100">
                  {related.imagePath && (
                    <img
                      src={`http://localhost:8080${related.imagePath}`}
                      alt={related.title}
                      className="card-img-top"
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h6 className="card-title">{related.title}</h6>
                    <p className="card-text text-truncate">
                      {related.description?.substring(0, 60)}...
                    </p>
                    <Link
                      to={`/post/${related.id}`}
                      className="btn btn-sm btn-primary mt-auto"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
