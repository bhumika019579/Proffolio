import { useState, useEffect } from "react";
import { getFeed } from "../../api/feedApi";
import PostCard from "./PostCard";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const LIMIT = 20;

  useEffect(() => {
    async function loadFeed() {
      try {
        const res = await getFeed(1, LIMIT);
        setPosts(res.data.posts);
        setHasMore(res.data.posts.length === LIMIT);
      } catch (err) {
        setError("Failed to load feed");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadFeed();
  }, []);

  async function loadMore() {
    const nextPage = page + 1;
    setLoadingMore(true);
    try {
      const res = await getFeed(nextPage, LIMIT);
      setPosts((prevPosts) => [...prevPosts, ...res.data.posts]);
      setHasMore(res.data.posts.length === LIMIT);
      setPage(nextPage);
    } catch (err) {
      setError("Failed to load more posts");
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  }

  if (loading) return <p>Loading feed...</p>;
  if (error) return <p style={{ color: "var(--color-error)" }}>{error}</p>;
  if (posts.length === 0) return <p>No posts yet. Be the first to share your project!</p>;

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {hasMore && (
        <button onClick={loadMore} disabled={loadingMore}>
          {loadingMore ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}

export default Feed;