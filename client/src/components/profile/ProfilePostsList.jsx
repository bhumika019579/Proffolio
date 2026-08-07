import PostCard from "../feed/PostCard";

function ProfilePostsList({ posts }) {
  if (!posts || posts.length === 0) {
    return <p style={{ color: "var(--color-text-secondary)" }}>No posts yet.</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default ProfilePostsList;