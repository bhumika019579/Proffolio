function SkillsSummary({ skills }) {
  if (!skills || skills.length === 0) return null;

  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>Verified Skills</h3>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {skills.map((skill) => (
          <span
            key={skill.name}
            style={{
              padding: "6px 12px",
              borderRadius: "16px",
              fontSize: "13px",
              fontWeight: "600",
              color: "white",
              background: "linear-gradient(135deg, var(--color-primary-start), var(--color-primary-end))",
            }}
          >
            {skill.name} · {skill.projectCount} project{skill.projectCount > 1 ? "s" : ""}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SkillsSummary;