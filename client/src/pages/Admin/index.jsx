import React, { useEffect } from "react";
import { Tabs, ConfigProvider, theme } from "antd";
import AdminIntro from "./AdminIntro";
import AdminAbout from "./AdminAbout";
import AdminProjects from "./AdminProjects";
import AdminExperiences from "./AdminExperiences";
import AdminContact from "./AdminContact";
import { useSelector } from "react-redux";

function Admin() {
  const { portfolioData } = useSelector((state) => state.root);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/admin-login";
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin-login";
  };

  const items = [
    { key: "1", label: "Intro", children: <AdminIntro /> },
    { key: "2", label: "About", children: <AdminAbout /> },
    { key: "3", label: "Experiences", children: <AdminExperiences /> },
    { key: "4", label: "Projects", children: <AdminProjects /> },
    { key: "5", label: "Contact", children: <AdminContact /> },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#66FCF1",
          colorInfo: "#66FCF1",
          borderRadius: 10,
          fontFamily: "Inter, system-ui, sans-serif",
          colorBgContainer: "rgba(255,255,255,0.03)",
        },
      }}
    >
      <div className="app-bg min-h-screen text-white">
        {/* Admin top bar */}
        <header className="nav-glass sticky top-0 z-40">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-6 sm:px-4 py-4">
            <div className="flex items-center gap-3">
              <a
                href="/"
                className="flex items-center gap-1 text-xl font-display font-bold"
                title="View site"
              >
                <span className="text-secondary">P</span>
                <i className="ri-code-s-slash-line text-white" />
                <span className="text-tertiary">J</span>
              </a>
              <span className="text-gray-600">/</span>
              <h1 className="text-base font-display font-semibold text-gray-200">
                Portfolio Admin
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg glass text-secondary text-sm hover:border-secondary/60 transition-colors inline-flex items-center gap-1.5"
              >
                View site <i className="ri-external-link-line" />
              </a>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-lg bg-red-500/90 text-white text-sm font-medium hover:bg-red-500 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 sm:px-4 py-8">
          <div className="mb-6">
            <h2 className="text-2xl font-display font-bold gradient-text">
              Manage your portfolio
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Edit any section below and hit save — changes go live on your site
              instantly.
            </p>
          </div>

          {portfolioData ? (
            <div className="glass-card p-6 sm:p-4">
              <Tabs defaultActiveKey="1" items={items} size="large" />
            </div>
          ) : (
            <p className="text-gray-400">Loading your content…</p>
          )}
        </main>
      </div>
    </ConfigProvider>
  );
}

export default Admin;
