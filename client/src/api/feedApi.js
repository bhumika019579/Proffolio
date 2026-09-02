import axiosClient from "./axiosClient";

export const getFeed = (page = 1, limit = 20) =>
  axiosClient.get("/feed", { params: { page, limit } });