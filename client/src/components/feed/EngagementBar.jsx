import { useState } from "react";
import { likePost, unlikePost } from "../../api/postApi";

function EngagementBar({ postId, likeCount, commentCount, isLikedByMe }) {
  const [liked, setLiked] = useState(isLikedByMe);
  const [count, setCount] = useState(likeCount);

  const handleLikeToggle = async () => {
    try {
      if (liked) {
        await unlikePost(postId);
        setCount((prev) => prev - 1);
      } else {
        await likePost(postId);
        setCount((prev) => prev + 1);
      }
      setLiked(!liked);
    } catch (err) {
      console.error("Failed to update like:", err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        marginTop: "12px",
        paddingTop: "10px",
        borderTop: "1px solid var(--color-border)",
        fontSize: "14px",
      }}
    >
      <button
        onClick={handleLikeToggle}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: liked ? "var(--color-primary-solid)" : "var(--color-text-secondary)",
          fontWeight: liked ? "600" : "400",
        }}
      >
        {liked ? "❤️" : "🤍"} {count}
      </button>

      <span style={{ color: "var(--color-text-secondary)" }}>
        💬 {commentCount}
      </span>
    </div>
  );
}

export default EngagementBar;