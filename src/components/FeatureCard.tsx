import React from 'react';
import { Feature } from '../types';

const FeatureCard: React.FC<Feature> = ({ icon: Icon, title, description }) => {
  return (
    <div className="relative group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur" />
      <div className="relative bg-white p-6 rounded-xl">
        <Icon className="h-12 w-12 text-orange-600 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;