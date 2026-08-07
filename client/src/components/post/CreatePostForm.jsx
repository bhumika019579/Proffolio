import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRepoData } from "../../api/repoApi";
import { createPost } from "../../api/postApi";
import { useDebounce } from "../../hooks/useDebounce";
import RepoPreview from "./RepoPreview";

function CreatePostForm() {
  const [githubUrl, setGithubUrl] = useState("");
  const [content, setContent] = useState("");
  const [repo, setRepo] = useState(null);
  const [loadingRepo, setLoadingRepo] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const debouncedUrl = useDebounce(githubUrl, 600);

  useEffect(() => {
    if (!debouncedUrl || !debouncedUrl.includes("github.com")) {
      setRepo(null);
      return;
    }

    async function analyzeRepo() {
      setLoadingRepo(true);
      try {
        const res = await fetchRepoData(debouncedUrl);
        setRepo(res.data);
      } catch (err) {
        console.error("Failed to fetch repo:", err);
        setRepo(null);
      } finally {
        setLoadingRepo(false);
      }
    }

    analyzeRepo();
  }, [debouncedUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!repo || !content.trim()) return;

    setSubmitting(true);
    try {
      await createPost({ repoId: repo.id, content });
      navigate("/");
    } catch (err) {
      console.error("Failed to create post:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Share your project</h2>

      <input
        type="text"
        placeholder="Paste your GitHub repo URL"
        value={githubUrl}
        onChange={(e) => setGithubUrl(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid var(--color-border)",
          marginBottom: "8px",
        }}
      />

      <RepoPreview repo={repo} loading={loadingRepo} />

      <textarea
        placeholder="Write about your project — what you built, what you learned..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={6}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid var(--color-border)",
          marginTop: "12px",
          fontFamily: "inherit",
        }}
      />

      <button
        type="submit"
        className="btn-primary"
        disabled={!repo || !content.trim() || submitting}
        style={{ marginTop: "12px" }}
      >
        {submitting ? "Posting..." : "Post"}
      </button>
    </form>
  );
}

export default CreatePostForm;