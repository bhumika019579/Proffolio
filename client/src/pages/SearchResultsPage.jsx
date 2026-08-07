import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { search } from "../api/searchApi";
import PostCard from "../components/feed/PostCard";

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    async function runSearch() {
      setLoading(true);
      try {
        const res = await search(query);
        setResults(res.data);
      } catch (err) {
        setError("Search failed");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    runSearch();
  }, [query]);

  if (loading) return <p>Searching...</p>;
  if (error) return <p style={{ color: "var(--color-error)" }}>{error}</p>;

  return (
    <div>
      <h2>Results for "{query}"</h2>
      {results.length === 0 ? (
        <p>No matching projects found.</p>
      ) : (
        results.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}

export default SearchResultsPage;