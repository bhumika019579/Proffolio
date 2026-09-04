import { useState, useEffect } from "react";
import { getComments, addComment } from "../../api/postApi";
import { useAuth } from "../../hooks/useAuth";
import { deleteComment } from "../../api/postApi";

function CommentSection({ postId ,postOwnerId}) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadComments() {
      try {
        const res = await getComments(postId);
        setComments(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to load comments:", err);
      } finally {
        setLoading(false);
      }
    }
    loadComments();
  }, [postId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    setSubmitting(true);
    try {
      const res = await addComment(postId, newComment.trim());
      setComments((prev) => [...prev, res.data]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to add comment:", err);
    } finally {
      setSubmitting(false);
    }
  };
  const handleDeleteComment = async (commentId) => {
  if (!window.confirm("Delete this comment?")) return;
  try {
    await deleteComment(commentId);
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  } catch (err) {
    console.error("Failed to delete comment:", err);
  }
};

  if (loading) return <p style={{ fontSize: "13px" }}>Loading comments...</p>;

  return (
    <div style={{ marginTop: "10px", paddingTop: "10px", borderTop: "1px solid var(--color-border)" }}>
      {comments.length === 0 ? (
        <p style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>No comments yet.</p>
      ) : (
       comments.map((comment) => (
  <div key={comment.id} style={{ marginBottom: "8px", fontSize: "13px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <div>
      <strong>{comment.user?.name}</strong>{" "}
      <span style={{ color: "var(--color-text-secondary)" }}>{comment.content}</span>
    </div>
    {user && (user.id === comment.user_id || user.id === postOwnerId) && (
      <button
        onClick={() => handleDeleteComment(comment.id)}
        style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-error)", fontSize: "12px" }}
      >
        Delete
      </button>
    )}
  </div>
))
      )}

      {user && (
        <form onSubmit={handleAddComment} style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            style={{
              flex: 1,
              padding: "6px 10px",
              borderRadius: "6px",
              border: "1px solid var(--color-border)",
              fontSize: "13px",
            }}
          />
          <button type="submit" className="btn-primary" disabled={submitting || !newComment.trim()}>
            {submitting ? "..." : "Post"}
          </button>
        </form>
      )}
    </div>
  );
}

export default CommentSection;