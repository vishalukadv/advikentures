import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from './Button';
import SearchBar from './search/SearchBar';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-red-600/90 mix-blend-multiply" />
        <img
          src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba"
          alt="Adventure background"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 w-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
          Where Serenity Meets Adventure
          <br />
          <span className="text-2xl sm:text-3xl md:text-4xl font-light mt-2 block">
            in the Heart of India
          </span>
        </h1>
        
        <SearchBar />
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Button
            href="#packages"
            icon={ArrowRight}
            className="group"
          >
            Explore Packages
          </Button>
          <Button
            href="#contact"
            variant="outline"
          >
            Plan Your Adventure
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;