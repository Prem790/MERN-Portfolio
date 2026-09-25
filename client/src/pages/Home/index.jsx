import React from "react";
import Header from "../../components/Header";
import Intro from "./Intro";
import About from "./About";
import Expreiences from "./Expreiences";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "./Footer";
import LeftSlider from "./LeftSlider";
import HomeSkeleton from "../../components/Skeleton";
import { useSelector } from "react-redux";

function Home() {
  const { portfolioData } = useSelector((state) => state.root);

  if (!portfolioData) {
    return (
      <div>
        <Header />
        <HomeSkeleton />
      </div>
    );
  }

  return (
    <div id="top" className="app-bg min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-24 lg:px-12 sm:px-5">
        <section id="intro">
          <Intro />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="experiences">
          <Expreiences />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="contact">
          <Contact />
        </section>
        <Footer />
        <LeftSlider />
      </div>
    </div>
  );
}

export default Home;
