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
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/create-post"
            element={
              <Layout>
                <CreatePostPage />
              </Layout>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <Layout>
                <EditProfilePage />
              </Layout>
            }
          />
          <Route
            path="/profile/:username"
            element={
              <Layout>
                <ProfilePage />
              </Layout>
            }
          />
          <Route
            path="/search"
            element={
              <Layout>
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