import React from 'react';
import { milestones } from '../../data/about';

const Timeline = () => {
  return (
    <div className="relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-orange-200"></div>
      <div className="space-y-12">
        {milestones.map((milestone, index) => (
          <div key={milestone.year} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <span className="text-orange-600 font-bold">{milestone.year}</span>
                <h3 className="text-lg font-semibold mt-2">{milestone.title}</h3>
                <p className="text-gray-600 mt-2">{milestone.description}</p>
              </div>
            </div>
            <div className="relative flex items-center justify-center w-8 h-8">
              <div className="absolute w-4 h-4 bg-orange-600 rounded-full"></div>
            </div>
            <div className="w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;