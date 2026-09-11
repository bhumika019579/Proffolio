import Feed from "../components/feed/Feed";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";

function HomePage() {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      axiosClient
        .get("/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          login(res.data, token);
          window.history.replaceState({}, "", "/");
        });
    }
  }, [login]);

  return (
    <div>
      {/* Page Header */}
      

      {/* Create Post Card */}
      {user && (
        <div
          className="card"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            marginBottom: "24px",
            padding: "14px 16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              minWidth: 0,
            }}
          >
            <img
              src={user.avatar_url}
              alt={user.name}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "1px solid var(--color-border)",
                flexShrink: 0,
              }}
            />

            <span
              style={{
                fontSize: "14px",
                color: "var(--color-text-secondary)",
              }}
            >
              Share a project or update...
            </span>
          </div>

          <button
            className="btn-primary"
            onClick={() => navigate("/create-post")}
            style={{
              flexShrink: 0,
            }}
          >
            New Post
          </button>
        </div>
      )}

      {/* Feed */}
      <Feed />
    </div>
  );
}

export default HomePage;