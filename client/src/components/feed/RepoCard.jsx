const LANGUAGE_COLORS = {
  HTML: "#e34c26",
  CSS: "#563d7c",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Go: "#00ADD8",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  "C#": "#178600",
  Rust: "#dea584",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
};

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
      {/* Repository name */}
      <div
        style={{
          fontWeight: "600",
          marginBottom: "4px",
        }}
      >
        {repo.repo_name}
      </div>

      {/* Repository summary */}
      <p
        style={{
          fontSize: "14px",
          color: "var(--color-text-secondary)",
        }}
      >
        {repo.summary}
      </p>

      {/* Repository stats */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          fontSize: "13px",
          marginTop: "8px",
        }}
      >
        <span>⭐ {repo.stars}</span>
        <span>🍴 {repo.forks}</span>
        <span>📝 {repo.commit_count} commits</span>
      </div>

      {/* Language breakdown */}
      {repo.repo_tags?.length > 0 && (
        <div style={{ marginTop: "14px" }}>
          {/* Language bar */}
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "8px",
              borderRadius: "5px",
              overflow: "hidden",
              backgroundColor: "var(--color-border)",
            }}
          >
            {repo.repo_tags.map((repoTag) => {
              const language = repoTag.tag?.name;
              const color = LANGUAGE_COLORS[language] || "#ffffff";

              return (
                <div
                  key={repoTag.id}
                  title={`${language}: ${repoTag.percentage.toFixed(1)}%`}
                  style={{
                    width: `${repoTag.percentage}%`,
                    backgroundColor: color,
                    border:
                      color === "#ffffff"
                        ? "1px solid #d1d5db"
                        : "none",
                    boxSizing: "border-box",
                  }}
                />
              );
            })}
          </div>

          {/* Language names and percentages */}
          <div
            style={{
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
              marginTop: "9px",
              fontSize: "12px",
            }}
          >
            {repo.repo_tags.map((repoTag) => {
              const language = repoTag.tag?.name;
              const color = LANGUAGE_COLORS[language] || "#ffffff";

              return (
                <span
                  key={repoTag.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  {/* Language color dot */}
                  <span
                    style={{
                      width: "9px",
                      height: "9px",
                      borderRadius: "50%",
                      backgroundColor: color,
                      border:
                        color === "#ffffff"
                          ? "1px solid #d1d5db"
                          : "none",
                      flexShrink: 0,
                    }}
                  />

                  {/* Language name */}
                  <span>{language}</span>

                  {/* Percentage */}
                  <span
                    style={{
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {repoTag.percentage.toFixed(1)}%
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default RepoCard;