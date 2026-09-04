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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={post.user.avatar_url || "https://via.placeholder.com/40"}
            alt={post.user.name}
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
          <div>
            <Link
              to={`/profile/${post.user.github_username}`}
              style={{ fontWeight: "600", textDecoration: "none", color: "var(--color-text-primary)" }}
            >
              {post.user.name}
            </Link>
            <div style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>
              {post.created_at}
            </div>
          </div>
        </div>

        {user && user.id === post.user.id && (
          <button
            onClick={handleDeletePost}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-error)", fontSize: "13px" }}
          >
            Delete
          </button>
        )}
      </div>

      <p style={{ marginTop: "10px", fontSize: "15px" }}>{post.caption}</p>

      <RepoCard repo={post.repo} />

      <EngagementBar postId={post.id} />

      <button
        onClick={() => setShowComments(!showComments)}
        style={{ background: "none", border: "none", cursor: "pointer", fontSize: "13px", color: "var(--color-text-secondary)", marginTop: "6px" }}
      >
        {showComments ? "Hide comments" : "View comments"}
      </button>

      {showComments && <CommentSection postId={post.id} postOwnerId={post.user.id} />}
    </div>
  );
}

export default PostCard;