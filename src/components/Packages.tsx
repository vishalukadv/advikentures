import React, { useState, useEffect } from 'react';
import SectionTitle from './SectionTitle';
import PackageCard from './packages/PackageCard';
import { packages } from '../data/packages';
import { Package } from '../types';

const Packages = () => {
  const [filteredPackages, setFilteredPackages] = useState(packages);
  const [searchFilters, setSearchFilters] = useState<any>(null);

  useEffect(() => {
    const handlePackageSearch = (event: CustomEvent) => {
      setFilteredPackages(event.detail.results);
      setSearchFilters(event.detail.filters);
    };

    window.addEventListener('packageSearch', handlePackageSearch as EventListener);
    return () => {
      window.removeEventListener('packageSearch', handlePackageSearch as EventListener);
    };
  }, []);

  return (
    <section className="py-24" id="packages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Popular Packages"
          subtitle={searchFilters ? `Showing results for "${searchFilters.city}"` : "Choose from our carefully curated experiences"}
        />

        {filteredPackages.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No packages found</h2>
              <p className="text-gray-600 mb-4">
                We couldn't find any packages matching your search criteria. Try adjusting your search or explore our available packages below.
              </p>
              <button 
                onClick={() => {
                  setFilteredPackages(packages);
                  setSearchFilters(null);
                }}
                className="inline-block px-6 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors"
              >
                View All Packages
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg: Package) => (
              <PackageCard key={pkg.title} {...pkg} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Packages;