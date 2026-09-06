import axiosClient from "./axiosClient";

export const getProfile = (username) =>
  axiosClient.get(`/users/${username}/profile`);
export const updateProfile = (data) =>
  axiosClient.patch("/users/me", data);
