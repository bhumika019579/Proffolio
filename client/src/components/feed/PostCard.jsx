import RepoCard from "./RepoCard";
import EngagementBar from "./EngagementBar";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div className="card">
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src={post.user.avatarUrl || "https://via.placeholder.com/40"}
          alt={post.user.name}
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />
        <div>
          <Link
            to={`/profile/${post.user.username}`}
            style={{ fontWeight: "600", textDecoration: "none", color: "var(--color-text-primary)" }}
          >
            {post.user.name}
          </Link>
          <div style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>
            {post.createdAt}
          </div>
        </div>
      </div>

      <p style={{ marginTop: "10px", fontSize: "15px" }}>{post.content}</p>

      <RepoCard repo={post.repo} />

      <EngagementBar
        postId={post.id}
        likeCount={post.likeCount}
        commentCount={post.commentCount}
        isLikedByMe={post.isLikedByMe}
      />
    </div>
  );
}

export default PostCard;