import axiosClient from "./axiosClient";

export const search = (query) =>
  axiosClient.get(`/search?q=${encodeURIComponent(query)}`);