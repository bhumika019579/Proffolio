function SkillsSummary({ skills }) {
  if (!skills || skills.trim().length === 0) return null;

  const skillList = skills.split(",").map((s) => s.trim()).filter(Boolean);

  if (skillList.length === 0) return null;

  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>Skills</h3>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {skillList.map((skill) => (
          <span
            key={skill}
            style={{
              padding: "6px 12px",
              borderRadius: "16px",
              fontSize: "13px",
              fontWeight: "600",
              color: "black",
              background: "linear-gradient(135deg, var(--color-primary-start), var(--color-primary-end))",
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