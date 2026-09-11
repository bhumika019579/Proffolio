function ProfileHeader({ user, isOwnProfile }) {
  return (
    <div
      className="card"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        padding: "28px 30px",
        marginBottom: "14px",
      }}
    >
      <img
        src={user.avatar_url || "https://via.placeholder.com/96"}
        alt={user.name}
        style={{
          width: "96px",
          height: "96px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "2px solid var(--color-border)",
          flexShrink: 0,
        }}
      />

      <div style={{ flex: 1, minWidth: 0 }}>
        <h2
          style={{
            margin: 0,
            fontSize: "26px",
            fontWeight: "700",
            color: "var(--color-text-primary)",
            letterSpacing: "-0.4px",
          }}
        >
          {user.name}
        </h2>

        <p
          style={{
            color: "var(--color-text-secondary)",
            margin: "5px 0 12px",
            fontSize: "14px",
          }}
        >
          @{user.github_username}
        </p>

        <p
          style={{
            margin: 0,
            fontSize: "14px",
            lineHeight: "1.5",
            color: "var(--color-text-primary)",
          }}
        >
          {user.bio || "No bio yet."}
        </p>
      </div>

      {isOwnProfile && (
        <button
          className="btn-primary"
          onClick={() => (window.location.href = "/profile/edit")}
          style={{
            flexShrink: 0,
            padding: "9px 16px",
          }}
        >
          Edit Profile
        </button>
      )}
    </div>
  );
}

export default ProfileHeader;