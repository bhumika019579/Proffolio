import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [query, setQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleGithubLogin = () => {
    window.location.href = "http://localhost:8080/auth/github";
  };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 24px",
        borderBottom: "1px solid var(--color-border)",
        backgroundColor: "var(--color-bg)",
      }}
    >
      <Link
        to="/"
        style={{
          fontWeight: "700",
          fontSize: "20px",
          textDecoration: "none",
          color: "var(--color-primary-solid)",
        }}
      >
        Prooffolio
      </Link>

      <form onSubmit={handleSearchSubmit} style={{ flex: 1, maxWidth: "400px", margin: "0 24px" }}>
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

      {user ? (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button className="btn-primary" onClick={() => navigate("/create-post")}>
            New Post
          </button>
          <Link to={`/profile/${user.github_username}`}>
            <img
              src={user.avatar_url}
              alt={user.name}
              style={{ width: "32px", height: "32px", borderRadius: "50%" }}
            />
          </Link>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button className="btn-primary" onClick={handleGithubLogin}>
          Sign in
        </button>
      )}
    </nav>
  );
}

export default Navbar;