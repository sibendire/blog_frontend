import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/posts/blog")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container py-5">
      {/* Page Header */}
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary">📌 Latest Posts</h2>
        <p className="text-muted">Browse articles, images, and videos shared by the community</p>
        <hr className="w-25 mx-auto" />
      </div>

      {/* Posts Grid */}
      <div className="row g-4">
        {posts.map((post) => (
          <div className="col-md-6 col-lg-4" key={post.id}>
            <div className="card h-100 shadow-sm border-0 rounded-3 hover-card">
              {/* Image */}
              {post.imagePath && (
                <img
                  src={`http://localhost:8080/${post.imagePath}`}
                  alt={post.title}
                  className="card-img-top rounded-top"
                  style={{ height: "220px", objectFit: "cover" }}
                />
              )}

              <div className="card-body d-flex flex-column">
                {/* Title */}
                <h5 className="card-title fw-semibold">{post.title}</h5>

                {/* Description (truncated) */}
                <p className="card-text text-muted">
                  {post.description.length > 100
                    ? post.description.substring(0, 100) + "..."
                    : post.description}
                </p>

                {/* Category */}
                <span className="badge bg-gradient bg-primary align-self-start mb-2">
                  {post.category}
                </span>

                {/* Video */}
                {post.videoPath && (
                  <div className="mb-3">
                    <video
                      controls
                      className="w-100 rounded"
                      style={{ maxHeight: "200px", objectFit: "cover" }}
                    >
                      <source
                        src={`http://localhost:8080/${post.videoPath}`}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-auto">
                  <Link
                    to={`/edit/${post.id}`}
                    className="btn btn-sm btn-outline-warning w-100"
                  >
                    ✏️ Edit Post
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center text-muted py-5">
            <h5>No posts available yet</h5>
            <p>Start by creating a new post</p>
          </div>
        )}
      </div>

      {/* Custom hover effect */}
      <style>
        {`
          .hover-card {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .hover-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          }
        `}
      </style>
    </div>
  );
}

export default PostList;
