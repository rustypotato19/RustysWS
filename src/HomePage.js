import React from 'react';
import Hero from './components/Hero';
import ServiceList from './components/ServiceList';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';


const HomePage = () => {
  return (
    <div className="App">
      <Hero />
      <ServiceList />
      <AboutSection />
      <SkillsSection />
    </div>
  );
};

export default HomePage;
