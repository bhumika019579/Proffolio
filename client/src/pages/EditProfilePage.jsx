import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile, uploadAvatar } from "../api/userApi";
import { useAuth } from "../hooks/useAuth";

function EditProfilePage() {
  const { user } = useAuth();
  const [bio, setBio] = useState(user?.bio || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);
        await uploadAvatar(formData);
      }

      await updateProfile({ bio });
      navigate(`/profile/${user.username}`);
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
        Profile Picture
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setAvatarFile(e.target.files[0])}
        style={{ marginBottom: "16px" }}
      />

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