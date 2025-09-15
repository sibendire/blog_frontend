import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function PostForm({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    setVideoPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      if (image) formData.append("image", image);
      if (video) formData.append("video", video);

      const response = await axios.post("http://localhost:8080/api/posts/blog", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onPostCreated(response.data);

      // Reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setImage(null);
      setVideo(null);
      setImagePreview(null);
      setVideoPreview(null);

      // ✅ Show success popup
      setShowSuccess(true);
    } catch (error) {
      console.error("Error uploading post:", error);
      alert("Failed to create post. Check console for details.");
    }
  };

  // ✅ Auto redirect after 2 seconds when success is shown
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        navigate("/");
      }, 2000); // 2 seconds

      return () => clearTimeout(timer);
    }
  }, [showSuccess, navigate]);

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4 rounded-3">
        <h2 className="text-center mb-4">✍️ Create New Post</h2>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Category */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Category</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              <option value="News">News</option>
              <option value="Politics">Politics</option>
              <option value="Business">Business</option>
              <option value="Health">Health</option>
              <option value="Opinions">Opinions</option>
              <option value="Education">Education</option>
              <option value="Sports">Sports</option>
              <option value="Crimes">Crimes</option>
            </select>
          </div>

          {/* File Uploads */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="img-fluid mt-2 rounded shadow-sm"
                  style={{ maxHeight: "180px", objectFit: "cover" }}
                />
              )}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Video</label>
              <input
                type="file"
                className="form-control"
                accept="video/*"
                onChange={handleVideoChange}
              />
              {videoPreview && (
                <video
                  controls
                  className="w-100 mt-2 rounded shadow-sm"
                  style={{ maxHeight: "180px" }}
                >
                  <source src={videoPreview} type={video?.type} />
                </video>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-lg">
              🚀 Submit Post
            </button>
          </div>
        </form>
      </div>

      {/* ✅ Success Popup Modal */}
      <Modal show={showSuccess} centered>
        <Modal.Header>
          <Modal.Title>✅ Post Created</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your post has been successfully submitted! <br />
          <small>(Redirecting to homepage...)</small>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PostForm;
