import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { Tent, MapPin, Users } from 'lucide-react';
import BookButton from '../components/BookButton';

const camps = [
  {
    title: 'Himalayan Base Camp',
    location: 'Kasol, Himachal Pradesh',
    description: 'Premium camping experience with stunning mountain views',
    features: ['Furnished Tents', 'Bonfire', 'Guided Treks', 'Meals Included'],
    capacity: '2-4 People',
    pricePerNight: '₹2,999',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4',
  },
  {
    title: 'Desert Star Camp',
    location: 'Jaisalmer, Rajasthan',
    description: 'Luxury desert camping under the stars',
    features: ['Swiss Tents', 'Cultural Shows', 'Camel Safari', 'Traditional Food'],
    capacity: '2-3 People',
    pricePerNight: '₹3,499',
    image: 'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed',
  },
  {
    title: 'Forest Retreat Camp',
    location: 'Coorg, Karnataka',
    description: 'Serene camping in the heart of coffee plantations',
    features: ['Eco Tents', 'Nature Walks', 'Coffee Tours', 'Campfire'],
    capacity: '2-4 People',
    pricePerNight: '₹2,499',
    image: 'https://images.unsplash.com/photo-1517823382935-51bfcb0ec6bc',
  },
];

const Camping = () => {
  return (
    <div className="min-h-screen pt-16">
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Camping Adventures"
            subtitle="Experience nature's beauty under the stars"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {camps.map((camp) => (
              <div key={camp.title} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={camp.image}
                    alt={camp.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{camp.title}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-2 text-orange-600" />
                    {camp.location}
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <Users className="h-4 w-4 mr-2 text-orange-600" />
                    {camp.capacity}
                  </div>
                  <p className="text-gray-600 mb-4">{camp.description}</p>
                  <div className="space-y-2 mb-6">
                    {camp.features.map((feature) => (
                      <div key={feature} className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-orange-600 rounded-full mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold text-orange-600">
                      {camp.pricePerNight}
                      <span className="text-sm text-gray-600">/night</span>
                    </span>
                    <BookButton
                      title={camp.title}
                      location={camp.location}
                      price={camp.pricePerNight}
                      type="camping"
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

export default Camping;