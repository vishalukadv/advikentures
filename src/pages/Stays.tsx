import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { Bed, Wifi, Utensils, MapPin, Star } from 'lucide-react';
import { stays } from '../data/stays';
import BookButton from '../components/BookButton';

const Stays = () => {
  return (
    <div className="min-h-screen pt-16">
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Comfortable Stays"
            subtitle="Experience luxury and comfort in breathtaking locations"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {stays.map((stay) => (
              <div key={stay.title} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <img
                    src={stay.image}
                    alt={stay.title}
                    className="w-full h-full object-cover"
                  />
                  {stay.tag && (
                    <span className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {stay.tag}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{stay.title}</h3>
                    <div className="flex items-center text-orange-600">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm">{stay.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-2 text-orange-600" />
                    {stay.location}
                  </div>
                  <p className="text-gray-600 mb-4">{stay.description}</p>
                  <div className="space-y-2 mb-6">
                    {stay.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-orange-600 rounded-full mr-2" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold text-orange-600">
                      {stay.pricePerNight}
                      <span className="text-sm text-gray-600">/night</span>
                    </span>
                    <BookButton
                      title={stay.title}
                      location={stay.location}
                      price={stay.pricePerNight}
                      type="stay"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Stays;