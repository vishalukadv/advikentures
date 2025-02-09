import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronUp, ChevronDown } from 'lucide-react';
import { menuItems } from '../config/navigation';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../utils/cn';

const Logo = () => (
  <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-90 transition-opacity">
    <img
      src="https://raw.githubusercontent.com/vishalukadv/advikenturesINC/main/public/logo.png"
      alt="Advikentures Logo"
      className="h-8 w-auto sm:h-10 md:h-12 transition-all duration-200"
      loading="lazy"
      onError={(e) => {
        e.currentTarget.style.display = 'none';
      }}
    />
    <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 text-transparent bg-clip-text">
      Advikentures
    </span>
  </Link>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <nav className={cn(
      "fixed top-0 w-full bg-white z-50",
      scrolled ? "shadow-md" : "shadow-sm",
      "transition-all duration-200"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 sm:h-16 md:h-20">
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center text-black hover:text-orange-600 transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <Menu size={24} className={cn(
              "transition-opacity duration-200",
              isOpen ? "opacity-0" : "opacity-100"
            )} />
            <X size={24} className={cn(
              "absolute transition-opacity duration-200",
              isOpen ? "opacity-100" : "opacity-0"
            )} />
          </button>
        </div>
      </div>

      {/* Side Navigation Menu - Consistent across all screen sizes */}
      <div className={cn(
        "fixed top-0 left-0 h-full w-full sm:w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-14 sm:h-16 md:h-20 flex items-center justify-between px-6 border-b">
          <span className="text-xl font-semibold text-black">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-black hover:text-orange-600 transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="py-6 px-6 h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className={cn(
                  "block py-3 px-4 rounded-lg text-base font-medium transition-colors",
                  isActive(item.href)
                    ? "text-orange-600 bg-orange-50"
                    : "text-black hover:text-orange-600 hover:bg-orange-50"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay - Consistent across all screen sizes */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;