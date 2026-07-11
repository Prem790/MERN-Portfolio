import React, { useEffect } from "react";
import Header from "../../components/Header";
import { Tabs } from "antd";
import AdminIntro from "./AdminIntro";
import AdminAbout from "./AdminAbout";
import { useSelector } from "react-redux";

import AdminProjects from "./AdminProjects";
import AdminExperiences from "./AdminExperiences";
import AdminContact from "./AdminContact";

function Admin() {
  const { portfolioData } = useSelector((state) => state.root);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/admin-login";
    }
  }, []);

  // antd v5 uses the `items` prop instead of the deprecated <Tabs.TabPane>.
  const items = [
    { key: "1", label: "Intro", children: <AdminIntro /> },
    { key: "2", label: "About", children: <AdminAbout /> },
    { key: "3", label: "Experiences", children: <AdminExperiences /> },
    { key: "4", label: "Projects", children: <AdminProjects /> },
    { key: "5", label: "Contact Me", children: <AdminContact /> },
  ];

  return (
    <div>
      <Header />
      <div className="flex gap-10 items-center px-5 py-2 justify-between">
        <div className="flex gap-10 items-center ">
          <h1 className="text-3xl text-primary font-bold">Portfolio Admin</h1>
          <div className="w-60 h-[2px] bg-gray-500"></div>
        </div>
        <div className="flex justify-end">
          <button
            className="px-10 py-2 bg-primary text-white"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/admin-login";
            }}
            type="button"
          >
            Logout
          </button>
        </div>
      </div>
      <hr />
      {portfolioData && (
        <div className="p-5">
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      )}
    </div>
  );
}

export default Admin;
