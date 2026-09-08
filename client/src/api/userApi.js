import axiosClient from "./axiosClient";

export const getProfile = (username) =>
  axiosClient.get(`/users/${username}/profile`);
export const updateProfile = (data) =>
  axiosClient.patch("/api/me", data);
export const getMe = () =>
  axiosClient.get("/api/me");