import axiosClient from "./axiosClient";

export const createPost = (data) => axiosClient.post("/posts", data);
export const getPost = (id) => axiosClient.get(`/posts/${id}`);
export const likePost = (id) => axiosClient.post(`/posts/${id}/like`);
export const unlikePost = (id) => axiosClient.delete(`/posts/${id}/like`);
export const getComments = (id) => axiosClient.get(`/posts/${id}/comments`);
export const addComment = (id, content) =>
  axiosClient.post(`/posts/${id}/comments`, { content });
export const getLikes = (id) => axiosClient.get(`/posts/${id}/likes`);