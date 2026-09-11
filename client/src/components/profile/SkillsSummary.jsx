function SkillsSummary({ skills }) {
  if (!skills || skills.trim().length === 0) return null;

  const skillList = skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (skillList.length === 0) return null;

  return (
    <div
      className="card"
      style={{
        padding: "22px 24px",
        marginBottom: "20px",
      }}
    >
      <h3
        style={{
          margin: "0 0 16px",
          fontSize: "18px",
          fontWeight: "700",
          color: "var(--color-text-primary)",
        }}
      >
        Skills
      </h3>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {skillList.map((skill) => (
          <span
            key={skill}
            style={{
              padding: "7px 14px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: "600",
              color: "var(--color-primary)",
              backgroundColor: "var(--color-primary-light)",
              border: "1px solid var(--color-border)",
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SkillsSummary;