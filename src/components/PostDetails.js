import React from "react";
import { useParams } from "react-router-dom";

const PostDetail = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find(p => p.id === Number(id));

  if (!post) return <p>Post not found</p>;

  return (
    <div className="container mt-4">
      <h2>{post.title}</h2>
      <p className="text-muted">Category: {post.category}</p>
      <p>{post.description}</p>
      {post.imageUrl && <img src={`http://localhost:8080${post.imageUrl}`} alt={post.title} className="img-fluid mb-3" />}
      {post.videoUrl && (
        <video controls className="img-fluid mb-3">
          <source src={`http://localhost:8080${post.videoUrl}`} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default PostDetail;
