import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const promos = [
  {
    text: "🎉 Early Bird Offer: 20% off on all Extreme Adventure activities!",
    link: "#packages"
  },
  {
    text: "🌟 Book any 2 activities and get the 3rd at half price",
    link: "#packages"
  },
  {
    text: "🎪 Special Weekend Package: Adventure Sports + Luxury Stay at ₹7,999",
    link: "#stays"
  }
];

const PromoBanner = () => {
  const [currentPromo, setCurrentPromo] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promos.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-center">
          <a 
            href={promos[currentPromo].link}
            className="text-center animate-fade-in group px-4"
          >
            <span className="inline-block group-hover:scale-105 transition-transform font-medium">
              {promos[currentPromo].text}
            </span>
          </a>
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute right-4 hover:opacity-75 transition-opacity"
            aria-label="Close banner"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;