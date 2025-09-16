import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../cssComponent/HomePages.css";

const LatestSidebar = ({ posts = [], getMediaUrl }) => { // default to empty array
  const [visibleCount, setVisibleCount] = useState(5);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  if (!posts || posts.length === 0) {
    return <p className="text-center text-light">Loading...</p>; // show loading if posts undefined or empty
  }

  return (
    <div className="sidebar">
      <h4 className="sidebar-title">Latest</h4>
      <div className="latest-list">
        {(posts || []).slice(0, visibleCount).map((post) => (
          <div className="d-flex latest-item" key={post.id}>
            <div className="latest-thumb">
              <img
                src={
                  post.imagePath
                    ? getMediaUrl(post.imagePath)
                    : "https://via.placeholder.com/80x60?text=No+Img"
                }
                alt={post.title}
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

      {/* Load More Button */}
      {visibleCount < (posts?.length || 0) && (
        <div className="text-center mt-3">
          <button onClick={loadMore} className="btn btn-outline-primary btn-sm">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default LatestSidebar;
