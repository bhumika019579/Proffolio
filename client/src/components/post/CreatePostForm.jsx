import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getGithubRepos, linkRepo } from "../../api/repoApi";
import { createPost } from "../../api/postApi";

function CreatePostForm() {
  const [githubRepos, setGithubRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [linkedRepo, setLinkedRepo] = useState(null);
  const [linking, setLinking] = useState(false);
  const [caption, setCaption] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadRepos() {
      try {
        const res = await getGithubRepos();
        setGithubRepos(res.data);
      } catch (err) {
        console.error("Failed to fetch your GitHub repos:", err);
      } finally {
        setLoadingRepos(false);
      }
    }
    loadRepos();
  }, []);

  const handleSelectRepo = async (repo) => {
    setSelectedRepo(repo);
    setLinkedRepo(null);
    setLinking(true);
    try {
      const res = await linkRepo(repo);
      setLinkedRepo(res.data);
    } catch (err) {
      console.error("Failed to link repo:", err);
    } finally {
      setLinking(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!linkedRepo || !caption.trim()) return;

    setSubmitting(true);
    try {
      await createPost({ repo_id: linkedRepo.id, caption });
      navigate("/");
    } catch (err) {
      console.error("Failed to create post:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingRepos) return <p>Loading your GitHub repos...</p>;

  return (
    <div>
      <h2>Share your project</h2>

      {!linkedRepo && (
        <div style={{ marginBottom: "16px" }}>
          <p>Select a repo to link:</p>
          {githubRepos.map((repo) => (
            <div
              key={repo.id}
              onClick={() => handleSelectRepo(repo)}
              style={{
                padding: "10px",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
                marginBottom: "8px",
                cursor: "pointer",
                backgroundColor:
                  selectedRepo?.id === repo.id ? "var(--color-bg-hover)" : "transparent",
              }}
            >
              <strong>{repo.full_name}</strong>
              <p style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>
                {repo.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {linking && <p>Linking repo — analyzing commits, languages, and generating summary...</p>}

      {linkedRepo && (
        <form onSubmit={handleSubmit}>
          <div
            style={{
              padding: "12px",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
              marginBottom: "12px",
            }}
          >
            <strong>{linkedRepo.repo_name}</strong>
            <p style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>
              {linkedRepo.summary}
            </p>
          </div>

          <textarea
            placeholder="Write about your project — what you built, what you learned..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={6}
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
            disabled={!caption.trim() || submitting}
            style={{ marginTop: "12px" }}
          >
            {submitting ? "Posting..." : "Post"}
          </button>
        </form>
      )}
    </div>
  );
}

export default CreatePostForm;