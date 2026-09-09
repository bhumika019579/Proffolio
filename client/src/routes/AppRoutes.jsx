import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Layout from "../components/layout/Layout";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import CreatePostPage from "../pages/CreatePostPage";
import ProfilePage from "../pages/ProfilePage";
import EditProfilePage from "../pages/EditProfilePage";
import SearchResultsPage from "../pages/SearchResultsPage";

function AppRoutes() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/"
            element={
              <Layout theme={theme} toggleTheme={toggleTheme}>
                <HomePage />
              </Layout>
            }
          />

          <Route
            path="/create-post"
            element={
              <Layout theme={theme} toggleTheme={toggleTheme}>
                <CreatePostPage />
              </Layout>
            }
          />

          <Route
            path="/profile/edit"
            element={
              <Layout theme={theme} toggleTheme={toggleTheme}>
                <EditProfilePage />
              </Layout>
            }
          />

          <Route
            path="/profile/:username"
            element={
              <Layout theme={theme} toggleTheme={toggleTheme}>
                <ProfilePage />
              </Layout>
            }
          />

          <Route
            path="/search"
            element={
              <Layout theme={theme} toggleTheme={toggleTheme}>
                <SearchResultsPage />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default AppRoutes;