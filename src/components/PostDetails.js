import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import "../cssComponent/PostDetails.css";
import { FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";

/* =========================
   API BASE
========================= */
const API_BASE = "https://blog-backend-21.onrender.com";

/* =========================
   MEDIA URL HELPER
========================= */
const getMediaUrl = (url) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${API_BASE}${url}`;
};

const PostDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  const currentUrl = window.location.origin + location.pathname;

  /* =========================
     FETCH POST
  ========================= */
 useEffect(() => {
  axios
    .get(`${API_BASE}/api/posts/blog`)
    .then((res) => {
      const foundPost = res.data.find(
        (p) => String(p.id) === String(id)
      );

      if (!foundPost) {
        console.error("Post not found");
        return;
      }

      setPost(foundPost);
      fetchRelated(foundPost.category, foundPost.id);
    })
    .catch((err) =>
      console.error("Post fetch error:", err)
    );
}, [id]);


  /* =========================
     FETCH RELATED POSTS
  ========================= */
  const fetchRelated = (category, postId) => {
    if (!category) return;

    axios
      .get(
        `${API_BASE}/api/posts/blog/category/${category.toLowerCase()}`
      )
      .then((res) => {
        const related = res.data
          .filter((p) => p.id !== postId)
          .slice(0, 4);
        setRelatedPosts(related);
      })
      .catch((err) => console.error("Related fetch error:", err));
  };

  /* =========================
     LIKE POST
  ========================= */
  const handleLike = () => {
    axios
      .put(`${API_BASE}/api/posts/blog/${id}/like`)
      .then((res) =>
        setPost((prev) => ({ ...prev, likes: res.data.likes }))
      );
  };

  /* =========================
     SHARE HELPERS
  ========================= */
  const isMobile = () =>
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const getFacebookShareUrl = () =>
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}`;

  const getTwitterShareUrl = () =>
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      post?.title || ""
    )}&url=${encodeURIComponent(currentUrl)}`;

  const getWhatsAppShareUrl = () => {
    const phone = "256771236219";
    const message = `${post?.title} - ${currentUrl}`;
    return isMobile()
      ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
      : `https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
          message
        )}`;
  };

  if (!post) return <div className="loading">Loading...</div>;

  return (
    <div className="post-details-container">
      {/* =========================
          HERO MEDIA
      ========================= */}
      <div className="post-hero">
        {post.videoPath ? (
          <video
            src={getMediaUrl(post.videoPath)}
            controls
            className="post-hero-img"
          />
        ) : (
          <img
            src={getMediaUrl(post.imagePath)}
            alt={post.title}
            className="post-hero-img"
          />
        )}
        <span className="post-category">{post.category}</span>
      </div>

      {/* =========================
          CONTENT
      ========================= */}
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

        <div className="post-actions">
          <button className="like-btn" onClick={handleLike}>
            ❤️ {post.likes || 0}
          </button>

          <Link to="/" className="back-home-btn">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* =========================
          SHARE BUTTONS
      ========================= */}
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

      {/* =========================
          RELATED POSTS
      ========================= */}
      {relatedPosts.length > 0 && (
        <div className="related-posts">
          <h3>Related Posts</h3>

          <div className="related-grid">
            {relatedPosts.map((rel) => (
              <div key={rel.id} className="related-card">
                <img
                  src={getMediaUrl(rel.imagePath)}
                  alt={rel.title}
                  className="related-img"
                />

                <div className="related-info">
                  <Link
                    to={`/post/${rel.id}`}
                    className="related-title"
                  >
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
