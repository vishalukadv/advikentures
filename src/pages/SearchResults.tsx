import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { packages } from '../data/packages';
import PackageCard from '../components/packages/PackageCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Package } from '../types';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const city = searchParams.get('city')?.toLowerCase();
  const date = searchParams.get('date');
  const travelers = parseInt(searchParams.get('travelers') || '1');

  // Filter packages based on search criteria
  const results = packages.filter(pkg => {
    const matchesCity = city ? 
      pkg.location.toLowerCase().includes(city) : true;
    
    const matchesTravelers = travelers ?
      (pkg.groupSize.split('-').map(Number)[1] >= travelers) : true;

    return matchesCity && matchesTravelers;
  });

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
          <p className="mt-2 text-gray-600">
            {city && `Showing results for "${city}"`}
            {date && ` on ${new Date(date).toLocaleDateString()}`}
            {travelers && ` for ${travelers} traveler${travelers > 1 ? 's' : ''}`}
          </p>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No packages found</h2>
              <p className="text-gray-600 mb-4">
                We couldn't find any packages matching your search criteria. Try adjusting your search or explore our available packages below.
              </p>
              <a 
                href="#packages" 
                className="inline-block px-6 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors"
              >
                View All Packages
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((result: Package) => (
              <PackageCard key={result.title} {...result} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;