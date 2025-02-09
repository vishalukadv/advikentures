import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { yogaRetreats } from '../data/yogaRetreats';
import BookButton from '../components/BookButton';

const YogaRetreats = () => {
  return (
    <div className="min-h-screen pt-16">
      <section className="py-24 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Yoga Retreats"
            subtitle="Transform your mind, body, and soul with our immersive yoga experiences"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {yogaRetreats.map((retreat) => (
              <div key={retreat.title} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={retreat.image}
                    alt={retreat.title}
                    className="w-full h-full object-cover"
                  />
                  {retreat.tag && (
                    <span className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {retreat.tag}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <retreat.icon className="h-6 w-6 text-orange-600 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-900">{retreat.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{retreat.description}</p>
                  <div className="space-y-3 mb-6">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Duration:</span> {retreat.duration}
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Level:</span> {retreat.level}
                    </div>
                    <ul className="space-y-2">
                      {retreat.includes.map((item) => (
                        <li key={item} className="flex items-center text-gray-600">
                          <span className="w-2 h-2 bg-orange-600 rounded-full mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-orange-600">{retreat.price}</span>
                    {retreat.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {retreat.originalPrice}
                      </span>
                    )}
                  </div>
                  <BookButton
                    title={retreat.title}
                    location="Rishikesh"
                    price={retreat.price}
                    duration={retreat.duration}
                    type="yoga"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default YogaRetreats;