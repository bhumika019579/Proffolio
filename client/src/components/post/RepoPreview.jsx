function RepoPreview({ repo, loading }) {
  if (loading) {
    return (
      <div className="card" style={{ marginTop: "12px" }}>
        <p style={{ color: "var(--color-text-secondary)" }}>Analyzing repository...</p>
      </div>
    );
  }

  if (!repo) return null;

  return (
    <div className="card" style={{ marginTop: "12px" }}>
      <div style={{ fontWeight: "600" }}>{repo.name}</div>
      <p style={{ fontSize: "14px", color: "var(--color-text-secondary)" }}>
        {repo.purposeSummary}
      </p>
      <div style={{ display: "flex", gap: "12px", fontSize: "13px", marginTop: "8px" }}>
        <span>⭐ {repo.stars}</span>
        <span>🍴 {repo.forks}</span>
        <span>📝 {repo.commitCount} commits</span>
      </div>
      <div style={{ display: "flex", gap: "6px", marginTop: "8px", flexWrap: "wrap" }}>
        {repo.tags?.map((tag) => (
          <span
            key={tag.name}
            style={{
              fontSize: "12px",
              padding: "3px 8px",
              borderRadius: "12px",
              border: "1px solid var(--color-primary-solid)",
              color: "var(--color-primary-solid)",
            }}
          >
            {tag.name} {tag.percentage}%
          </span>
        ))}
      </div>
    </div>
  );
}

export default RepoPreview;