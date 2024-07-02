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
    if(!localStorage.getItem("token")){
      window.location.href="/admin-login";
    }
  }, []);
  


  return (
    <div>
      <Header />
     <div className="flex gap-10 items-center px-5 py-2 justify-between">
     <div className="flex gap-10 items-center ">
      <h1 className="text-3xl text-primary font-bold">Portfolio Admin</h1>
      <div className="w-60 h-[2px] bg-gray-500"></div>
     </div>
     <div className="flex justify-end w-full" label="Welcome Text">
     <button className="px-10 py-2 bg-primary text-white" 
     onClick={() => {
      localStorage.removeItem("token");
      window.location.href="/admin-login"}}
      type="submit">Logout</button>
      </div>
     </div>
     <hr/>
      {portfolioData && (
        <div className=" p-5"> 
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Intro" key="1">
              <AdminIntro />
            </Tabs.TabPane>
            <Tabs.TabPane tab="About" key="2">
              <AdminAbout />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Experiences" key="3">
              <AdminExperiences/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Projects" key="4">
              <AdminProjects/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Contact Me" key="5">
              <AdminContact/>
            </Tabs.TabPane>

          </Tabs>
        </div>
      )}
    </div>
  );
}

export default Admin;

/*
      Tabs can also be used like this in ANT d version 5 and above  
      function Admin() {
          const items = [
            {
              key: '1',
              label: 'Tab 1',
              children: 'Content of Tab Pane 1',
            },
            {
              key: '2',
              label: 'Tab 2',
              children: 'Content of Tab Pane 2',
            },
            {
              key: '3',
              label: 'Tab 3',
              children: <AdminAbout/>,
            },
          ];
          return (
            <div>
              <Header />
              <div className="mt-5">
              <Tabs defaultActiveKey="1" items={items}  />;
               
              </div>
            </div>
          );
        }
          */
