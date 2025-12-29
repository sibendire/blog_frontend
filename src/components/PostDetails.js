import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import "../cssComponent/PostDetails.css";
import { FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";

const PostDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  const currentUrl = window.location.origin + location.pathname;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/posts/blog/${id}`)
      .then((res) => {
        setPost(res.data);
        fetchRelated(res.data.category, res.data.id);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const fetchRelated = (category, postId) => {
    axios
      .get(`http://localhost:8080/api/posts/blog/category/${category}`)
      .then((res) => {
        const related = res.data.filter((p) => p.id !== postId).slice(0, 4);
        setRelatedPosts(related);
      });
  };

  const handleLike = () => {
    axios
      .put(`http://localhost:8080/api/posts/blog/${id}/like`)
      .then((res) => setPost((prev) => ({ ...prev, likes: res.data.likes })));
  };

  // Detect mobile device
  const isMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Share URLs
  const getFacebookShareUrl = () => {
    const url = encodeURIComponent(currentUrl);
    return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  };

  const getTwitterShareUrl = () => {
    const text = encodeURIComponent(post?.title || "");
    const url = encodeURIComponent(currentUrl);
    return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  };

  const getWhatsAppShareUrl = () => {
    const companyNumber = "256700000000"; // <- Replace with company WhatsApp number
    const message = `${post?.title} - ${currentUrl}`;
    return isMobile()
      ? `https://wa.me/${companyNumber}?text=${encodeURIComponent(message)}`
      : `https://web.whatsapp.com/send?phone=${companyNumber}&text=${encodeURIComponent(message)}`;
  };

  if (!post) return <div className="loading">Loading...</div>;

  return (
    <div className="post-details-container">
      {/* Hero Image */}
      {post.imagePath && (
        <div className="post-hero">
          <img
            src={`http://localhost:8080${post.imagePath}`}
            alt={post.title}
            className="post-hero-img"
          />
          <span className="post-category">{post.category}</span>
        </div>
      )}

      {/* Post Content */}
      <div className="post-content">
        <h1 className="post-title">{post.title}</h1>
        <p className="post-meta">
          {new Date(post.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div className="post-description">{post.description}</div>

        {post.videoPath && (
          <div className="post-video">
            <video controls>
              <source
                src={`http://localhost:8080${post.videoPath}`}
                type="video/mp4"
              />
            </video>
          </div>
        )}

        {/* Post Actions */}
        <div className="post-actions">
          <button className="like-btn" onClick={handleLike}>
            ❤️ {post.likes || 0}
          </button>
          <Link to="/" className="back-home-btn">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Floating Share Buttons */}
      <div className="floating-share-buttons">
        <a
          href={getFacebookShareUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn facebook"
        >
          <FaFacebookF />
        </a>
        <a
          href={getTwitterShareUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn twitter"
        >
          <FaTwitter />
        </a>
        <a
          href={getWhatsAppShareUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn whatsapp"
        >
          <FaWhatsapp />
        </a>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="related-posts">
          <h3>Related Posts</h3>
          <div className="related-grid">
            {relatedPosts.map((rel) => (
              <div key={rel.id} className="related-card">
                {rel.imagePath && (
                  <img
                    src={`http://localhost:8080${rel.imagePath}`}
                    alt={rel.title}
                    className="related-img"
                  />
                )}
                <div className="related-info">
                  <Link to={`/post/${rel.id}`} className="related-title">
                    {rel.title}
                  </Link>
                  <p className="related-meta">
                    {new Date(rel.createdAt).toLocaleDateString()}
                  </p>
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
