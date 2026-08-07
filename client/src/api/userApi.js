import axiosClient from "./axiosClient";

export const getProfile = (username) =>
  axiosClient.get(`/users/${username}`);
export const updateProfile = (data) =>
  axiosClient.patch("/users/me", data);
export const uploadAvatar = (formData) =>
  axiosClient.post("/users/me/avatar", formData);