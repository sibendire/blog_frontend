import React, { useRef, useState } from "react";

const MediaRenderer = ({ imageSrc, videoSrc, className = "", style = {} }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = (e) => {
    e.stopPropagation();

    if (!videoRef.current) return;

    videoRef.current.muted = false;   // 🔊 TURN ON SOUND
    videoRef.current.play();
    setIsPlaying(true);
  };

  // When a video exists
  if (videoSrc) {
    return (
      <div
        className="video-wrapper"
        style={{ position: "relative", width: "100%", height: "100%", ...style }}
      >
        <video
          ref={videoRef}
          className={className}
          preload="metadata"
          playsInline                 // ❤️ Required for mobile sound
          controls={isPlaying}        // only show controls after play
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Custom Play Button */}
        {!isPlaying && (
          <div
            className="video-play-btn"
            onClick={handlePlay}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "rgba(0,0,0,0.4)",
              padding: "14px 16px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "28px",
              color: "#fff",
              zIndex: 20,
            }}
          >
            ▶
          </div>
        )}
      </div>
    );
  }

  // Image fallback
  return (
    <img
      src={imageSrc}
      loading="lazy"
      className={className}
      style={{ width: "100%", height: "100%", objectFit: "cover", ...style }}
      alt=""
    />
  );
};

export default MediaRenderer;
