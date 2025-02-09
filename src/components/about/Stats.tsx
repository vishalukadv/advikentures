import React from 'react';
import { Users, Map, Award, Heart } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '50,000+',
    label: 'Happy Adventurers'
  },
  {
    icon: Map,
    value: '100+',
    label: 'Destinations'
  },
  {
    icon: Award,
    value: '25+',
    label: 'Safety Awards'
  },
  {
    icon: Heart,
    value: '98%',
    label: 'Satisfaction Rate'
  }
];

const Stats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map(({ icon: Icon, value, label }) => (
        <div key={label} className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 mb-4">
            <Icon size={32} />
          </div>
          <div className="text-3xl font-bold text-gray-900">{value}</div>
          <div className="text-gray-600 mt-1">{label}</div>
        </div>
      ))}
    </div>
  );
};

export default Stats;