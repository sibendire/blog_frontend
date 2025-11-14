// import "../css/PostCard.css";

function PostCard({ post, onLike }) {
  return (
    <div className="post-card">
      <div className="post-header">
        <h2 className="post-title">{post.title}</h2>
      </div>

      <p className="post-description">{post.description}</p>

      {post.imageUrl && (
        <div className="media-wrapper">
          <img src={post.imageUrl} alt="Post media" className="post-media" />
        </div>
      )}

      {post.videoUrl && (
        <div className="media-wrapper">
          <video controls className="post-media">
            <source src={post.videoUrl} type="video/mp4" />
          </video>
        </div>
      )}

      <div className="post-footer">
        <button className="like-btn" onClick={() => onLike(post.id)}>
          👍 {post.likes} {post.likes === 1 ? "Like" : "Likes"}
        </button>
      </div>
    </div>
  );
}

export default PostCard;
