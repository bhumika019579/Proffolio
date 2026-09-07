import { useState, useEffect } from "react";
import { toggleLike, getLikes, getComments } from "../../api/postApi";
import { useAuth } from "../../hooks/useAuth";

function EngagementBar({ postId }) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
  async function fetchData() {
    try {
      const likesRes = await getLikes(postId);

      const likes = Array.isArray(likesRes.data)
        ? likesRes.data
        : (likesRes.data.likes || []);

      setCount(likes.length);

      if (user) {
        const isLiked = likes.some(
          (like) => like.user_id === user.id
        );

        setLiked(isLiked);
      }
    } catch (err) {
      console.error("Failed to fetch likes:", err);
    }

    
    try {
      const commentsRes = await getComments(postId);

      const comments = Array.isArray(commentsRes.data)
        ? commentsRes.data
        : (commentsRes.data.comments || []);

      setCommentCount(comments.length);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  }

  fetchData();
}, [postId, user]);

const handleLikeToggle = async () => {
  try {
    await toggleLike(postId);
    setLiked(!liked);
    setCount((prev) => (liked ? prev - 1 : prev + 1));
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