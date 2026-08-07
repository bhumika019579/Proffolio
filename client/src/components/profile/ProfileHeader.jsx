function ProfileHeader({ user, isOwnProfile }) {
  return (
    <div className="card" style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <img
        src={user.avatarUrl || "https://via.placeholder.com/80"}
        alt={user.name}
        style={{ width: "80px", height: "80px", borderRadius: "50%" }}
      />
      <div style={{ flex: 1 }}>
        <h2 style={{ margin: 0 }}>{user.name}</h2>
        <p style={{ color: "var(--color-text-secondary)", margin: "4px 0" }}>
          @{user.username}
        </p>
        <p style={{ margin: 0 }}>{user.bio || "No bio yet."}</p>
      </div>

      {isOwnProfile && (
        <button className="btn-primary" onClick={() => (window.location.href = "/profile/edit")}>
          Edit Profile
        </button>
      )}
    </div>
  );
}

export default ProfileHeader;