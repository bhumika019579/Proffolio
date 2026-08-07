import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: "400px", margin: "0 24px" }}>
      <input
        type="text"
        placeholder="Search by name, project, or language..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "8px 12px",
          borderRadius: "8px",
          border: "1px solid var(--color-border)",
          outline: "none",
        }}
      />
    </form>
  );
}

export default SearchBar;