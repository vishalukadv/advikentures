import React from 'react';
import SectionTitle from '../components/SectionTitle';
import TransportCard from '../components/transport/TransportCard';
import { transportServices } from '../data/transportation';

const Transportation = () => {
  return (
    <div className="min-h-screen pt-16">
      <section className="py-24 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Transportation Services"
            subtitle="Travel in comfort with our premium transportation options"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {transportServices.map((service) => (
              <TransportCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                capacity={service.capacity}
                features={service.features}
                price={service.pricePerDay || service.pricePerTrip}
                image={service.image}
                tag={service.tag}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Transportation;