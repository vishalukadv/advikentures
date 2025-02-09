import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { packages } from '../../data/packages';

const SearchBar = () => {
  const [searchParams, setSearchParams] = useState({
    city: '',
    date: '',
    travelers: 1
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Scroll to packages section
    const packagesSection = document.getElementById('packages');
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Filter packages based on search criteria
    const filteredPackages = packages.filter(pkg => {
      const matchesCity = searchParams.city ? 
        pkg.location.toLowerCase().includes(searchParams.city.toLowerCase()) : true;
      
      const matchesTravelers = searchParams.travelers ?
        (parseInt(pkg.groupSize.split('-')[1]) >= searchParams.travelers) : true;

      return matchesCity && matchesTravelers;
    });

    // Dispatch custom event with filtered packages
    window.dispatchEvent(new CustomEvent('packageSearch', {
      detail: {
        filters: searchParams,
        results: filteredPackages
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <form onSubmit={handleSearch} className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-1">
            <MapPin className="w-4 h-4" />
            Destination
          </label>
          <input
            type="text"
            placeholder="Enter city name (e.g., Rishikesh, Manali)"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={searchParams.city}
            onChange={(e) => setSearchParams({ ...searchParams, city: e.target.value })}
          />
        </div>

        <div className="flex-1">
          <label className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-1">
            <Calendar className="w-4 h-4" />
            Travel Date
          </label>
          <input
            type="date"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={searchParams.date}
            onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="flex-1">
          <label className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-1">
            <Users className="w-4 h-4" />
            Travelers
          </label>
          <input
            type="number"
            min="1"
            max="12"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={searchParams.travelers}
            onChange={(e) => setSearchParams({ ...searchParams, travelers: Math.max(1, Math.min(12, parseInt(e.target.value) || 1)) })}
          />
        </div>

        <button
          type="submit"
          className="bg-orange-600 text-white px-8 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 md:self-end"
        >
          <Search className="w-4 h-4" />
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;