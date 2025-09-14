import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/posts/blog/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error("Error fetching post:", err));
  }, [id]);

  const handleLike = () => {
    axios
      .put(`http://localhost:8080/api/posts/blog/${id}/like`)
      .then((res) => setPost((prev) => ({ ...prev, likes: res.data.likes })))
      .catch((err) => console.error("Error liking post:", err));
  };

  if (!post) return <p>Loading post...</p>;

  return (
    <div className="container mt-4">
      <h2>{post.title}</h2>
      <p className="text-muted">
        Category: {post.category} | {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <p>{post.description}</p>

      {post.imagePath && (
        <img
          src={`http://localhost:8080${post.imagePath}`}
          alt={post.title}
          className="img-fluid mb-3"
        />
      )}

      {post.videoPath && (
        <video controls className="img-fluid mb-3">
          <source src={`http://localhost:8080${post.videoPath}`} type="video/mp4" />
        </video>
      )}

      <button className="btn btn-outline-danger" onClick={handleLike}>
        ❤️ {post.likes || 0}
      </button>
    </div>
  );
};

export default PostDetail;
