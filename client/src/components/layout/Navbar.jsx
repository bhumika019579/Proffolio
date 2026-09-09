import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Navbar({ theme, toggleTheme }) {
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
        backgroundColor: "var(--color-bg-card)",
      }}
    >
      <Link
        to="/"
        style={{
          fontWeight: "700",
          fontSize: "20px",
          textDecoration: "none",
          color: "var(--color-primary)",
        }}
      >
        Prooffolio
      </Link>

      <form
        onSubmit={handleSearchSubmit}
        style={{
          flex: 1,
          maxWidth: "400px",
          margin: "0 24px",
        }}
      >
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
            backgroundColor: "var(--color-bg-card)",
            color: "var(--color-text-primary)",
            outline: "none",
          }}
        />
      </form>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={theme === "light" ? "Dark mode" : "Light mode"}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            border: "1px solid var(--color-border)",
            backgroundColor: "transparent",
            color: "var(--color-text-primary)",
            cursor: "pointer",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {theme === "light" ? "☾" : "☀"}
        </button>

        {user ? (
          <>
            <button
              className="btn-primary"
              onClick={() => navigate("/create-post")}
            >
              New Post
            </button>

            <Link to={`/profile/${user.github_username}`}>
              <img
                src={user.avatar_url}
                alt={user.name}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  display: "block",
                }}
              />
            </Link>

            {/* Logout */}
            <button
              onClick={logout}
              style={{
                backgroundColor: "transparent",
                color: "var(--color-text-secondary)",
                border: "1px solid var(--color-border)",
                padding: "8px 14px",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <button className="btn-primary" onClick={handleGithubLogin}>
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;