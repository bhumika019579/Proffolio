import { useState, useEffect } from "react";
import { getFeed } from "../../api/feedApi";
import PostCard from "./PostCard";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadFeed() {
      try {
        const res = await getFeed();
        setPosts(res.data);
      } catch (err) {
        setError("Failed to load feed");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadFeed();
  }, []);

  if (loading) return <p>Loading feed...</p>;
  if (error) return <p style={{ color: "var(--color-error)" }}>{error}</p>;
  if (posts.length === 0) return <p>No posts yet. Be the first to share your project!</p>;

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Feed;