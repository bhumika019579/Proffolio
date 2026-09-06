import Feed from "../components/feed/Feed";
import { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";

function HomePage() {
   const { login } = useContext(AuthContext);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
  axiosClient.get("/api/me", { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
    login(res.data, token);
    window.history.replaceState({}, "", "/");
  });
}
          }, []);
  return (
    <div>
      <h2 style={{ marginBottom: "16px" }}>Home</h2>
      <Feed />
    </div>
  );
}

export default HomePage;