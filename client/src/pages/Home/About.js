import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";
function About() {
  const { loading, portfolioData } = useSelector((state) => state.root); // Provide a fallback value for portfolioData
  const { about } = portfolioData; // Provide a fallback value for intro
  const { skills, lottieURL, description1, description2 } = about;
  return (
    <div>
      <SectionTitle title="About Me" />
      <div className="flex w-full items-center sm:flex-col">
        <div className="h-[60vh] w-1/2 sm:w-full">
          <dotlottie-player
            src={lottieURL}
            background="transparent"
            speed="1"
            loop
            autoplay
          ></dotlottie-player>
        </div>
        <div className="flex flex-col gap-5 w-1/2 sm:w-full">
          <p className="text-white">{description1 || ""}</p>
          <p className="text-white">{description2 || ""}</p>
        </div>
      </div>

      <div className="py-5">
        <h1 className="text-tertiary text-xl">
          Here are a few technologies I've been working with recently:
        </h1>
        <div className="flex flex-wrap gap-8 justify-start text-white font-bold uppercase mt-10 ">
          {skills.map((skill, index) => (
            <div className="border border-tertiary py-3 px-4">
              <h1 className="text-tertiary ">{skill}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
