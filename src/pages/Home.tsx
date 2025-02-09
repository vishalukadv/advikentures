import React from 'react';
import PromoBanner from '../components/PromoBanner';
import Hero from '../components/Hero';
import About from './About';
import Features from '../components/Features';
import Packages from '../components/Packages';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen">
      <PromoBanner />
      <div className="pt-24">
        <Hero />
        <About />
        <Features />
        <Packages />
        <Footer />
      </div>
    </div>
  );
};

export default Home;