import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

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

      <input
        type="text"
        placeholder="Search by name, project, or language..."
        style={{
          flex: 1,
          maxWidth: "400px",
          margin: "0 24px",
          padding: "8px 12px",
          borderRadius: "8px",
          border: "1px solid var(--color-border)",
          outline: "none",
        }}
      />

      <button className="btn-primary" onClick={() => navigate("/create-post")}>
        New Post
      </button>
    </nav>
  );
}

export default Navbar;