import axiosClient from "./axiosClient";

export const fetchRepoData = (githubUrl) =>
  axiosClient.post("/repos/fetch", { githubUrl });