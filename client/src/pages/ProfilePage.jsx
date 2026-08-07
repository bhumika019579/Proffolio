import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../api/userApi";
import { useAuth } from "../hooks/useAuth";
import ProfileHeader from "../components/profile/ProfileHeader";
import SkillsSummary from "../components/profile/SkillsSummary";
import ProfilePostsList from "../components/profile/ProfilePostsList";

function ProfilePage() {
  const { username } = useParams();
  const { user: loggedInUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      try {
        const res = await getProfile(username);
        setProfile(res.data);
      } catch (err) {
        setError("Failed to load profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [username]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: "var(--color-error)" }}>{error}</p>;
  if (!profile) return null;

  const isOwnProfile = loggedInUser?.username === username;

  return (
    <div>
      <ProfileHeader user={profile.user} isOwnProfile={isOwnProfile} />
      <SkillsSummary skills={profile.skills} />
      <h3>Posts</h3>
      <ProfilePostsList posts={profile.posts} />
    </div>
  );
}

export default ProfilePage;