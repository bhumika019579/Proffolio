function RepoCard({ repo }) {
  return (
    <div
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "10px",
        padding: "12px",
        marginTop: "10px",
        backgroundColor: "var(--color-bg-soft)",
      }}
    >
      <div style={{ fontWeight: "600", marginBottom: "4px" }}>
        {repo.repo_name}
      </div>
      <p style={{ fontSize: "14px", color: "var(--color-text-secondary)" }}>
        {repo.summary}
      </p>

      <div style={{ display: "flex", gap: "12px", fontSize: "13px", marginTop: "8px" }}>
        <span>⭐ {repo.stars}</span>
        <span>🍴 {repo.forks}</span>
        <span>📝 {repo.commit_count} commits</span>
      </div>

      <div style={{ display: "flex", gap: "6px", marginTop: "8px", flexWrap: "wrap" }}>
        {repo.tags?.map((tag) => (
          <span
            key={tag.name}
            style={{
              fontSize: "12px",
              padding: "3px 8px",
              borderRadius: "12px",
              backgroundColor: "var(--color-bg)",
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

export default RepoCard;