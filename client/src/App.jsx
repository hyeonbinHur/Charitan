import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProgramsSection from './components/ProgramsSection';
import Footer from './components/Footer';
import './App.css';

const App = () => (
  <div>
    <Header />
    <HeroSection />
    <AboutSection />
    <ProgramsSection />
    <Footer />
  </div>
);

export default App;
