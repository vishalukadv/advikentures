import React from 'react';
import { Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

// Custom X (formerly Twitter) icon component
const XIcon = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Logo = () => (
  <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
    <img
      src="https://raw.githubusercontent.com/vishalukadv/advikenturesINC/main/public/logo.png"
      alt="Advikentures Logo"
      className="h-8 w-auto transition-all duration-200"
      loading="lazy"
      onError={(e) => {
        e.currentTarget.style.display = 'none';
      }}
    />
    <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 text-transparent bg-clip-text">
      Advikentures
    </span>
  </Link>
);

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Logo />
            <p className="text-gray-400 mt-4">
              Your journey to adventure and wellness begins here.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#adventure" className="text-gray-400 hover:text-white">Adventure Sports</a></li>
              <li><a href="#yoga" className="text-gray-400 hover:text-white">Yoga Retreats</a></li>
              <li><a href="#stays" className="text-gray-400 hover:text-white">Stays</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Advikentures Inc., FD-56,</li>
              <li>Kavi Nagar, Ghaziabad 201002</li>
              <li>Phone: +916395406996</li>
              <li>Email: info@advikentures.com</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/advikentures/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white"
              >
                <Facebook size={24} />
              </a>
              <a 
                href="https://x.com/advikentures" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white"
              >
                <XIcon size={24} />
              </a>
              <a 
                href="https://www.instagram.com/advikentures" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400">
            Copyright © Advikentures. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;