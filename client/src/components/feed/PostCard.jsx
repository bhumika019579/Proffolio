import { useState } from "react";
import { Link } from "react-router-dom";
import RepoCard from "./RepoCard";
import EngagementBar from "./EngagementBar";
import CommentSection from "./commentSection";
import { useAuth } from "../../hooks/useAuth";
import { deletePost } from "../../api/postApi";

function PostCard({ post }) {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);

  const handleDeletePost = async () => {
    if (!window.confirm("Delete this post?")) return;

    try {
      await deletePost(post.id);
      window.location.reload();
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  return (
    <div className="card">
      {/* Post Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {/* Clickable Avatar */}
          <Link
            to={`/profile/${post.user.github_username}`}
            style={{
              display: "block",
              flexShrink: 0,
            }}
          >
            <img
              src={post.user.avatar_url || "https://via.placeholder.com/44"}
              alt={post.user.name}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "1px solid var(--color-border)",
                display: "block",
              }}
            />
          </Link>

          {/* Name + Date */}
          <div>
            <Link
              to={`/profile/${post.user.github_username}`}
              style={{
                fontWeight: "600",
                fontSize: "15px",
                textDecoration: "none",
                color: "var(--color-text-primary)",
              }}
            >
              {post.user.name}
            </Link>

            <div
              style={{
                fontSize: "12px",
                color: "var(--color-text-secondary)",
                marginTop: "3px",
              }}
            >
              {post.created_at}
            </div>
          </div>
        </div>

        {/* Delete */}
        {user && user.id === post.user.id && (
          <button
            onClick={handleDeletePost}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-text-secondary)",
              fontSize: "13px",
              padding: "6px 8px",
            }}
          >
            ...
          </button>
        )}
      </div>

      {/* Caption */}
      <p
        style={{
          marginTop: "16px",
          marginBottom: "12px",
          fontSize: "15px",
          lineHeight: "1.5",
        }}
      >
        {post.caption}
      </p>

      <RepoCard repo={post.repo} />

      <EngagementBar postId={post.id} />

      <button
        onClick={() => setShowComments(!showComments)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "13px",
          color: "var(--color-text-secondary)",
          marginTop: "6px",
          padding: "4px 0",
        }}
      >
        {showComments ? "Hide comments" : "View comments"}
      </button>

      {showComments && (
        <CommentSection
          postId={post.id}
          postOwnerId={post.user.id}
        />
      )}
    </div>
  );
}

export default PostCard;