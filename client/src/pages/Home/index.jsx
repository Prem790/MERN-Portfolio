import React from 'react'
import Header from '../../components/Header';
import Intro from "./Intro";
import About from './About';
import Expreiences from './Expreiences';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';
import LeftSlider from './LeftSlider';
import { useSelector } from 'react-redux';


function Home() {
  const {portfolioData}=useSelector((state)=>state.root);
  return (
    <div>
      <Header />
      {portfolioData && (
    <div className="bg-primary px-40 sm:px-5">
        <Intro/>
        <About/>
        <Expreiences/>
        <Projects/>
        <Contact/> 
        <Footer/>
        <LeftSlider/>
      
        </div>)}
    </div>
   
  );
}

export default Home;