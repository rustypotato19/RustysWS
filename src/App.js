import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServiceList from './components/ServiceList';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RequestsPage from './components/RequestsPage';
import HomePage from './HomePage';


function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <ServiceList />
      <AboutSection />
      <SkillsSection />
      <Footer />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/requests" element={<RequestsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
