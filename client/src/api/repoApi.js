import axiosClient from "./axiosClient";

export const getGithubRepos = () => axiosClient.get("/api/repos");

export const linkRepo = (repoData) => axiosClient.post("/api/repos", repoData);