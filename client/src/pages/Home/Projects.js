import React from "react";
import SectionTitle from "../../components/SectionTitle";

//import {projects} from "../../resources/projects"
//import { useState } from "react";
import { useSelector } from "react-redux";

function Projects() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const {portfolioData} = useSelector((state)=>state.root);
  const {projects} = portfolioData;
  

  return (
    <div>
      <SectionTitle title="Projects" />
      <div className="flex py-10 gap-20 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-tertiary w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
        
          {projects.map((project, index) => (
            <div
            
              onClick={() => {
                setSelectedItemIndex(index);
              }}
              className="cursor-pointer"
            >
              <h1
                className={`text-xl px-5 ${
                  selectedItemIndex === index
                    ? "text-white border-tertiary border-l-4 -ml-[4px] bg-[#45a29d49] py-4 rounded-sm"
                    : "text-tertiary"
                }`}
              >
                {project.title}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-10 sm:flex-col">
          <img
            src={projects[selectedItemIndex].image}
            alt=""
            className="h-60 w-70"
          />
          <div className="flex flex-col gap-5">
            <h1 className="text-secondary text-2xl">
              {projects[selectedItemIndex].title}
            </h1>
            <p
              className="text-tertiary"
              style={{
                fontStyle: "italic",
              }}
            >
              {projects[selectedItemIndex].description}
            </p>


                 {projects[selectedItemIndex].link &&
              projects[selectedItemIndex].link.trim() && (
                <h1 className="text-white text-xl">
                  URL:{" "}
                  <a
                    href={`https://${projects[selectedItemIndex].link.replace(
                      /(^\w+:|^)\/\//,
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-tertiary underline"
                  >
                    {projects[selectedItemIndex].link}
                  </a>
                </h1>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
