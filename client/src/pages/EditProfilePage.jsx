import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile,getMe } from "../api/userApi";
import { useAuth } from "../hooks/useAuth";

function EditProfilePage() {
  const { user } = useAuth();
  const [bio, setBio] = useState( "");
  const [skills, setSkills] = useState( "");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
  async function loadUser() {
    try {
      const res = await getMe();

      setBio(res.data.bio || "");
      setSkills(res.data.skills || "");
    } catch (err) {
      console.error("Failed to load profile:", err);
    }
  }

  loadUser();
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateProfile({ bio, skills });
      navigate(`/profile/${user.github_username}`);
    } catch (err) {
      console.error("Failed to update profile:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>

      <label style={{ display: "block", marginBottom: "6px", fontSize: "14px" }}>
        Bio
      </label>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        rows={4}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid var(--color-border)",
          fontFamily: "inherit",
        }}
      />

      <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", marginTop: "16px" }}>
        Skills (comma-separated)
      </label>
      <input
        type="text"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        placeholder="Go, React, PostgreSQL..."
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid var(--color-border)",
        }}
      />

      <button
        type="submit"
        className="btn-primary"
        disabled={saving}
        style={{ marginTop: "12px" }}
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}

export default EditProfilePage;