import axiosClient from "./axiosClient";

export const getFeed = () => axiosClient.get("/feed");