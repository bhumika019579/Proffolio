import axiosClient from "./axiosClient";

export const createPost = (data) => axiosClient.post("/api/posts", data);
export const toggleLike = (id) => axiosClient.post(`/api/posts/${id}/like`);
export const getComments = (id) => axiosClient.get(`/posts/${id}/comments`);
export const addComment = (id, content) =>
  axiosClient.post(`/api/posts/${id}/comments`, { content });
export const getLikes = (id) => axiosClient.get(`/posts/${id}/likes`);
export const deletePost = (id) => axiosClient.delete(`/api/posts/${id}`);
export const deleteComment = (commentId) => axiosClient.delete(`/api/comments/${commentId}`);